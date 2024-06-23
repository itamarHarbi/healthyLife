const express = require("express");
const router = express.Router();
const { ChatModel, validateJoi } = require("../models/chatsModel")

router.get("/", async(req,res) => {
  try{
    let data = await ChatModel.find({}).limit(20);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.post("/" , async(req,res) => {
  let validBody = validateJoi(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let chat = new ChatModel(req.body);
    await chat.save();
    res.status(201).json(chat);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", async(req,res) => {
  try{
    let id = req.params.id;
    let data = await ChatModel.deleteOne({_id:id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.put("/:id", async(req,res) => {
  let validBody = validateJoi(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let id = req.params.id;
    let data = await ChatModel.updateOne({_id:id},req.body);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.get("/single/:id", async (req, res) => {
  try {
    let data = await ChatModel.findOne({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
module.exports = router;