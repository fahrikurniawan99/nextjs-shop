import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/700.css";
import { Provider } from "react-redux";
import store from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <Provider store={store}>
      <Component {...pageProps} />
    // </Provider>
  );
}
