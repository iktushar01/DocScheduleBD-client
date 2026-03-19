"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavSection } from "@/types/dashboard.types"
import { IUserInfo } from "@/types/users.types"
import { Menu, Search } from "lucide-react"
import { useEffect, useState } from "react"
import DashboardMobileSidebar from "./DashboardMobileSidebar"
import NotificationDropdown from "./NotificationDropdown"
import UserDropdown from "./UserDropdown"

interface DashboardNavbarProps {
  userInfo: IUserInfo
  navItems: NavSection[]
  dashboardHome: string
}

const DashboardNavbarContent = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/95 backdrop-blur-sm px-4">
      {/* Mobile hamburger */}
      <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 border-r border-sidebar-border bg-sidebar">
          <DashboardMobileSidebar
            userInfo={userInfo}
            dashboardHome={dashboardHome}
            navItems={navItems}
          />
        </SheetContent>
      </Sheet>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div
          className={`relative transition-all duration-200 hidden sm:block ${
            searchFocused ? "max-w-md" : "max-w-xs"
          }`}
        >
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 transition-colors duration-150 ${
              searchFocused ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <Input
            type="text"
            placeholder="Search patients, appointments..."
            className="pl-9 h-9 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-background rounded-full text-sm placeholder:text-muted-foreground/60 transition-all"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {/* Keyboard shortcut hint */}
          {!searchFocused && (
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5 text-[10px] font-medium text-muted-foreground/50">
              <span className="border border-border/60 rounded px-1 py-0.5">⌘K</span>
            </kbd>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5 ml-auto">
        <NotificationDropdown />
        <div className="h-5 w-px bg-border/60 mx-1" />
        <UserDropdown userInfo={userInfo} />
      </div>
    </header>
  )
}

export default DashboardNavbarContent