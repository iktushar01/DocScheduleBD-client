"use server";

import { httpClient } from "@/lib/axios/httpClient";

interface IDoctor {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    contactNumber: string;
    address: string;
    isDeleted: boolean;
    deletedAt: string | null;
    registrationNumber: string;
    experience: number;
    gender: string;
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    averageRating: number;
}

export const getDoctors = async () => {
    const response = await httpClient.get<IDoctor[]>('/doctors');
    return response;
}