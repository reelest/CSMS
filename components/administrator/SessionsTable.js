import { Sessions } from "@/models/session";
import ModelFormDialog from "../ModelFormDialog";
import { useQuery } from "@/models/lib/query";
import { useEffect, useState } from "react";
import PageHeader from "../PageHeader";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import { Add } from "iconsax-react";
import ThemedTable from "../ThemedTable";
import { supplyModelValues } from "../ModelDataView";
import Form, { FormField, FormSubmit } from "../Form";

const _id = (id) => id.replace(/\//g, "^");
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
  const now = new Date();
  const currentYear = "" + now.getFullYear() + "/" + (now.getFullYear() + 1);
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
        className="flex justify-center items-center"
      >
        <Paper className="max-w-xl pt-4 px-8 max-sm:px-4 pb-4">
          <Form
            initialValue={{ name: currentYear }}
            onSubmit={async (data) => {
              let m = await Sessions.getOrCreate(
                _id(data.name),
                async (item, txn) => {
                  if (item.isLocalOnly())
                    await item.set({ name: data.name }, txn);
                }
              );
              setFormCreateVisible(false);
              setItem(m);
              setFormVisible(true);
            }}
          >
            <FormField
              name="name"
              label="Session Name"
              placeholder="20XX/20XX"
            />
            <FormSubmit
              variant="contained"
              sx={{ mt: 5, mx: "auto", display: "block" }}
            >
              Done
            </FormSubmit>
          </Form>
        </Paper>
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
