import { Router } from "express";
import {
  createUser,
  updateUser,
  fetchUsers,
  showUser,
  deleteUser,
  associateUserWithCourse,
  fetchUserCourses,
  showUserCourse,
  deleteUserCourses,
} from "../Controller/UserController.js";
const router = Router();

router.get("/course", fetchUserCourses);
router.get("/:user_id/courses/:course_id", showUserCourse);
router.delete("/:user_id/courses/:course_id", deleteUserCourses);
router.get("/:id", showUser);
router.get("/", fetchUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
// Route for associating a course with a user
router.post("/:user_id/courses/:course_id", associateUserWithCourse);

export default router;
