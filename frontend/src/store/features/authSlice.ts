import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthState, UserRole } from '../../types/auth/auth.types';

const initialAuthState: AuthState = {
    email: "",
    role: null,
    token: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        signIn: (
            state,
            action: PayloadAction<{
                email: string;
                role: UserRole; 
                token: string;
                isAuthenticated?: boolean;
            }>
        ) => {
            const { email, role, token, isAuthenticated } = action.payload;
            state.isAuthenticated = isAuthenticated ?? true;
            state.email = email;
            state.role = role;
            state.token = token;
        },
        setToken: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
        },
        setAuthenticate: (state) => {
            state.isAuthenticated = true;
        },
        signOut: () => initialAuthState
    }
});

const persistConfig = {
    key: "auth",
    storage
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { signIn, setToken, setAuthenticate, signOut } = authSlice.actions;
export default persistedAuthReducer;
