import ResponseError from "../../classes/response-error.class";
import Driver from "../../models/schemas/auth/driver.model";

const attachRoleData = async (user) => {
    
    if (!user) {
        throw new ResponseError(400, "Input Error", "User is not defined (at attachRoleData)");
    }
    
    if (user.role === "driver") {
        const findDriver = await Driver.findOne({ user: user._id });
        if (findDriver) {
            const objDriver = findDriver.toJSON();
            delete objDriver.user;
            delete objDriver.license_image;
            delete objDriver._id;

            return {
                ...user.toJSON(),
                role_data: objDriver
            };


        } else {
            return {
                ...user.toJSON(),
                role_data: null
            };
        }
    } else {
        return {
            ...user.toJSON(),
            role_data: null
        };
    }
}

export default attachRoleData;