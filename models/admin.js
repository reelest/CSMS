import { CountedModel } from "@/shared/models/lib/counted_model";
import { UserMeta, UserData } from "@/shared/models/user_data";

export class Admin extends UserData {
  getRole() {
    return "admin";
  }
}
const Admins = new CountedModel("administrators", Admin, {
  ...UserMeta,
});
export default Admins;
