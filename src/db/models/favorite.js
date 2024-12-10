import { model, Schema } from 'mongoose';

const favoriteSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        releaseDate: {
            type: String,
            required: [true, 'ReleaseDate is required'],
        },
        genre: {
            type: String,
        },
        type: {
            type: String,
        },
        movieId: {
            type: String,
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