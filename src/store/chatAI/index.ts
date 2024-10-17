import { createSlice } from "@reduxjs/toolkit";

const chatAI = createSlice({
  name: "chatAI",
  initialState: {
    chartList: [],
  },
  reducers: {
    addMessage(state, action) {
      // console.log(11111)
      state.chartList.push(action.payload);
    },
  },
});
export const { addMessage } = chatAI.actions;
export default chatAI.reducer;
