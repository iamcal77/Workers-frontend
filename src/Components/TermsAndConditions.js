import React from 'react';
import Layout from './Layout';

const TermsAndConditions = () => {
  return (
    <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        These Terms and Conditions outline the rules and regulations for the use of Efficio. By accessing and using our platform, you accept and agree to these terms.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
        <ul className="list-disc ml-6">
          <li>Provide accurate and up-to-date information during registration.</li>
          <li>Use the platform only for lawful and ethical purposes.</li>
          <li>Keep your account credentials secure and confidential.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
        <ul className="list-disc ml-6">
          <li>Engaging in illegal activities through the platform.</li>
          <li>Attempting to hack or disrupt the platform’s functionality.</li>
          <li>Sharing offensive or harmful content.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p>
          Efficio shall not be held responsible for any indirect, incidental, or consequential damages arising from your use of the platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms and Conditions at any time. Continued use of the platform after such updates constitutes acceptance of the changes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have questions about these terms, please contact us at:
        </p>
        <ul className="list-disc ml-6">
          <li>Email: info@nftl.co.ke</li>
          <li>Phone: (+254)718 414851</li>
        </ul>
      </section>
    </div>
    </Layout>
  );
};

export default TermsAndConditions;
