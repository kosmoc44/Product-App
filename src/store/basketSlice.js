import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: 'basket',
    initialState: [],
    reducers: {
        addToBasket: (state, action) => {
            const exectingItem = state.find(item => item.id === action.payload.id)
            if (exectingItem) {
                exectingItem.count += 1
            } else {
                state.push({ ...action.payload, count: 1 })
            }
        },
        removeFromBasket: (state, action) => {
            return state.filter(item => item.id !== action.payload)
        },
        increaseCount: (state, action) => {
            const item = state.find(item => item.id === action.payload)
            if (item) {
                item.count += 1
            }
        },
        decreaseCount: (state, action) => {
            const item = state.find(item => item.id === action.payload)
            if (item) {
                if (item.count > 1) {
                    item.count -= 1
                } else {
                    return state.filter(item => item.id !== action.payload)
                }
            }
        },
        setBasket: (state, action) => {
            return action.payload
        },
    },
})

export const { addToBasket, removeFromBasket, increaseCount, decreaseCount, setBasket } = basketSlice.actions;
export default basketSlice.reducer;