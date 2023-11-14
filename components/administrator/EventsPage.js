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
import ModelTable from "../ModelTable";

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
    <>
      <PageHeader title="User Dashboard" />
      <ModelTable Model={Events} />
    </>
  );
}
