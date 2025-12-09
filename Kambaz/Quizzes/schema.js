import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    text: String,
    type: String,
    points: Number,
    correctAnswer: String,
    choices: { type: [String], default: [] },
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    course: { type: String, required: true },

    title: { type: String, default: "New Quiz" },
    description: { type: String, default: "" },

    published: { type: Boolean, default: false },

    availableDate: { type: Date, default: null },
    untilDate: { type: Date, default: null },
    dueDate: { type: Date, default: null },

    points: { type: Number, default: 0 },
    numQuestions: { type: Number, default: 0 },

    quizType: { type: String, default: "GRADED" },

    assignmentGroup: { type: String, default: "QUIZZES" },

    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 0 },           
    multipleAttempts: { type: Boolean, default: false },
    attemptsAllowed: { type: Number, default: 1 },

    showCorrectAnswers: { type: String, default: "Immediately" },
    accessCode: { type: String, default: "" },

    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockAfterAnswering: { type: Boolean, default: false },

    questions: {
      type: [QuestionSchema],
      default: [],
    },
  },
  { collection: "quizzes" }
);

export default QuizSchema;
