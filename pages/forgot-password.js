import Footer from "@/components/Footer";
import Head from "next/head";
import ForgotPasswordView from "@/shared/components/ForgotPasswordView";

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>CSMS - Reset Password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Reset password to CSMS Dashboard" />
      </Head>

      <ForgotPasswordView />
      <Footer />
    </>
  );
}
