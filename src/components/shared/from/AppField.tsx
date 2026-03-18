import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import React from "react";

const getErrorMessage = (error: unknown): string => {
    if (typeof error === "string") return error;
    if (error && typeof error === "object") {
        if ("message" in error && typeof error.message === "string") {
            return error.message;
        }
    }
    return String(error);
}

type AppFieldProps = {
    field: AnyFieldApi;
    label: string;
    type?: "text" | "email" | "password" | "number" | "date" | "time";
    placeholder?: string;
    append?: React.ReactNode;
    prepend?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

const AppField = ({
    field,
    label,
    type = "text",
    placeholder,
    append,
    prepend,
    className,
    disabled = false,
}: AppFieldProps) => {

    const firstError = field.state.meta.isTouched && field.state.meta.errors.length > 0 
        ? getErrorMessage(field.state.meta.errors[0]) 
        : null;

    const hasError = firstError !== null;

    return (
        <div className={cn("space-y-2", className)}>
            <Label
                htmlFor={field.name}
                className={cn(
                    "text-sm font-semibold tracking-tight transition-colors",
                    hasError ? "text-destructive" : "text-foreground/80"
                )}
            >
                {label}
            </Label>

            <div className="relative group">
                {prepend && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                        {prepend}
                    </div>
                )}

                <Input
                    id={field.name}
                    name={field.name}
                    type={type}
                    value={field.state.value}
                    placeholder={placeholder}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={disabled}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${field.name}-error` : undefined}
                    className={cn(
                        "h-11 transition-all duration-200 bg-background",
                        "focus-visible:ring-primary/20 focus-visible:border-primary",
                        prepend && "pl-10",
                        append && "pr-11", // Added extra padding for the button
                        hasError && "border-destructive focus-visible:ring-destructive/20 bg-destructive/5",
                    )}
                />

                {append && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-1 z-20">
                        {/* 
                           CRITICAL FIX: 
                           We removed pointer-events-none so buttons inside 'append' are clickable 
                        */}
                        <div className="flex items-center justify-center">
                            {append}
                        </div>
                    </div>
                )}
            </div>

            {hasError && (
                <p
                    id={`${field.name}-error`}
                    role="alert"
                    className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1"
                >
                    {firstError}
                </p>
            )}
        </div>
    )
}

export default AppField;