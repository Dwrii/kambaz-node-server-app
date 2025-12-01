import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  app.post("/api/enrollments", async (req, res) => {
    const { user, course } = req.body;
    const created = await dao.enrollUserInCourse(user, course);
    res.json(created);
  });

  app.delete("/api/enrollments/:user/:course", async (req, res) => {
    const { user, course } = req.params;
    await dao.unenrollUserFromCourse(user, course);
    res.sendStatus(200);
  });

  app.delete("/api/courses/:cid/enrollments", async (req, res) => {
    const { cid } = req.params;
    await dao.unenrollAllUsersFromCourse(cid);
    res.sendStatus(200);
  });
}
