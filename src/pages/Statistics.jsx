import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "../components/ui/Card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export function Statistics() {
  const stats = {
    totalCustomers: { count: 123 },
    totalRevenue: { total: 45870.5 },
    mostCommonService: { service_type: "Oil Change", count: 56 },
    mostFrequentCustomer: { name: "John Doe", visit_count: 15 },
    mostServicedCar: {
      make: "Toyota",
      model: "Camry",
      service_count: 20,
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Statistics</h1>

      {/* Key Metric Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-900">
              Total Customers
            </h3>
            <p className="mt-2 text-3xl font-semibold text-primary-600">
              {stats?.totalCustomers.count}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
            <p className="mt-2 text-3xl font-semibold text-primary-600">
              ${stats?.totalRevenue.total?.toFixed(2) || "0.00"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-900">
              Most Common Service
            </h3>
            <p className="mt-2 text-xl font-medium text-gray-700">
              {stats?.mostCommonService?.service_type}
            </p>
            <p className="text-sm text-gray-500">
              {stats?.mostCommonService?.count} times
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphs and Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Most Frequent Customer Pie Chart */}
        <Card>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Most Frequent Customer
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: stats?.mostFrequentCustomer?.name,
                        value: stats?.mostFrequentCustomer?.visit_count,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[0].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Most Serviced Car Bar Chart */}
        <Card>
          <CardContent>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Most Serviced Car
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: `${stats?.mostServicedCar?.make} ${stats?.mostServicedCar?.model}`,
                      services: stats?.mostServicedCar?.service_count,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="services" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
