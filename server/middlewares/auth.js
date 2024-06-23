const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/usersModel");

exports.auth = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You must send a token to this end point" })
    }

    try {
        req.tokenData = jwt.verify(token, process.env.TOKEN_HASH);
        // const userData = UserModel.find({_id:token})
        // console.log(userData);
        next();
    }
    catch (error) {
        return res.status(401).json({ msg: "Token invalid or expired", valid: false });
    }
}