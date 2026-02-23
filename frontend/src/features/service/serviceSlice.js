import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/service`;

export const getAllServices = createAsyncThunk(
  "service/getAll",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to load services");
    }
  }
);

export const createService = createAsyncThunk(
  "service/create",
  async (serviceData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.post(API_URL, serviceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to create service");
    }
  }
);

export const updateService = createAsyncThunk(
  "service/update",
  async ({ id, serviceData }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.put(`${API_URL}/${id}`, serviceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { id, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to update service");
    }
  }
);

export const toggleServiceStatus = createAsyncThunk(
  "service/toggleStatus",
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
  services: [],
  isLoading: false,
  error: null,
  successMsg: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    clearServiceMessages: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllServices.pending, (state) => { state.isLoading = true; })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createService.fulfilled, (state) => { state.successMsg = "Service created successfully"; })
      .addCase(updateService.fulfilled, (state) => { state.successMsg = "Service updated successfully"; })
      .addCase(toggleServiceStatus.fulfilled, (state) => { state.successMsg = "Status updated"; });
  },
});

export const { clearServiceMessages } = serviceSlice.actions;
export default serviceSlice.reducer;