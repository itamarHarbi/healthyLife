const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
    name: String,
    products: Array,
    date_created: {
        type: Date, default: Date.now
    },
    user_id: {
        type: String, default: "unRegistered"
    },
    pic: String,
    menuDescription:String
    
})


let joiSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    products: Joi.array().items(Joi.object().keys({
        prodName: Joi.string().required(),
        prodCode: Joi.number().integer().max(99999).required(),
        measName: Joi.string().required(),
        measCode: Joi.number().required(),
        id:Joi.number().required(),
        measMultiplier: Joi.number().required().max(9999),
        amount: Joi.number().integer().positive().max(999).required(),
        totalGrams:Joi.number().min(0).max(999999999).required()
    })).required(),
    pic: Joi.string().min(1).max(999).allow(),
    menuDescription:Joi.string().min(10).max(10000).required()
})

exports.MenuModel = mongoose.model("menus", schema)

exports.validateMenuRegistered = (_reqBody) => {

    return joiSchema.validate(_reqBody)
}