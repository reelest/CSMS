import ModelTable from "../ModelTable";
import Courses from "@/models/course";

export default function CoursesTable() {
  return (
    <ModelTable
      Model={Courses}
      addActionTitle="Assign Teacher"
      pluralTitle="Teacher Assignments"
    />
  );
}
