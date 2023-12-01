import AssignedCourses from "./course_assignment";
import { CountedModel } from "./lib/counted_model";
import { UserMeta, UserData } from "./user_data";

export class Teacher extends UserData {
  classId = [];
  getRole() {
    return "teacher";
  }
}
const Teachers = new CountedModel("teachers", Teacher, {
  ...UserMeta,
  classId: {
    arrayType: {
      type: "ref",
      pickRefQuery: true,
      refModel: null,
    },
  },
});
Teachers.hasOneOrMore(AssignedCourses, "teacherId");
export default Teachers;
