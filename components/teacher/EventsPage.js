import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageHeader from "../PageHeader";
import Card2 from "../Card2";

import { Add, ArchiveAdd } from "iconsax-react";
import { useQuery } from "@/models/lib/query";
import { Button, Tab, Tabs } from "@mui/material";
import ModelFormDialog from "../ModelFormDialog";
import { useEffect, useState } from "react";
import Events from "@/models/event";
import { supplyModelValues } from "../ModelDataView";
import ThemedTable from "../ThemedTable";

export default function EventsPage() {
  const { data: events, pager } = useQuery(
    () => Events.all().pageSize(10),
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
    setItem(events[row]);
    setFormVisible(true);
  };
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <ModelFormDialog
        isOpen={formVisible}
        edit={item}
        onClose={() => setFormVisible(false)}
        model={Events}
      />

      <ModelFormDialog
        edit={item}
        isOpen={formCreateVisible}
        onClose={() => setFormCreateVisible(false)}
        model={Events}
      />
      <PageHeader title="Academics" />
      <Box className="px-4 sm:px-8 py-8">
        <div className="flex flex-wrap justify-between">
          <Typography variant="h6" as="h2">
            Events
          </Typography>
        </div>
        <div className="flex flex-wrap pt-6 -mx-2 justify-center">
          <Button
            variant="contained"
            size="large"
            onClick={() => setFormCreateVisible(true)}
          >
            Create Event <Add size={32} className="ml-2" />
          </Button>
        </div>
        <ThemedTable
          title="Events"
          headers={["Title", "Date"]}
          results={events}
          pager={pager}
          onClickRow={(_, row) => showModal(row)}
          renderHooks={[supplyModelValues(["title", "date"])]}
        />
      </Box>
    </Box>
  );
}
