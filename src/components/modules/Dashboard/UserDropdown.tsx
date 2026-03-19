"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IUserInfo } from "@/types/users.types"
import { Key, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"

interface UserDropdownProps {
  userInfo: IUserInfo
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const initials = userInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const roleLabel = userInfo.role
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full p-0 hover:ring-2 hover:ring-primary/20 transition-all"
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-sm shadow-primary/20">
            <span className="text-xs font-bold text-primary-foreground">{initials}</span>
          </div>
          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-background" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-60 p-0 shadow-xl shadow-black/10 border border-border/60 rounded-xl overflow-hidden"
      >
        {/* User card */}
        <DropdownMenuLabel className="p-0">
          <div className="flex items-center gap-3 px-4 py-4 bg-muted/30 border-b border-border/60">
            <div className="relative shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-sm">
                <span className="text-sm font-bold text-primary-foreground">{initials}</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{userInfo.name}</p>
              <p className="text-xs text-muted-foreground truncate">{userInfo.email}</p>
              <span className="inline-flex items-center mt-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                {roleLabel}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        {/* Menu items */}
        <div className="p-1.5">
          <DropdownMenuItem asChild>
            <Link
              href="/my-profile"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
              My Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/change-password"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                <Key className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
              Change Password
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                <Settings className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
              Settings
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-0 mx-1.5" />

        <div className="p-1.5">
          <DropdownMenuItem
            onClick={() => {}}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/8"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive/10">
              <LogOut className="h-3.5 w-3.5 text-destructive" />
            </span>
            Sign out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown