import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./types";
import { registerUser, loginUser } from "./thunks";

const loadAuthState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem("auth");
    if (serializedState === null) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading auth state from localStorage:", err);
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
        })
      );
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("auth");
    },

    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.token,
            isAuthenticated: true,
          })
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.token,
            isAuthenticated: true,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { setAuthUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
