import { createSlice } from "@reduxjs/toolkit";

const accountDetailsSlice = createSlice({
  name: "account_details",
  initialState: [],
  reducers: {
    getAccountDetails(state, action) {
      state.push(action.payload);
    },
  },
});

export default accountDetailsSlice.reducer;
// export default userSlice.reducer;
export const { getAccountDetails } = accountDetailsSlice.actions;
