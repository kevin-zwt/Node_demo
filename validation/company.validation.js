const yup = require("yup");

const companySchema = yup.object().shape({
  name: yup.string().required('Name Required')
});
module.exports = {
  companySchema,
};
