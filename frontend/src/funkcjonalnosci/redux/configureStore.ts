import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { katalogSlice } from "../katalog/katalogSlice";
import { kontoSlice } from "../konto/kontoSlice";
import { koszykSlice } from "../Koszyk/koszykSlice";

export const store = configureStore({
    reducer: {
        koszyk: koszykSlice.reducer,
        katalog: katalogSlice.reducer,
        konto: kontoSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;