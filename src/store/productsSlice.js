import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: false,
};

export const getProducts = createAsyncThunk(
  "productsSlice/getProducts",
  async () => {
    let res = await fetch(`https://dummyjson.com/products?limit=117`);
    let data = await res.json()
    console.log(data);
    return data.products;

  }
);

export const productsSlise = createSlice({
  name: "productsSlise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, payload) => {
      state.loading = true
    })
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.loading = false
      state.products = payload
    })
    builder.addCase(getProducts.rejected, (state, payload) => {
      state.error = true
      state.loading = false
    })

  }
});

export default productsSlise.reducer;

export const productsSelector = (state) => state.productsSlise;
