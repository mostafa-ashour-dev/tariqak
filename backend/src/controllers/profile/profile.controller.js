import ResponseError from "../../classes/response-error.class";
import User from "../../models/schemas/auth/user.model";
import Driver from "../../models/schemas/auth/driver.model";
import returnMissingFields from "../../utils/missing-fields.util";
import paginateResults from "../../utils/paginate-results.util";

const getUserProfileAuth = async (req, res) => {
    const { user } = req;

    const findUser = await User.findById(user._id);
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    const objUser = findUser.toJSON();
    delete objUser.password;
    delete objUser.verification_code;
    delete objUser.reset_password_code;
    delete objUser.reset_password_expiration;
    delete objUser.verification_code_expiration;
    if (findUser.role === "driver") {
        const findDriver = await Driver.findOne({ user: findUser._id });
        if (!findDriver) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        }

        const objDriver = findDriver.toJSON();
        delete objDriver.user;
        delete objDriver.license_image;
        delete objDriver._id;

        objUser.role_data = objDriver;
    } else {
        objUser.role_data = null;
    }

    const data = {
        user: objUser,
    };
    res.status(200).json({
        success: true,
        type: "success",
        message: "User profile found successfully",
        data,
    });
};

const getUserProfilePublic = async (req, res) => {
    const { user } = req;
    const { username } = req.params;

    if (!username) {
        throw new ResponseError(400, "Input Error", "Username is required");
    }

    const existingUser = await User.findById(user._id);

    if (!existingUser) {
        throw new ResponseError(
            400,
            "Input Error",
            "User requesting the profile not found"
        );
    }

    const findUser = await User.findOne({ username });
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    if (findUser.role === "user" && existingUser.role !== "admin") {
        throw new ResponseError(
            400,
            "Input Error",
            "Unauthorized access - You can only view your own profile or drivers"
        );
    }

    const objUser = findUser.toJSON();
    delete objUser.password;
    delete objUser.verification_code;
    delete objUser.reset_password_code;
    delete objUser.reset_password_expiration;
    delete objUser.verification_code_expiration;

    if (findUser.role === "driver") {
        const findDriver = await Driver.findOne({ user: findUser._id });
        if (!findDriver) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        }

        const objDriver = findDriver.toJSON();
        delete objDriver.user;
        delete objDriver.license_image;
        delete objDriver._id;

        objUser.role_data = objDriver;
    } else {
        objUser.role_data = null;
    }

    const data = {
        user: objUser,
    };

    res.status(200).json({
        success: true,
        type: "success",
        message: "User profile found successfully",
        data: data,
    });
};

const editUserProfile = async (req, res) => {
    const { user } = req;
    const { username, full_name, phone_number, email } = req.body || {};

    const findUser = await User.findById(user._id);
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }, { phone_number }],
    });

    if (
        existingUser &&
        existingUser._id.toString() !== findUser._id.toString() &&
        username &&
        !email &&
        !phone_number
    ) {
        throw new ResponseError(400, "Input Error", "Username not available");
    }

    if (
        existingUser &&
        existingUser._id.toString() !== findUser._id.toString() &&
        (email || phone_number)
    ) {
        throw new ResponseError(400, "Input Error", "User already exists");
    }

    await User.updateOne(
        { _id: user._id },
        { $set: { username, full_name, phone_number, email } }
    );

    res.status(200).json({
        success: true,
        type: "success",
        message: "User profile updated successfully",
        data: null,
    });
};

const editDriverProfile = async (req, res) => {
    const { user } = req;
    const {
        car_model,
        car_plate,
        car_color,
        active_all_day,
        active_period,
        areas,
    } = req.body || {};

    const findUser = await User.findById(user._id);
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    if (findUser.role !== "driver") {
        throw new ResponseError(400, "Input Error", "User is not a driver");
    }

    const findDriver = await Driver.findOne({ user: findUser._id });
    if (!findDriver) {
        throw new ResponseError(400, "Input Error", "Driver not found");
    }

    const existingDriver = await Driver.findOne({
        $or: [{ car_plate }],
    });

    if (
        existingDriver &&
        existingDriver.user.toString() !== findDriver.user.toString()
    ) {
        throw new ResponseError(400, "Input Error", "Driver already exists");
    }

    await Driver.updateOne(
        { _id: findDriver._id },
        {
            $set: {
                car_model,
                car_plate,
                car_color,
                active_all_day,
                active_period,
                areas: areas.map((area) => ({
                    location: {
                        type: "Point",
                        coordinates: [
                            area.location.coordinates.longitude,
                            area.location.coordinates.latitude,
                        ],
                    },
                    name: area.name,
                })),
            },
        }
    );

    res.status(200).json({
        success: true,
        type: "success",
        message: "Driver profile updated successfully",
        data: null,
    });
};

const getNearbyDrivers = async (req, res) => {
    const {
        location: { latitude, longitude },
        radius = 5,
    } = req.body || {};
    const { page = 1, limit = 10 } = req.query || {};
    const missingFields = returnMissingFields({ latitude, longitude });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    const paginatedData = await paginateResults({
        model: Driver,
        populate: "user",
        select: "username full_name phone_number email avatar role",
        query: {
            "areas.location": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius * 1000,
                },
            },
        },
        page: page,
        limit: limit,
    });

    res.status(200).json({
        success: true,
        type: "success",
        message: "Nearby drivers found successfully",
        data: paginatedData,
    });
};

export {
    getUserProfileAuth,
    getUserProfilePublic,
    editUserProfile,
    editDriverProfile,
    getNearbyDrivers,
};
