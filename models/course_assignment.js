import { Model } from "./lib/model";
import { CountedItem } from "./lib/counted_item";

export class AssignedCourse extends CountedItem {
  teacherId = "";
  description = "";
  classId = "";
  hrsPerWeek = 0;
}
const AssignedCourses = new Model("courses", AssignedCourse, {
  description: {
    type: "ref",
    refModel: null,
    pickRefQuery: true,
    label: "Course",
  },
  classId: {
    type: "ref",
    refModel: null,
    pickRefQuery: true,
  },
  teacherId: {
    type: "ref",
    refModel: null,
    pickRefQuery: true,
  },
});
import("./course");
export default AssignedCourses;
