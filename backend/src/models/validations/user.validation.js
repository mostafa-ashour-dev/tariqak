const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
const USERNAME_REGEX = /^(?![_-])[A-Za-z0-9_-]{3,}(?<![_-])$/;
const PHONE_NUMBER_REGEX = /^0?1[0-2,5][0-9]{8}$/;
export { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX, PHONE_NUMBER_REGEX };
