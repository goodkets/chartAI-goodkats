import { configureStore } from "@reduxjs/toolkit";
import chatAI from "./chatAI";

export default configureStore({
  reducer: {
    chatAI,
  },
});
