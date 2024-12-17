/* eslint-disable react/prop-types */
import {
  ChartBarIcon,
  HomeIcon,
  TruckIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Customers", href: "/customers", icon: UserGroupIcon },
  { name: "Cars", href: "/cars", icon: TruckIcon },
  { name: "Services", href: "/services", icon: WrenchScrewdriverIcon },
  { name: "Statistics", href: "/statistics", icon: ChartBarIcon },
];

export function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
              <div className="flex items-center flex-shrink-0 px-4">
                <img className="w-auto h-8" src="/logo.svg" alt="Car Service" />
              </div>
              <div className="mt-5 flex-grow flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
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
            </div>
          </div>
        </div>

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
