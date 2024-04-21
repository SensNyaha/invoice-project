import { baseApiSlice } from "../api/baseApiSlice";

export const authApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
        }),
        authUser: builder.mutation({
            query: (credits) => ({
                url: "/auth/login",
                method: "POST",
                body: credits,
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useAuthUserMutation } = authApiSlice;
