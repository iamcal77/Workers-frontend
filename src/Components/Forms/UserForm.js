import { NumberBox, SelectBox, TextBox } from 'devextreme-react';
import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Layout from '../Layout';

const UserForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    contact: '',
    role: '',  // Only role is updatable
  });

  // Load initial data if editing
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        username: initialData.username,
        name: initialData.name,
        email: initialData.email,
        contact: initialData.contact,
        role: initialData.role,  // Ensure the initial role is populated
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send only the id and role
    const updatedData = { id: initialData.id, role: formData.role };
    onSave(updatedData);
  };

  return (
    <Layout>
    <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-medium text-gray-700 mb-4">
        {initialData ? 'Edit User Role' : 'Add User'}
      </h2>
      <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="mb-4">

          <TextBox
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            disabled  // Disable since it won't be updated
            required
            label='Username'
            labelMode='floating'
          />
        </div>
        <div className="mb-4">
          <TextBox
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            labelMode='floating'
            label='Name'
            disabled  // Disable since it won't be updated
            required
          />
        </div>
        <div className="mb-4">
          <TextBox
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            label='Email Address'
            labelMode='floating'
            disabled  // Disable since it won't be updated
            required
          />
        </div>
        <div className="mb-4">
          <NumberBox
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            label='Contact'
            labelMode='floating'
            disabled  // Disable since it won't be updated
            required
          />
        </div>
        <div className="mb-4">
          <SelectBox
            id="role"
            name="role"
            value={formData.role}
            onValueChanged={(e) =>
              handleChange({ target: { name: 'role', value: e.value } })
            }
            className="w-full"
            label="Role"
            labelMode="floating"
            items={[
              { value: '', text: 'Select Role' },
              { value: 'Admin', text: 'Admin' },
              { value: 'User', text: 'User' },
            ]}
            displayExpr="text"
            valueExpr="value"
          />

        </div>
        </div>


        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="text-red-400 px-4 py-2 flex items-center space-x-2"
          >
            <FaTimes className="w-5 h-5" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="text-blue-500 px-4 py-2 flex items-center space-x-2"
          >
            <FaCheck className="w-5 h-5" />
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
    </Layout>

  );
};

export default UserForm;
