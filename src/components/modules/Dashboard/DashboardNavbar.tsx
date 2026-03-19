import { Bell, Search, User, Settings, LogOut, ChevronDown } from "lucide-react";

const DashboardNavbar = () => {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-300">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
                <div className="relative group transition-all">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for patients or dates..."
                        className="block w-full h-12 pl-12 pr-4 bg-gray-50 border-0 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all ring-offset-2 ring-offset-white"
                    />
                </div>
            </div>

            {/* Profile and Actions */}
            <div className="flex items-center space-x-6 ml-10">
                {/* Notifications */}
                <button className="relative p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group">
                    <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                    <span className="absolute top-2.5 right-2.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-white"></span>
                    </span>
                </button>

                {/* Vertical Divider */}
                <div className="h-8 w-px bg-gray-100 mx-2"></div>

                {/* Profile Section */}
                <div className="flex items-center space-x-4 cursor-pointer group p-1 -m-1 rounded-2xl hover:bg-gray-50 transition-all">
                    <div className="flex flex-col items-end mr-1">
                        <span className="text-sm font-bold text-gray-900 tracking-tight">Dr. Alex Johnson</span>
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Cardiologist</span>
                    </div>
                    <div className="relative ring-2 ring-offset-2 ring-transparent group-hover:ring-blue-100 rounded-xl transition-all overflow-hidden shadow-md">
                        <div className="w-12 h-12 bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                            <User size={24} />
                        </div>
                    </div>
                    <ChevronDown size={16} className="text-gray-400 group-hover:text-blue-500 transition-all group-hover:translate-y-0.5" />
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
