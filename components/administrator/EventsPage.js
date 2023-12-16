import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageHeader from "@/components/PageHeader";
import Card2 from "@/shared/components/Card2";

import { Add, ArchiveAdd } from "iconsax-react";
import { useQuery } from "@/shared/models/lib/query";
import { Button, Tab, Tabs } from "@mui/material";
import ModelFormDialog from "@/shared/components/ModelFormDialog";
import { useEffect, useState } from "react";
import Events from "@/models/event";
import { supplyModelValues } from "@/shared/components/ModelDataView";
import ThemedTable from "@/shared/components/ThemedTable";
import ModelTable from "@/shared/components/ModelTable";

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
