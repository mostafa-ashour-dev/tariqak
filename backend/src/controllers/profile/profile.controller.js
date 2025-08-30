import ResponseError from "../../classes/response-error.class";
import User from "../../models/schemas/auth/user.model";
import Driver from "../../models/schemas/auth/driver.model";


const getUserProfileAuth = async (req, res) =>{
    const { user } = req;

    const findUser = await User.findById(user._id);
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    };

    const find = findUser.toJSON();
    delete find.password;
    delete find.verification_code;
    delete find.reset_password_code;
    delete find.reset_password_expiration;
    delete find.verification_code_expiration;


    if (findUser.role === "driver") {
        const findDriver = await Driver.findOne({ user: findUser._id });
        if (!findDriver) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        };
        findUser.driver = findDriver;
    }

    res.status(200).json({
        success: true,
        type: "success",
        message: "User profile found successfully",
        data: findUser,
    });
}

const getUserProfilePublic = async (req, res) => {
    const { username } = req.params;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    };

    if (existingUser.role === "driver") {
        const findDriver = await Driver.findOne({ user: existingUser._id });
        if (!findDriver) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        };

        existingUser.driver = findDriver;

        const objDriver = findDriver.toJSON();
        delete objDriver.driver.user;
        delete objDriver.driver.license_image;
    }

    const objUser = existingUser.toJSON();
    delete objUser.password;
    delete objUser.verification_code;
    delete objUser.reset_password_code;
    delete objUser.reset_password_expiration;
    delete objUser.verification_code_expiration;

    res.status(200).json({
        success: true,
        type: "success",
        message: "User profile found successfully",
        data: existingUser,
    });
}


export {
    getUserProfileAuth,
    getUserProfilePublic
}