//
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { UserProvider } from "../UserProvider";
import { NhostNextProvider, NhostClient } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";

const nhost = new NhostClient({
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL || "",
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Clever</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
        <NhostApolloProvider nhost={nhost}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: "light",
            }}
          >
            <UserProvider>
              <Component {...pageProps} />
              <Toaster />
            </UserProvider>
          </MantineProvider>
        </NhostApolloProvider>
      </NhostNextProvider>
    </>
  );
}

export default MyApp;
