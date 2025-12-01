import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    points: { type: Number, default: 100 },
    dueDate: Date,
    availableFrom: Date,
    availableUntil: Date,
    course: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
