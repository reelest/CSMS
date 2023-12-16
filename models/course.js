import { MODEL_ITEM_PREVIEW } from "@/shared/components/ModelItemPreview";
import AssignedCourses from "./course_assignment";
import { CountedItem } from "@/shared/models/lib/counted_item";
import { CountedModel } from "@/shared/models/lib/counted_model";

export class Course extends CountedItem {
  name = "";
  description = "";
  assignments = [];
  async onUpdateItem(txn, newState, prevState) {
    if (
      this.didUpdate("name", newState, prevState) ||
      this.didUpdate("description", newState, prevState)
    )
      await Promise.all(
        newState.assignments.map(async (e) =>
          AssignedCourses.item(e).set(
            {
              description: newState.description,
              name: newState.name,
            },
            txn
          )
        )
      );
  }
  static {
    this.markTriggersUpdateTxn(["name", "description"], false);
  }
}
const Courses = new CountedModel("courses", Course, {
  [MODEL_ITEM_PREVIEW](item) {
    return {
      title: item.name,
    };
  },
  description: {
    stringType: "longtext",
  },
  assignments: {
    arrayType: {
      type: "ref",
      refModel: null,
      hidden: true,
    },
  },
});

Courses.hasOneOrMore(AssignedCourses, "description", {
  field: "assignments",
  deleteOnRemove: true,
});

export default Courses;
