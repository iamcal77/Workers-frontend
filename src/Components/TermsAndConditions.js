import React from 'react';
import Layout from './Layout';
import { FaBan, FaShieldAlt} from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FcCallback, FcDocument, FcHighPriority, FcPhone } from 'react-icons/fc';

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Terms and Conditions
        </h1>
        
        <p className="text-lg mb-6 text-gray-700">
          These Terms and Conditions outline the rules and regulations for the use of NTFL Casuals. By accessing and using our platform, you accept and agree to these terms.
        </p>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaShieldAlt className="h-6 w-6 text-green-500 mr-2" />
            User Responsibilities
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Provide accurate and up-to-date information during registration.</li>
            <li>Use the platform only for lawful and ethical purposes.</li>
            <li>Keep your account credentials secure and confidential.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaBan className="h-6 w-6 text-red-500 mr-2" />
            Prohibited Activities
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Engaging in illegal activities through the platform.</li>
            <li>Attempting to hack or disrupt the platform’s functionality.</li>
            <li>Sharing offensive or harmful content.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FcHighPriority className="h-6 w-6  mr-2" />
            Limitation of Liability
          </h2>
          <p className="text-lg text-gray-700">
          NTFL Casuals shall not be held responsible for any indirect, incidental, or consequential damages arising from your use of the platform.
          </p>
        </section>

        <section className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
            <FcDocument className="h-6 w-6 mr-2" />
            Changes to Terms
          </h2>
          <p className="text-lg text-gray-700">
            We reserve the right to update these Terms and Conditions at any time. Continued use of the platform after such updates constitutes acceptance of the changes.
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

export default TermsAndConditions;
