import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";

import { formatValidationError } from "../lib/utils/validation";
import { getAllCars } from "../services-api/carApi";
import { createService, getAllService } from "../services-api/servicesApi";

const { Option } = Select;

export function Services() {
  const [isAdding, setIsAdding] = useState(false);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    car: "",
    serviceType: "",
    serviceDate: new Date().toISOString().split("T")[0],
    servicePrice: "",
    notes: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    fetchAllCars();
    fetchAllServices();
  }, []);

  const fetchAllCars = async () => {
    try {
      const response = await getAllCars(); // Assuming `getAllCars` fetches data
      setCars(response);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  const fetchAllServices = async () => {
    try {
      const response = await getAllService();
      console.log(response);
      setServices(response);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  // Handle form submission and validation
  const handleSubmit = async () => {
    try {
      // Trigger the mutation to add the service
      console.log(formData);
      setIsLoading(true);
      await createService(formData);
      setIsAdding(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(formatValidationError(err));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Service button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
        <Button type="primary" onClick={() => setIsAdding(true)}>
          Add Service
        </Button>
      </div>

      {/* Add New Service Form */}
      {isAdding && (
        <Card title="Add New Service">
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={formData}
          >
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>
            )}

            {/* Car Selection */}
            <Form.Item label="Car" name="car" required>
              <Select
                value={formData.car}
                onChange={(value) => setFormData({ ...formData, car: value })}
                placeholder="Select a Car"
              >
                {cars?.map((car) => (
                  <Option key={car._id} value={car._id}>
                    {car.make} {car.model} - {car.registrationNumber}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Service Type Input */}
            <Form.Item label="Service Type" name="serviceType" required>
              <Input
                value={formData.serviceType}
                onChange={(e) =>
                  setFormData({ ...formData, serviceType: e.target.value })
                }
                placeholder="Enter service type"
              />
            </Form.Item>

            {/* Service Date Input */}
            <Form.Item label="Service Date" name="serviceDate" required>
              <Input
                type="date"
                value={formData.serviceDate}
                onChange={(e) =>
                  setFormData({ ...formData, serviceDate: e.target.value })
                }
              />
            </Form.Item>

            {/* Cost Input */}
            <Form.Item label="Cost" name="servicePrice" required>
              <InputNumber
                value={formData.servicePrice}
                onChange={(value) =>
                  setFormData({ ...formData, servicePrice: value })
                }
                min={0}
                step={0.01}
                formatter={(value) => `$ ${value}`}
                parser={(value) => value.replace("$", "")}
              />
            </Form.Item>

            {/* Notes Textarea */}
            <Form.Item label="Notes" name="notes">
              <Input.TextArea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Add any notes"
                rows={3}
              />
            </Form.Item>

            {/* Buttons: Cancel and Save Service */}
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setIsAdding(false)}
                type="default"
                htmlType="button"
              >
                Cancel
              </Button>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Save Service
              </Button>
            </div>
          </Form>
        </Card>
      )}

      {/* Display list of services */}
      <div className="space-y-6">
        {services?.map((service) => (
          <Card key={service.id} title={service.serviceType}>
            <div>
              <p>
                {service.car.make} {service.car.model} -{" "}
                {service.car.registrationNumber}
              </p>
              <p>Cost: ${service.servicePrice.toFixed(2)}</p>
              <p>Date: {new Date(service.serviceDate).toLocaleDateString()}</p>
              {service.notes && <p>Notes: {service.notes}</p>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
