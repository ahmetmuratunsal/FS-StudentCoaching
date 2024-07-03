import express from "express";

import protect from "../middlewares/protect.js";
import {
  createMeeting,
  deleteMeeting,
  getAllMeetings,
  getOneMeeting,
  updateMeeting,
} from "../controllers/meeting.controller.js";

const router = express.Router();

router.get("/", protect, getAllMeetings);
router.get("/:id", protect, getOneMeeting);
router.post("/", protect, createMeeting);
router.patch("/:id", protect, updateMeeting);
router.delete("/:id", protect, deleteMeeting);

export default router;
