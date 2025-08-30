import mongoose from "mongoose";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../validations/user.validation";
import generateRandomCode from "../../../utils/generate-random-code";

const userSchema = mongoose.Schema(
    {
        full_name: {
            type: String,
            required: [true, "User full_name is required"],
            trim: true,
            minLength: 3,
            maxLength: 255,
        },
        username: {
            type: String,
            required: [true, "User username is required"],
            trim: true,
            unique: true,
            minLength: 3,
            maxLength: 255,
        },
        phone_number: {
            type: String,
            required: [true, "User phone_number is required"],
            trim: true,
            match: /^0?1[0-2,5][0-9]{8}$/,
        },
        email: {
            type: String,
            required: [true, "User email is required"],
            trim: true,
            unique: true,
            minLength: 3,
            maxLength: 255,
            validate: {
                validator: (value) => {
                    return EMAIL_REGEX.test(value);
                },
                message: (props) => `${props.value} is invalid email`,
            },
        },
        password: {
            type: String,
            required: [true, "User password is required"],
            minLength: 8,
            maxLength: 255,
            validate: {
                validator: (value) => {
                    return PASSWORD_REGEX.test(value);
                },
                message:
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
            },
        },
        role: {
            type: String,
            required: [true, "User role is required"],
            enum: ["user", "driver", "admin"],
            default: "user",
        },
        avatar: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "Egypt",
        },
        city: {
            type: String,
            default: "Cairo",
        },
        is_active: {
            type: Boolean,
            default: true,
        },
        is_onboarded: {
            type: Boolean,
            default: false,
        },
        is_verified: {
            type: Boolean,
            default: false,
        },
        verification_code: {
            type: String,
            default: "",
        },
        verification_code_expiration: {
            type: Date,
            default: null,
        },
        reset_password_code: {
            type: String,
            default: "",
        },
        reset_password_expiration: {
            type: Date,
            default: null,
        },
        last_login: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

userSchema.index({ full_name: "text" });
userSchema.index({ username: "text" });

userSchema.methods.setRandomCode = async function (type) {
    const expirationDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    const randomCode = generateRandomCode();
    let code = "";
    if (type === "password_reset") {
        this.reset_password_code = randomCode;
        this.reset_password_expiration = expirationDate;
        code = this.reset_password_code;
    } else {
        this.verification_code = randomCode;
        this.verification_code_expiration = expirationDate;
        code = this.verification_code;
    }

    this.save();
    return code;
};

const User = mongoose.model("User", userSchema);
export default User;
