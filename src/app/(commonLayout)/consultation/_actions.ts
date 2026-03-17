"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const getDoctors = async () => {
    const response = await httpClient.get('/doctors');
    return response.data;
}