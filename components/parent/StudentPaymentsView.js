import { usePagedQuery, useQuery } from "@/shared/models/lib/query";
import ThemedTable from "@/shared/components/ThemedTable";
import Payments from "@/models/payment";
import { supplyValue } from "@/shared/components/Table";
import { formatDate, formatNumber, formatTime } from "@/shared/utils/formatNumber";

export default function StudentPaymentsView() {
  const { data: payments, pager } = usePagedQuery(
    () => Payments.all().pageSize(10),
    [],
    { watch: true }
  );
  return (
    <ThemedTable
      title="Payments"
      headers={["Name", "Description", "Amount", "Date", "Time"]}
      sx={{ width: "50rem", flexGrow: 1, maxWidth: "100%" }}
      results={payments}
      className="my-6 mx-2"
      pager={pager}
      renderHooks={[
        supplyValue((row, col) => {
          const item = payments[row];
          if (!item) return;
          switch (col) {
            case 0:
              return item.title;
            case 1:
              return item.description;
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
