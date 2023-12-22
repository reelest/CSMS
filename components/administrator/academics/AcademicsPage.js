import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageHeader from "@/components/PageHeader";
import { Tab, Tabs } from "@mui/material";
import useQueryState from "@/shared/utils/useQueryState";
import SessionInfoPage from "./SessionInfoPage";
import { createElement } from "react";
import SessionSelect from "@/components/SessionSelect";

const TABS = [
  {
    header: "Session Info",
    name: "session",
    component: SessionInfoPage,
  },
  {
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
  const [activeTab, setActiveTab] = useQueryState("nav", TABS[0].name);
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <PageHeader title="User Dashboard" />
      <Box className="px-4 sm:px-10 py-8">
        <div className="flex flex-wrap justify-between">
          <Typography variant="h6" as="h2">
            Academics
          </Typography>
        </div>

        <div className="flex items-end">
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", flexGrow: 1, mr: 8 }}
          >
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              aria-label="basic tabs example"
            >
              {TABS.map((e, i) => (
                <Tab
                  label={e.header}
                  key={e.name}
                  {...a11yProps(i)}
                  value={e.name}
                />
              ))}
            </Tabs>
          </Box>
          <SessionSelect />
        </div>

        {createElement(
          TABS.find((e) => e.name === activeTab).component ?? "div"
        )}
      </Box>
    </Box>
  );
}
