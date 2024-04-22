import { baseApiSlice } from "../api/baseApiSlice.js";
import { logOut } from "./authSlice.js";

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
        logOutUser: builder.mutation({
            query: (credits) => ({
                url: "/auth/logout",
                method: "get",
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    dispatch(logOut());
                    dispatch(baseApiSlice.util.resetApiState());
                } catch (e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useAuthUserMutation,
    useLogOutUserMutation,
} = authApiSlice;
