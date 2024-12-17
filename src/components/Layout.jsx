/* eslint-disable react/prop-types */
import {
  ChartBarIcon,
  HomeIcon,
  TruckIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Drawer } from "antd";
import { LogInIcon, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Customers", href: "/customers", icon: UserGroupIcon },
  { name: "Cars", href: "/cars", icon: TruckIcon },
  { name: "Services", href: "/services", icon: WrenchScrewdriverIcon },
  { name: "Statistics", href: "/statistics", icon: ChartBarIcon },
  { name: "Logout", href: "/login", icon: LogInIcon },
];

export function Layout({ children }) {
  const location = useLocation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const SidebarContent = (
    <div className="flex flex-col w-64 h-full">
      <div className="flex items-center px-4 py-4 bg-gray-100">
        <h3 className="text-lg font-bold">Carbon Cleaning</h3>
      </div>
      <nav className="mt-5 flex-1 px-2 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50"
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              <item.icon
                className={`${
                  isActive
                    ? "text-primary-700"
                    : "text-gray-400 group-hover:text-gray-500"
                } mr-3 flex-shrink-0 h-6 w-6`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar for larger screens */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r">
            {SidebarContent}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden absolute top-4 right-40 z-10">
          <Menu className="w-6 h-6 mt-3" onClick={toggleDrawer} />
        </div>

        {/* Drawer for Mobile */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={toggleDrawer}
          visible={isDrawerVisible}
          closable={true}
          bodyStyle={{ padding: 0 }}
        >
          {SidebarContent}
        </Drawer>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
