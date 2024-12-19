import { Button, Card, Input, Select } from "antd";
import { useEffect, useState } from "react";

import { formatValidationError } from "../lib/utils/validation";
import { createCars, getAllCars } from "../services-api/carApi";
import { getAll as getAllCustomersAPI } from "../services-api/customerApi"; // Clear import alias

const { Option } = Select;

export function Cars() {
  const [isAdding, setIsAdding] = useState(false);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    owner: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    fuelType: "",
    registrationNumber: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllCars();
    fetchAllCustomers();
  }, []);

  const fetchAllCars = async () => {
    try {
      const response = await getAllCars();
      console.log(response);
      setCars(response);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  const fetchAllCustomers = async () => {
    try {
      const response = await getAllCustomersAPI();
      setCustomers(response);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const validatedData = {
        ...formData,

        year: Math.min(
          parseInt(String(formData.year)),
          new Date().getFullYear() + 1
        ),
      };

      await createCars(validatedData);
      fetchAllCars();
      setIsAdding(false);
    } catch (err) {
      setError(formatValidationError(err));
    } finally {
      setIsLoading(false);
    }
  };

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
            {/* Owner Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner
              </label>
              <Select
                value={formData.owner}
                onChange={(value) => setFormData({ ...formData, owner: value })}
                className="mt-1 w-full"
                placeholder="Select Owner"
                required
              >
                {customers?.map((owner) => (
                  <Option key={owner._id} value={owner._id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>
            </div>
            {/* Make Field */}
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
            {/* Rest of the fields are unchanged */}
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
            {/* Similar changes for remaining fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <Input
                value={formData.fuelType}
                onChange={(e) =>
                  setFormData({ ...formData, fuelType: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registration Number
              </label>
              <Input
                value={formData.registrationNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registrationNumber: e.target.value,
                  })
                }
                required
              />
            </div>
            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <Button
                type="default"
                onClick={() => setIsAdding(false)}
                size="middle"
              >
                Cancel
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                size="middle"
              >
                Save Car
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars?.map((car) => (
          <Card key={car.id} title={`${car.make} ${car.model}`}>
            <p>Owner: {car.owner.name}</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>Registration: {car.registrationNumber}</p>
            <p>Year: {car.year}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
