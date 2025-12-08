import * as quizDao from "./dao.js";
import * as attemptsDao from "../Attempts/dao.js";

export default function QuizRoutes(app) {

  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quiz = await quizDao.createQuiz(courseId);
    res.json(quiz);
  });

  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const user = req.session["currentUser"];

    let quizzes = await quizDao.findQuizzesForCourse(courseId);

    quizzes = quizzes.map((q) => {
      const obj = q.toObject();
      obj.published = Boolean(obj.published);
      return obj;
    });

    const isTeacher =
      user?.role === "ADMIN" ||
      user?.role === "FACULTY" ||
      user?.role === "TA";

    if (isTeacher) {
      return res.json(quizzes);
    }

    const isStudent = !isTeacher;

    if (isStudent) {
      const visibleQuizzes = await Promise.all(
        quizzes
          .filter((q) => q.published === true)
          .map(async (quiz) => {
            if (!user) return quiz;

            const attempts = await attemptsDao.findAttemptsForQuizByUser(
              quiz._id,
              user._id
            );

            const score =
              attempts.length > 0 ? attempts[attempts.length - 1].score : null;

            return { ...quiz, score };
          })
      );

      return res.json(visibleQuizzes);
    }

    res.json(quizzes);
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    const user = req.session["currentUser"];
    const quiz = await quizDao.findQuizById(req.params.quizId);

    if (!quiz) return res.sendStatus(404);

    const isTeacher =
      user?.role === "ADMIN" ||
      user?.role === "FACULTY" ||
      user?.role === "TA";

    if (isTeacher) return res.json(quiz);

    if (quiz.published === true) return res.json(quiz);

    return res.status(403).json({ message: "Quiz not available" });
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const updated = await quizDao.updateQuiz(req.params.quizId, req.body);
    res.json(updated);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const deleted = await quizDao.deleteQuiz(req.params.quizId);
    res.json(deleted);
  });
}
