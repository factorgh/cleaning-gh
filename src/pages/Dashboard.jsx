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
import { getAll } from "../services-api/customerApi";
import { getAllService } from "../services-api/servicesApi";

export function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    getAllCustomers();
  }, []);
  // Get all customers
  const getAllCustomers = async () => {
    try {
      const response = await getAll();
      setCustomers(response);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);
  const fetchAllServices = async () => {
    try {
      const response = await getAllService();
      console.log(response);
      setServices(response);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const getTotalRevenue = services.reduce((total, service) => {
    return total + service.servicePrice;
  }, 0);

  // Dummy stats data
  const stats = {
    totalCustomers: { count: 150 },
    totalRevenue: { total: 53475.25 },
    mostCommonService: { service_type: "Oil Change" },
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Customers */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Customers
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {customers.length || "0"}
            </dd>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Revenue
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              ${getTotalRevenue || "0.00"}
            </dd>
          </div>
        </div>

        {/* Most Common Service */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Most Common Service
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats?.mostCommonService?.service_type || "N/A"}
            </dd>
          </div>
        </div>
      </div>

      {/* Service History Chart */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Service History
          </h2>
          <div className="h-96">
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
