import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/office";

// Thunks
export const getAllOffices = createAsyncThunk(
  "office/getAll",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.offices || res.data; // backend returns {offices: [...]}
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to load offices");
    }
  }
);

export const createOffice = createAsyncThunk(
  "office/create",
  async (officeData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.post(API_URL, officeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to create office");
    }
  }
);

export const updateOffice = createAsyncThunk(
  "office/update",
  async ({ id, officeData }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.put(`${API_URL}/${id}`, officeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { id, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to update office");
    }
  }
);

export const toggleOfficeStatus = createAsyncThunk(
  "office/toggleStatus",
  async ({ id, is_active }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      await axios.patch(`${API_URL}/${id}/status`, { is_active }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { id, is_active };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to toggle status");
    }
  }
);

const initialState = {
  offices: [],
  isLoading: false,
  error: null,
  successMsg: null,
};

const officeSlice = createSlice({
  name: "office",
  initialState,
  reducers: {
    clearOfficeMessages: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOffices.pending, (state) => { state.isLoading = true; })
      .addCase(getAllOffices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offices = action.payload;
      })
      .addCase(getAllOffices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createOffice.fulfilled, (state) => { state.successMsg = "Office created successfully"; })
      .addCase(updateOffice.fulfilled, (state) => { state.successMsg = "Office updated successfully"; })
      .addCase(toggleOfficeStatus.fulfilled, (state) => { state.successMsg = "Status updated"; });
  },
});

export const { clearOfficeMessages } = officeSlice.actions;
export default officeSlice.reducer;