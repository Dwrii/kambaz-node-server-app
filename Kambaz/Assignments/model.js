import mongoose from "mongoose";
import assignmentSchema from "./schema.js";

const assignmentModel = mongoose.model("assignments", assignmentSchema);

export default assignmentModel;
