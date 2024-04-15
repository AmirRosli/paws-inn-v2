import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

// sdvsds


const BASE_URL = ""

//Async thunk for fetching a user's reservations
export const fetchReservationsByUser = createAsyncThunk(
    "reservations/fetchByUser",
    async (userId) => {
        try {
            const reservationsRef = collection(db, `users/${userId}/reservations`);

            const querySnapshot = await getDocs(reservationsRef);
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const saveReservation = createAsyncThunk(
    "reservations/saveReservation",
    async ({ userId, reservationContent }) => {
        try {
            const reservationsRef = collection(db, `users/${userId}/reservations`);
            console.log(`users/${userId}/reservations`);
            //since no id is given, firestore auto generate a unique ID for this new document
            const newReservationRef = doc(reservationsRef);
            console.log(reservationContent);
            await setDoc(newReservationRef, { content: reservationContent });
            const newReservation = await getDoc(newReservationRef);

            const reservation = {
                id: newReservation.id,
                ...newReservation.data(),
            };

            return reservation;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);



//Slice

const reservationsSlice = createSlice({
    name: "reservations",
    initialState: { reservations: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReservationsByUser.fulfilled, (state, action) => {
                state.reservations = action.payload;
                state.loading = false;
            })
            .addCase(saveReservation.fulfilled, (state, action) => {
                state.reservations = [action.payload, ...state.reservations];
            });
    },
});

export default reservationsSlice.reducer;