import React from 'react';

const RefundPolicy: React.FC = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-spiritual-cream to-saffron-50 font-serif text-saffron-900">
    <div className="max-w-4xl mx-auto bg-white border border-saffron-200 rounded-xl shadow-xl p-6 sm:p-10">
      <h1 className="text-5xl font-decorative font-bold text-saffron-700 mb-6 text-center">Refund Policy</h1>

      <p className="mb-4">At <strong>e-Snan</strong>, we strive to provide a seamless and spiritually fulfilling experience. However, we understand that situations may arise where you require a refund. Below is our comprehensive refund policy:</p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">1. Eligibility for Refund</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Refund requests must be made at least <strong>24 hours</strong> prior to the scheduled ritual time.</li>
        <li>Services already performed, including rituals, are <strong>non-refundable</strong>.</li>
        <li>Digital items such as photos or videos once delivered are <strong>non-refundable</strong>.</li>
      </ul>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">2. How to Request a Refund</h2>
      <p className="mb-4">To request a refund, email our support team at <a href="mailto:support@esnan.in" className="text-saffron-700 underline">support@esnan.in</a> with your booking ID and reason for cancellation.</p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">3. Processing Time</h2>
      <p className="mb-4">Approved refunds will be processed within <strong>5–7 business days</strong> back to your original payment method. We will notify you once the refund has been issued.</p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">4. Partial Refunds</h2>
      <p className="mb-4">If additional services like photo or holy water delivery have already been dispatched, only the base ritual amount may be refunded (subject to eligibility).</p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">5. Force Majeure</h2>
      <p className="mb-4">We are not liable for delays or cancellations caused by events beyond our control such as natural disasters, priest unavailability, or internet failures. In such cases, rescheduling may be offered but refunds are not guaranteed.</p>

      <p className="text-sm text-gray-500 mt-10 text-center">Last updated: June 2025</p>
    </div>
  </div>
);

export default RefundPolicy;
