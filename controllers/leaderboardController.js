const UserScore = require('../models/userScore').model;

// Aggregates scores and returns the leaderboard
const getLeaderboard = async () => {
    const leaderboard = await UserScore.aggregate([
        {
            $group: {
                _id: "$username", // Group by username
                totalScore: { $sum: "$score" }, // Sum scores for each username
            },
        },
        {
            $sort: { totalScore: -1 }, // Sort by totalScore in descending order
        },
        {
            $project: { // Adjust the output format, if needed
                _id: 0, 
                username: "$_id", 
                totalScore: 1,
            },
        },
    ]);

    return leaderboard;
};

module.exports = {
    getLeaderboard,
};
