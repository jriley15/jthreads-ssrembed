import "../public/styles/index.scss";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import withRedux from "next-redux-wrapper";
import { authenticate } from "../redux/authSlice";
import { useEffect } from "react";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps, store }) {
  // Initialize auth state
  if (pageProps?.claims) {
    store.dispatch(authenticate(pageProps.claims));
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
