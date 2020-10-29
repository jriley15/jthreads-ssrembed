import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import "../public/styles/index.scss";
import { authenticate } from "../redux/authSlice";
import store from "../redux/store";
import { setComments, setThread } from "../redux/threadSlice";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
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

const makeStore = (context) => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
