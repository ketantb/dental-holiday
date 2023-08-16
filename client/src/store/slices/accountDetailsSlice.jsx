import { createSlice } from "@reduxjs/toolkit";

const accountDetailsSlice = createSlice({
  name: "account_details",
  initialState: null,
  reducers: {
    getAccountDetails(state, action) {
      return action.payload;
    },
  },
});

export default accountDetailsSlice.reducer;
// export default userSlice.reducer;
export const { getAccountDetails } = accountDetailsSlice.actions;
