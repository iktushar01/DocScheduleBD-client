import { Home, Calendar, Users, Settings, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

const DashboardSidebar = () => {
    const navItems = [
        { icon: <Home size={20} />, label: "Overview", href: "/dashboard" },
        { icon: <Calendar size={20} />, label: "Appointments", href: "/dashboard/appointments" },
        { icon: <Users size={20} />, label: "Patients", href: "/dashboard/patients" },
        { icon: <Settings size={20} />, label: "Settings", href: "/dashboard/settings" },
    ];

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 shadow-sm transition-all duration-300 ease-in-out">
            {/* Logo Section */}
            <div className="p-6 flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Calendar size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">DocSchedule</h1>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Healthcare Pro</p>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all group"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                                {item.icon}
                            </span>
                            <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                ))}
            </nav>

            {/* Footer Section (Logout) */}
            <div className="p-4 mt-auto border-t border-gray-50 bg-gray-50/50">
                <button className="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all group">
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold text-sm">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
