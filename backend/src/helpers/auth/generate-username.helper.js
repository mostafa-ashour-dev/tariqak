import slugify from "slugify";
import ResponseError from "../../classes/response-error.class";
import crypto from "crypto";

const generateUsername = (fullName) => {

    if (!fullName) {
        throw new ResponseError(400, "Input Error", "Full name at (generateUsername) is required");
    };

    const username =
        slugify(fullName, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        }) +
        "-" +
        crypto.randomBytes(4).toString("hex");

    return username;    
}

export default generateUsername