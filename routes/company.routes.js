const router = require("express").Router();
const { companyController } = require("../controller");
const { checkPermission } = require("../middleware/authenticate");

router.post("/:cmpId", [checkPermission], companyController.store);
router.get("/:companyId?", [checkPermission], companyController.getCompanies);

module.exports = router;
