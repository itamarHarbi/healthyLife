const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
    name: String,
    numbers: Array,
})
exports.GroupModel = mongoose.model("groups", schema)

exports.validateJoi = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        numbers: Joi.array().min(2).max(999).required(),
    })
    return joiSchema.validate(_reqBody)
}