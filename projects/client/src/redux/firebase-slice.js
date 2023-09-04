import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {}
}

const firebaseSlice = createSlice({
    name : "firebase",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setData} = firebaseSlice.actions
export default firebaseSlice.reducer