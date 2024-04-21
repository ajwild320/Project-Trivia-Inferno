const UserScore = require('../models/userScore').model;
const User = require('../models/user');

// Aggregates scores and returns the leaderboard
const getLeaderboard = async () => {
    const leaderboard = await UserScore.aggregate([
        {
            $group: {
                _id: "$userId", // Group by userId
                totalScore: { $sum: "$score" }, // Sum scores for each userId
            },
        },
        {
            $lookup: { // Join with User collection
                from: "users", 
                localField: "_id", 
                foreignField: "_id", 
                as: "userDetails", // The array where the matched User documents will be added
            },
        },
        {
            $unwind: "$userDetails", // Flatten the userDetails array
        },
        {
            $sort: { totalScore: -1 }, // Sort by totalScore in descending order
        },
        {
            $project: { // Define the output format
                _id: 0,
                firstName: "$userDetails.firstName",
                lastName: "$userDetails.lastName",
                totalScore: 1,
            },
        },
    ]);

    return leaderboard;
};


module.exports = {
    getLeaderboard,
};
