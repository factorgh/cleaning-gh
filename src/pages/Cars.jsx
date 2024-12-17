import { useQuery } from "@tanstack/react-query";
import { Button, Card, Input, Select } from "antd";
import { useState } from "react";

import { formatValidationError } from "../lib/utils/validation";
import { getAllCars } from "../services-api/carApi";
import { getAll } from "../services-api/customerApi";

const { Option } = Select;

export function Cars() {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    fuel_type: "",
    registration_number: "",
  });
  const [error, setError] = useState("");

  const { data: cars, isLoading: carsLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: getAllCars,
  });
  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getAll,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validated = {
        ...formData,
        customer_id: parseInt(formData.customer_id),
        year: parseInt(String(formData.year)),
      };
      console.log(JSON.stringify(validated));
    } catch (err) {
      setError(formatValidationError(err));
    }
  };

  if (carsLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Cars</h1>
        <Button type="primary" onClick={() => setIsAdding(true)}>
          Add Car
        </Button>
      </div>

      {isAdding && (
        <Card title="Add New Car">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner
              </label>
              <Select
                value={formData.customer_id}
                onChange={(value) =>
                  setFormData({ ...formData, customer_id: value })
                }
                className="mt-1 w-full"
                placeholder="Select Owner"
                required
              >
                {customers?.map((customer) => (
                  <Option key={customer.id} value={customer.id}>
                    {customer.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Make
              </label>
              <Input
                value={formData.make}
                onChange={(e) =>
                  setFormData({ ...formData, make: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <Input
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <Input
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <Input
                value={formData.fuel_type}
                onChange={(e) =>
                  setFormData({ ...formData, fuel_type: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registration Number
              </label>
              <Input
                value={formData.registration_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_number: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                type="default"
                onClick={() => setIsAdding(false)}
                size="middle"
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" size="middle">
                Save Car
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars?.map((car) => (
          <Card key={car.id} title={`${car.make} ${car.model}`}>
            <p>Owner: {car.owner_name}</p>
            <p>Fuel Type: {car.fuel_type}</p>
            <p>Registration: {car.registration_number}</p>
            <p>Year: {car.year}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
