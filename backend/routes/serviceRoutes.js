import express from "express";
import {
  createService,
  getAllServices,
  getServicesByOffice,
  getSingleService,
  updateService,
  updateServiceStatus
} from "../controllers/serviceControllers.js";

const router = express.Router();

// Create Service (Admin / Manager)
router.post("/", createService);
router.get("/", getAllServices);
router.get("/office/:officeId", getServicesByOffice);
router.get("/:serviceId", getSingleService);
router.put("/:serviceId", updateService);
router.patch("/:serviceId/status", updateServiceStatus);

export default router;
