import React, { useState } from 'react';
import Layout from '../Layout';
import { FaCheck, FaTimes } from 'react-icons/fa';
import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import NumberBox from 'devextreme-react/number-box';
import CheckBox from 'devextreme-react/check-box';
import SelectBox from 'devextreme-react/select-box';
import 'devextreme/dist/css/dx.light.css';

const DevExtremeForm = ({ onCancel }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [agree, setAgree] = useState(false);
  const [category, setCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      message,
      quantity,
      agree,
      category
    };

    // Handle form submission (e.g., send data to API)
    console.log(formData);
  };

  return (
    <Layout>
      <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">Form with Various Inputs</h2>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white p-6 shadow-lg rounded-lg">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
            <TextBox
              id="title"
              value={title}
              onValueChanged={(e) => setTitle(e.value)}
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <TextArea
              id="message"
              value={message}
              onValueChanged={(e) => setMessage(e.value)}
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
            <NumberBox
              id="quantity"
              value={quantity}
              onValueChanged={(e) => setQuantity(e.value)}
              className="w-full"
              min={1}
              max={100}
              required
            />
          </div>

          <div>
            <label htmlFor="agree" className="block text-lg font-medium text-gray-700">Agree to Terms</label>
            <CheckBox
              id="agree"
              value={agree}
              onValueChanged={(e) => setAgree(e.value)}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>
            <SelectBox
              id="category"
              value={category}
              onValueChanged={(e) => setCategory(e.value)}
              dataSource={categories}
              displayExpr="name"
              valueExpr="id"
              className="w-full"
              placeholder="Select a category"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onCancel}
              className="text-red-400 px-4 py-2 flex items-center space-x-2"
            >
              <FaTimes className="text-lg" /> {/* Times icon for Cancel */}
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              className="text-blue-500 px-4 py-2 flex items-center space-x-2"
            >
              <FaCheck className="text-lg" />
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DevExtremeForm;
