import attemptsModel from "./model.js";

export const findAttemptsForQuizByUser = (quizId, userId) =>
  attemptsModel.find({ quiz: quizId, student: userId }).sort({ submittedAt: 1 });

export default {
  findAttemptsForQuizByUser
};
