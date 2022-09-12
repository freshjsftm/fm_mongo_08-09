const yup = require("yup");

module.exports.emailSchema = yup.string().email("Incorrect email");

module.exports.contentSchema = yup
  .string()
  .matches(/^[a-z0-9\s]{5,255}$/i)
  .required("Content is required");
