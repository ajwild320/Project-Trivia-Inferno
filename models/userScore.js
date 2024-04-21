const mongoose = require('mongoose');
const userScoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: String,
    score: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
module.exports = {'model':mongoose.model('UserScore', userScoreSchema), 'schema':userScoreSchema};