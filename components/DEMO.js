import { Typography } from "@mui/material";
import { Warning2 } from "iconsax-react";

export default function DEMO() {
  return (
    <div className="flex flex-col justify-center items-center h-full px-20 text-center leading-loose">
      <Warning2 size={84} className="text-secondary mb-8" />
      <Typography variant="h2">Page disabled by Administrator.</Typography>
    </div>
  );
}
