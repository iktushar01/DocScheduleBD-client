"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { SheetTitle } from "@/components/ui/sheet"
import { getIconComponent } from "@/lib/iconMapper"
import { cn } from "@/lib/utils"
import { NavSection } from "@/types/dashboard.types"
import { IUserInfo } from "@/types/users.types"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardMobileSidebarProps {
  userInfo: IUserInfo
  navItems: NavSection[]
  dashboardHome: string
}

const DashboardMobileSidebar = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardMobileSidebarProps) => {
  const pathname = usePathname()

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
    <div className="flex h-full flex-col bg-sidebar overflow-hidden">
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-sidebar-border shrink-0">
        <Link href={dashboardHome} className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center shadow-lg shadow-sidebar-primary/30">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" fillOpacity="0.9" />
              <path d="M8 5L11 6.75V10.25L8 12L5 10.25V6.75L8 5Z" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-sidebar-foreground leading-none">PH Healthcare</span>
            <span className="text-[10px] text-sidebar-foreground/40 leading-none mt-0.5">Management Portal</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-5">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && (
                <p className="mb-2 px-2 text-[10px] font-semibold tracking-widest uppercase text-sidebar-foreground/35">
                  {section.title}
                </p>
              )}

              <div className="space-y-0.5">
                {section.items.map((item, itemIdx) => {
                  const isActive = pathname === item.href
                  const Icon = getIconComponent(item.icon)

                  return (
                    <Link
                      href={item.href}
                      key={itemIdx}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm shadow-sidebar-primary/20"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-md transition-colors duration-150",
                          isActive
                            ? "text-sidebar-primary-foreground"
                            : "text-sidebar-foreground/40 group-hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 truncate">{item.title}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-sidebar-primary-foreground/60" />
                      )}
                    </Link>
                  )
                })}
              </div>

              {sectionIdx < navItems.length - 1 && (
                <Separator className="mt-4 bg-sidebar-border/50" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User footer */}
      <div className="shrink-0 border-t border-sidebar-border px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent transition-colors duration-150 cursor-pointer">
          <div className="relative h-8 w-8 shrink-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-primary/60 flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-white">{initials}</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-sidebar" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate leading-none">
              {userInfo.name}
            </p>
            <p className="text-[11px] text-sidebar-foreground/45 mt-0.5 truncate capitalize">
              {roleLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMobileSidebar