import { Model } from "./lib/model";
import ClassRooms from "./classroom";
import { getSessions } from "@/logic/session";
import { HiddenField } from "./lib/model_types";
import { CountedItem } from "./lib/counted_item";
import Teachers from "./teacher";
import { Sessions } from "./session";

export class DummyCourse extends CountedItem {
  name = "";
  description = "";
  classId = "";
  teacherId = "";
  hrsPerWeek = 0;
  session = getSessions()?.data?.slice?.(-1)?.[0] ?? "";
}
const DummyCourses = new Model("courses", DummyCourse, {
  name: HiddenField,
  description: {
    stringType: "longtext",
  },
  classId: {
    type: "ref",
    refModel: ClassRooms,
    pickRefQuery: (item) => ClassRooms.withFilter("classId", "==", item.id()),
  },
  teacherId: {
    type: "ref",
    refModel: Teachers,
    pickRefQuery: "teacher",
  },
  session: {
    type: "ref",
    refModel: Sessions,
    pickRefQuery: async function* () {
      yield* getSessions().data;
    },
  },
});
export default DummyCourses;
