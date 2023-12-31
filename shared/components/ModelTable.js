import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Add, AddCircle, Edit, Trash, Warning2 } from "iconsax-react";
import { useQuery } from "@/shared/models/lib/query";
import { singular } from "@/shared/utils/plural";
import sentenceCase from "@/shared/utils/sentenceCase";
import { useMutex } from "@/shared/utils/mutex";
import ModelFormDialog from "./ModelFormDialog";
import ThemedTable from "./ThemedTable";
import { supplyModelValues } from "./ModelDataView";
import capitalize from "@/shared/utils/capitalize";
import { addClassToColumns, addHeaderClass, supplyValue } from "./Table";
import { None, noop } from "@/shared/utils/none";
import { ErrorBoundary } from "react-error-boundary";
import Card2 from "./Card2";
import Card1 from "./Card1";

function ModelTableInner({
  /** @type {import("@/shared/models/lib/model").Model<Item>} */
  Model,
  Query = Model.all(),
  props = Model.fields(),
  headers = props.map((e) => capitalize(Model?.Meta?.[e]?.label ?? e)),
  modelName = sentenceCase(Model.uniqueName()),
  addActionTitle = "Create " + singular(modelName),
  allowEdit = true,
  allowDelete = true,
  allowCreate = true,
  enablePrint = false,
  onClickRow = noop,
  pluralTitle = sentenceCase(modelName),
  onCreate,
  renderHooks = [],
  deps = [],
  className,
  sx,
  noMargin = false,
  formProps = null,
}) {
  const { data: items, pager } = useQuery(
    () => Query?.pageSize?.(10),
    [...deps],
    {
      watch: true,
    }
  );
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
  const createItem = useMutex(async () => {
    if (allowCreate) {
      const item = (await onCreate?.()) ?? null;
      if (item !== false) {
        setItem(item);
        setFormVisible(true);
      }
    }
  });
  const actions = [allowEdit ? "e" : "", allowDelete ? "d" : ""].filter(
    Boolean
  );
  return (
    <>
      {allowCreate ? (
        <ModelFormDialog
          isOpen={formVisible}
          edit={item}
          onClose={() => setFormVisible(false)}
          model={Model}
          {...(formProps || {})}
        />
      ) : null}

      <Box
        className={className}
        sx={{
          px: noMargin ? 0 : { xs: 4, sm: 8 },
          mx: noMargin ? -1 : 0,
          py: 8,
          ...sx,
        }}
      >
        <div className="flex flex-wrap justify-between mx-2">
          <Typography variant="h6" as="h2">
            {pluralTitle}
          </Typography>
        </div>
        {allowCreate ? (
          <div className="flex flex-wrap pt-0 justify-end mx-2">
            <Button
              variant="contained"
              size="large"
              onClick={createItem}
              disabled={!Query}
            >
              <AddCircle size={20} className="mr-2 -ml-2" />
              {addActionTitle}
            </Button>
          </div>
        ) : null}
        <ThemedTable
          headers={headers.concat(actions.map(() => ""))}
          results={Query ? items : []}
          pager={pager}
          enablePrint={enablePrint}
          onClickRow={(_, row) => onClickRow(items[row])}
          rowProps={{
            ...(onClickRow !== noop
              ? {
                  sx: {
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "gray.light",
                    },
                  },
                }
              : None),
          }}
          renderHooks={[
            addHeaderClass("pr-4"),
            addClassToColumns("w-0 pr-0", [props.length, props.length + 1]),
            supplyModelValues(props),
            supplyValue((row, col, data) => {
              if (!data) return;
              switch (actions[col - props.length]) {
                case "e":
                  return (
                    <div className="print:hidden">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          showModal(row);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </div>
                  );
                case "d":
                  return (
                    <div className="print:hidden">
                      <IconButton
                        color="error"
                        onClick={async () => {
                          if (await confirm("Delete selected item")) {
                            await data[row].delete();
                          }
                        }}
                      >
                        <Trash />
                      </IconButton>
                    </div>
                  );
              }
              return data;
            }),
            ...renderHooks,
          ]}
        />
      </Box>
    </>
  );
}

/**
 *
 * @param {Parameters<typeof ModelTableInner>[0]} props
 * @returns
 */
export default function ModelTable(props) {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <Card1 className="w-50 max-w-sm p-10 text-center mx-auto my-5">
          <Warning2 size={72} className="text-secondary" />
          <br></br>
          <Typography variant="caption">
            Oops! Something has broken here.
          </Typography>
          <br />
          <Button
            className="mt-4"
            variant="contained"
            onClick={resetErrorBoundary}
          >
            Reload
          </Button>
        </Card1>
      )}
    >
      <ModelTableInner {...props} />
    </ErrorBoundary>
  );
}
