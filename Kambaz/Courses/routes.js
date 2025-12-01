import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];

    if (!currentUser) {
      return res.sendStatus(401);
    }

    const created = await dao.createCourse(req.body);

    await enrollmentsDao.enrollUserInCourse(currentUser._id, created._id);

    res.json(created);
  };

  app.post("/api/courses", createCourse);

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  };

  app.get("/api/courses", findAllCourses);

  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.sendStatus(401);
      }
      userId = currentUser._id;
    }

    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  
const findUsersForCourse = async (req, res) => {
  const { cid } = req.params;
  const users = await enrollmentsDao.findUsersForCourse(cid);
  res.json(users);
};

app.get("/api/courses/:cid/users", findUsersForCourse);


  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    res.send(status);
  };

  app.put("/api/courses/:courseId", updateCourse);

  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;

    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);

    res.send(status);
  };

  app.delete("/api/courses/:courseId", deleteCourse);

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return res.sendStatus(401);
      uid = currentUser._id;
    }

    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) return res.sendStatus(401);
      uid = currentUser._id;
    }

    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}

