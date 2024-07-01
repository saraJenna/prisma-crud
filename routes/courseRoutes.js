import { Router } from "express";
import {
  createCourse,
  updateCourse,
  fetchCourses,
  showCourse,
  deleteCourse,
} from "../Controller/CourseController.js";

const router = Router();

router.post("/", createCourse);
router.get("/:id", showCourse);
router.get("/", fetchCourses);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;