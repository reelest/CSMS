import ClassRooms from "@/models/classroom";
import ModelTable from "@/shared/components/ModelTable";
import { useSelectedSession } from "@/components/SessionSelect";
import { useMemo } from "react";
import { sessionId } from "@/models/session";

export default function ClassesTable() {
  const currentSession = useSelectedSession();
  const query = useMemo(
    () =>
      currentSession
        ? ClassRooms.withFilter("session", "==", sessionId(currentSession))
        : null,
    [currentSession]
  );
  return (
    <ModelTable
      Model={ClassRooms}
      Query={query}
      deps={[query]}
      pluralTitle={"Classes for " + currentSession}
      props={["name", "branch", "formTeacher"]}
      noMargin
    />
  );
}
