const express = require("express");
const router = express.Router();

router.get("/" , async(req,res) => {
  res.json({msg:"healthy life work"})
})


module.exports = router;