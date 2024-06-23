import Joi from "joi";

const messages = {
    "number.integer": "ערך חייב להיות מספר",
    "number.positive": "מספר חייב להיות חיובי",
    "number.required": "זהו שדה חבה",
    "number.max": "מספר בין 0-999",
    "string.required": "זהו שדה חבה"
}

const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    products: Joi.array().items(Joi.object().keys({
        prodName: Joi.string().required().messages(messages),
        prodCode: Joi.number().integer().max(99999).required().messages(messages),
        id: Joi.number().required().messages(messages),
        measName: Joi.string().required().messages(messages),
        measCode: Joi.number().required().messages(messages),
        measMultiplier: Joi.number().required().max(9999).messages(messages),
        amount: Joi.number().integer().positive().max(999).required().messages(messages),
        totalGrams: Joi.number().min(0).max(999999999).required()
    })),
    menuDescription: Joi.string().min(10).max(10000).required()
}).options({ abortEarly: false })

export const validateMenuSchema = (_obj) => {
    try {
        return schema.validate(_obj)

    }
    catch (err) {
        console.log(err);
    }
}
