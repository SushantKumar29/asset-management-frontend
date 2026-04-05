import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import type { User } from "./types";

export const registerUser = createAsyncThunk<
  { user: User; token: string },
  { name: string; email: string; password: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/register", credentials);
    return { ...res.data, ...res.data.data };
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/login", credentials);
    return { ...res.data, ...res.data.data };
  } catch (err) {
    return rejectWithValue(err);
  }
});
