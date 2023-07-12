const joi = require('joi')


const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

exports.add_artcate_schema = {
    body: {
        name,
        alias
    }
}

exports.delete_artcate_schema = {
    params: {
        id
    }
}

exports.update_artcate_schema = {
    body: {
        id,
        name,
        alias
    }
}
