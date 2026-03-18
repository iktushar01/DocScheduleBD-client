// types/auth.types.ts
export interface ILoginResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
    user: {
        needPasswordChange: boolean;
        email: string;
        name: string;
        role: string;
        image: string;
        status: string;
        isDeleted: boolean;
        emailVerified: boolean;
    };
}

// A standard helper for Action returns
export type ActionResponse<T> = 
  | (T & { success: true; message?: string }) 
  | { success: false; message: string };