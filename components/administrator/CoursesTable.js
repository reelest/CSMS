import { useMemo } from "react";
import ModelTable from "../ModelTable";
import Courses from "@/models/course";
import { sessionId } from "@/models/session";
import { useSelectedSession } from "../SessionSelect";

export default function CoursesTable() {
  const currentSession = useSelectedSession();
  const query = useMemo(
    () =>
      currentSession
        ? Courses.withFilter("session", "==", sessionId(currentSession))
        : null,
    [currentSession]
  );
  return (
    <ModelTable
      Model={Courses}
      Query={query}
      deps={[query]}
      addActionTitle="Assign Teacher"
      pluralTitle="Teacher Assignments"
    />
  );
}
