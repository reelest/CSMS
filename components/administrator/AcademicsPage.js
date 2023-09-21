import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageHeader from "../PageHeader";
import Card2 from "../Card2";

import { Add, ArchiveAdd } from "iconsax-react";
import { useQuery } from "@/models/lib/query";
import Students from "@/models/student";
import Teachers from "@/models/teacher";
import Parents from "@/models/parent";
import SessionSelect from "../SessionSelect";
import { Button, Tab, Tabs } from "@mui/material";
import ModelFormDialog from "../ModelFormDialog";
import { useEffect, useState } from "react";
import ClassRooms from "@/models/classroom";
import CourseDescriptions from "@/models/course_description";
import DummyCourses from "@/models/dummy_course";
import { supplyModelValues } from "../ModelDataView";
import ThemedTable from "../ThemedTable";

const TABS = [
  {
    model: DummyCourses,
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
  const { data: courses, pager } = useQuery(
    () => DummyCourses.all().pageSize(10),
    [],
    { watch: true }
  );
  const [formVisible, setFormVisible] = useState(false);
  const [formCreateVisible, setFormCreateVisible] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (!formVisible && !formCreateVisible) {
      setItem(null);
    }
  }, [formVisible, formCreateVisible]);
  const showModal = (row) => {
    setItem(courses[row]);
    setFormVisible(true);
  };
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <ModelFormDialog
        isOpen={formVisible}
        edit={item}
        onClose={() => setFormVisible(false)}
        model={DummyCourses}
      />
      <PageHeader title="Academics" />
      <Box className="px-4 sm:px-8 py-8">
        <div className="flex flex-wrap justify-between">
          <Typography variant="h6" as="h2">
            Courses
          </Typography>
        </div>
        <div className="flex flex-wrap pt-6 -mx-2 justify-center">
          <Button
            variant="contained"
            size="large"
            onClick={() => setFormCreateVisible(true)}
          >
            Add Course <Add size={32} className="ml-2" />
          </Button>
        </div>
        <ThemedTable
          title="Courses"
          headers={["Name", "Description"]}
          results={courses}
          pager={pager}
          onClickRow={(_, row) => showModal(row)}
          renderHooks={[supplyModelValues(["name", "description"])]}
        />
      </Box>
    </Box>
    // {/* <Box className="px-4 sm:px-8 py-8">
    //   <div className="flex flex-wrap justify-between">
    //     <Typography variant="h6" as="h2">
    //       Users
    //     </Typography>
    //   </div>
    //   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    //     <Tabs
    //       value={activeTab}
    //       onChange={(e, v) => setActiveTab(v)}
    //       aria-label="basic tabs example"
    //     >
    //       {TABS.map((e, i) => (
    //         <Tab label={e.header} key={e.name} {...a11yProps(i)} />
    //       ))}
    //     </Tabs>
    //   </Box>
    //   <div className="flex flex-wrap pt-6 -mx-2 justify-center">
    //     <Button
    //       variant="contained"
    //       size="large"
    //       onClick={() => setFormVisible(true)}
    //     >
    //       Add New {TABS[activeTab].name}{" "}
    //       <ArchiveAdd size={32} className="ml-2" />
    //     </Button>
    //   </div>
    // </Box> */}
    // </Box>
  );
}
