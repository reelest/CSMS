import { MODEL_ITEM_PREVIEW } from "@/components/ModelItemPreview";
import AssignedCourses from "./assigned_course";
import { CountedItem } from "./lib/counted_item";
import { CountedModel } from "./lib/counted_model";

export class CourseDescription extends CountedItem {
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
const CourseDescriptions = new CountedModel(
  "course_descriptions",
  CourseDescription,
  {
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
  }
);

CourseDescriptions.hasOneOrMore(AssignedCourses, "description", {
  field: "assignments",
  deleteOnRemove: true,
});

export default CourseDescriptions;
