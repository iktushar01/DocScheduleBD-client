import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/lib/NavItems";
import { getUserInfo } from "@/services/auth.services";
import { NavSection } from "@/types/dashboard.types";
import Link from "next/link";

const DashboardSidebar = async() => {
    const userInfo = await getUserInfo();
    const navItems : NavSection[] = getNavItemsByRole(userInfo?.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
    

    return (
        
    );
};

export default DashboardSidebar;
