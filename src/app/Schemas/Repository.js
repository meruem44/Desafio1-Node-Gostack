import mongoose from 'mongoose';

const RepositorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    techs: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Repositoy', RepositorySchema);