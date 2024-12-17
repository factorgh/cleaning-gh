import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";

import { formatValidationError } from "../lib/utils/validation";

const { Option } = Select;

export function Services() {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    car_id: "",
    service_type: "",
    service_date: new Date().toISOString().split("T")[0],
    cost: "",
    notes: "",
  });
  const [error, setError] = useState("");

  // Query for services and cars
  // Dummy cars and services data for demo
  const services = [
    {
      id: 1,
      car_id: 101,
      make: "Toyota",
      model: "Camry",
      registration_number: "ABC123",
      service_type: "Oil Change",
      service_date: "2024-05-10",
      cost: 50.0,
      notes: "Changed oil and checked filters.",
    },
    {
      id: 2,
      car_id: 102,
      make: "Honda",
      model: "Civic",
      registration_number: "XYZ456",
      service_type: "Tire Rotation",
      service_date: "2024-05-12",
      cost: 30.0,
      notes: "",
    },
    {
      id: 3,
      car_id: 103,
      make: "Ford",
      model: "Focus",
      registration_number: "DEF789",
      service_type: "Brake Inspection",
      service_date: "2024-05-15",
      cost: 70.0,
      notes: "Brakes are in good condition.",
    },
  ];

  const cars = [
    {
      id: 101,
      make: "Toyota",
      model: "Camry",
      registration_number: "ABC123",
    },
    {
      id: 102,
      make: "Honda",
      model: "Civic",
      registration_number: "XYZ456",
    },
    {
      id: 103,
      make: "Ford",
      model: "Focus",
      registration_number: "DEF789",
    },
  ];

  // Mutation for adding service

  // Handle form submission and validation
  const handleSubmit = async () => {
    try {
      // Trigger the mutation to add the service
      console.log(formData);
    } catch (err) {
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
            <Form.Item label="Car" name="car_id" required>
              <Select
                value={formData.car_id}
                onChange={(value) =>
                  setFormData({ ...formData, car_id: value })
                }
                placeholder="Select a Car"
              >
                {cars?.map((car) => (
                  <Option key={car.id} value={car.id}>
                    {car.make} {car.model} - {car.registration_number}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Service Type Input */}
            <Form.Item label="Service Type" name="service_type" required>
              <Input
                value={formData.service_type}
                onChange={(e) =>
                  setFormData({ ...formData, service_type: e.target.value })
                }
                placeholder="Enter service type"
              />
            </Form.Item>

            {/* Service Date Input */}
            <Form.Item label="Service Date" name="service_date" required>
              <Input
                type="date"
                value={formData.service_date}
                onChange={(e) =>
                  setFormData({ ...formData, service_date: e.target.value })
                }
              />
            </Form.Item>

            {/* Cost Input */}
            <Form.Item label="Cost" name="cost" required>
              <InputNumber
                value={formData.cost}
                onChange={(value) => setFormData({ ...formData, cost: value })}
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
              <Button type="primary" htmlType="submit">
                Save Service
              </Button>
            </div>
          </Form>
        </Card>
      )}

      {/* Display list of services */}
      <div className="space-y-6">
        {services?.map((service) => (
          <Card key={service.id} title={service.service_type}>
            <div>
              <p>
                {service.make} {service.model} - {service.registration_number}
              </p>
              <p>Cost: ${service.cost.toFixed(2)}</p>
              <p>Date: {new Date(service.service_date).toLocaleDateString()}</p>
              {service.notes && <p>Notes: {service.notes}</p>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
