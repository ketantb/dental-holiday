import { createSlice } from "@reduxjs/toolkit";

const accountDetailsSlice = createSlice({
  name: "account_details",
  initialState: [],
  reducers: {
    getAccountDetails(state, action) {
      state.push(action.payload);
    },
    addHospital(state, action) {
      state.push(action.payload);
    },
    addHotel(state, action) {
      state.push(action.payload);
    },
    addActivity(state, action) {
      state.push(action.payload);
    },
  },
});

export default accountDetailsSlice.reducer;
// export default userSlice.reducer;
export const { getAccountDetails, addHospital, addHotel, addActivity } =
  accountDetailsSlice.actions;
