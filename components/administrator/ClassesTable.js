import ClassRooms from "@/models/classroom";
import ModelTable from "../ModelTable";
import { useSelectedSession } from "../SessionSelect";
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
      props={["name", "branch", "formTeacher"]}
    />
  );
}
