import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/ticket";
const QUEUE_API = "http://localhost:5000/api/queue";

export const createTicket = createAsyncThunk(
  "ticket/create",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to create ticket");
    }
  }
);

export const getMyTickets = createAsyncThunk(
  "ticket/getMyTickets",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.get(`${API_URL}/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to load your tickets");
    }
  }
);

export const getTicketsByService = createAsyncThunk(
  "ticket/getByService",
  async (serviceId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.get(`${API_URL}/service/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { serviceId, tickets: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to load queue");
    }
  }
);

export const updateTicketStatus = createAsyncThunk(
  "ticket/updateStatus",
  async ({ ticketId, status }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      await axios.patch(`${API_URL}/${ticketId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { ticketId, status };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to update ticket");
    }
  }
);
//QUEUE RELATED THUNKS
export const getQueueStatus = createAsyncThunk(
  "ticket/getQueueStatus",
  async (serviceId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const res = await axios.get(`${QUEUE_API}/status/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { serviceId, status: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Failed to load queue status");
    }
  }
);

const initialState = {
  myTickets: [],
  queues: {}, // { serviceId: [tickets] }
  currentQueue: [],
  currentServiceId: null,
  isLoading: false,
  error: null,
  successMsg: null,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    clearTicketMessages: (state) => {
      state.error = null;
      state.successMsg = null;
    },
    setCurrentService: (state, action) => {
      state.currentServiceId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createTicket.fulfilled, (state, action) => {
        state.successMsg = `Ticket #${action.payload.ticketNumber} created!`;
      })

      // My Tickets
      .addCase(getMyTickets.fulfilled, (state, action) => {
        state.myTickets = action.payload;
      })

      // Queue by Service
      .addCase(getTicketsByService.pending, (state) => { state.isLoading = true; })
      .addCase(getTicketsByService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.queues[action.payload.serviceId] = action.payload.tickets;
        state.currentQueue = action.payload.tickets;
      })
      .addCase(getTicketsByService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.successMsg = "Ticket updated";
        // Optimistic update
        const queue = state.queues[state.currentServiceId];
        if (queue) {
          const idx = queue.findIndex(t => t.id === action.payload.ticketId);
          if (idx !== -1) queue[idx].status = action.payload.status;
        }
      });
  },
});

export const { clearTicketMessages, setCurrentService } = ticketSlice.actions;
export default ticketSlice.reducer;