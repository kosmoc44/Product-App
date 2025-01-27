import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
    name: 'sort',
    initialState: '',
    reducers: {
        setSort: (state, action) => {
            return action.payload
        },
    },
})

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;