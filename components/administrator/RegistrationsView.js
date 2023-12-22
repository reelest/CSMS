import { usePagedQuery, useQuery } from "@/shared/models/lib/query";
import { supplyValue } from "@/shared/components/Table";
import ThemedTable from "@/shared/components/ThemedTable";
import Registrations from "@/models/registration";
import ModelTable from "@/shared/components/ModelTable";

export default function RegistrationsView() {
  return (
    <ModelTable
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
      Model={Registrations}
      props={["name", "entranceClass", "gender"]}
      className="my-6 h-auto p-0"
      sx={{ width: "24rem", flexGrow: 1, maxWidth: "64rem" }}
    />
  );
}
