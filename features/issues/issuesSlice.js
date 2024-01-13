import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleFailure } from "../../utils/features";
import issuesService from "./issuesService";

const initialState = {
  issues: [],
  isLoading: false,
  isLoadingI: false,
  isProcessing: false,
  isSuccess: false,
  isError: false,
  msg: "",
  iIssue: {},
};

export const getIssues = createAsyncThunk(
  "issues/list",
  async (_, thunkAPI) => {
    try {
      return await issuesService.getIssues();
    } catch (error) {
      // console.error("Error in API request:", error);
      const message = handleFailure(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isLoadingI = false;
      state.isProcessing = false;
      state.isSuccess = false;
      state.isError = false;
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload.data;
        state.msg = action.payload;
      })
      .addCase(getIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      });
  },
});

export const { reset } = issuesSlice.actions;
export default issuesSlice.reducer;
