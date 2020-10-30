const Joi = require("joi");
const { schema } = require("../models/admin");

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

const teacherValidation = (data) => {
    const schema = Joi.object({
        school_id: Joi.string().required(),
        name: Joi.string().min(3).required(),
        gender: Joi.string().required(),
        age: Joi.number().min(2).required(),
        classes: Joi.array()
    })
    return schema.validate(data);
}

module.exports = { registerValidation, loginValidation, teacherValidation }