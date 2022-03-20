import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./playerSlice";
import gameSlice from "./gameSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    game: gameSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
