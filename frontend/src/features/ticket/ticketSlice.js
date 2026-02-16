import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/api/tickets";


export const createTicket = createAsyncThunk(
  "ticket/create",
  async (data, {getState, isRejectedWithValue}) =>{
    const token = getState().auth.token;
    try{
        const res = await axios.post(API_URL, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        return isRejectedWithValue(error.response.data.message || "Ticket creation failed");
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
      return rejectWithValue(err.response?.data?.msg || "Failed to load tickets");
    }
  }
);
const initialState = {
  tickets: [],
  offices: [],
  services: [],
  currentTicket: null,
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
    resetCurrentTicket: (state) => {
      state.currentTicket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTicket = action.payload;
        state.successMsg = `Ticket #${action.payload.ticketNumber} created successfully!`;
        state.tickets.unshift({
            id: action.payload.ticketId,
            ticket_number: action.payload.ticketNumber,
            status: "Waiting",
            queue_date: new Date().toISOString().split("T")[0],
            created_at: new Date().toISOString(),
        });
        })
        .addCase(createTicket.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        })
        // get my tickets
        .addCase(getMyTickets.fulfilled, (state, action) => {
          state.tickets = action.payload;
        })
    },
});

export const { clearTicketMessages, resetCurrentTicket } = ticketSlice.actions;
export default ticketSlice.reducer;