const mongoose = require("mongoose");

const sprintSchema = mongoose.Schema(
    {
        project_id: {
            type: mongoose.Types.ObjectId,
            required: [true, "Missing project id"],
        },
        number: {
            type: Number,
            required: [true, "Missing sprint number"]
        },
        description: {
            type: String,
        },
        start_date: {
            type: Date
        },
        finish_date: {
            type: Date
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Sprint", sprintSchema);
