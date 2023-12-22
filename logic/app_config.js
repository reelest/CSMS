import Parents from "@/models/parent";
import { addUserModel } from "@/shared/logic/user_data";
import Students from "@/models/student";
import Admins from "@/models/admin";
import Teachers from "@/models/teacher";
addUserModel("parent", Parents);
addUserModel("student", Students);
addUserModel("admin", Admins);
addUserModel("teacher", Teachers);
