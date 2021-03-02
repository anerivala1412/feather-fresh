import * as authentication from "@feathersjs/authentication";
// Don't remove this comment. It's needed to format import lines nicely.
const Joi = require("@hapi/joi");
const validate = require("@feathers-plus/validate-joi");

const name = Joi.string()
  .trim()
  .min(5)
  .max(30)
  .regex(/^[\sa-zA-Z0-9]$/, "letters, numbers and spaces")
  .required();
const password = Joi.string().trim().min(2).max(30).required();
const schema = Joi.object().keys({
  name: name,
  password,
  confirmPassword: password.label("Confirm password"),
});
const joiOptions = { convert: true, abortEarly: false };

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [validate.mongoose(schema, joiOptions)],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
