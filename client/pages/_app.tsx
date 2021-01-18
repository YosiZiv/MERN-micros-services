import React, { useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import buildClient from "../api/build-client";
import NavBar from "../components/navBar";
export default function AppComponent({
  Component,
  pageProps,
  currentUser,
}: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  console.log("INSIDE COMPONENT CURRENT USER", currentUser);

  return (
    <>
      <Head>
        <title>Ticketing</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NavBar currentUser={currentUser} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
AppComponent.getInitialProps = async ({ Component, ctx }) => {
  try {
    const client = buildClient(ctx);
    const { data } = await client.get("/api/users/currentuser");
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    console.log(data);
    return { pageProps, currentUser: data.currentUser };
  } catch (err) {
    console.log(err);
  }
};
