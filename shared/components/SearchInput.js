import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SearchNormal1 as SearchIcon } from "iconsax-react";
import Template from "./Template";
import ModelItemPreview, { MODEL_ITEM_PREVIEW } from "./ModelItemPreview";
import { useEffect, useMemo, useState } from "react";
import useIterator from "@/shared/utils/useIterator";
import { search } from "@/shared/logic/search";
import createQuery from "@/shared/utils/createQuery";
import { useDebounce } from "react-use";
import { ForwardIndexItem } from "@/shared/models/search_index";
import { Item } from "@/shared/models/lib/model";
import pick from "@/shared/utils/pick";
import notIn from "@/shared/utils/notIn";
export const _searchValue = (e) =>
  e instanceof ForwardIndexItem
    ? e.tokens
    : e instanceof Item && e._isLoaded && e.model().Meta[MODEL_ITEM_PREVIEW]
    ? Object.values(e.model().Meta[MODEL_ITEM_PREVIEW](e)).join(" ")
    : typeof e === "string"
    ? e
    : "";

export const _id = (e) =>
  e instanceof ForwardIndexItem
    ? e.getItem().id
    : e instanceof Item
    ? e.id()
    : e;

export function SearchInput() {
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [serverFilter, setServerFilter] = useState("");
  const [clientFilter, setClientFilter] = useState(() =>
    createQuery(filterText)
  );
  useDebounce(
    () => {
      setServerFilter(filterText);
    },
    2000,
    [filterText]
  );
  useEffect(() => {
    setClientFilter(() => createQuery(filterText));
  }, [filterText]);

  const resultIterator = useMemo(
    () => search(serverFilter, ["clients"], 1),
    [serverFilter]
  );
  const iterator = useIterator(resultIterator);
  const { value: results, loading } = iterator;
  const filterable = useMemo(() => results.some(_searchValue), [results]);
  return (
    <Autocomplete
      disablePortal
      renderOption={(props, option) => (
        <ModelItemPreview item={option} {...props} key={_id(option)} />
      )}
      // {...{ groupBy, getOptionLabel, renderGroup }}
      options={results}
      onChange={(_, e) => {
        alert(e.uniqueName());
      }}
      getOptionLabel={() => ""}
      handleHomeEndKeys
      open={open}
      sx={{
        flexGrow: 100,
        maxWidth: "27rem",
      }}
      freeSolo
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={filterText}
      onInputChange={(_, value) => setFilterText(value)}
      loading={loading && !results?.length}
      filterOptions={(x) =>
        filterable
          ? x
              .map((e) => [clientFilter(_searchValue(e)), e])
              .sort((a, b) => b[0] - a[0])
              .map((e) => e[1])
          : x
      }
      ListboxProps={{ elevation: 5 }}
      loadingText={<CircularProgress sx={{ display: "block", mx: "auto" }} />}
      renderInput={(params) => (
        <OutlinedInput
          // as={OutlinedInput}
          placeholder="Search"
          {...pick(
            params,
            Object.keys(params).filter(notIn(["InputProps", "InputLabelProps"]))
          )}
          sx={{
            ...params.sx,
            "& .MuiInputBase-root": {
              flexWrap: "nowrap",
            },
            maxWidth: "27rem",
            backgroundColor: "gray.light",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
          size="small"
          value={filterText}
          {...{
            ...params.InputProps,

            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                <Box
                  as={SearchIcon}
                  size={20}
                  className="mr-3 text-inherit text-disabledOnPrimaryDark"
                />
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
