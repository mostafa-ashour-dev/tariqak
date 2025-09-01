import ResponseError from "../../classes/response-error.class";
import returnMissingFields from "../../utils/missing-fields.util";
import User from "../../models/schemas/auth/user.model";
import Driver from "../../models/schemas/auth/driver.model";

const driverOnboarding = async (req, res) => {
    const { user } = req;
    const {
        license_image,
        car_plate,
        car_image,
        car_model,
        car_color,
        active_period,
        active_all_day,
        areas,
    } = req.body || {};

    const missingFields = returnMissingFields({
        license_image,
        car_plate,
        car_model,
        car_color,
        active_period,
        active_all_day,
        areas,
    });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    const existingUser = await User.findOne({ _id: user._id });

    if (!existingUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    if (existingUser.role !== "driver") {
        throw new ResponseError(400, "Input Error", "User is not a driver");
    }

    const existingDriver = await Driver.findOne({ user: user._id });

    if (existingDriver) {
        throw new ResponseError(
            400,
            "Input Error",
            "User is already onboarded"
        );
    }

    const driver = await Driver.create({
        user: user._id,
        license_image,
        car_plate,
        car_image,
        car_model,
        car_color,
        active_period,
        active_all_day,
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
    });

    existingUser.is_onboarded = true;
    await existingUser.save();

    return res.status(200).json({
        success: true,
        type: "success",
        message: "Driver onboarding successful",
        data: null,
    });
};

export { driverOnboarding };
