import { Sessions, sessionId } from "@/models/session";
import { useState } from "react";
import { Modal, Paper } from "@mui/material";
import Form, { FormField, FormSubmit } from "@/shared/components/Form";
import ModelTable from "@/shared/components/ModelTable";

export default function SessionsTable() {
  const [formCreationRequest, setFormCreationRequest] = useState(null);
  const now = new Date();
  const currentYear = "" + now.getFullYear() + "/" + (now.getFullYear() + 1);
  const _return = (value) => {
    setFormCreationRequest((e) => {
      e?.(value);
      return null;
    });
  };
  return (
    <>
      <Modal
        open={!!formCreationRequest}
        onClose={() => _return(false)}
        className="flex justify-center items-center"
      >
        <Paper className="max-w-xl pt-4 px-8 max-sm:px-4 pb-4">
          <Form
            initialValue={{ name: currentYear }}
            onSubmit={async (data) => {
              let m = await Sessions.getOrCreate(
                sessionId(data.name),
                async (item, txn) => {
                  if (item.isLocalOnly())
                    await item.set({ name: data.name }, txn);
                }
              );
              _return(m);
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
      <ModelTable
        Model={Sessions}
        noMargin
        onCreate={() => {
          return new Promise((r, j) => {
            setFormCreationRequest(() => r);
          });
        }}
      />
    </>
  );
}
