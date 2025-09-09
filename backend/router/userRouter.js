import express from "express"
import { addNewAdmin, patientRegister, login, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor } from "../controller/userController.js";
import { isAuthenticated, isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", logoutAdmin);
router.get("/patient/logout", logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);

export default router;