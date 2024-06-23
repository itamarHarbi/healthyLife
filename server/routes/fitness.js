const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
const { auth } = require("../middlewares/auth");
const axios = require('axios');

router.get("/bmi/", async (req, res) => {
    const a = req.query.a ; 
    if(a==null) return res.json({msg:"a has no data"})
    const w = req.query.w || null;
    if(w==null) return res.json({msg:"w has no data"})
    const h = req.query.h || null;
    if(h==null) return res.json({msg:"h has no data"})


    const options = {
        method: 'GET',
        url: 'https://fitness-calculator.p.rapidapi.com/bmi',
        params: {
          age: a,
          weight: w,
          height: h
        },
        headers: {
          'X-RapidAPI-Key': '217bd50b04msh93902dfc6b77bc0p10d70ejsnd54d83a30ab0',
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
      };

    console.log("Height:", h,"w:",w,"a:",a);

    try {
        const response = await axios.request(options);
        //   console.log(response.data);
        res.json(response.data)
    } catch (error) {
        // console.error(error);
        res.status(502).json({ error });
    }
})
module.exports = router;