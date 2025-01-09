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
import { getAll as getAllCustomers } from "../services-api/customerApi";

export function Dashboard() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getAllCustomers();
      setCustomers(response);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  // Calculate statistics from customer data
  const getStatistics = () => {
    if (!customers.length)
      return {
        totalCustomers: 0,
        carTypeDistribution: {},
        averageEmissionsReduction: 0,
        mostCommonFuelBrand: "N/A",
      };

    // Count car types
    const carTypeDistribution = customers.reduce((acc, customer) => {
      const carType = customer.carType;
      if (carType) {
        acc[carType] = (acc[carType] || 0) + 1;
      }
      return acc;
    }, {});

    // Calculate average emissions reduction
    const emissionsReductions = customers.map((customer) => {
      const pre = parseFloat(customer?.preEmissions) || 0;
      const post = parseFloat(customer?.postEmissions) || 0;
      return pre - post;
    });

    console.log(emissionsReductions);
    const averageEmissionsReduction = emissionsReductions.length
      ? emissionsReductions.reduce((a, b) => a + b, 0) /
        emissionsReductions.length
      : 0;

    // Find most common fuel brand
    const fuelBrandCounts = customers.reduce((acc, customer) => {
      const brand = customer?.fuel;
      if (brand) {
        acc[brand] = (acc[brand] || 0) + 1;
      }
      return acc;
    }, {});
    const mostCommonFuelBrand =
      Object.entries(fuelBrandCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "N/A";

    return {
      totalCustomers: customers.length,
      carTypeDistribution,
      averageEmissionsReduction,
      mostCommonFuelBrand,
    };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-bold text-secondary-800 tracking-tight animate-slide-up">
        Dashboard
        <span className="block text-lg font-normal text-secondary-500 mt-1">
          Customer and Performance Overview
        </span>
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-slide-up">
        {/* Total Customers Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Customers
            </h3>
            <span className="text-2xl font-bold text-primary-600">
              {stats.totalCustomers}
            </span>
          </div>
        </div>

        {/* Average Emissions Reduction Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Avg. Emissions Reduction
            </h3>
            <span className="text-2xl font-bold text-green-600">
              {stats.averageEmissionsReduction.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Most Common Fuel Brand Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Popular Fuel Brand
            </h3>
            <span className="text-2xl font-bold text-blue-600">
              {stats.mostCommonFuelBrand}
            </span>
          </div>
        </div>
      </div>

      {/* Car Type Distribution Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Car Type Distribution
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={Object.entries(stats.carTypeDistribution).map(
                ([type, count]) => ({
                  type,
                  count,
                })
              )}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Emissions Improvement Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Emissions Improvements
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pre-MOT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post-MOT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Improvement
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.slice(0, 5).map((customer, index) => {
                const pre = parseFloat(customer.preEmissions) || 0;
                const post = parseFloat(customer.postEmissions) || 0;
                const improvement = (((pre - post) / pre) * 100).toFixed(1);

                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.preEmissions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.postEmissions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {improvement}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
