import { createSlice } from "@reduxjs/toolkit";

const chatAI = createSlice({
  name: "chatAI",
  initialState: {
    chartList: [],
    disabled: true,
  },
  reducers: {
    addMessage(state, action) {
      state.chartList.push(action.payload);
    },
    changeDisabled(state, action) {
      state.disabled = action.payload;
    },
  },
});
export const { addMessage, changeDisabled } = chatAI.actions;
export default chatAI.reducer;
