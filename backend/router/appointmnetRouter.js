import express from "express"
import {deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus} from "../controller/appointmentController.js"
import {isAdminAuthenticated, isAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();


router.post("/post",isAuthenticated, postAppointment);
router.get("/getall",isAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;