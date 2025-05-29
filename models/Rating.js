import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    carId: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxLength: 500
    }
}, {
    timestamps: true // This automatically handles createdAt and updatedAt
});

export default mongoose.model('Rating', ratingSchema);
