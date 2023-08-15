import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageHeader from "../PageHeader";
import Card2 from "../Card2";

import {
  ArchiveBox,
  ArrowUp2,
  WalletSearch,
  BatteryEmpty1,
} from "iconsax-react";
import { useQuery } from "../../models/model";
import Students from "../../models/student";
import Teachers from "../../models/teacher";
import Parents from "../../models/parent";
import { Select } from "@mui/material";

const useCount = (Model) => {
  return useQuery(() => Model.counter.asQuery(), [], {
    watch: true,
  }).data?.itemCount;
};
export default function AcademicsPage() {
  const numStudents = useCount(Students);
  const numTeachers = useCount(Teachers);
  const numParents = useCount(Parents);
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <PageHeader title="User Dashboard" />
      <Box className="px-4 sm:px-8 py-8">
        <div className="flex flex-wrap justify-between">
          <Typography variant="h6" as="h2">
            Academics
          </Typography>
          <Select />
        </div>
        <div className="flex py-8 -mx-2">
          <Card2
            icon={ArchiveBox}
            label="Total number of students"
            value={numStudents}
          />
          <Card2
            icon={ArchiveBox}
            label="Total number of parents"
            value={numParents}
          />
          <Card2
            icon={ArchiveBox}
            label="Total number of teachers"
            value={numTeachers}
          />
        </div>
      </Box>
    </Box>
  );
}