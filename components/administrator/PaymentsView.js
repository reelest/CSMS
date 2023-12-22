import { usePagedQuery, useQuery } from "@/shared/models/lib/query";
import ThemedTable from "@/shared/components/ThemedTable";
import Payments from "@/models/payment";
import { supplyValue } from "@/shared/components/Table";
import {
  formatDate,
  formatNumber,
  formatTime,
} from "@/shared/utils/formatNumber";
import ModelTable from "@/shared/components/ModelTable";
import { useMemo } from "react";

export default function PaymentsView() {
  const query = useMemo(() => Payments.all().pageSize(10), []);
  return (
    <ModelTable
      Model={Payments}
      Query={query}
      className="my-6 p-0"
      allowDelete={false}
      allowEdit={false}
      allowCreate={false}
      sx={{ width: "30rem", flexGrow: 1, maxWidth: "100%" }}
      props={["title", "description", "amounT", "date", "time"]}
      renderHooks={[
        supplyValue((row, col, payments) => {
          console.log({ payments, row, col });
          if (!Array.isArray(payments)) return;
          const item = payments[row];
          if (!item) return;
          switch (col) {
            case 2:
              return "\u20A6" + formatNumber(item.amount);
            case 3:
              return formatDate(item.timeCreated);
            case 4:
              return formatTime(item.timeCreated);
          }
        }),
      ]}
    />
  );
}
