import { Router } from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
import courseRoutes from "./courseRoutes.js"
import commentRoutes from "./commentRoutes.js"
const router=Router()
router.use("/api/user",userRoutes);
router.use("/api/post",postRoutes);
router.use("/api/comment",commentRoutes);
router.use("/api/courses", courseRoutes);
export default router;