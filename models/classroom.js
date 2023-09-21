import { MODEL_ITEM_PREVIEW } from "@/components/ModelItemPreview";
import Admins, { Admin } from "./admin";
import Courses from "./course";
import { Model, Item } from "./lib/model";
import Students from "./student";
import Teachers from "./teacher";

export class ClassRoom extends Item {
  name = "";
  branch = "";
  session = "";
  formTeacher = "";
  teachers() {
    return Teachers.withFilter("classId", "array-contains", this.id());
  }
  subjects() {
    return Courses.withFilter("classId", "==", this.id());
  }
  students() {
    return Students.withFilter("classId", "array-contains", this.id());
  }
}
const ClassRooms = new Model("classes", ClassRoom, {
  [MODEL_ITEM_PREVIEW](item) {
    return {
      title: item.name + " " + item.branch,
    };
  },
  formTeacher: {
    type: "ref",
    refModel: Admins,
    pickRefQuery: Admins.all(),
  },
});
export default ClassRooms;
