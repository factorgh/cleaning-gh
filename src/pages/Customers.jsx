import {
  Button as AntButton,
  Card as AntCard,
  Input as AntInput,
  Select as AntSelect,
} from "antd";
import { useState } from "react";
import { formatValidationError } from "../lib/utils/validation";

export function Customers() {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "individual",
  });
  const [error, setError] = useState("");

  // Dummy customers array with mock data
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Springfield",
      type: "individual",
    },
    {
      id: 2,
      name: "TechCorp Ltd.",
      email: "contact@techcorp.com",
      phone: "555-987-6543",
      address: "456 Business Ave, Metropolis",
      type: "company",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "janesmith@email.com",
      phone: "987-654-3210",
      address: "789 Park Lane, Gotham City",
      type: "individual",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
    } catch (err) {
      if (err instanceof Error) {
        setError(formatValidationError(err));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <AntButton type="primary" onClick={() => setIsAdding(true)}>
          Add Customer
        </AntButton>
      </div>

      {isAdding && (
        <AntCard>
          <h2 className="text-lg font-medium">Add New Customer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>
            )}
            <AntInput
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <AntInput
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <AntInput
              placeholder="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <AntInput
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer Type
              </label>
              <AntSelect
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
                className="mt-1 block w-full rounded-md"
              >
                <AntSelect.Option value="individual">
                  Individual
                </AntSelect.Option>
                <AntSelect.Option value="company">Company</AntSelect.Option>
              </AntSelect>
            </div>
            <div className="flex justify-end space-x-3">
              <AntButton
                variant="secondary"
                onClick={() => setIsAdding(false)}
                type="button"
              >
                Cancel
              </AntButton>
              <AntButton type="primary" htmlType="submit">
                Save Customer
              </AntButton>
            </div>
          </form>
        </AntCard>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customers?.map((customer) => (
          <AntCard key={customer.id}>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{customer.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {customer.type}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <p>{customer.email}</p>
                {customer.phone && <p>{customer.phone}</p>}
                {customer.address && <p>{customer.address}</p>}
              </div>
            </div>
          </AntCard>
        ))}
      </div>
    </div>
  );
}
