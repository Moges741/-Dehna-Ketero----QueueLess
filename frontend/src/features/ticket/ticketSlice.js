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