import { Sessions } from "@/models/session";
import ModelFormDialog from "../ModelFormDialog";
import { useQuery } from "@/models/lib/query";
import { useEffect, useState } from "react";
import PageHeader from "../PageHeader";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Add } from "iconsax-react";
import ThemedTable from "../ThemedTable";
import { supplyModelValues } from "../ModelDataView";
import Form from "../Form";

export default function SessionsTable() {
  const { data: sessions, pager } = useQuery(
    () => Sessions.all().pageSize(10),
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
    setItem(sessions[row]);
    setFormVisible(true);
  };

  return (
    <>
      <ModelFormDialog
        isOpen={formVisible}
        edit={item}
        onClose={() => setFormVisible(false)}
        model={Sessions}
      />

      <Modal
        open={formCreateVisible}
        onClose={() => setFormCreateVisible(false)}
      >
        <Form
          initialValue={{ name: "" }}
          onSubmit={async (data) => {
            let m = await Sessions.getOrCreate(data.name);
            setFormCreateVisible(false);
            setItem(m);
            setFormVisible(true);
          }}
        ></Form>
      </Modal>
      <PageHeader title="Sessions" />
      <Box className="px-4 sm:px-8 py-8">
        <div className="flex flex-wrap justify-between">
          <Typography variant="h6" as="h2">
            Sessions
          </Typography>
        </div>
        <div className="flex flex-wrap pt-6 -mx-2 justify-center">
          <Button
            variant="contained"
            size="large"
            onClick={() => setFormCreateVisible(true)}
          >
            Add Session <Add size={32} className="ml-2" />
          </Button>
        </div>
        <ThemedTable
          title="Sessions"
          headers={["Name", "Description"]}
          results={sessions}
          pager={pager}
          onClickRow={(_, row) => showModal(row)}
          renderHooks={[supplyModelValues(["name", "description"])]}
        />
      </Box>
    </>
  );
}
