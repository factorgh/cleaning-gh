import { Button, Card, Input, Select } from "antd";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { formatValidationError } from "../lib/utils/validation";
import {
  createCars,
  deleteCar,
  getAllCars,
  updateCar,
} from "../services-api/carApi";
import { getAll as getAllCustomersAPI } from "../services-api/customerApi"; // Clear import alias

const { Option } = Select;

/**
 * Cars Management Component
 *
 * This component handles the display and management of cars in the service system.
 * It allows adding new cars and viewing existing ones with their owner details.
 *
 * Dependencies Required:
 * - antd: npm install antd
 * - react: npm install react react-dom
 * - tailwindcss: (see tailwind.config.js for setup)
 *
 * @component
 */

export function Cars() {
  const [isAdding, setIsAdding] = useState(false);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
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

      if (isEditing) {
        await updateCar(editId, formData);
      } else {
        await createCars(validatedData);
      }
      fetchAllCars();
      setIsAdding(false);
    } catch (err) {
      setError(formatValidationError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditing = (customer) => {
    setIsAdding(true);
    setIsEditing(true);
    setEditId(customer._id);
    setFormData(customer);
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
        await deleteCar(itemId);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto animate-fade-in bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 tracking-tight group">
            Cars
            <div className="h-1 w-16 bg-primary-500 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
          </h1>
          <p className="mt-2 text-sm text-secondary-600">
            Manage your fleet and vehicle information
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
          Add Car
        </Button>
      </div>

      {isAdding && (
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300 rounded-xl animate-slide-up bg-white/80 backdrop-blur-sm border border-primary-100">
          <div className="border-b border-secondary-200 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              {isEditing ? "Edit Car" : "Add New Car"}
            </h2>
            <p className="text-sm text-secondary-600">
              Register a new vehicle in the system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              {/* Owner Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700 flex items-center gap-2">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Owner
                </label>
                <Select
                  value={formData.owner}
                  onChange={(value) =>
                    setFormData({ ...formData, owner: value })
                  }
                  className="w-full hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700 flex items-center gap-2">
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
                  Make
                </label>
                <Input
                  value={formData.make}
                  onChange={(e) =>
                    setFormData({ ...formData, make: e.target.value })
                  }
                  className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                  placeholder="Enter car make"
                  required
                />
              </div>

              {/* Model Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700 flex items-center gap-2">
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
                  Model
                </label>
                <Input
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                  className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                  placeholder="Enter car model"
                  required
                />
              </div>

              {/* Year Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700 flex items-center gap-2">
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
                  className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                  required
                />
              </div>

              {/* Similar styling for remaining fields... */}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-secondary-200">
              <Button
                onClick={() => setIsAdding(false)}
                className="hover:bg-secondary-50 transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="bg-primary-600 hover:bg-primary-700 transform hover:scale-102 active:scale-98 transition-all duration-200"
              >
                Save Car
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars?.map((car, index) => (
          <Card
            key={car.id}
            className="group bg-white/80 backdrop-blur-sm hover:shadow-card-hover transition-all duration-300 transform hover:scale-102 hover:-translate-y-1 border border-secondary-200 hover:border-primary-200"
            style={{
              "--animation-delay": `${index * 100}ms`,
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                    {car.make} {car.model}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-1">
                    {car.year}
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Owner: {car.owner.name}
                </p>
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Fuel Type: {car.fuelType}
                </p>
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
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  Registration: {car.registrationNumber}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-secondary-200 flex justify-end space-x-2">
                <button
                  onClick={() => handleEditing(car)}
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
                  onClick={() => handleDelete(car._id)}
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
