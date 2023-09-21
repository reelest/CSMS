import { Model } from "./lib/model";
import ClassRooms from "./classroom";
import { getSessions } from "@/logic/session";
import { HiddenField } from "./lib/model_types";
import { CountedItem } from "./lib/counted_item";
import Teachers from "./teacher";
import { Sessions } from "./session";
import CourseDescriptions from "./course_description";

export class AssignedCourse extends CountedItem {
  name = "";
  description = "";
  classId = "";
  teacherId = "";
  hrsPerWeek = 0;
  session = getSessions()?.data?.slice?.(-1)?.[0] ?? "";
}
const AssignedCourses = new Model("courses", AssignedCourse, {
  name: HiddenField,
  description: {
    type: "ref",
    refModel: CourseDescriptions,
    pickRefQuery: CourseDescriptions.all(),
  },
  classId: {
    type: "ref",
    refModel: ClassRooms,
    pickRefQuery: ClassRooms.all(),
  },
  teacherId: {
    type: "ref",
    refModel: Teachers,
    pickRefQuery: Teachers.all(),
  },
  session: {
    type: "ref",
    refModel: Sessions,
    pickRefQuery: Sessions.all(),
  },
});
export default AssignedCourses;
