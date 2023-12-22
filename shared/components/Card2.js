import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { More } from "iconsax-react";
import Skeleton from "@mui/material/Skeleton";
import Template from "./Template";
import Spacer from "./Spacer";
export default function Card2({ icon: Icon, color = "white", label, value }) {
  return (
    <Card2Wrapper
      color={color}
      sx={{
        border: "1px solid rgba(0,0,0,0.05)",
        maxHeight: "10rem",
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: "50%",
          backgroundColor: "primary.main",
          width: 32,
          mb: 1,
          ml: 4,
        }}
      >
        <Icon size={18} className="block text-white" />
      </Box>
      <div className="flex flex-col p-4 pb-2 h-full">
        <Spacer />
        <Typography variant="body2">
          {label ?? <Skeleton width={200} />}
        </Typography>
        <Spacer />
        <Typography variant="h3" as="span" sx={{ mt: 2, mb: 1 }}>
          {value ?? <Skeleton width="100%" />}
        </Typography>
      </div>
      <IconButton>
        <More />
      </IconButton>
    </Card2Wrapper>
  );
}

export function Card2Wrapper({ color = "transparent", ...props }) {
  return (
    <Template
      props={props}
      as={Paper}
      className="items-center flex justify-between mx-2 basis-48 flex-grow"
      elevation={2}
      sx={{
        backgroundColor: color,
        minWidth: "12rem",
        maxWidth: "24rem",
        my: 2,
      }}
    />
  );
}
