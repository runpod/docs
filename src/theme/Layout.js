import React from "react";
import OriginalLayout from "@theme-original/Layout";
import Head from "@docusaurus/Head";
import { useLocation } from "@docusaurus/router";

export default function Layout(props) {
  const location = useLocation();
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <OriginalLayout {...props} />
    </>
  );
}
