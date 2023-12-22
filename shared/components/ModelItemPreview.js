import usePromise from "@/shared/utils/usePromise";
import { Avatar, Box, Typography } from "@mui/material";
import Image from "next/image";
import { Item } from "@/shared/models/lib/model";
import Template from "./Template";
import { ItemDoesNotExist, checkError } from "@/shared/models/lib/errors";
import { getItemFromStore } from "@/shared/models/lib/item_store";
import Await from "./Await";

/**
 * @typedef {{
 *    title: string,
 *    description: string,
 *    image: string,
 *    avatar: string
 * }} PreviewInit
 */
export const MODEL_ITEM_PREVIEW = "!model-item-preview";
/**
 *
 * @param {Object} props
 * @param {import("../models/lib/model").Item} props.item
 */
export default function ModelItemPreview({
  item,
  show = { title: true, description: true, avatar: true, banner: true },
  ...props
}) {
  /**@type {import("../models/lib/model").Model}*/
  const {
    title = null,
    description = null,
    image = null,
    avatar = null,
  } = usePromise(async () => {
    if (item instanceof Item) {
      if (item.model().Meta[MODEL_ITEM_PREVIEW]) {
        item = getItemFromStore(item._ref) ?? item;
        try {
          if (!item._isLoaded) await item.load();
        } catch (e) {
          checkError(e, ItemDoesNotExist);
        }
        if (item._isLoaded)
          return await item.model().Meta[MODEL_ITEM_PREVIEW](item);
      } else return { title: item.uniqueName() };
    } else {
      return { title: JSON.stringify(item) };
    }
  }, [item]) ?? {
    title: undefined,
    description: undefined,
    image: undefined,
    avatar: undefined,
  };
  return (
    <Template as={Box} props={props}>
      {image && show.banner ? (
        <Box
          as={Image}
          src={image}
          alt=""
          width={720}
          className="model-item__banner"
          sx={{
            minHeight: "8rem",
            width: "100%",
            height: "auto",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      ) : null}
      <Box sx={{ width: "100%", display: "flex" }}>
        {avatar && show.avatar ? (
          <Box className="model-item__avatar">
            <Avatar alt="" src={avatar} />
          </Box>
        ) : null}
        <Box>
          {show.title ? (
            <Await
              value={title}
              className="model-item__title"
              variant="body1"
            />
          ) : null}
          {show.description ? (
            <Await
              value={description}
              className="model-item__description"
              variant="body2"
            />
          ) : null}
        </Box>
      </Box>
    </Template>
  );
}
