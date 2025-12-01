import model from "./model.js";

export default function AssignmentsDao() {
  function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  function createAssignment(assignment) {
    return model.create(assignment);
  }

  function updateAssignment(assignmentId, updates) {
    return model.updateOne({ _id: assignmentId }, { $set: updates });
  }

  function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
