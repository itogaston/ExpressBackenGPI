const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: [true, "Missing user"],
        //     ref: "User"
        // },
        name: {
            type: String,
            require: [true, "Missing name"],
        },
        description: {
            type: String,
        },
        context: {
            type: String,
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            required: [true, "Missing user id"],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Project", projectSchema);
