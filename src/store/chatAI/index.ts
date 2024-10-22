import { createSlice } from "@reduxjs/toolkit";

const chatAI = createSlice({
  name: "chatAI",
  initialState: {
    disabled: true,
    messageStatus: false, //通信是否完成
  },
  reducers: {
    changeDisabled(state, action) {
      state.disabled = action.payload;
    },
    changeMessageStatus(state, action) {
      state.messageStatus = action.payload;
    },
  },
});
export const { changeDisabled, changeMessageStatus } = chatAI.actions;
export default chatAI.reducer;
