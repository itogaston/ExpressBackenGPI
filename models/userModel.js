const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Missing user name"]
        },
        email: {
            type: String,
            require: [true, "Missing email"],
            unique: true
        },
        password: {
            type: String,
            require: [true, "Missing email"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
