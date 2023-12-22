import { Model } from "@/shared/models/lib/model";
import { CountedItem } from "@/shared/models/lib/counted_item";
import { Sessions, sessionId } from "./session";
import ClassRooms from "./classroom";
import { getSelectedSession } from "@/components/SessionSelect";
import Teachers from "./teacher";

export class AssignedCourse extends CountedItem {
  teacherId = "";
  description = "";
  classId = "";
  session = sessionId(getSelectedSession() ?? "");
  hrsPerWeek = 0;
}
const AssignedCourses = new Model("courses", AssignedCourse, {
  description: {
    type: "ref",
    refModel: null,
    pickRefQuery: true,
    label: "Course Title",
  },
  classId: {
    type: "ref",
    refModel: null,
    pickRefQuery(data) {
      return ClassRooms.withFilter("session", "==", data.session).iterator(0);
    },
  },
  session: {
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
ClassRooms.hasOneOrMore(AssignedCourses, "classId");
Teachers.hasOneOrMore(AssignedCourses, "teacherId");
Sessions.hasOneOrMore(AssignedCourses, "session");
import("./course");
export default AssignedCourses;
