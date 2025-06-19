import React from "react";

const TermsAndConditions: React.FC = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-spiritual-cream to-saffron-50 font-serif text-saffron-900">
    <div className="max-w-4xl mx-auto bg-white border border-saffron-200 rounded-xl shadow-xl p-6 sm:p-10">
      <h1 className="text-5xl font-decorative font-bold text-saffron-700 mb-6 text-center">
        Terms & Conditions
      </h1>
      <p className="mb-4">
        Welcome to <strong>e-Snan</strong>. By using our website and services,
        you agree to the terms and conditions outlined below. Please read them
        carefully before making any bookings or purchases.
      </p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing and using the e-Snan platform, you agree to be bound by
        these Terms & Conditions and our Privacy Policy. If you do not agree
        with any part of these terms, you must refrain from using the service.
      </p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">
        2. Eligibility
      </h2>
      <p className="mb-4">
        You must be at least 18 years old to use our services, or have the
        permission and supervision of a legal guardian. You affirm that any
        personal information provided is accurate and truthful.
      </p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">
        3. Use of Services
      </h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          Our services are designed solely for spiritual purposes. Misuse of the
          platform for any unlawful or commercial activity is strictly
          prohibited.
        </li>
        <li>
          Bookings are confirmed only upon successful payment and issuance of a
          confirmation email.
        </li>
        <li>
          All rituals are conducted by verified priests at designated sacred
          locations.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">
        4. Intellectual Property
      </h2>
      <p className="mb-4">
        All content on the e-Snan website, including text, graphics, logos, and
        images, is the property of e-Snan and protected by intellectual property
        laws. Unauthorized use or reproduction is prohibited.
      </p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">
        5. Payment & Pricing
      </h2>
      <p className="mb-4">
        All prices are listed in INR and are inclusive of applicable taxes
        unless stated otherwise. We reserve the right to change pricing or
        discontinue services at any time without prior notice.
      </p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">
        6. Cancellation & Refund
      </h2>
      <p className="mb-4">
        Cancellations must be made at least 24 hours prior to the scheduled
        ritual to be eligible for a refund. Please refer to our{" "}
        <a href="/RefundPolicy" className="text-saffron-700 underline">
          Refund Policy
        </a>{" "}
        for detailed information.
      </p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">
        7. Disclaimer
      </h2>
      <p className="mb-4">
        While we strive to deliver authentic spiritual services, results may
        vary. e-Snan makes no guarantees regarding spiritual outcomes and is not
        liable for any perceived or expected benefits.
      </p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">
        8. Limitation of Liability
      </h2>
      <p className="mb-4">
        e-Snan will not be held responsible for any indirect, incidental, or
        consequential damages arising out of the use or inability to use our
        services.
      </p>

      <h2 className="text-xl font-semibold text-saffron-700 mt-6 mb-2">
        9. Amendments
      </h2>
      <p className="mb-4">
        We reserve the right to update or modify these Terms & Conditions at any
        time. Continued use of the platform after changes constitutes your
        acceptance of the revised terms.
      </p>

      <p className="text-sm text-gray-500 mt-10 text-center">
        Last updated: June 2025
      </p>
    </div>
  </div>
);

export default TermsAndConditions;
