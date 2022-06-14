import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
// Urls
import { get_AllDates } from "../../../lib/api/index";




export const refresh = createAsyncThunk(
    'availability/refresh',
    async (arg, thunkAPI) => {

        try {
            console.log('GET ALL DATES')
            const res = await get_AllDates()
            console.log(res)
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