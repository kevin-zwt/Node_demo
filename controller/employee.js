const { storeEmployee , getEmployeeWithCompanyDetail, getAllEmployeeWithCompanyDetail} = require("../services/employee.service");
const { withErrorHandling } = require("../utils/try-catch");
const { employeeValidation } = require("../validation");

let resJSon;

const store = withErrorHandling(async (req, res) => {
  await employeeValidation.employeeSchema.validate(req.body, {
    abortEarly: false,
  });

  const employeeCreated = await storeEmployee(
    {
      name: req.body.name,
      designation: req.body.designation,
      salary: req.body.salary,
      companyId: req.body.companyId,
    },
    req.params.empId
  );
  resJSon = {
    data: employeeCreated,
    status: 200,
    message: "Employee stored successfully!",
  };
  res.promise(resJSon);
});

const getEmployees = withErrorHandling(async (req, res) => {
  if (req.params.empId) {
    const getEmployee = await getEmployeeWithCompanyDetail(req.params.empId);
    resJSon = {
      data: getEmployee,
      status: 200,
      message: "Data fetched successfully!",
    };
  } else {
    const getAllEmployee = await getAllEmployeeWithCompanyDetail();
		resJSon = {
      data: getAllEmployee,
      status: 200,
      message: "Data fetched successfully!",
    };
  }
	res.promise(resJSon);
});

module.exports = {
  store,
	getEmployees
};
