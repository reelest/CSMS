import { Item, Model, USES_EXACT_IDS } from "@/shared/models/lib/model";
import { Sessions } from "./session";

export class WebsiteData extends Item {
  currentSession = "";
  description =
    "This should contain a description of the entire website in 100 to 300 words.";
  address = "University of Benin, Benin-City, Edo State";
  phone1Label = "Contact Number";
  phone1 = "+2348157004401";
  phone2Label = "";
  phone2 = "";
  email = "rowendduke36@gmail.com";
  linkedInURL = "";
  facebookURL = "";
  twitterURL = "";
}

export const WebsiteDataModel = new Model("website_data", WebsiteData, {
  [USES_EXACT_IDS]: true,
  currentSession: {
    type: "ref",
    refModel: Sessions,
    pickRefQuery: true,
  },
  description: {
    stringType: "longtext",
  },
  phone1Label: {
    required: false,
  },
  phone1: {
    required: false,
  },
  phone2Label: {
    required: false,
  },
  phone2: {
    required: false,
  },
  linkedInURL: {
    required: false,
  },
  facebookURL: {
    required: false,
  },
  twitterURL: {
    required: false,
  },
});
