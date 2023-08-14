import { configureStore } from "@reduxjs/toolkit";
import accountDetailsSlice from "./slices/accountDetailsSlice";

const store = configureStore({
  reducer: { get_account_details: accountDetailsSlice },
});

export default store;
