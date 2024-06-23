const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { ImagesModel } = require("./imagesModel");

exports.getRandomImg = async () => {
    try {
        const arr = (await ImagesModel.find({ _id: '664f2645000ddae459dd84ad' }))[0]._doc.data;
        const num = await Math.floor(Math.random() * 13) + 1;
        return arr[num]
    } catch (error) {
        console.log(error);
    }
}

let schema = new mongoose.Schema({
    userName: String,
    displayName: String,
    email: String,
    password: String,
    date: {
        type: Date, default: Date.now
    },
    profileImage: {
        type: String, default: "img2"
    }
})
exports.UserModel = mongoose.model("users", schema)

exports.createToken = (user_id, role) => {
    let token = jwt.sign({ _id: user_id, role }, "Shlomo", { expiresIn: "60000mins" })
    return token;
}

exports.validateUser = (_reqBody) => {
    let joiSchema = Joi.object({
        userName: Joi.string().min(2).max(20).required(),
        displayName: Joi.string().min(2).max(20).required(),
        email: Joi.string().min(10).max(50).required(),
        password: Joi.string().min(8).max(50).required(),
    })
    return joiSchema.validate(_reqBody)
}

exports.validateLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
    return joiSchema.validate(_reqBody)
}