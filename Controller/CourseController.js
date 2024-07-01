import prisma from "../DB /db.config.js";
export const fetchCourses = async (req, res) => {
  try{
  const courses = await prisma.course.findMany();
  return res.status(200).json({  data: courses });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};

export const showCourse = async (req, res) => {
  try{
  const courseId = req.params.id;
  const course = await prisma.course.findUnique({
    where: {
      id: Number(courseId),
    },
  });
  return res.status(200).json({data: course });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};

export const createCourse = async (req, res) => {
  try{
  const { course_name } = req.body;
  const newCourse = await prisma.course.create({
    data: {
      course_name,
    },
  });
  return res.status(200).json({ data: newCourse, message: "Course created successfully" });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};

export const updateCourse = async (req, res) => {
  try{
  const courseId = req.params.id;
  const { name } = req.body;
  await prisma.course.update({
    where: {
      id: Number(courseId),
    },
    data: {
      name,
    },
  });
  return res.status(200).json({ status: 200, message: "Course updated successfully" });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};

export const deleteCourse = async (req, res) => {
  try{
  const courseId = req.params.id;
  await prisma.course.delete({
    where: {
      id: Number(courseId),
    },
  });
  return res.status(200).json({ message: "Course deleted successfully" });}
  catch{
    return res.status(500).json({message:"Internal Server Errors"});
   }
};
