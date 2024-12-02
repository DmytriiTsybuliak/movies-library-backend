import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        name: {
            type: String,
            default: 'User',
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
            default: 'female',
        },
        avatar: {
            type: String,
            default:
                'https://res.cloudinary.com/dztvd7emk/image/upload/v1722885715/xc2jhivn8gspetouuroy.jpg',
        },
    },
    { timestamps: true, versionKey: false }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);

};

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const User = model('users', userSchema);
