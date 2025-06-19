import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-spiritual-cream to-saffron-50 font-serif text-saffron-900">
    <div className="max-w-4xl mx-auto bg-white border border-saffron-200 rounded-xl shadow-xl p-6 sm:p-10">
      <h1 className="text-5xl font-decorative font-bold text-saffron-700 mb-6 text-center">Privacy Policy</h1>

      <p className="mb-4">At <strong>e-Snan</strong>, your privacy is a top priority. This Privacy Policy outlines how we collect, use, protect, and disclose your personal information when you access or use our services.</p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Personal Information: Name, email address, contact number, billing information.</li>
        <li>Usage Data: Information about how you interact with our website.</li>
        <li>Media Uploads: Images or files you upload for rituals.</li>
      </ul>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">We use your data to process bookings, improve services, send updates, and ensure security. We may also use anonymised data for analytics and marketing.</p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">We implement industry-standard measures to protect your information from unauthorised access, misuse, or alteration. All sensitive data is encrypted and stored securely.</p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">4. Sharing Information</h2>
      <p className="mb-4">We do not sell or rent your data. Your information is only shared with authorized priests and partners strictly for service fulfilment. We may share data if required by law.</p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">5. Cookies</h2>
      <p className="mb-4">Our website uses cookies to enhance your experience. You can control cookies through your browser settings, but disabling them may affect site functionality.</p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">6. User Rights</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>You can request access to or correction of your personal data.</li>
        <li>You may opt-out of marketing emails at any time.</li>
        <li>You may request deletion of your account and data.</li>
      </ul>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">7. Policy Updates</h2>
      <p className="mb-4">We may update this Privacy Policy periodically. Users will be notified via email or website banners about major changes.</p>

      <p className="text-sm text-gray-500 mt-10 text-center">Last updated: June 2025</p>
    </div>
  </div>
);

export default PrivacyPolicy;