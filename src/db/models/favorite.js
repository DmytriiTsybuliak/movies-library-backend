import { model, Schema } from 'mongoose';

const favoriteSchema = new Schema(
    {
        favorites: {
            type: Array,
            default: null,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { timestamps: true, versionKey: false },
);



export const FavoriteCollection = model('favorite', favoriteSchema);