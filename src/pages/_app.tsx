import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";

import theme from "@/config/theme";
import createEmotionCache from "@/config/createEmotionCache";

import MiniDrawer from "@/components/layout/MiniDrawer";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface IApp extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: IApp) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>my organizer app</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MiniDrawer>
          <Component {...pageProps} />
        </MiniDrawer>
      </ThemeProvider>
    </CacheProvider>
  );
}
