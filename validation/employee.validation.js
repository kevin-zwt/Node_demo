const yup = require('yup')

const employeeSchema = yup.object().shape({
  name: yup.string().required('Name Required'),
  designation: yup.string().required('Designation Required'),
  salary: yup.number().required('Salary Required'),
});

module.exports = {
	employeeSchema
}