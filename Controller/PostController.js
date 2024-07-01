import prisma from "../DB /db.config.js";
export const fetchPosts = async (req, res) => {
 try{ const posts = await prisma.post.findMany({});
  return res.status(200).json({ data: posts });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};
export const showPost = async (req, res) => {
  try{
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });
  return res.status(200).json({  data: post });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};
export const createPost = async (req, res) => {
  try{
    const { user_id, title, description } = req.body;
  
    const newPost = await prisma.post.create({
      data: {
        user_id: Number(user_id),
        title,
        description,
      },
    });

    console.log(newPost);

    const response = {
        ...newPost,
        comment_count: newPost.comment_count.toString()
    }
  
    return res.status(200).json({ data: newPost, msg: "Post created." });}
    catch{
      return res.status(500).json({message:"Internal Server Errors"});
     }
  };
  
export const updatepost = async (req, res) => {
  try{
  const postId = req.params.id;
  const { title, description } = req.body;
  await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      title,
      description,
    },
  });
  return res.status(200).json({  message: "post is updated" });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};
export const deletePost = async (req, res) => {
 try{ const postId = req.params.id;
  const post = await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
  return res.status(200).json({ message: "Post deleted successfully" });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};
