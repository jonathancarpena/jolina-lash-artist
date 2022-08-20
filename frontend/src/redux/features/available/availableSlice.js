import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Urls
import { get_AllDates } from "../../../lib/api";




export const refresh = createAsyncThunk(
    'availability/refresh',
    async (arg, thunkAPI) => {

        try {
            const res = await get_AllDates()
            if (res.length === 0) {
                return thunkAPI.rejectWithValue({
                    refresh: Date.now()
                })
            } else {
                return {
                    refresh: Date.now()
                }
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.message,
                status: error.status
            })
        }

    }
)


export const availableSlice = createSlice({
    name: 'available',
    initialState: {
        ready: true,
        refresh: Date.now()
    },
    reducers: {},
    extraReducers: {
        [refresh.fulfilled]: (state, action) => {
            state.ready = true
            state.refresh = action.payload.refresh
        },
        [refresh.rejected]: (state, action) => {
            state.ready = false
            state.refresh = action.payload.refresh
        },

    }

})

export default availableSlice.reducer