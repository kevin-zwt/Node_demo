const { getAllCompaniesWithEmployee, getCompanyById, storeCompany } = require("../services/company.service");
const { withErrorHandling } = require("../utils/try-catch");
const { companyValidation } = require("../validation");

let resJSon;

const store = withErrorHandling(async (req, res) => {
  await companyValidation.companySchema.validate(req.body, {abortEarly: false})  
	const createdCompany = await storeCompany({
    name: req.body.name
  }, req.params.cmpId);
	resJSon = {
		data: createdCompany,
		status: 200,
		message: "Company stored successfully!",
	};
	res.promise(resJSon);
});
const getCompanies = withErrorHandling(async (req, res) => {
  if (req.params.companyId) {
    const getCompany = await getCompanyById(req.params.companyId);
    resJSon = {
      data: getCompany,
      status: 200,
      message: "Data fetched successfully!",
    };
  } else {
    const getAllCompany = await getAllCompaniesWithEmployee();
		resJSon = {
      data: getAllCompany,
      status: 200,
      message: "Data fetched successfully!",
    };
  }
	res.promise(resJSon);
});
module.exports = {
  store,
  getCompanies,
};
