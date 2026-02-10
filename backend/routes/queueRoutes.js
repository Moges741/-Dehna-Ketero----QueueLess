import express from "express";
import {
  getQueueStatus,
  callNextTicket,
  getWaitingCount,
  getEstimatedTime
} from "../controllers/queueControllers.js";
