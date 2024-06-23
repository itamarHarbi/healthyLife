const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
    title: String,
    info: String,
    img: String,
    users: String,
    group: String,
    data: {
        type: Date, default: Date.now
    },
})
exports.ChatModel = mongoose.model("chats", schema)

exports.validateJoi = (_reqBody) => {
    let joiSchema = Joi.object({
        title: Joi.string().min(2).max(50).required(),
        info: Joi.string().min(1).max(999).required(),
        img: Joi.string().min(1).max(50).allow(),
        users: Joi.string().min(1).max(999).required(),
        group: Joi.string().min(1).max(999).required(),
    })
    return joiSchema.validate(_reqBody)
}