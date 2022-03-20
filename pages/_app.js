import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import WeChatAuth from "../component/Auth/WeChatAuth";
import ClientOnlyPortal from "../component/ui/ClientOnlyPortal/ClientOnlyPortal";
import NotificationModal from "../component/Notification/NotificationModal";
import store from "../store/store";
import "../styles/globals.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Provider store={store}>
        <WeChatAuth>
          <ClientOnlyPortal selector="[data-notification]">
            <AnimatePresence>
              <NotificationModal />
            </AnimatePresence>
          </ClientOnlyPortal>

          <Component {...pageProps} />
        </WeChatAuth>
      </Provider>
    </>
  );
}

export default MyApp;
