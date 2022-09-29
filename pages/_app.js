import Layout from "../components/Layout";
import "../styles/globals.css";
import { ClickProvider } from "../contexts/click";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
