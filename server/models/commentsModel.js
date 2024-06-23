// bla
const mongoose = require("mongoose");
const Joi = require("joi");

let commentsSchema = new mongoose.Schema({
title:String,
info:String,
user_id:{type:String , default:"1234"},
menu_id:String,
date: {
    type: Date, default: Date.now
},
})
exports.commentsModel = mongoose.model("comments",commentsSchema);

exports.validateJoi = (_reqBody) => {
let joiSchema = Joi.object({
title:Joi.string().min(2).max(50).required(),
info:Joi.string().min(2).max(850).required(),
menu_id:Joi.string().min(1).max(50).required(),
})
return joiSchema.validate(_reqBody)
}