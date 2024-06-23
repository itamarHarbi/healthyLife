const express = require("express");
const router = express.Router();
const { GroupModel, validateJoi } = require("../models/groupsModel")

router.get("/", async(req,res) => {
  try{
    let data = await GroupModel.find({}).limit(20);
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
    let group = new GroupModel(req.body);
    await group.save();
    res.status(201).json(group);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.delete("/:id", async(req,res) => {
  try{
    let id = req.params.id;
    let data = await GroupModel.deleteOne({_id:id});
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
    let data = await GroupModel.updateOne({_id:id},req.body);
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})

router.get("/single/:id", async (req, res) => {
  try {
    let data = await GroupModel.findOne({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});
module.exports = router;