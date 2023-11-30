import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageHeader from "../PageHeader";
import { Button, Tab, Tabs } from "@mui/material";
import AssignedCourses from "@/models/course";
import ClassesTable from "./ClassesTable";
import CoursesTable from "./CoursesTable";
import SessionsTable from "./SessionsTable";
import useQueryState from "@/utils/useQueryState";
const TABS = [
  {
    model: AssignedCourses,
    header: "Courses",
    name: "course",
  },
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useQueryState("nav");
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <PageHeader title="User Dashboard" />
      <Box className="px-4 sm:px-10 py-8">
        <div className="flex flex-wrap justify-between">
          <Typography variant="h6" as="h2">
            Academics
          </Typography>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            aria-label="basic tabs example"
          >
            {TABS.map((e, i) => (
              <Tab label={e.header} key={e.name} {...a11yProps(i)} />
            ))}
          </Tabs>
        </Box>
      </Box>

      <SessionsTable />
      <CoursesTable />
      <ClassesTable />
    </Box>
  );
}
