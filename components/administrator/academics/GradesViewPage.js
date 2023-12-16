import SessionSelect from "@/components/SessionSelect";
import Form, { FormSelect } from "@/shared/components/Form";
import ModelFormRefField from "@/shared/components/ModelFormRefField";
import ModelTable from "@/shared/components/ModelTable";
import { useSelectedSession } from "@/components/SessionSelect";
import ClassRooms from "@/models/classroom";
import Grades, { Grade } from "@/models/grade";
import { useQuery } from "@/shared/models/lib/query";
import { Typography } from "@mui/material";
import { useMemo, useState } from "react";
export default function GradesViewPage() {
  const session = useSelectedSession();
  const classesQuery = useMemo(
    () => session && ClassRooms.withFilter("session", "==", session),
    [session]
  );
  const [selectedClass, selectClass] = useState(null);
  const grades = useQuery(
    () => Grades.withFilter("classId", "==", selectedClass),
    []
  );
  return (
    <>
      <Typography variant="h3">Manage Grades</Typography>
      <SessionSelect />
      <Form
        onChange={({ className }) => {
          selectClass(className);
        }}
      >
        <ModelFormRefField
          name="className"
          label="Select Class"
          value={selectedClass}
          meta={{ ...Grades.Meta, pickRefQuery: classesQuery }}
        />
        <ModelTable model={Grades} />
      </Form>
    </>
  );
}
