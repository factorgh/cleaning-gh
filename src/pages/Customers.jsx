/**
 * Customers Management Component
 *
 * This component handles the display and management of customer data in the car service
 * management system. It includes features for viewing, adding, and managing customer information.
 *
 * Dependencies Required:
 * - antd: npm install antd
 * - react: npm install react react-dom
 * - tailwindcss: (see tailwind.config.js for setup)
 *
 * @component
 *
 * State Management:
 * - isAdding: Controls the visibility of the add customer form
 * - isLoading: Manages loading states during API calls
 * - customers: Stores the list of customers
 * - formData: Manages the form input data
 * - error: Handles error messages
 *
 * API Integration:
 * - getAll: Fetches all customers
 * - createCustomer: Creates a new customer
 *
 * @author Your Name
 * @version 1.0.0
 */

import {
  Button as AntButton,
  Card as AntCard,
  Input as AntInput,
  Select as AntSelect,
} from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { formatValidationError } from "../lib/utils/validation";
import {
  createCustomer,
  deleteCustomer,
  getAll,
  updateCustomer,
} from "../services-api/customerApi";

export function Customers() {
  /**
   * State management for customer data and UI controls
   */
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "individual",
  });
  const [error, setError] = useState("");

  /**
   * Fetches all customers on component mount
   */
  useEffect(() => {
    getAllCustomers();
  }, []);

  /**
   * Retrieves customer data from the API
   * @async
   * @function getAllCustomers
   */
  const getAllCustomers = async () => {
    try {
      const response = await getAll();
      setCustomers(response);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  /**
   * Handles the submission of the customer creation form
   * @async
   * @function handleSubmit
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateCustomer(editId, formData);
      } else {
        await createCustomer(formData);
      }
      getAllCustomers();
      setIsAdding(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(formatValidationError(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (isEditing) {
  //     setFormData({
  //       name:
  //       email:
  //       phone:
  //       address:
  //       type:
  //     });
  //   }
  // }, [customers, isEditing]);

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
        await deleteCustomer(itemId);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto animate-fade-in bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 tracking-tight group">
            Customers
            <div className="h-1 w-20 bg-primary-500 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
          </h1>
          <p className="mt-2 text-sm text-secondary-600">
            Manage and track your customer relationships
          </p>
        </div>
        <AntButton
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          }
        >
          Add Customer
        </AntButton>
      </div>

      {isAdding && (
        <AntCard className="shadow-card hover:shadow-card-hover transition-all duration-300 rounded-xl animate-slide-up bg-white/80 backdrop-blur-sm border border-primary-100">
          <div className="border-b border-secondary-200 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">
              {isEditing ? "Edit Customer" : "Add New Customer "}
            </h2>
            <p className="text-sm text-secondary-600">
              Fill in the details to create a new customer profile
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
                  Name
                </label>
                <AntInput
                  placeholder="Enter customer name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                />
              </div>

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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email
                </label>
                <AntInput
                  type="email"
                  placeholder="customer@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                />
              </div>

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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Phone
                </label>
                <AntInput
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                />
              </div>

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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Address
                </label>
                <AntInput
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                />
              </div>

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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Customer Type
                </label>
                <AntSelect
                  value={formData.type}
                  onChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                  className="w-full hover:border-primary-400 focus:border-primary-500 transition-all duration-200"
                >
                  <AntSelect.Option value="individual">
                    Individual
                  </AntSelect.Option>
                  <AntSelect.Option value="company">Company</AntSelect.Option>
                </AntSelect>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-secondary-200">
              <AntButton
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
              </AntButton>
              <AntButton
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
                Save Customer
              </AntButton>
            </div>
          </form>
        </AntCard>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customers?.map((customer, index) => (
          <AntCard
            key={customer.id}
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
                    {customer.name}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1
                    ${
                      customer.type === "individual"
                        ? "bg-primary-100 text-primary-800"
                        : "bg-secondary-100 text-secondary-800"
                    }`}
                  >
                    {customer.type}
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
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="text-sm text-secondary-600 space-y-3">
                <p className="flex items-center group/item hover:text-primary-600 transition-colors duration-200">
                  <svg
                    className="w-4 h-4 mr-2 text-secondary-400 group-hover/item:text-primary-500 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {customer.email}
                </p>
                {customer.phone && (
                  <p className="flex items-center group/item hover:text-primary-600 transition-colors duration-200">
                    <svg
                      className="w-4 h-4 mr-2 text-secondary-400 group-hover/item:text-primary-500 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {customer.phone}
                  </p>
                )}
                {customer.address && (
                  <p className="flex items-center group/item hover:text-primary-600 transition-colors duration-200">
                    <svg
                      className="w-4 h-4 mr-2 text-secondary-400 group-hover/item:text-primary-500 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {customer.address}
                  </p>
                )}
              </div>
              {/* Edit button  */}
              <div className="pt-4 mt-4 border-t border-secondary-200 flex justify-end space-x-2">
                <button
                  onClick={() => handleEditing(customer)}
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
                {/* Delete buton */}
                <button
                  onClick={() => handleDelete(customer._id)}
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
          </AntCard>
        ))}
      </div>
    </div>
  );
}
