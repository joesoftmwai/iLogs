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
      const message = handleFailure(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logIssue = createAsyncThunk(
  "log-issue",
  async (data, thunkAPI) => {
    try {
      return await issuesService.logIssue(data);
    } catch (error) {
      const message = handleFailure(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getIisssue = createAsyncThunk(
  "get-i-issue",
  async (id, thunkAPI) => {
    try {
      return await issuesService.getIisssue(id);
    } catch (error) {
      const message = handleFailure(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateIssue = createAsyncThunk(
  "update-issue",
  async (data, thunkAPI) => {
    try {
      return await issuesService.updateIssue(data);
    } catch (error) {
      const message = handleFailure(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteIssue = createAsyncThunk(
  "delete-issue",
  async (id, thunkAPI) => {
    try {
      return await issuesService.deleteIssue(id);
    } catch (error) {
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
        state.issues = action.payload;
      })
      .addCase(getIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        state.issues = [];
      })
      .addCase(logIssue.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(logIssue.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.msg = "Issues logged successfully.";
        state.issues.unshift(action.payload);
      })
      .addCase(logIssue.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.msg = action.payload;
      })
      .addCase(getIisssue.pending, (state) => {
        state.isLoadingI = true;
      })
      .addCase(getIisssue.fulfilled, (state, action) => {
        state.isLoadingI = false;
        state.isSuccess = true;
        state.iIssue = action.payload;
      })
      .addCase(getIisssue.rejected, (state, action) => {
        state.isLoadingI = false;
        state.isError = true;
        state.msg = action.payload;
        state.iIssue = {};
      })

      .addCase(updateIssue.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.msg = "Issues Updated successfully.";
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.msg = action.payload;
      })
      .addCase(deleteIssue.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.msg = "Issues Deleted successfully.";
        const index = state.issues.findIndex(
          (issue) => issue._id == action.payload
        );
        if (index != -1) state.issues.splice(index, 1);
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.msg = action.payload;
      });
  },
});

export const { reset } = issuesSlice.actions;
export default issuesSlice.reducer;
