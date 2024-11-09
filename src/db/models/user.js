import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            default: "User",
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            default: "female",
        },
        avatar: {
            type: String,
            default: 'https://res.cloudinary.com/dztvd7emk/image/upload/v1722885715/xc2jhivn8gspetouuroy.jpg'
        },
        favorites: {
            type: Array,
            default: null,
        }
    },
    { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const UserCollection = model('user', userSchema);