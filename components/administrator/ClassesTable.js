import ClassRooms from "@/models/classroom";
import { useQuery } from "@/models/lib/query";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ModelFormDialog from "../ModelFormDialog";
import PageHeader from "../PageHeader";
import { Add } from "iconsax-react";
import ThemedTable from "../ThemedTable";
import { supplyModelValues } from "../ModelDataView";

export default function ClassesTable() {
  const { data: classRooms, pager } = useQuery(
    () => ClassRooms.all().pageSize(10),
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
    setItem(classRooms[row]);
    setFormVisible(true);
  };
  return (
    <>
      <ModelFormDialog
        isOpen={formVisible}
        edit={item}
        onClose={() => setFormVisible(false)}
        model={ClassRooms}
      />

      <ModelFormDialog
        edit={item}
        isOpen={formCreateVisible}
        onClose={() => setFormCreateVisible(false)}
        model={ClassRooms}
      />
      <Box className="px-4 sm:px-8 py-8">
        <div className="flex flex-wrap justify-between">
          <Typography variant="h6" as="h2">
            Classes
          </Typography>
        </div>
        <div className="flex flex-wrap pt-6 -mx-2 justify-center">
          <Button
            variant="contained"
            size="large"
            onClick={() => setFormCreateVisible(true)}
          >
            Add Class <Add size={32} className="ml-2" />
          </Button>
        </div>
        <ThemedTable
          title="Classes"
          headers={["Name", "Branch"]}
          results={classRooms}
          pager={pager}
          onClickRow={(_, row) => showModal(row)}
          renderHooks={[supplyModelValues(["name", "branch"])]}
        />
      </Box>
    </>
  );
}
