import DashboardLayout from "@/components/DashboardLayout";
import { Element3, Teacher, WalletMoney } from "iconsax-react";
import StudentTransactions from "./StudentTransactionsPage";
import Head from "next/head";
import UserRedirect from "../UserRedirect";
import OverviewPage from "./OverviewPage";
import StudentAcademics from "./StudentAcademicsPage";
import DEMO from "../DEMO";

const TABS = [
  {
    name: "Overview",
    icon: Element3,
    component: OverviewPage,
  },

  {
    name: "Student",
    icon: Teacher,
    component: DEMO,
  },
  {
    name: "Class",
    icon: Teacher,
    component: DEMO,
  },
  {
    name: "Uploads",
    icon: WalletMoney,
    component: DEMO,
  },
  {
    name: "Announcements",
    icon: WalletMoney,
    component: DEMO,
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
