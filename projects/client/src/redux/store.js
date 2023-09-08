import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user-slice'
import firebaseSlice from './firebase-slice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        firebase : firebaseSlice
    }
})