const { MenuModel } = require("../models/menusModel");
const { UserModel } = require("../models/usersModel");

const sortByDate = async (arr) => {
    const sorted = await arr.sort((a, b) => {
        return new Date(b.date_created) - new Date(a.date_created);
    })
    return sorted
}

const getReductedUserData = async (id) => {
    try {
        const userData = await UserModel.findOne({ _id: id })
        const editableData = userData._doc
        await delete editableData.date
        await delete editableData.password
        await delete editableData.groups
        await delete editableData.email
        await delete editableData.__v
        await delete editableData._id

        return editableData
    }

    catch {
        throw ("Couldn't fetch user data")
    }
}

const onlyMenuName = async (data) => {
    return await data.map(i => {
        const d = i._doc
        return {
            name: d.name,
            _id: d._id
        }

    })
}

const dataForBanners = async (arr) => {
    const filteredData = await (arr.map(async (item) => {
        const userData = await getReductedUserData(item.user_id)

        return {
            _id: item._id,
            products: item.products,
            name: item.name,
            menuDescription: item.menuDescription,
            date_created: item.date_created,
            userData
        }
    }))
    const result = await Promise.all(filteredData).then(arrOfResults => { return arrOfResults })
    return result
}



const menuSearchController = {
    nameOnly: async (req, res) => {
        const q = req.query.q
        try {
            let qR = ""
            const allWords = q.split(" ")
            await allWords.forEach(word => {
                qR += `(?=.*${word})`
                console.log(word);
            })
            const data = await MenuModel.find({ "name": { $regex: qR } })
            const fData = await onlyMenuName(data)

            res.json(fData)
        }

        catch (err) {
            console.log(err);
            res.status(502).json(err);
        }
    },
    banners: {
        allBanners: async (req, res) => {
            try {

                const data = await MenuModel.find({}).limit();
                res.status(200).json(data)

            } catch (error) {
                res.status(501).json(error)
            }

        },
        bannersByQ: async (req, res) => {
            const last = req.query.last || false
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
            try {
                const data = await MenuModel.find(last ? { name: { $regex: qR }, _id: { $lt: last } } : { name: { $regex: qR } })
                const length = data.length
                const sorted = await sortByDate(data)
                await sorted.splice(20)
                const ready = await dataForBanners(sorted)
                res.json({ data: ready, length })
            }

            catch (err) {
                console.log(err);
                res.status(502).json(err);
            }

        }
    }


}
module.exports = { menuSearchController }