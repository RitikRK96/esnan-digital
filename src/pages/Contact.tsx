import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Heart, X } from 'lucide-react';

const Contact: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
    message: "",
    type: "success",
    visible: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toast.visible) {
      timer = setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
    }
    return () => clearTimeout(timer);
  }, [toast.visible]);

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://us-central1-esnan-digital-10a7b.cloudfunctions.net/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setToast({ message: "Failed to submit contact form", type: "error", visible: true });

      }


      setToast({ message: "Thank you for reaching out! We will get back to you within 24 hours.", type: "success", visible: true });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form submission error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      info: '+91 98765 43210',
      subInfo: 'Available 6 AM - 10 PM IST',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Mail,
      title: 'Email Support',
      info: 'support@e-snan.com',
      subInfo: 'Response within 24 hours',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: MapPin,
      title: 'Head Office',
      info: 'Haridwar, Uttarakhand',
      subInfo: 'Sacred Gateway to Divinity',
      color: 'text-saffron-600 bg-saffron-100'
    },
    {
      icon: Clock,
      title: 'Service Hours',
      info: '24/7 Online Booking',
      subInfo: 'Ceremonies performed daily',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const faqs = [
    {
      question: 'How authentic are the e-Snan ceremonies?',
      answer: 'All ceremonies are performed by qualified priests following traditional vedic rituals at authentic sacred locations.'
    },
    {
      question: 'Can I track my e-Snan ceremony?',
      answer: 'Yes, you will receive updates via SMS and email, plus photos and videos of your ceremony.'
    },
    {
      question: 'Is the holy water really blessed?',
      answer: 'All holy water is collected during morning prayers and blessed by our priests before delivery.'
    },
    {
      question: 'What if I\'m not satisfied with the service?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not completely satisfied, we\'ll make it right.'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-decorative font-bold text-saffron-800 mb-6">
            Connect with Our Sacred Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about e-Snan? Need spiritual guidance? Our dedicated team is here to assist you
            on your divine journey.
          </p>
        </div>
        {toast.visible && (
          <div
            style={{ zIndex: 999 }}
            className={`fixed top-24 right-4 p-4 rounded-lg shadow-lg ${toast.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white flex items-center justify-between max-w-xs transform transition-all duration-300 ease-in-out ${toast.visible
                ? "translate-x-0 opacity-100 scale-100"
                : "translate-x-[100%] opacity-0 scale-95"
              }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={handleCloseToast}
              className="ml-4 text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-800 font-medium mb-1">{item.info}</p>
              <p className="text-sm text-gray-600">{item.subInfo}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-saffron-100 rounded-full mr-4">
                <MessageCircle className="h-6 w-6 text-saffron-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Send us a Message</h2>
                <p className="text-gray-600">We'd love to hear from you</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    placeholder="98765 43210 or +91 98765 43210"
                    pattern="^(\+91\s?)?[6-9]\d{4}\s?\d{5}$"
                    maxLength={16}
                  />

                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required

                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="spiritual">Spiritual Guidance</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-saffron-600 text-white py-3 px-6 rounded-lg hover:bg-saffron-700 transition-colors font-semibold flex items-center justify-center transform hover:scale-105 duration-200"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-saffron-50 to-spiritual-cream rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-saffron-600 rounded-full mr-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-saffron-800">Spiritual Support</h2>
                  <p className="text-saffron-600">Available 24/7 for your spiritual journey</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our team of spiritual advisors and technical experts are dedicated to ensuring your
                e-Snan experience is both authentic and meaningful.
              </p>
              <div className="bg-white/70 rounded-lg p-4 border-l-4 border-saffron-600">
                <p className="text-saffron-800 font-medium italic">
                  "We're not just a service provider - we're your partners in spiritual growth."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-red-800 mb-4">Emergency Spiritual Support</h3>
          <p className="text-red-700 mb-4">
            For urgent spiritual guidance or immediate ceremony requirements, call our 24/7 helpline:
          </p>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors font-semibold"
          >
            <Phone className="h-5 w-5 mr-2" />
            +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;