/**
 * Quick Donate Component
 * Shows immediately when crisis image updates
 * Supports multiple payment providers with user's credentials
 */

import React, { useState } from 'react';
import { donationService, DonationDetails } from '../services/donationService';

interface QuickDonateProps {
  crisisId: string;
  crisisTitle: string;
  urgency: string;
}

const QuickDonate: React.FC<QuickDonateProps> = ({
  crisisId,
  crisisTitle,
  urgency
}) => {
  const [amount, setAmount] = useState<number>(50);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [provider, setProvider] = useState<'stripe' | 'paypal' | 'crypto'>('stripe');
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  const handleDonate = async () => {
    setLoading(true);

    const details: DonationDetails = {
      crisisId,
      crisisTitle,
      amount,
      currency: 'USD',
      donorEmail,
      donorName,
      isRecurring,
      recurringInterval: isRecurring ? 'monthly' : undefined
    };

    const result = await donationService.processDonation(details, provider);

    if (result.success && result.redirectUrl) {
      // Redirect to payment provider
      window.location.href = result.redirectUrl;
    } else {
      alert(result.error || 'Donation failed');
      setLoading(false);
    }
  };

  const getUrgencyColor = () => {
    switch (urgency) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`${getUrgencyColor()} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-lg`}
      >
        Donate Now
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Donate to {crisisTitle}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Urgency Badge */}
            <div className={`inline-block ${getUrgencyColor()} text-white px-4 py-2 rounded-full text-sm font-semibold mb-6`}>
              {urgency.toUpperCase()} EMERGENCY
            </div>

            {/* Quick Amount Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Amount
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount)}
                    className={`py-3 px-4 rounded-lg font-semibold transition ${
                      amount === quickAmount
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ${quickAmount}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Custom amount"
              />
            </div>

            {/* Payment Provider Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="stripe"
                    checked={provider === 'stripe'}
                    onChange={(e) => setProvider(e.target.value as any)}
                    className="mr-3"
                  />
                  <span className="font-medium">💳 Credit/Debit Card (Stripe)</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="paypal"
                    checked={provider === 'paypal'}
                    onChange={(e) => setProvider(e.target.value as any)}
                    className="mr-3"
                  />
                  <span className="font-medium">🅿️ PayPal</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value="crypto"
                    checked={provider === 'crypto'}
                    onChange={(e) => setProvider(e.target.value as any)}
                    className="mr-3"
                  />
                  <span className="font-medium">₿ Cryptocurrency</span>
                </label>
              </div>
            </div>

            {/* Recurring Donation */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="mr-3 w-5 h-5 text-indigo-600"
                />
                <span className="text-sm text-gray-700">
                  Make this a monthly donation
                </span>
              </label>
            </div>

            {/* Donor Information */}
            <div className="mb-6 space-y-3">
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your Name (optional)"
              />
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your Email (optional)"
              />
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={loading || amount <= 0}
              className={`w-full ${getUrgencyColor()} text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? 'Processing...' : `Donate $${amount}`}
            </button>

            {/* Security Note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Secure payment processing. Your donation helps save lives.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickDonate;
