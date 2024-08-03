import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useJobDispatch = useDispatch.withTypes<AppDispatch>();
export const useJobSelector = useSelector.withTypes<RootState>();
