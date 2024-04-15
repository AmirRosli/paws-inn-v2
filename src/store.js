import { configureStore } from "@reduxjs/toolkit";
import reservationsReducer from "./features/reservations/reservationsSlice";
// /hbhjv

export default configureStore({
    reducer: {
        reservations: reservationsReducer,
    },
});