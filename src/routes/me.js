import express from "express";
const router = express.Router();
import * as Me from "../app/controllers/MeController.js";

router.get("/strash/course", Me.TrashCourse);
router.get("/stored/course", Me.StoredCourse);

export default router;
