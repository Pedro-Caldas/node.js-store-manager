const joi = require('joi');

const saleSchema = joi.object().keys({
  productId: joi.number().required().positive().integer()
    .messages({
      'any.required': '400|"productId" is required',
    }),
  quantity: joi.number().min(1).required().integer()
    .messages({
      'any.required': '400|"quantity" is required',
      'number.min': '422|"quantity" must be greater than or equal to 1',
    }),
});

const arraySchema = joi.array().items(saleSchema);

module.exports = arraySchema;