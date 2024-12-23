import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { formatValidationError } from "../lib/utils/validation";
import { getAllCars } from "../services-api/carApi";
import {
  createService,
  deleteService,
  getAllService,
  updateService,
} from "../services-api/servicesApi";

const { Option } = Select;

const SERVICE_TYPES = {
  CARBON_CLEANING: "Carbon Cleaning",
  HYBRID_CLEANING: "Hybrid Dynamic Fab Cleaning",
  PRE_MOT: "Pre-MOT Test",
};

export function Services() {
  const [isAdding, setIsAdding] = useState(false);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    car: "",
    serviceType: "",
    serviceDate: new Date().toISOString().split("T")[0],
    servicePrice: "",
    notes: "",
    motResults: "",
    status: "pending",
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
      if (isEditing) {
        await updateService(editId, formData);
      } else {
        await createService(formData);
      }
      setIsAdding(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(formatValidationError(err));
    }
  };

  const handleEditing = (service) => {
    setIsAdding(true);
    setIsEditing(true);
    setEditId(service._id);
    setFormData(service);
  };

  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Perform the delete operation
        await deleteService(itemId);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto animate-fade-in bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 tracking-tight group">
            Services
            <div className="h-1 w-16 bg-primary-500 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
          </h1>
          <p className="mt-2 text-sm text-secondary-600">
            Manage and track service records
          </p>
        </div>
        <Button
          type="primary"
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 transform hover:scale-102 active:scale-98 transition-all duration-200 shadow-lg hover:shadow-xl"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        >
          Add Service
        </Button>
      </div>

      {isAdding && (
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 rounded-xl animate-slide-up bg-white/80 backdrop-blur-sm border border-primary-100">
          <div className="border-b border-secondary-200 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              {isEditing ? "Edit Service" : "Add New Service"}
            </h2>
            <p className="text-sm text-secondary-600">
              Record a new service entry
            </p>
          </div>

          <Form
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={formData}
            className="space-y-6"
          >
            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 p-4 rounded-lg animate-bounce-slow flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-error-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {/* Car Selection */}
              <Form.Item
                label={
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-primary-500"
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
                    Car
                  </span>
                }
                name="car"
                required
              >
                <Select
                  value={formData.car}
                  onChange={(value) => setFormData({ ...formData, car: value })}
                  className="w-full hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                  placeholder="Select a Car"
                >
                  {cars?.map((car) => (
                    <Option key={car._id} value={car._id}>
                      {car.make} {car.model} - {car.registrationNumber}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Service Type Selection */}
              <Form.Item
                label={
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Service Type
                  </span>
                }
                name="serviceType"
                required
              >
                <Select
                  value={formData.serviceType}
                  onChange={(value) =>
                    setFormData({ ...formData, serviceType: value })
                  }
                  className="w-full hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                  placeholder="Select service type"
                >
                  {Object.values(SERVICE_TYPES).map((type) => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Service Date Input */}
              <Form.Item
                label={
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Service Date
                  </span>
                }
                name="serviceDate"
                required
              >
                <Input
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceDate: e.target.value })
                  }
                  className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                />
              </Form.Item>

              {/* Cost Input */}
              <Form.Item
                label={
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Cost
                  </span>
                }
                name="servicePrice"
                required
              >
                <InputNumber
                  value={formData.servicePrice}
                  onChange={(value) =>
                    setFormData({ ...formData, servicePrice: value })
                  }
                  className="w-full hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                  min={0}
                  step={0.01}
                  formatter={(value) => `$ ${value}`}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              {/* MOT Results */}
              {formData.serviceType === SERVICE_TYPES.PRE_MOT && (
                <Form.Item
                  label={
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-primary-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      MOT Results
                    </span>
                  }
                  name="motResults"
                  className="col-span-2"
                >
                  <Input.TextArea
                    value={formData.motResults}
                    onChange={(e) =>
                      setFormData({ ...formData, motResults: e.target.value })
                    }
                    className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                    placeholder="Enter MOT test results and observations"
                    rows={3}
                  />
                </Form.Item>
              )}

              {/* Notes Textarea */}
              <Form.Item
                label={
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Additional Notes
                  </span>
                }
                name="notes"
                className="col-span-2"
              >
                <Input.TextArea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                  placeholder="Add any additional notes about the service"
                  rows={3}
                />
              </Form.Item>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-secondary-200">
              <Button
                onClick={() => setIsAdding(false)}
                className="hover:bg-secondary-50 transition-all duration-200 flex items-center gap-2"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                }
              >
                Cancel
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="bg-primary-600 hover:bg-primary-700 transform hover:scale-102 active:scale-98 transition-all duration-200 flex items-center gap-2"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                }
              >
                Save Service
              </Button>
            </div>
          </Form>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services?.map((service, index) => (
          <Card
            key={service.id}
            className={`group bg-white/80 backdrop-blur-sm hover:shadow-card-hover transition-all duration-300 
                       transform hover:scale-102 hover:-translate-y-1 border border-secondary-200 
                       hover:border-primary-200 ${
                         service.serviceType === SERVICE_TYPES.PRE_MOT
                           ? "border-l-4 border-l-warning-500"
                           : ""
                       }`}
            style={{
              "--animation-delay": `${index * 100}ms`,
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                    {service.serviceType}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-1">
                    {new Date(service.serviceDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="p-2 bg-secondary-50 rounded-full group-hover:bg-primary-50 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-secondary-400 group-hover:text-primary-500 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-sm text-secondary-600 space-y-2">
                <p className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-secondary-400"
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
                  {service.car.make} {service.car.model}
                </p>
                <p className="flex items-center text-success-600">
                  <svg
                    className="w-4 h-4 mr-2 text-success-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  ${service.servicePrice.toFixed(2)}
                </p>
                {service.notes && (
                  <p className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-secondary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {service.notes}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-secondary-200 flex justify-end space-x-2">
                <button
                  onClick={() => handleEditing(service)}
                  className="p-2 hover:bg-primary-50 rounded-full transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="p-2 hover:bg-error-50 rounded-full transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 text-error-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Add MOT Results display if available */}
              {service.serviceType === SERVICE_TYPES.PRE_MOT &&
                service.motResults && (
                  <div className="mt-4 p-3 bg-warning-50 rounded-lg">
                    <h4 className="text-sm font-medium text-warning-700 mb-2">
                      MOT Results
                    </h4>
                    <p className="text-sm text-warning-600">
                      {service.motResults}
                    </p>
                  </div>
                )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
