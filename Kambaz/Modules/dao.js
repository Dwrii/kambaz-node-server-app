import { v4 as uuidv4 } from "uuid";
import CoursesModel from "../Courses/model.js";

export default function ModulesDao(db) {
  async function findModulesForCourse(courseId) {
    const course = await CoursesModel.findById(courseId);
    return course?.modules || [];
  }

  async function createModule(courseId, module) {
    const newModule = { ...module, _id: uuidv4() };

    await CoursesModel.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );

    return newModule;
  }

  async function deleteModule(courseId, moduleId) {
    const status = await CoursesModel.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
    return status;
  }

  async function updateModule(courseId, moduleId, moduleUpdates) {

    const course = await CoursesModel.findById(courseId);
    if (!course) {
      return null;
    }
    const module = course.modules.id(moduleId);
    if (!module) {
      return null;
    }
    Object.assign(module, moduleUpdates);
    await course.save();
    return module;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
