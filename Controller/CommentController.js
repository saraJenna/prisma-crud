import prisma from "../DB /db.config.js";
export const fetchComments = async (req, res) => {
  try{
  const comments = await prisma.comment.findMany({});
  return res.status(200).json({ data: comments });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};
export const showComment = async (req, res) => {
  try{const commentId = req.params.id;
  const comment = await prisma.comment.findFirst({
    where: {
      id: (commentId),
    },
  });
  return res.status(200).json({ data: comment });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};
export const createcomment = async (req, res) => {
  try{
    const { user_id, post_id, comment } = req.body;
   //   * Increase the comment counter
   await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

    const newcomment = await prisma.comment.create({
      data: {
        user_id: Number(user_id),
    post_id:Number(post_id),
        comment,
      },
    });

   // console.log(newPost);
    // const response = {
    //     ...newPost,
    //     comment_count: newPost.comment_count.toString()
    // }
  
    return res.status(200).json({  data: newcomment, msg: "Comment created successfully." });}
    catch{
      return res.status(500).json({message:"Internal Server Errors"});
     }
  };
  
export const updatecomment = async (req, res) => {
  try{
  const commentId = req.params.id;
  const { comment } = req.body;
  await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
        comment,
    },
  });
  return res.status(200).json({ message: "comment is updated" });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};

export const deleteComment = async (req, res) => {
  try{
    const comment_Id = req.params.id;
    const comment = await prisma.comment.findFirst({
        where:{
            id:comment_Id,
        }
    })
    console.log(comment);
    //   * Increase the comment counter
    await prisma.post.update({
      where: {
        id: Number(comment.post_id),
      },
      data: {
        comment_count: {
          decrement: 1,
        },
      },
    });
 
    await prisma.comment.delete({
        where: {
            id: comment_Id
        }
    });
    return res.status(200).json({ msg: "Post deleted successfully" });}
    catch{
      return res.status(500).json({message:"Internal Server Errors"});
     }
  };