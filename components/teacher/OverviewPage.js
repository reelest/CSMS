import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageHeader from "../PageHeader";
import Card2, { Card2Wrapper } from "../Card2";

import { ArchiveBox } from "iconsax-react";
import { useQuery } from "@/models/lib/query";
import Students from "@/models/student";
import Teachers from "@/models/teacher";
import Parents from "@/models/parent";
import { Hidden } from "@mui/material";
import PieChart from "../PieChart";
import EventsView from "../EventsView";
import StudentPaymentsView from "./StudentPaymentsView";
import SessionSelect from "../SessionSelect";

const useCount = (Model) => {
  return useQuery(() => Model.counter.asQuery(), [], {
    watch: true,
  }).data?.itemCount;
};
export default function OverviewPage() {
  const numStudents = useCount(Students);
  const numTeachers = useCount(Teachers);
  const numParents = useCount(Parents);
  const overallPerformance = 40;
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <PageHeader title="User Dashboard" />
      <Box className="px-4 sm:px-8 py-8">
        <div className="flex flex-wrap justify-between">
          <Typography variant="h6" as="h2">
            Overview
          </Typography>
          <SessionSelect />
        </div>
        <div className="flex flex-wrap pt-6 -mx-2">
          <Card2
            icon={ArchiveBox}
            label="Total Classmates"
            value={numStudents}
          />
          <Card2
            icon={ArchiveBox}
            label="Total Courses Offered"
            value={numParents}
          />
          <Card2
            icon={ArchiveBox}
            label="Total number of teachers"
            value={numTeachers}
          />
        </div>
        <div className="flex flex-wrap pt-6 -mx-2 max-sm:justify-center">
          <Card2Wrapper
            color="white"
            className=" px-4 py-4 items-center flex-grow"
            sx={{
              border: "1px solid rgba(0,0,0,0.05)",
              maxWidth: { xs: "14.75rem", sm: "25rem" },
            }}
          >
            <div className="flex-col flex">
              <Typography
                variant="body2"
                sx={{ mb: 4 }}
                className="text-center"
              >
                Overall Performance
              </Typography>

              <Hidden smUp>
                <PieChart percent={overallPerformance} className="m-4" />
              </Hidden>
              <Typography variant="body2" className="text-center">
                {overallPerformance}%
              </Typography>
            </div>
            <Hidden smDown>
              <PieChart percent={overallPerformance} className="mx-4" />
            </Hidden>
          </Card2Wrapper>
          <EventsView />
          <StudentPaymentsView />
        </div>
      </Box>
    </Box>
  );
}
