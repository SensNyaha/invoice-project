import mongoose, {Schema} from "mongoose";
import "dotenv/config";
import bcrypt from "bcryptjs";
import validator from "validator";
import { USER } from "../constants";


const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(value) {
                return /^[A-Z][a-z0-9-_]{3,23}$/.test(value)
            },
            message: "Username must be alphanumeric, withour special chars. Hyphens and undescores allowed"
        }
    },
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [
            validator.isAlphanumeric, "First Name must by alphanumeric"
        ]
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [
            validator.isAlphanumeric, "Last Name must by alphanumeric"
        ]
    },
    password: {
        type: String,
        select: false,
        validate: [
            validator.isStrongPassword, "Password must be 8 chars in length and lower+uppercase letters plus 1 symbol"
        ]
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function(value) {
                return value === this.password
            },
            message: "Passwords dont match"
        }
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    provider: {
        type: String,
        required: true,
        default: "email"
    },
    googleID: {
        type: String,
    },
    avatar: String,
    businessName: String,
    phoneNumber: {
        type: String,
        default: "+79277207722",
        validate: [validator.isMobilePhone, "Phone number must start with +"]
    },
    address: String,
    city: String,
    country: String,
    passwordChangedAt: Date,
    roles: {
        type: [String],
        default: [USER]
    },
    active: {
        type: Boolean,
        default: true,
    },
    refreshToken: [String],
}, {timestamps: true});

userSchema.pre("save", async (next) => {
    if (this.roles.length === 0) {
        this.roles.push(USER);
        next();
    }
})

userSchema.pre("save", async (next) => {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    this.passwordConfirm = undefined;
    next();
})

userSchema.pre("save", async (next) => {
    if (!this.isModified("password") || this.isNew) {
        return next();
    }

    this.passwordChangedAt = Date.now();
    next();
})

userSchema.methods.comparePassword = async (given) => {
    return await bcrypt.compare(given, this.password);
}

export default mongoose.model("User", userSchema, "users");