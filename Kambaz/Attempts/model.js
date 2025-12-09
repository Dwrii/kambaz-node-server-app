import mongoose from "mongoose";

const attemptsSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    student: {
      type: String,     
      required: true,
      ref: "User",       
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    answers: {
      type: Object,
      default: {},
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "quizAttempts" }
);

export default mongoose.model("Attempts", attemptsSchema);
