import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMyData = createAsyncThunk("myData/fetch", async () => {
  return [];
});

export interface MyDataState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MyDataState = {
  data: [],
  loading: false,
  error: null,
};

const generatorSlice = createSlice({
  name: "myData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default generatorSlice.reducer;
