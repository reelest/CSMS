import DashboardLayout from "@/shared/components/DashboardLayout";
import {
  Calendar,
  Element3,
  Settings,
  Teacher,
  UserAdd,
  UserEdit,
  WalletMoney,
} from "iconsax-react";
import UserRedirect from "@/shared/components/UserRedirect";
import Head from "next/head";
const TABS = [
  {
    name: "Overview",
    icon: Element3,
    getComponent() {
      return import("./OverviewPage");
    },
  },
  {
    name: "Users",
    icon: UserEdit,
    getComponent() {
      return import("./UsersPage");
    },
  },
  {
    name: "Transactions",
    icon: WalletMoney,
    getComponent() {
      return import("./TransactionsPage");
    },
  },
  {
    name: "Academics",
    icon: Teacher,
    getComponent() {
      return import("./academics/AcademicsPage");
    },
  },
  {
    name: "Registrations",
    icon: UserAdd,
    getComponent() {
      return import("./RegistrationsPage");
    },
  },
  {
    name: "News & Events",
    icon: Calendar,
    getComponent() {
      return import("./EventsPage");
    },
  },
  {
    name: "Settings",
    icon: Settings,
    getComponent() {
      return import("./SettingsPage");
    },
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
