import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

//Async thunk for fetching a user's reservations
//fwefwdscscsc
export const fetchUserimagesByUser = createAsyncThunk(
    "userimages/fetchByUser",
    async (userId) => {
        try {
            const userimagesRef = collection(db, `users/${userId}/userimages`);

            const querySnapshot = await getDocs(userimagesRef);
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

export const saveUserimage = createAsyncThunk(
    "userimages/saveUserImage",
    async ({ userId, userimageContent, file }) => {
        try {
            const imageRef = ref(storage, `userimages/${file.name}`);
            const response = await uploadBytes(imageRef, file);
            const imageUrl = await getDownloadURL(response.ref);
            const userimagesRef = collection(db, `users/${userId}/userimages`);
            console.log(`users/${userId}/userimages`);
            //since no id is given, firestore auto generate a unique ID for this new document
            const newUserimageRef = doc(userimagesRef);
            console.log(userimageContent);
            await setDoc(newUserimageRef, { content: userimageContent, imageUrl });
            const newUserimage = await getDoc(newUserimageRef);

            const userimage = {
                id: newUserimage.id,
                ...newUserimage.data(),
            };

            return userimage;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

//Slice

const userimagesSlice = createSlice({
    name: "userimages",
    initialState: { userimages: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserimagesByUser.fulfilled, (state, action) => {
                state.userimages = action.payload;
                state.loading = false;
            })
            .addCase(saveUserimage.fulfilled, (state, action) => {
                state.userimages = [action.payload, ...state.userimages];
            });
    },
});

export default userimagesSlice.reducer;