import ResponseError from "../../classes/response-error.class";


const normalizePhoneNumber = (phoneNumber) => {

    if (!phoneNumber) {
        throw new ResponseError(400, "Input Error", "Phone number at (normalizePhoneNumber) is required");
    }

    let correctedPhoneNumber = phoneNumber;
    if (phoneNumber.startsWith("20")) {
        correctedPhoneNumber = phoneNumber.slice(2);
    } else if (phoneNumber.startsWith("0")) {
        correctedPhoneNumber = phoneNumber.slice(1);
    }

    return correctedPhoneNumber;
}

export default normalizePhoneNumber