import express from "express";
import {
  createOffice,
  getAllOffices,
  getOfficeById,
  updateOffice,
  toggleOfficeStatus
} from "../controllers/officeControllers.js";

const router = express.Router();
router.post("/", createOffice);
router.get("/", getAllOffices);
router.get("/:id", getOfficeById);
router.put("/:id", updateOffice);
// Activate / Deactivate office ( delete)
router.patch("/:id/status", toggleOfficeStatus);

export default router;
