import { createSlice } from "@reduxjs/toolkit";

// Define User type (matches login response)
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setUser: (state, action: { payload: { user: User; token: string } }) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
