import { Model } from "./lib/model";
import ClassRooms from "./classroom";
import { CountedItem } from "./lib/counted_item";
import Teachers from "./teacher";

export class AssignedCourse extends CountedItem {
  description = "";
  classId = "";
  teacherId = "";
  hrsPerWeek = 0;
}
const AssignedCourses = new Model("courses", AssignedCourse, {
  description: {
    type: "ref",
    refModel: null,
    pickRefQuery: true,
  },
  classId: {
    type: "ref",
    refModel: ClassRooms,
    pickRefQuery: true,
  },
  teacherId: {
    type: "ref",
    refModel: Teachers,
    pickRefQuery: true,
  },
});
export default AssignedCourses;
