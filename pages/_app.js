import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/datepicker/Calendar.css";
import "../styles/datepicker/Clock.css";
import "../styles/datepicker/DateTimePicker.css";
import { OrderProvider } from "../contexts/order";

function MyApp({ Component, pageProps }) {
  return (
    <OrderProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </OrderProvider>
  );
}

export default MyApp;
