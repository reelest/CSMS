import DummyCourses from "@/models/dummy_course";
import ModelFormDialog from "../ModelFormDialog";
import { useQuery } from "@/models/lib/query";
import { useEffect, useState } from "react";
import PageHeader from "../PageHeader";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "iconsax-react";
import ThemedTable from "../ThemedTable";
import { supplyModelValues } from "../ModelDataView";

export default function CoursesTable() {
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
    <>
      <ModelFormDialog
        isOpen={formVisible}
        edit={item}
        onClose={() => setFormVisible(false)}
        model={DummyCourses}
      />

      <ModelFormDialog
        edit={item}
        isOpen={formCreateVisible}
        onClose={() => setFormCreateVisible(false)}
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
    </>
  );
}
