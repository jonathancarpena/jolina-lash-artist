import { configureStore } from "@reduxjs/toolkit";
import { loadState } from './browser-storage'
import availableReducer from '../redux/features/available/availableSlice'
import modalReducer from '../redux/features/modal/modalSlice'
import adminReducer from './features/admin/adminSlice'




export const store = configureStore({
    devTools: true,
    reducer: {
        available: availableReducer,
        modal: modalReducer,
        admin: adminReducer
    },
    preloadedState: loadState()
})
