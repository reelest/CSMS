import { CountedModel } from "./lib/counted_model";
import { CountedItem } from "./lib/counted_item";
import { Class, Country, Gender } from "./lib/model_types";
import { Sessions } from "./session";
import { getCurrentSession } from "@/logic/website_data";
export class Registration extends CountedItem {
  firstName = "";
  lastName = "";
  email = "";
  entranceClass = "";
  gender = "";
  dateOfBirth = new Date();
  stateOfOrigin = "";
  address = "";
  session = getCurrentSession();
  nationality = "";
  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
  getClass() {
    return this.getPropertyLabel("entranceClass");
  }
}
const Registrations = new CountedModel("registrations", Registration, {
  gender: Gender,
  dateOfBirth: {
    type: "date",
  },
  nationality: Country,
  entranceClass: Class,
  session: {
    type: "ref",
    pickRefQuery: true,
    refModel: null,
  },
});
Sessions.hasOneOrMore(Registrations, "session");
export default Registrations;
