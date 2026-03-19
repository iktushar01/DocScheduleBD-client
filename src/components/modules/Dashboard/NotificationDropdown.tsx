"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { Bell, Calendar, CheckCircle, Clock, UserPlus } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  message: string
  type: "appointment" | "schedule" | "system" | "user"
  timestamp: Date
  read: boolean
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Appointment Scheduled",
    message: "John Doe booked an appointment for June 15 at 10:00 AM.",
    type: "appointment",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: "2",
    title: "Schedule Updated",
    message: "Your schedule has been updated for the week of June 17.",
    type: "schedule",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
  },
  {
    id: "3",
    title: "System Maintenance",
    message: "Scheduled maintenance on June 20 from 1:00–3:00 AM.",
    type: "system",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: false,
  },
  {
    id: "4",
    title: "New User Registered",
    message: "Jane Smith has joined the platform.",
    type: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
  },
]

const typeConfig = {
  appointment: {
    icon: Calendar,
    bg: "bg-blue-500/10",
    color: "text-blue-600 dark:text-blue-400",
    ring: "ring-blue-500/20",
  },
  schedule: {
    icon: Clock,
    bg: "bg-amber-500/10",
    color: "text-amber-600 dark:text-amber-400",
    ring: "ring-amber-500/20",
  },
  system: {
    icon: CheckCircle,
    bg: "bg-purple-500/10",
    color: "text-purple-600 dark:text-purple-400",
    ring: "ring-purple-500/20",
  },
  user: {
    icon: UserPlus,
    bg: "bg-emerald-500/10",
    color: "text-emerald-600 dark:text-emerald-400",
    ring: "ring-emerald-500/20",
  },
}

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full hover:bg-accent transition-colors"
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground ring-2 ring-background animate-in-up">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[380px] p-0 shadow-xl shadow-black/10 border border-border/60 rounded-xl overflow-hidden"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <Badge
                variant="secondary"
                className="h-5 px-1.5 text-[10px] font-semibold bg-primary/10 text-primary border-0"
              >
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <ScrollArea className="max-h-[360px]">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border/40">
              {notifications.map((notification) => {
                const config = typeConfig[notification.type]
                const Icon = config.icon

                return (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={() => markRead(notification.id)}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3.5 cursor-pointer focus:bg-accent/50 transition-colors",
                      !notification.read && "bg-primary/[0.03]"
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1",
                        config.bg,
                        config.ring
                      )}
                    >
                      <Icon className={cn("h-4 w-4", config.color)} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium leading-none text-foreground">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 font-medium">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </DropdownMenuItem>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Bell className="h-5 w-5 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">All caught up!</p>
              <p className="text-xs text-muted-foreground/60">No new notifications</p>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <DropdownMenuSeparator className="my-0" />
        <div className="p-2">
          <button className="w-full rounded-lg px-3 py-2 text-xs font-medium text-primary hover:bg-primary/8 transition-colors text-center">
            View all notifications
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationDropdown