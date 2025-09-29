import ResponseError from "../../classes/response-error.class";
import returnMissingFields from "../../utils/missing-fields.util";
import User from "../../models/schemas/auth/user.model";
import Driver from "../../models/schemas/roles/driver.model";
import extractLocations from "../../helpers/locations-extractor.helper";

const driverOnboarding = async (req, res) => {
    const { user } = req;
    const {
        car_plate,
        car_model,
        car_color,
        areas,
    } = req.body || {};

    const missingFields = returnMissingFields({
        car_plate,
        car_model,
        car_color,
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

    await Driver.create({
        user: user._id,
        car_plate,
        car_model,
        car_color,
        areas: extractLocations(areas),
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
