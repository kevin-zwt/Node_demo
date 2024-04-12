const { Company } = require("../models");

const getAllCompaniesWithEmployee = async () => {
  return await Company.findAll({ include: "employees" });
};

const getCompanyById = async (companyId) => {
  return await Company.findByPk(companyId, {
    include: "employees",
  });
};
const getCompanyByIdWithoutEmployee = async (companyId) => {
  return await Company.findByPk(companyId);
};
const storeCompany = async (data, cmpId = 0) => {
  const companyObj = await (cmpId != 0 ? getCompanyByIdWithoutEmployee(cmpId): new Company());
	companyObj.name = data.name?data.name:null;
	await companyObj.save();
	return companyObj;
};

module.exports = {
  getAllCompaniesWithEmployee,
  getCompanyById,
  getCompanyByIdWithoutEmployee,
	storeCompany
};
