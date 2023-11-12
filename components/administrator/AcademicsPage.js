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
import AssignedCourses from "@/models/course";
import { supplyModelValues } from "../ModelDataView";
import ThemedTable from "../ThemedTable";
import ClassesTable from "./ClassesTable";
import CoursesTable from "./CoursesTable";
import SessionsTable from "./SessionsTable";

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
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <PageHeader title="User Dashboard" />
      <SessionsTable />
      <CoursesTable />
      <ClassesTable />
    </Box>
  );
}
