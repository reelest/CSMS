import Footer from "@/components/Footer";
import Head from "next/head";
import SignupView from "@/shared/components/SignUpView";
export default function SignUp() {
  return (
    <>
      <Head>
        <title>CSMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="CSMS Website" />
      </Head>
      <SignupView />
      <Footer />
    </>
  );
}
