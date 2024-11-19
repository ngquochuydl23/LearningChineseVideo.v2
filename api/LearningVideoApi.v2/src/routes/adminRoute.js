const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {
  authMiddleware,
} = require("../middlewares/authMiddleware");
const {
  teacherAuthorizationMiddleware,
} = require("../middlewares/authorizationMiddleware");
router.post(
  "/approve-user/:userId",
  authMiddleware,
  adminController.approveUser
);
router.post(
  "/request-admin/:userId",
  authMiddleware,
  adminController.requestAdmin
);
router.post(
  "/reject-user/:userId",
  authMiddleware,
  adminController.rejectAdmin
);
router.post(
  "/reject-teacher/:teacherId",
  authMiddleware,
  adminController.rejectTeacher
);
router.post(
  "/approve-teacher/:teacherId",
  authMiddleware,
  adminController.approveTeacher
);
router.get(
  "/get-all-admin",
  authMiddleware,
  adminController.getAdmins
);
router.get(
  "/get-all-user-not-admin",
  authMiddleware,
  adminController.getUserNotAdmin
);
router.get(
  "/get-all-teacher",
  authMiddleware,
  adminController.getTeachers
);
router.get(
  "/get-all-user",
  authMiddleware,
  adminController.getUsers
);

module.exports = router;
