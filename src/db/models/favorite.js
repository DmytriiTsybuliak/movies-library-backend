import { model, Schema } from 'mongoose';

const favoriteSchema = new Schema(
    {
        backdrop_path: {
            type: String,
            required: true,
        },
        genres: {
            type: Array,
            required: true,
        },
        media_id: {
            type: Number,
            required: true,
        },
        original_title: {
            type: String,
            required: true,
        },
        overview: {
            type: String,
            required: false,
        },
        poster_path: {
            type: String,
            required: true,
        },
        release_date: {
            type: String,
            required: [true, 'ReleaseDate is required'],
        },
        title: {
            type: String,
            required: true,
        },
        vote_average: {
            type: Number,
            required: true,
        },
        vote_count: {
            type: Number,
            required: true,
        },
        contentType: {
            type: String,
            enum: ['movie', 'tv'],
            required: true,
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