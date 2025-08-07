// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import generatorSlice from "./HexGeneratorSlice";

export const store = configureStore({
  reducer: {
    generator: generatorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
