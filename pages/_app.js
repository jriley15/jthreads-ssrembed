import "../public/styles/index.scss";
import { Provider } from "react-redux";
import store from "../redux/store";
import withRedux from "next-redux-wrapper";
import { authenticate } from "../redux/authSlice";
import { setThread, setComments } from "../redux/threadSlice";
import { useEffect } from "react";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps, store }) {
  // Initialize auth state
  if (pageProps?.claims) {
    store.dispatch(authenticate(pageProps.claims));
  }
  if (pageProps?.thread) {
    store.dispatch(setThread(pageProps.thread?.data));
  }
  if (pageProps?.comments) {
    store.dispatch(
      setComments({ comments: pageProps.comments?.data, pageIndex: 1 })
    );
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
