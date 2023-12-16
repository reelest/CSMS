import { Box, Typography, Button } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import { Add } from "iconsax-react";
import SessionSelect, { useSelectedSession } from "@/components/SessionSelect";
import { usePagedQuery, useQuery } from "@/shared/models/lib/query";
import Registrations, { Registration } from "@/models/registration";
import ThemedTable from "@/shared/components/ThemedTable";
import {
  TableButton,
  addClassToColumns,
  addHeaderClass,
  supplyValue,
} from "@/shared/components/Table";
import { useEffect, useMemo, useState } from "react";
import RegistrationsForm from "./RegistrationsForm";
import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import ModelDataView from "@/shared/components/ModelDataView";
import ModelTable from "@/shared/components/ModelTable";
import { sessionId } from "@/models/session";

export default function RegistrationsPage() {
  const currentSession = useSelectedSession();
  const query = useMemo(
    () =>
      currentSession
        ? Registrations.withFilter("session", "==", sessionId(currentSession))
        : null,
    [currentSession]
  );
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      <PageHeader title="User Dashboard" />
      <Box className="px-4 sm:px-10 py-8">
        <div className="flex flex-wrap justify-between items-baseline">
          <Typography variant="h6" as="h2">
            Registrations
          </Typography>
          <SessionSelect />
        </div>
      </Box>
      <ModelTable
        pluralTitle=""
        Model={Registrations}
        Query={query}
        props={[
          "name",
          "email",
          "entranceClass",
          "gender",
          "dob",
          "stateOfOrigin",
        ]}
        deps={[query]}
      />
    </Box>
  );
}
