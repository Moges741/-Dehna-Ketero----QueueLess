import express from "express";
import {
  getQueueStatus,
  callNextTicket,
  getWaitingCount,
  getEstimatedTime
} from "../controllers/queueControllers.js";
const router = express.Router();
// Queue Status
router.get("/status/:serviceId", getQueueStatus);
// Call Next Ticket (Staff)
router.post("/call-next", callNextTicket);
// Waiting Count
router.get("/waiting-count/:serviceId", getWaitingCount);
// Estimate Waiting Time
router.get("/estimate/:serviceId", getEstimatedTime);
export default router;