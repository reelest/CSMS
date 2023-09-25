import { CountedModel } from "./lib/counted_model";
import { CountedItem } from "./lib/counted_item";
import UpdateValue from "./lib/update_value";
import { USES_EXACT_IDS } from "./lib/model";
import { MODEL_ITEM_PREVIEW } from "@/components/ModelItemPreview";
//A clone of the firebase authentication model is stored in firestore
//in order to manage users with the uid as the key
//Deleting users makes use of the firebase admin sdk

export class Session extends CountedItem {
  name = "";
  description = "";
  dateCreated = new Date();
  async onDeleteItem(txn, prevState) {
    await super.onDeleteItem(txn, prevState);
    return this.getCounter().set(
      {
        sessions: UpdateValue.arrayRemove(this.name),
      },
      txn
    );
  }
  async onAddItem(txn, newState) {
    await super.onAddItem(txn, newState);
    this.getCounter().set(
      {
        sessions: UpdateValue.arrayUnion(this.name),
      },
      txn
    );
  }
}

class SessionModel extends CountedModel {
  async initCounter(item) {
    item.sessions = UpdateValue.arrayUnion();
  }
}
export const Sessions = new SessionModel("sessions", Session, {
  [USES_EXACT_IDS]: true,
  [MODEL_ITEM_PREVIEW](item) {
    return { title: item.name };
  },
  description: {
    stringType: "longtext",
  },
});
