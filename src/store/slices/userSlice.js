import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { name: "noname" },
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
    },
    editUser: (state, action) => {
      state = action.payload;
    },
  },
});

export default userSlice.reducer;
