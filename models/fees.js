import { CountedModel } from "@/shared/models/lib/counted_model";
import { CountedItem } from "@/shared/models/lib/counted_item";

export class Fee extends CountedItem {
  title = "";
  amount = 0;
  description = "";
  filters = ["class:*"];
}

export const Fees = new CountedModel("fees", Fee);
