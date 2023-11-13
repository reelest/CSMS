import DashboardLayout from "@/components/DashboardLayout";
import { WalletMoney } from "iconsax-react";
import Transactions from "./TransactionsPage";
import Head from "next/head";
import UserRedirect from "../UserRedirect";

const TABS = [
  {
    name: "Transactions",
    icon: WalletMoney,
    component: Transactions,
  },
];

export default function AdministratorsRoute() {
  return (
    <>
      <Head>
        <title>CSMS Administartor Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="CSMS Administrator Dashboard" />
      </Head>
      <UserRedirect redirectOnNoUser>
        <DashboardLayout tabs={TABS} />
      </UserRedirect>
    </>
  );
}
