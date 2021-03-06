import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    claims: {},
    displayName: "",
    guestId: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //state.value += 1;
    },
    decrement: (state) => {
      //state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      //state.value += action.payload;
    },
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      if (action.payload) {
        state.claims = action.payload;
      } else {
        state.claims = {};
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.claims = {};
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setGuestId: (state, action) => {
      state.guestId = action.payload;
    },
  },
});

export const {
  authenticate,
  setDisplayName,
  logout,
  setGuestId,
} = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
