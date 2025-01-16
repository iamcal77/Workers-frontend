import React from 'react';
import Layout from './Layout';
import { FcCallback, FcDocument, FcPhone, FcPrivacy } from 'react-icons/fc';
import { MdOutlineMailOutline } from 'react-icons/md';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Privacy Policy
        </h1>
        
        <p className="text-lg mb-6 text-gray-700">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use Efficio.
        </p>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FcDocument className="h-6 w-6  mr-2" />
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong className="text-gray-900">Personal Information:</strong> Includes name, email address, phone number, etc.
            </li>
            <li>
              <strong className="text-gray-900">Usage Data:</strong> Includes IP address, browser type, pages visited, and other diagnostic data.
            </li>
            <li>
              <strong className="text-gray-900">Cookies:</strong> Used to enhance your experience and analyze platform usage.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FcPrivacy className="h-6 w-6 mr-2" />
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>To operate and maintain the platform.</li>
            <li>To respond to inquiries and provide support.</li>
            <li>To analyze usage and improve our services.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FcPrivacy className="h-6 w-6 mr-2" />
            Your Rights
          </h2>
          <p className="text-lg text-gray-700">
            You have the right to access, update, or delete your personal information. Please contact us if you wish to exercise these rights.
          </p>
        </section>

        <section className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FcDocument className="h-6 w-6  mr-2" />
            Changes to This Policy
          </h2>
          <p className="text-lg text-gray-700">
            We may update this Privacy Policy from time to time. We encourage you to review this page periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FcPhone className="h-6 w-6  mr-2" />
            Contact Us
          </h2>
          <p className="text-lg text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <MdOutlineMailOutline className="h-5 w-5 text-green-500 inline mr-2" />
              Email: <a href="mailto:info@nftl.co.ke" className="text-blue-500 hover:underline">info@nftl.co.ke</a>
            </li>
            <li>
              <FcCallback className="h-5 w-5 inline mr-2" />
              Phone: (+254)718 414851
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
