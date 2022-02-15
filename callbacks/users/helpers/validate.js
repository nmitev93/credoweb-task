const Joi = require("joi");

module.exports = function (data) {
  const schema = Joi.object({
    _id: Joi.string().strip(),
    id: Joi.string().required(),
    email: Joi.string().email(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    type: Joi.string().valid('patient', 'doctor'),
    workplace_id: Joi.string().optional().allow(""),
    created_at: Joi.number().required()
  });

  return schema.validate(data, {abortEarly: false});
}
