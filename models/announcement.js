import { Model, Item } from "@/shared/models/lib/model";

export class Announcement extends Item {}
const Announcements = new Model("annoucements", Announcement);
export default Announcements;
