import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('Thank you for contacting us! We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We're here to help and answer any questions you may have
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="campaign">Campaign Question</option>
                  <option value="donation">Donation Issue</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Please provide as much detail as possible..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>

            {submitMessage && (
              <div className={`mt-4 p-4 rounded-lg ${
                submitMessage.includes('Thank you') 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {submitMessage}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a 
                      href="mailto:globalhelper9@gmail.com"
                      className="text-indigo-600 hover:text-indigo-700 transition"
                    >
                      globalhelper9@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Response Time</h3>
                    <p className="text-gray-600">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Support Hours</h3>
                    <p className="text-gray-600">24/7 Global Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Offices
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-indigo-600 pl-4">
                  <h3 className="font-semibold text-gray-900">Global Headquarters</h3>
                  <p className="text-gray-600">San Francisco, CA</p>
                  <p className="text-sm text-gray-500">United States</p>
                </div>
                
                <div className="border-l-4 border-green-600 pl-4">
                  <h3 className="font-semibold text-gray-900">European Office</h3>
                  <p className="text-gray-600">London, UK</p>
                  <p className="text-sm text-gray-500">United Kingdom</p>
                </div>
                
                <div className="border-l-4 border-purple-600 pl-4">
                  <h3 className="font-semibold text-gray-900">Asia Pacific</h3>
                  <p className="text-gray-600">Singapore</p>
                  <p className="text-sm text-gray-500">Singapore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about GlobalHelper
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                How do I start a campaign?
              </h3>
              <p className="text-gray-600">
                Simply click "Start Fundraising" on our homepage, fill out the campaign details, 
                and submit for review. Most campaigns are approved within 24 hours.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Are donations secure?
              </h3>
              <p className="text-gray-600">
                Yes! We use bank-level encryption and secure payment processors including Stripe, 
                PayPal, and blockchain technology for crypto donations.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                What fees do you charge?
              </h3>
              <p className="text-gray-600">
                Platform fees are 5% for successful campaigns. Payment processor fees vary 
                by method and are clearly displayed before donation.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                How quickly can I withdraw funds?
              </h3>
              <p className="text-gray-600">
                Funds are available for withdrawal within 3-5 business days after campaign completion. 
                We offer instant withdrawal options for verified users.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Do you support international donations?
              </h3>
              <p className="text-gray-600">
                Absolutely! We support donations from over 150 countries and multiple currencies 
                including cryptocurrency options.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                How can I contact support?
              </h3>
              <p className="text-gray-600">
                Email us at globalhelper9@gmail.com or use the contact form above. 
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
