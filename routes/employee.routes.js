const router = require('express').Router();
const { employeeController } = require("../controller");
const { checkPermission } = require('../middleware/authenticate');

router.post("/:empId", [checkPermission], employeeController.store);
router.get("/:empId?", [checkPermission], employeeController.getEmployees)

module.exports = router;
