const express = require("express");
const { mongoose } = require("mongoose");
const { ImagesModel } = require("../models/imagesModel");
const router = express.Router();

router.get("/", async (req, res) => { // returns all profile images urls
    try {
        const tempData = await ImagesModel.findOne({ _id: '664f2645000ddae459dd84ad' });
        const data = tempData._doc
        delete data._id

        res.json(data.data)
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})



module.exports = router;
