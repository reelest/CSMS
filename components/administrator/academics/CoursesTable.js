import { useMemo } from "react";
import ModelTable from "@/shared/components/ModelTable";
import AssignedCourses from "@/models/course_assignment";
import { sessionId } from "@/models/session";
import { useSelectedSession } from "@/components/SessionSelect";

export default function CoursesTable() {
  const currentSession = useSelectedSession();
  const query = useMemo(
    () =>
      currentSession
        ? AssignedCourses.withFilter("session", "==", sessionId(currentSession))
        : null,
    [currentSession]
  );
  return (
    <ModelTable
      Model={AssignedCourses}
      Query={query}
      noMargin
      deps={[query]}
      addActionTitle="Assign Teacher"
      pluralTitle="Teacher Assignments"
      formProps={{
        onChange(data) {
          console.log("change", data);
        },
      }}
    />
  );
}
