import express from "express";
import {
  createTicket,
  getMyTickets,
  getTicketsByService,
  updateTicketStatus,
  getSingleTicket
} from "../controllers/ticketControllers.js";

const router = express.Router();
