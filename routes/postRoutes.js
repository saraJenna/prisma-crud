import { Router } from "express";
import { createPost,updatepost,fetchPosts,showPost,deletePost } from "../Controller/PostController.js";
const router=Router();

//routers for post controller 
router.post("/",createPost);
router.get("/:id",showPost);
router.get("/",fetchPosts);
router.put("/:id",updatepost);
router.delete("/:id",deletePost);
export default router;
