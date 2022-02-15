const Joi = require("joi");

module.exports = function (data) {
  const schema = Joi.object({
    _id: Joi.string().strip(),
    id: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(data, {abortEarly: false});
}
