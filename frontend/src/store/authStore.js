import { create } from "zustand"
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message : null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", IsLoading: false });
            throw error;
        }
    },
    login: async (email, password) => {
        set({ isAuthenticated: false, isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({
                isAuthenticated: true,
                isLoading: false,
                user: response.data.user,
                error: null
            })
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ isLoading: false, error: false, isAuthenticated: false, user: null });
        } catch (error) {
            set({ error: "Error Logging out", isLoading: false });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoaading: false });
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({isLoading: false, error : null });
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error sending reset password email" });
            throw error;
        }
    }, 
    resetPassword : async(token , password) => {
        set({isLoading: true, erroe: null});
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, {password});
            set({isLoading : false, message: response.data.message});
        } catch (error) {
            set({isLoading : false, error: error.response.data.message || "error resetting password"});
            throw error;
        }
    }
}))


