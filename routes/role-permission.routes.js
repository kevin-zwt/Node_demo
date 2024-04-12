const router = require("express").Router();
const { rolePermissionController } = require("../controller");

router.get("/role-detail/:roleId?", rolePermissionController.getRole);
router.post("/save-role/:roleId?", rolePermissionController.saveRole);
router.delete("/remove-role/:roleId", rolePermissionController.removeRole);

router.get("/permission-detail/:permissionId?", rolePermissionController.getPermission);
router.post("/save-permission/:permissionId?", rolePermissionController.savePermission);
router.delete("/remove-permission/:permissionId", rolePermissionController.removePermission);

router.post("/assign-role-to-user", rolePermissionController.assignRoleToUser);
router.post("/revoke-role-to-user", rolePermissionController.revokeRoleToUser);

router.post("/assign-permission-to-role", rolePermissionController.assignPermissionToRole);
router.post("/revoke-permission-to-role", rolePermissionController.revokePermissionToRole);

module.exports = router;