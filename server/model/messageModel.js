const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        message: {
            text: {
                type: String,
                required: true
            },
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        users: Array
    },
    {timestamps: true,}
);

module.exports = mongoose.model("Messages", MessageSchema);
