"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginAction } from "@/app/(auth)/login/_action";
import AppField from "@/components/shared/from/AppField";
import AppSubmitButton from "@/components/shared/from/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, ShieldCheck } from "lucide-react"; 
import Link from "next/link";
import { useState } from "react";

interface LoginFormProps {
    redirectPath?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload, redirectPath),
    })

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value) as any;
                if (!result.success) {
                    setServerError(result.message || "Authentication failed. Please verify your credentials.");
                    return;
                }
            } catch (error: any) {
                setServerError(`System Error: ${error.message}`);
            }
        }
    })

    return (
        /* 
           Wrapper: ensures content is centered on all screens.
           min-h-screen ensures it occupies the full height.
           p-4 adds a gutter on small mobile devices.
        */
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-primary bg-card transition-all duration-300">
                <CardHeader className="space-y-2 text-center pb-6">
                    <div className="mx-auto bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mb-2">
                        <ShieldCheck className="text-primary size-7" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                        Unified Access Portal
                    </CardTitle>
                    <CardDescription className="text-muted-foreground px-6 italic">
                        Centralized Login for Patients, Doctors, and Administrators.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        <form.Field
                            name="email"
                            validators={{ onChange: loginZodSchema.shape.email }}
                        >
                            {(field) => (
                                <AppField
                                    field={field}
                                    label="Registered Email"
                                    type="email"
                                    placeholder="e.g. name@clinic.com"
                                />
                            )}
                        </form.Field>

                        <div className="space-y-1">
                            <form.Field
                                name="password"
                                validators={{ onChange: loginZodSchema.shape.password }}
                            >
                                {(field) => (
                                    <AppField
                                        field={field}
                                        label="Security Password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        append={
                                            <Button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                variant="ghost"
                                                size="icon"
                                                className="hover:bg-transparent text-muted-foreground focus-visible:ring-0"
                                            >
                                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                            </Button>
                                        }
                                    />
                                )}
                            </form.Field>
                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-semibold text-primary hover:underline underline-offset-4"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {serverError && (
                            <Alert variant="destructive" className="py-2 border-destructive/20 bg-destructive/5">
                                <AlertDescription className="text-xs font-medium text-center">{serverError}</AlertDescription>
                            </Alert>
                        )}

                        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                            {([canSubmit, isSubmitting]) => (
                                <AppSubmitButton 
                                    className="w-full h-11 text-base shadow-md font-bold transition-all active:scale-[0.98]"
                                    isPending={isSubmitting || isPending} 
                                    pendingLabel="Authenticating..." 
                                    disabled={!canSubmit}
                                >
                                    Secure Portal Access
                                </AppSubmitButton>
                            )}
                        </form.Subscribe>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                            <span className="bg-card px-4 text-muted-foreground font-bold">
                                Privacy Protected Environment
                            </span>
                        </div>
                    </div>

                    <Button 
                        variant="outline" 
                        className="w-full h-11 border-border bg-background hover:bg-secondary/30 transition-all font-medium" 
                        onClick={() => {
                            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                            window.location.href = `${baseUrl}/auth/login/google`;
                        }}
                    >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with SSO
                    </Button>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 border-t border-border bg-muted/20 py-6 rounded-b-xl">
                    <p className="text-sm text-muted-foreground text-center">
                        System access issue?{" "}
                        <Link
                            href="/register"
                            className="text-primary font-bold hover:underline underline-offset-4"
                        >
                            Register New Profile
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default LoginForm;