const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { auth } = require("../middlewares/auth");
const { UserModel, validateUser, validateLogin, createToken, imagesArr, getRandomImg } = require("../models/usersModel")
const jwt = require("jsonwebtoken");
const { ImagesModel } = require("../models/imagesModel");
const { parse } = require("dotenv");
const { parseConnectionUrl } = require("nodemailer/lib/shared");
const { MenuModel } = require("../models/menusModel");


// return if token is valid and user exsist
router.get("/auth", auth, async (req, res) => {

  try {
    let userInfo = await UserModel.findById(req.tokenData);
    userInfo ?
      res.status(200).json({ valid: true })
      :
      res.status(502).json({ valid: false })
  }
  catch (err) {

    console.log(req);
    console.log(err);
    res.status(502).json({ valid: false })
  }
})



// return data of user sent in the "x-api-token" header
router.get("/userData", auth, async (req, res) => {

  try {
    const fetchedUserInfo = await UserModel.findOne({ _id: req.tokenData._id });
    let userInfo = { ...fetchedUserInfo._doc }
    delete userInfo.password;
    res.status(200).json(userInfo);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

// return data of user sent in the params
router.get("/:userName", async (req, res) => {
  let auther;

  try {
    const tempUserInfo = await UserModel.findOne({ userName: req.params.userName });
    const userInfo = tempUserInfo._doc
    console.log(userInfo._id);
    const length = await MenuModel.find({user_id: userInfo._id}).count()
    userInfo.numberOfMenus = length

    // check ownerShip
    try {
      const token = req.header("x-api-key");
      const valid = await jwt.verify(token, process.env.TOKEN_HASH);
      const id = userInfo._id.toString()
      valid._id == id ? auther = true : auther = false

    }

    catch (err) {
      auther = false
    }

    userInfo.auther = auther
    delete userInfo._id
    delete userInfo.password
    delete userInfo.date
    delete userInfo.__v
    delete userInfo.email


    res.status(200).json(userInfo);
  }
  catch (err) {
    res.status(502).json({ msg: "No User Found" })
  }
})

//SINGUP user into system
router.post("/signUp", async (req, res) => {
  let validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10)
    user.profileImage = await getRandomImg()
    await user.save();
    user.password = "*****";
    const token = await createToken(user._id);
    console.log(token);
    res.status(201).json(token);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

// Sign in
router.post("/signIn", async (req, res) => {
  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {

    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "wrong email or password" })
    }

    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(401).json({ msg: "wrong email or password" })
    }

    const token = createToken(user._id, user.role);

    res.status(201).json(token);
  }

  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.post("/changeImg", auth, async (req, res) => {
  console.log(req.body);
  try {
    const img = req.body.img
    if (!img) throw ("No img url was provided")

    // validate url -
    const tempImages = await ImagesModel.findOne({ _id: '664f2645000ddae459dd84ad' });
    const images = tempImages._doc.data
    if (!images.includes(img)) { throw ("No valid Url was provided") }
    //____________

    const update = await UserModel.findOne({ _id: req.tokenData._id })
    update.profileImage = img
    update.save().then(
      (resolve) => { res.status(200).json({ data: "img updated succesfuly" }) },
      (reject) => { throw (reject) }
    )


  }

  catch (err) {
    res.status(502).json(err);
  }

})


module.exports = router;