import { CountedModel } from "@/shared/models/lib/counted_model";
import { CountedItem } from "@/shared/models/lib/counted_item";
import UpdateValue from "@/shared/models/lib/update_value";
import { USES_EXACT_IDS } from "@/shared/models/lib/model";
import { MODEL_ITEM_PREVIEW } from "@/shared/components/ModelItemPreview";
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

export const sessionId = (id) => id.replace(/\//g, "^");
export const Sessions = new SessionModel("sessions", Session, {
  [USES_EXACT_IDS]: true,
  [MODEL_ITEM_PREVIEW](item) {
    return { title: item.name };
  },
  description: {
    stringType: "longtext",
  },
});
