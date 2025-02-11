import express from "express";
const router = express.Router();
import * as Course from "../app/controllers/CourseController.js";

router.get("/create", Course.Create);
router.post("/store", Course.Store);
router.get("/:id/edit", Course.Edit);
router.post("/handle-form-action", Course.HandleFormAction);
router.post("/handle-form-action-trash", Course.HandleFormActionTrash);
router.put("/:id", Course.Update);
router.patch("/:id/restore", Course.Restore);
router.delete("/:id", Course.Destroy);
router.delete("/:id/force", Course.forceDestroy);
router.get("/:slug", Course.Show);

export default router;
