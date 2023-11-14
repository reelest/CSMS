import { Model, Item } from "./lib/model";

export class Event extends Item {
  date = new Date();
  title = "Untitled";
  forTeachers = true;
  forParents = true;
  forStudents = true;
  forAdmins = true;
  static {
    Object.defineProperty(this.prototype, "scope", {
      get() {
        return {
          teachers: this.forTeachers,
          parents: this.forParents,
          students: this.forStudents,
          admins: this.forAdmins,
        };
      },
    });
  }
}

const Events = new Model("events", Event, {
  forParents: {
    label: "Parents",
  },
  forTeachers: {
    label: "Teachers",
  },
  forStudents: {
    label: "Students",
  },
  forAdmins: {
    label: "Admins",
  },
});
export default Events;
