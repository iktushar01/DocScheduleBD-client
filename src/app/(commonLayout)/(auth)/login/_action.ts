"use server";

import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { ILoginResponse } from "@/types/auth.types";
import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { redirect } from "next/navigation";

export const loginAction = async (payload : ILoginPayload) : Promise<ILoginResponse | ApiErrorResponse> => {
    const parsedPayload = loginZodSchema.safeParse(payload);
    if(!parsedPayload.success){
        const firstError = parsedPayload.error.issues[0].message || "Invalid credentials";
        return {
            success : false,
            message : firstError,
        }
    }
    try {
        const response = await httpClient.post<ILoginResponse>('/auth/login', parsedPayload.data);

        const {token, accessToken, refreshToken} = response.data;
        await setTokenInCookies("accessToken", accessToken);
        await setTokenInCookies("refreshToken", refreshToken);
        await setTokenInCookies("better-auth.session_token", token);

        redirect("/dashboard");
        
    } catch (error) {
        return {
            success : false,
            message : `login failed : ${error}`,
        }
    }
    
}