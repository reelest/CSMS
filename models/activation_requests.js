import { getUser } from "@/shared/logic/auth";
import { CountedModel } from "@/shared/models/lib/counted_model";
import { Item } from "@/shared/models/lib/model";
import { HiddenField } from "@/shared/models/model_types";

export class ActivationRequest extends Item {
  name = getUser()?.displayName ?? "";
  uid = getUser()?.uid ?? "";
  email = getUser()?.email ?? "";
  role = "";
  dateCreated = new Date();
}
const ActivationRequests = new CountedModel(
  "activation_requests",
  ActivationRequest,
  {
    role: {
      options: [
        { value: "admin", label: "Administrator" },
        { value: "student", label: "Student" },
        { value: "teacher", label: "Teacher" },
      ],
    },
    uid: HiddenField,
    email: HiddenField,
    dateCreated: HiddenField,
  }
);
export default ActivationRequests;
