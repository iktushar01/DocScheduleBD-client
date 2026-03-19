import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";

const RootDashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
        {/* dashboard sidebar */}
        <DashboardSidebar />
        
        {/* main content area */}
        <div className="flex-1 ml-64 flex flex-col transition-all duration-300">
            {/* dashboard navbar */}
            <DashboardNavbar />
            
            {/* dashboard content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-6">
                    {children}
                </div>
            </main>
        </div>
    </div>
  );
}

export default RootDashboardLayout;