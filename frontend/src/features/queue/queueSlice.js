import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const QUEUE_API = `${import.meta.env.VITE_BACKEND_URL}/api/queue`;

// Thunks
export const getQueueStatus = createAsyncThunk(
  "queue/getStatus",
  async (serviceId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.get(`${QUEUE_API}/status/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to load queue status");
    }
  }
);

export const callNextTicket = createAsyncThunk(
  "queue/callNext",
  async ({ service_id, office_id }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.post(`${QUEUE_API}/call-next`, { service_id, office_id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to call next ticket");
    }
  }
);

export const getWaitingCount = createAsyncThunk(
  "queue/getWaitingCount",
  async (serviceId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.get(`${QUEUE_API}/waiting-count/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.waiting || 0;
    } catch (err) {
      return rejectWithValue("Failed to get waiting count");
    }
  }
);

export const getEstimatedTime = createAsyncThunk(
  "queue/getEstimatedTime",
  async (serviceId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.get(`${QUEUE_API}/estimate/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.estimated_minutes || 0;
    } catch (err) {
      return rejectWithValue("Failed to get estimated time");
    }
  }
);

const initialState = {
  currentStatus: null,     // { current_ticket_number, ... }
  waitingCount: 0,
  estimatedMinutes: 0,
  isLoading: false,
  error: null,
  successMsg: null,
};

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    clearQueueMessages: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQueueStatus.fulfilled, (state, action) => {
        state.currentStatus = action.payload;
      })
      .addCase(callNextTicket.fulfilled, (state, action) => {
        state.successMsg = `Called ticket #${action.payload.ticketNumber}`;
      })
      .addCase(getWaitingCount.fulfilled, (state, action) => {
        state.waitingCount = action.payload;
      })
      .addCase(getEstimatedTime.fulfilled, (state, action) => {
        state.estimatedMinutes = action.payload;
      });
  },
});

export const { clearQueueMessages } = queueSlice.actions;
export default queueSlice.reducer;