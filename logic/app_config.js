import "./firebase_config";
import Parents from "@/models/parent";
import { addUserModel } from "@/shared/logic/user_data";
import Students from "@/models/student";
import Admins from "@/models/admin";
import Teachers from "@/models/teacher";
import { setAppLogo } from "@/shared/components/Sidebar";
import AppLogo from "@/components/AppLogo";
addUserModel("parent", Parents);
addUserModel("student", Students);
addUserModel("admin", Admins);
addUserModel("teacher", Teachers);
setAppLogo(
  <AppLogo className="block mx-auto relative right-2 pt-4 pb-8 h-10 mt-8 mb-4 w-100 px-4" />
);
