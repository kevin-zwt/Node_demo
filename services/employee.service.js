const { Employee } = require("../models");

const getEmployee = async (empId) => {
  return await Employee.findByPk(empId);
};

const getEmployeeWithCompanyDetail = async (empId) => {
  return await Employee.findByPk(empId, {
    include: "companyDetails",
  });
};

const getAllEmployeeWithCompanyDetail = async () => {
  return await Employee.findAll({ include: "companyDetails" });
};

const getAllEmployeeWithOutCompanyDetail = async () => {
  return await Employee.findAll();
};

const storeEmployee = async (data, empId = 0) => {
  const employeeObj = await (empId != 0 ? getEmployee(empId) : new Employee());
  employeeObj.name = data.name ? data.name : employeeObj.name;
  employeeObj.designation = data.designation
    ? data.designation
    : employeeObj.designation;
  employeeObj.salary = data.salary ? data.salary : employeeObj.salary;
  employeeObj.companyId = data.companyId
    ? data.companyId
    : employeeObj.companyId;
  await employeeObj.save();
  return employeeObj;
};

module.exports = {
  getEmployee,
  storeEmployee,
  getEmployeeWithCompanyDetail,
  getAllEmployeeWithCompanyDetail,
  getAllEmployeeWithOutCompanyDetail,
};
