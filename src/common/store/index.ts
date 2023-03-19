import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../reducer";
import { coursesApi } from "../../services";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coursesApi.middleware),
});
type TStore = ReturnType<typeof store.getState>;
type TDispatch = typeof store.dispatch;

export { store };
export type { TStore, TDispatch };
