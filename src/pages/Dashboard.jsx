import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAllCars } from "../services-api/carApi";
import { getAll } from "../services-api/customerApi";
import { getAllService } from "../services-api/servicesApi";

export function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getAllCustomers();
  }, []);
  // Get all customers
  const getAllCustomers = async () => {
    try {
      const response = await getAll();
      setCustomers(response);
      console.error("Error fetching customers:", err);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);
  const fetchAllServices = async () => {
    try {
      const response = await getAllService();
      console.error("Error fetching services:", err);
      setServices(response);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const response = await getAllCars();
      setCars(response);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  const getTotalRevenue = services.reduce((total, service) => {
    return total + service.servicePrice;
  }, 0);

  const getMostCommonCar = () => {
    if (!services.length || !cars.length) return "N/A";

    const carFrequency = services.reduce((acc, service) => {
      const carId = service.car._id;
      acc[carId] = (acc[carId] || 0) + 1;
      return acc;
    }, {});

    const mostCommonCarId = Object.entries(carFrequency).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0];

    const mostCommonCar = cars.find((car) => car._id === mostCommonCarId);
    return mostCommonCar
      ? `${mostCommonCar.make} ${mostCommonCar.model}`
      : "N/A";
  };

  const getMostCommonService = () => {
    if (!services.length) return "N/A";

    const serviceFrequency = services.reduce((acc, service) => {
      const serviceType = service.serviceType;
      acc[serviceType] = (acc[serviceType] || 0) + 1;
      return acc;
    }, {});

    const mostCommonService = Object.entries(serviceFrequency).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0];

    return mostCommonService || "N/A";
  };

  if (!customers || !services || !cars) return <div>Loading...</div>;

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-bold text-secondary-800 tracking-tight animate-slide-up">
        Dashboard
        <span className="block text-lg font-normal text-secondary-500 mt-1">
          Welcome back to your overview
        </span>
      </h1>

      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-slide-up"
        style={{ "--animation-delay": "200ms" }}
      >
        {/* Total Customers Card */}
        <div
          className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover active:shadow-card-active 
                        transition-all duration-300 ease-in-out transform hover:scale-102 hover:-translate-y-1 overflow-hidden"
        >
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p
                  className="text-sm font-medium text-secondary-600 group-hover:text-primary-600 
                             transition-colors duration-200"
                >
                  Total Customers
                </p>
                <p
                  className="text-3xl font-bold text-secondary-900 group-hover:text-primary-700 
                             transition-colors duration-200"
                >
                  {customers.length || "0"}
                </p>
              </div>
              <div
                className="p-3 bg-primary-50 rounded-xl group-hover:bg-primary-100 
                             transition-colors duration-200 animate-float"
              >
                <svg
                  className="w-8 h-8 text-primary-500 group-hover:text-primary-600 
                             transition-colors duration-200 transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center text-success-500 bg-success-50 px-2.5 py-1 rounded-full">
                <svg
                  className="w-4 h-4 mr-1 animate-bounce-slow"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  />
                </svg>
                <span className="text-sm font-medium">12% increase</span>
              </div>
              <span className="text-sm text-secondary-400">vs last month</span>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-primary-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
        </div>

        {/* Most Common Car Card */}
        <div
          className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover active:shadow-card-active 
                        transition-all duration-300 ease-in-out transform hover:scale-102 hover:-translate-y-1 overflow-hidden"
        >
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-secondary-600 group-hover:text-success-600 transition-colors duration-200">
                  Most Common Car
                </p>
                <p className="text-3xl font-bold text-secondary-900 group-hover:text-success-700 transition-colors duration-200">
                  {getMostCommonCar()}
                </p>
              </div>
              <div className="p-3 bg-success-50 rounded-xl group-hover:bg-success-100 transition-colors duration-200 animate-float">
                <svg
                  className="w-8 h-8 text-primary-500 group-hover:text-primary-600 
                             transition-colors duration-200 transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center text-success-500 bg-success-50 px-2.5 py-1 rounded-full">
                <span className="text-sm font-medium">
                  Most serviced vehicle
                </span>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-primary-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
        </div>

        {/* Most Common Service Card */}
        <div
          className="group bg-white rounded-2xl shadow-card hover:shadow-card-hover active:shadow-card-active 
                        transition-all duration-300 ease-in-out transform hover:scale-102 hover:-translate-y-1 overflow-hidden"
        >
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-secondary-600 group-hover:text-warning-600 transition-colors duration-200">
                  Most Common Service
                </p>
                <p className="text-3xl font-bold text-secondary-900 group-hover:text-warning-700 transition-colors duration-200">
                  {getMostCommonService()}
                </p>
              </div>
              <div className="p-3 bg-warning-50 rounded-xl group-hover:bg-warning-100 transition-colors duration-200 animate-float">
                <svg
                  className="w-8 h-8 text-primary-500 group-hover:text-primary-600 
                             transition-colors duration-200 transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex items-center text-warning-500 bg-warning-50 px-2.5 py-1 rounded-full">
                <span className="text-sm font-medium">
                  Most requested service
                </span>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-primary-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
        </div>
      </div>

      {/* Service History Chart */}
      <div
        className="mt-8 animate-slide-up"
        style={{ "--animation-delay": "400ms" }}
      >
        <div
          className="bg-white rounded-2xl shadow-card hover:shadow-card-hover 
                        transition-all duration-300 p-6 transform hover:scale-[1.01]"
        >
          <h2 className="text-xl font-semibold text-secondary-900 mb-6">
            Service History
            <span className="block text-sm font-normal text-secondary-500 mt-1">
              Monthly service breakdown
            </span>
          </h2>
          <div className="h-96 transition-all duration-300 ease-in-out">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Jan", services: 4 },
                  { name: "Feb", services: 3 },
                  { name: "Mar", services: 2 },
                  { name: "Apr", services: 7 },
                  { name: "May", services: 5 },
                  { name: "Jun", services: 8 },
                ]}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="services" fill="#6687f7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
