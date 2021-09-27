import dynamic from "next/dynamic";
import { AppProvider } from "../react-wrapper/Context/AppContext";
import "../styles/build/tailwind.css";
import '../styles/globals.css'
import { Provider } from "react-redux";
import { useStore } from "../react-wrapper/Redux/store";

const Layout = dynamic(
  () => {
    return import("../components/Layouts/Layout");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </AppProvider>
  </Provider>
  )
}

export default MyApp
