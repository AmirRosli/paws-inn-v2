import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev";

//Cart.jsx
export const fetchReservationsByUserId = createAsyncThunk("reservations/fetchUserReservationsByUserId", async (userId) => {
    const response = await fetch(`${BASE_URL}/reservations${userId}`);
    return response.json();
});

//AddToCart button
export const addToCart = createAsyncThunk(
    "reservations/addToCart",
    async (reservationDetails) => {
        const response = await axios.post(`${BASE_URL}/reservations`, reservationDetails);
        return response.data;
    }
);

//Slice
const reservationsSlice = createSlice({
    name: "reservations",
    initialState: {
        reservations: [],
        loading: true,
        reservation: [],
        carts: [],
    },
    reducers: {},

    extraReducers: (builder) => {
        //fetchReservationsByUserId
        builder.addCase(fetchReservationsByUserId.fulfilled, (state, action) => {
            state.rooms = action.payload;
            state.loading = false;
        });


        //confirmReservation
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.carts = action.payload;
        });




    },
});

export default reservationsSlice.reducer;
// export const { resetProfileImage } = reservationsSlice.actions;

