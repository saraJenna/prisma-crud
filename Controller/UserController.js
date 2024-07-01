import prisma from "../DB /db.config.js";
export const fetchUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        _count: {
          select: {
            post: true,
            comment: true,
            courses: true,
          },
        },
      },
    });
    return res.status(200).json({ data: users });
  } catch {
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const showUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });
    return res.status(200).json({ data: user });
  } catch {
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (findUser) {
      return res.status(400).json({ Message: "email already taken" });
    }
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    return res.status(200).json({ data: newUser, msg: "user is created" });
  } catch {
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(200).json({ message: "user is updated" });
  } catch {
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
    return res.status(200).json({ message: "user deleted successfully" });
  } catch {
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const associateUserWithCourse = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const courseId = parseInt(req.params.course_id);
   
    // Create the association
    const newUserCourse = await prisma.userCourse.create({
      data: {
        user_id: userId,
        course_id: courseId,
      },
    });
    // fetch data in user-COURSE
    // catch (error) {
    //   console.error("Error associating course with user:", error);
    //   return res.status(500).json({ error: "Internal server error" });
    // }
    return res
      .status(201)
      .json({
        message: "Course associated with user successfully",
        data: newUserCourse,
      });
  } catch {
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const fetchUserCourses = async (req, res) => {
  try {
    const userCourse = await prisma.userCourse.findMany({});
    console.log(userCourse);
    return res.status(200).json({ data: userCourse });
  } catch {
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const showUserCourse = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const course = parseInt(req.params.course_id);
    await prisma.userCourse.findFirst({
      where: {
        user_id: userId,
        course_id: course,
      },
    });
    return res
      .status(200)
      .json({ message: "user is associated with this course ID" });
  } catch {
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
export const deleteUserCourses = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id);
    const courseId = parseInt(req.params.course_id);
    await prisma.userCourse.delete({
      where: {
        course_id_user_id: {
          user_id: userId,
          course_id: courseId,
        },
      },
    });
    return res
      .status(200)
      .json({ message: "user association with client is deleted" });
  } catch {
    return res.status(500).json({ message: "Internal Server Errors" });
  }
};
