import Spacer from "./Spacer";
import Template from "./Template";
import { useRouter } from "next/router";
import { doLogOut } from "@/shared/logic/auth";
import { Setting, Logout } from "iconsax-react";
import {
  Box,
  Link,
  Typography,
  SwipeableDrawer,
  ButtonBase,
} from "@mui/material";
import createSubscription from "@/shared/utils/createSubscription";
import { noop } from "@/shared/utils/none";
import { useEffect } from "react";
import useQueryState from "@/shared/utils/useQueryState";

export const [useSidebar, , setSidebar] = createSubscription(noop, false);

export function useActiveTab(tabs) {
  return useQueryState("tab", tabs[0]?.name?.toLowerCase?.())[0];
}

export const [useAppLogo, , setAppLogo] = createSubscription(
  noop,
  <Typography>No Logo</Typography>
);
export default function Sidebar({ children, isStatic = false, tabs = [] }) {
  const selected = useActiveTab(tabs);
  const isOpen = useSidebar();
  const appLogo = useAppLogo();
  useEffect(() => setSidebar(false), [selected]);
  return (
    <SwipeableDrawer
      onOpen={() => setSidebar(true)}
      onClose={() => setSidebar(false)}
      variant={isStatic ? "permanent" : "temporary"}
      open={isOpen}
      className="scroll-primary"
      sx={{
        "&>.MuiPaper-root": {
          backgroundColor: "primary.dark",
          position: isStatic ? "static" : "fixed",
        },
      }}
    >
      <nav className="text-white w-72 flex-shrink-0 pt-4 pb-8 flex flex-col justify-start h-full">
        {appLogo}
        <div className="flex flex-col flex-grow overflow-auto pl-6 pr-6">
          {tabs.map(({ icon, name, id = name.toLowerCase() }) =>
            id === "settings" ? null : (
              <TabLink
                key={name}
                isSelected={id === selected}
                icon={icon}
                href={`?tab=${encodeURIComponent(id)}`}
              >
                {name}
              </TabLink>
            )
          )}
          <Spacer className="h-8 flex-shrink-0" />
          {tabs.map(({ icon, name, id = name.toLowerCase() }) =>
            id === "settings" ? (
              <TabLink
                key={name}
                isSelected={id === selected}
                icon={icon}
                href={`?tab=${encodeURIComponent(id)}`}
              >
                Settings
              </TabLink>
            ) : null
          )}
          <TabLink
            isActivated
            icon={Logout}
            as={ButtonBase}
            onClick={() => {
              doLogOut();
              setSidebar(false);
            }}
          >
            Log out
          </TabLink>
        </div>
      </nav>
      {children}
    </SwipeableDrawer>
  );
}

const TabLink = ({
  icon: Icon,
  children,
  isSelected,
  isActivated,
  ...props
}) => {
  return (
    <Template
      as={Link}
      props={props}
      className={`block text-left whitespace-nowrap w-full rounded`}
      sx={{
        marginTop: "0.125rem",
        marginBottom: "0.125rem",
        py: 2,
        px: 4,
        textAlign: "left",
        display: "block",
        textDecoration: "none",
        backgroundColor: isSelected ? "white" : "",
        color: isActivated
          ? "white"
          : isSelected
          ? "primary.dark"
          : "text.disabledOnPrimaryDark",
        "&:hover": {
          backgroundColor: isSelected ? "" : "primary.hover",
        },
      }}
    >
      <Typography>
        <Box
          as={Icon}
          size={20}
          sx={{
            color: isActivated
              ? "white"
              : isSelected
              ? "primary.main"
              : "text.disabledOnPrimaryDark",
          }}
          className="inline-block align-bottom mr-4"
        />
        {children}
      </Typography>
    </Template>
  );
};
