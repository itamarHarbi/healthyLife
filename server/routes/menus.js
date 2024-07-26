const express = require("express");
const { auth } = require("../middlewares/auth");
const router = express.Router();
const { MenuModel, validateMenuRegistered } = require("../models/menusModel");
const axios = require("axios");
const { string, object, array, date } = require("joi");
const { UserModel } = require("../models/usersModel");
const { default: mongoose } = require("mongoose");
const { menuSearchController } = require("../controllers/menuSearch");


// GET , POST , PUT , DELETE

router.get("/create/searchItem", async (req, res) => {
  let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=10000&q={"shmmitzrach":"${req.query.q}"}`;
  try {
    const axResp = await axios.get(url)
    const apiResult = axResp.data.result.records
    const result = await apiResult.map(item => {
      return { name: item.shmmitzrach, code: item.Code }

    })
    res.status(200).json(result);
  }
  catch (err) {
    console.log(err);
    res.status(502).json(url)
  }
})

router.get("/create/searchByCode", async (req, res) => {
  const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=`
  const q = req.query.q

  // make sure "q" was sent and it's parsable string
  if (!q) return res.json("No Query was sent")
  let parsedQ = []
  try {
    parsedQ = JSON.parse(q)
    console.log(parsedQ);
  } catch (error) {
    return res.status(500).json({ error: "non parsable q was sent" })
  }
  // handle request
  try {
    const promises = await parsedQ.map(async (item) => {
      const data = (await axios.get(`${url}{"Code":"${item.code}"}`)).data.result.records[0]
      Object.keys(data).forEach(function (key) {
        if (typeof (data[key]) == "number" && key != "Code") { data[key] = data[key] * item.grams }
      });
      return data
    })

    const results = await Promise.all(promises).then(arrOfResults => {
      return arrOfResults
    })

    return res.json(results).status(200)
  } catch (error) {
    console.log(error);
    return res.json({ err: "Something went wrong", error }).status(500)
  }

  res.json({ msg: "done", parsedQ })
})

router.get("/create/measurements", async (req, res) => {
  const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=755d28c0-75f7-40e1-9c8c-ecdd106f9b2d&q={"mmitzrach":"${req.query.q}"}`;
  try {
    const apiResult = (await axios.get(url)).data.result.records;
    const promises = await apiResult.map(async (item) => {
      const mida = item.mida;
      const amount = item.mishkal;
      const ItemUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=98fb46fe-e8de-4067-94d2-b0a8ea4269da&q={"smlmida":"${mida}"}`
      const itemName = (await axios.get(ItemUrl)).data.result.records[0].shmmida;
      return { name: itemName, code: mida, grams: amount }

    })
    const result = await Promise.all(promises).then(arrOfResults => { return arrOfResults })
    res.status(200).json(result);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ msg: "bad request" })
  }
})




router.get("/create/getApiData/", async (req, res) => {
  let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=10000`;
  try {
    const axResp = await axios.get(url)
    const apiResult = axResp.data.result.records
    const result = await apiResult.map(item => {
      return { name: item.shmmitzrach, code: item.Code }

    })
    res.status(200).json(result);
  }
  catch (err) {
    console.log(err);
    res.status(502).json(url)
  }
})

router.get("/banners", async (req, res) => {
  let userId
  const q = req.query.q
  let qR = ""
  if (q) {
    const allWords = q.split(" ")
    allWords.forEach(word => {
      // word.removeAll(" ")
      if (word.length > 0)
        qR += `(?=.*${word})`
    })
  }
  console.log(qR);


  // Pulling userData if submited ----
  const userName = req.headers.username
  if (userName) {
    try {
      const userData = await UserModel.findOne({ userName: userName })
      userId = userData._doc._id
      // console.log(userId);
    }
    catch {

    }
  }
  // -------- 

  try {
    const length = await MenuModel.find((userId) ? { user_id: userId } : (q) ? { "name": { $regex: qR } } : {}).count()

    // Define the limit and page number for pagination
    let limit = req.query.limit || 5;
    const page = Number(req.query.page) || 1;

    // Calculate the offset based on the page number and limit
    let offset = length - (page * limit);
    console.log(offset);
    if (offset < 0 && (offset + limit) > 0) {
      limit = (offset + limit);
      offset = 0;
    }
    //query from DB
    const menus = await MenuModel.find(
      (userId) ? { user_id: userId }
        : (q) ? { "name": { $regex: qR } } : {}
    )
      .skip(offset)
      .limit(limit)
    // Sort by date
    menus.sort((a, b) => {
      return new Date(b.date_created) - new Date(a.date_created);
    })

    console.log(q);

    // Filter data for only relevance keys----
    const filteredData = await (menus.map(async (item) => {
      const tempUserData = await UserModel.findOne({ _id: item.user_id })
      const userData = tempUserData._doc
      await delete userData.date
      await delete userData.password
      await delete userData.groups
      await delete userData.email

      return {
        _id: item._id,
        products: item.products,
        name: item.name,
        menuDescription: item.menuDescription,
        date_created: item.date_created,
        userData
      }
    }))
    //--------

    const result = await Promise.all(filteredData).then(arrOfResults => { return arrOfResults })

    res.json(
      {
        length,
        limit,
        page,
        "data": result,
      })
  }

  catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
})

router.get("/search/byQ", menuSearchController.banners.bannersByQ)
router.get("/search", menuSearchController.nameOnly)






router.get("/post", async (req, res) => {
  try {
    let menuData = await MenuModel.findOne({ _id: req.query.id });
    console.log(menuData);
    menuData.user_id = "******"

    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&q=`

    const promises = await menuData.products.map(async (item) => {
      const data = (await axios.get(`${url}{"Code":"${item.prodCode}"}`)).data.result.records[0];
      console.log(data);
      Object.keys(data).forEach(function (key) {
        if (typeof (data[key]) == "number" && key != "Code") { data[key] = data[key] * item.totalGrams }
      });

      return data
    })

    const results = await Promise.all(promises).then(arrOfResults => {
      return arrOfResults
    });
    res.json({
      menuData,
      tableData: { prods: results }
    }
    );


  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})


router.post("/createMenu", auth, async (req, res) => {
  let validBody = validateMenuRegistered(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {
    let menu = new MenuModel(req.body);
    menu.user_id = req.tokenData._id;
    menu.date_created = Date.now()
    await menu.save();
    res.status(201).json(menu);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err })
  }
})

router.delete("/:id", auth, async (req, res) => {
  try {
    const menu = await MenuModel.findOne({ _id: req.params.id })

    console.log(req.tokenData);
    if (menu.user_id === req.tokenData._id) {
      await MenuModel.deleteOne({ _id: req.params.id })
      res.status(200).json({ "msg": "Menu deleted seccefully" })
    }
    else {
      console.log("no");
      res.status(502).json({ "msg": "You don't have premission" })
    }
  }
  catch (err) {
    res.status(502).json({ err, "msg": "bad request" })
  }
})

module.exports = router;