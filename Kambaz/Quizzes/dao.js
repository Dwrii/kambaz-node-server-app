import QuizModel from "./model.js";

export const createQuiz = (courseId) =>
  QuizModel.create({ 
    course: courseId,
    published: false 
  });

export const findQuizzesForCourse = (courseId) =>
  QuizModel.find({ course: courseId });

export const findQuizById = (quizId) =>
  QuizModel.findById(quizId);

export const updateQuiz = (quizId, quiz) =>
  QuizModel.findByIdAndUpdate(quizId, quiz, { new: true });

export const deleteQuiz = (quizId) =>
  QuizModel.findByIdAndDelete(quizId);

export default {
  createQuiz,
  findQuizzesForCourse,
  findQuizById,
  updateQuiz,
  deleteQuiz,
};
