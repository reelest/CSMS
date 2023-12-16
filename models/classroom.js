import { MODEL_ITEM_PREVIEW } from "@/shared/components/ModelItemPreview";
import Admins, { Admin } from "./admin";
import { Model, Item } from "@/shared/models/lib/model";
import Students from "./student";
import Teachers from "./teacher";
import { Sessions } from "./session";
import { CountedItem } from "@/shared/models/lib/counted_item";
import { CountedModel } from "@/shared/models/lib/counted_model";
import AssignedCourses from "./course_assignment";
import { getCurrentSession } from "@/logic/website_data";

export class ClassRoom extends CountedItem {
  name = "";
  branch = "";
  session = getCurrentSession();
  formTeacher = "";
  isMajor = true;
  teachers() {
    return Teachers.withFilter("classId", "array-contains", this.id());
  }
  subjects() {
    return AssignedCourses.withFilter("classId", "==", this.id());
  }
  students() {
    return Students.withFilter("classId", "array-contains", this.id());
  }
}
const ClassRooms = new CountedModel("classes", ClassRoom, {
  [MODEL_ITEM_PREVIEW](item) {
    return {
      title: item.name + " " + item.branch,
    };
  },
  session: {
    type: "ref",
    refModel: null,
    pickRefQuery: true,
  },
  formTeacher: {
    type: "ref",
    refModel: null,
    pickRefQuery: true,
  },
});
ClassRooms.hasOneOrMore(Students, "classId");
ClassRooms.hasOneOrMore(Teachers, "classId");
Teachers.hasOneOrMore(ClassRooms, "formTeacher");
Sessions.hasOneOrMore(ClassRooms, "session");
ClassRooms.hasOneOrMore(AssignedCourses, "classId");
export default ClassRooms;
