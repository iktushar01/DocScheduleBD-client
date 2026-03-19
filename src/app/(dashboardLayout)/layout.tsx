import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar"
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar"

const RootDashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Fixed sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-64 shrink-0 fixed inset-y-0 left-0 z-40">
        <DashboardSidebar />
      </aside>

      {/* Main area: offset by sidebar width on md+ */}
      <div className="flex flex-1 flex-col min-h-screen md:pl-64">
        {/* Sticky navbar */}
        <DashboardNavbar />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl w-full px-4 py-6 md:px-6 md:py-8 animate-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default RootDashboardLayout