import DashboardLayout from "@/components/DashboardLayout";
import {
  Calendar,
  Element3,
  Teacher,
  UserAdd,
  UserEdit,
  WalletMoney,
} from "iconsax-react";
import Transactions from "./TransactionsPage";
import Head from "next/head";
import SettingsPage from "./SettingsPage";
const TABS = [
  {
    name: "Transactions",
    icon: WalletMoney,
    component: Transactions,
  },
  {
    name: "Settings",
    component: SettingsPage,
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
