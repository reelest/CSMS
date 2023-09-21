import { useQuery } from "@/models/lib/query";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ModelFormDialog from "../ModelFormDialog";
import { Add } from "iconsax-react";
import ThemedTable from "../ThemedTable";
import { supplyModelValues } from "../ModelDataView";
import plural from "@/utils/plural";
import sentenceCase from "@/utils/sentenceCase";

export default function ModelTable({
  Model,
  props = Object.keys(Model.Meta).filter((e) => e[0] !== "!"),
  headers = props.map(sentenceCase),
  title = sentenceCase(Model.uniqueName()),
  pluralTitle = plural(title),
  onCreate,
}) {
  const { data: items, pager } = useQuery(() => Model.all().pageSize(10), [], {
    watch: true,
  });
  const [formVisible, setFormVisible] = useState(false);
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (!formVisible) {
      setItem(null);
    }
  }, [formVisible]);
  const showModal = (row) => {
    setItem(items[row]);
    setFormVisible(true);
  };
  return (
    <>
      <ModelFormDialog
        isOpen={formVisible}
        edit={item}
        onClose={() => setFormVisible(false)}
        model={Model}
      />

      <Box className="px-4 sm:px-8 py-8">
        <div className="flex flex-wrap justify-between">
          <Typography variant="h6" as="h2">
            {pluralTitle}
          </Typography>
        </div>
        <div className="flex flex-wrap pt-6 -mx-2 justify-center">
          <Button
            variant="contained"
            size="large"
            onClick={async () => {
              const item = (await onCreate?.()) ?? null;
              if (item !== false) {
                setItem(item);
                setFormVisible(true);
              }
            }}
          >
            Add {title} <Add size={32} className="ml-2" />
          </Button>
        </div>
        <ThemedTable
          title={pluralTitle}
          headers={headers}
          results={items}
          pager={pager}
          onClickRow={(_, row) => showModal(row)}
          renderHooks={[supplyModelValues(props)]}
        />
      </Box>
    </>
  );
}
