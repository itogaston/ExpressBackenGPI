const mongoose = require("mongoose");

const userStorieSchema = mongoose.Schema(
    {
        project_id: {
            type: mongoose.Types.ObjectId,
            required: [true, "Missing project id"],
        },
        sprint_id: {
            type: mongoose.Types.ObjectId,
        },
        name: {
            type: String,
        },
        priority: {
            type: Number,
        },
        estimated: {
            type: Number,
        },
        done: {
            type: Number
        },
        state: {
            type: String
        },
        notes: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("UserStory", userStorieSchema);
