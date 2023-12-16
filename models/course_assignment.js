import { Model } from "@/shared/models/lib/model";
import { CountedItem } from "@/shared/models/lib/counted_item";

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
