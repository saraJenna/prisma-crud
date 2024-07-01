import { Router } from "express";
import{createcomment,showComment,fetchComments,deleteComment, updatecomment}from "../Controller/CommentController.js"
const router=Router();
router.post("/",createcomment);
router.get("/:id",showComment);
router.get("/",fetchComments);
router.put("/:id",updatecomment);
router.delete("/:id",deleteComment);

export default router;
