import express from "express";
import {
  createTicket,
  getMyTickets,
  getTicketsByService,
  updateTicketStatus,
  getSingleTicket
} from "../controllers/ticketControllers.js";

const router = express.Router();
router.post("/", createTicket);
router.get("/my", getMyTickets);
router.get("/service/:serviceId", getTicketsByService);
router.get("/:ticketId", getSingleTicket);
router.patch("/:ticketId/status", updateTicketStatus);

export default router;