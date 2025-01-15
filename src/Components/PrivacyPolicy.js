import React from 'react';
import Layout from './Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use Efficio.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <ul className="list-disc ml-6">
          <li>
            <strong>Personal Information:</strong> Includes name, email address, phone number, etc.
          </li>
          <li>
            <strong>Usage Data:</strong> Includes IP address, browser type, pages visited, and other diagnostic data.
          </li>
          <li>
            <strong>Cookies:</strong> Used to enhance your experience and analyze platform usage.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <ul className="list-disc ml-6">
          <li>To operate and maintain the platform.</li>
          <li>To respond to inquiries and provide support.</li>
          <li>To analyze usage and improve our services.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. Please contact us if you wish to exercise these rights.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We encourage you to review this page periodically for any changes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
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


export default PrivacyPolicy;
