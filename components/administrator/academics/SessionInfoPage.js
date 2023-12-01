import ClassesTable from "./ClassesTable";
import CoursesTable from "./CoursesTable";
import SessionsTable from "./SessionsTable";

export default function SessionInfoPage() {
  return (
    <>
      <SessionsTable />
      <CoursesTable />
      <ClassesTable />
    </>
  );
}
