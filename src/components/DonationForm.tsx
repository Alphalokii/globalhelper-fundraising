import React, { useState } from 'react';
import PaymentProcessor from './PaymentProcessor';
import PayPalButton from './PayPalButton';
import CryptoPayment from './CryptoPayment';
import EmailService from '../services/EmailService';

interface DonationFormProps {
  campaignId?: string;
  campaignName?: string;
}

const DonationForm: React.FC<DonationFormProps> = ({ campaignId, campaignName }) => {
  const [amount, setAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('crypto'); // Default to crypto since Stripe/PayPal are disabled
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [_donorInfo, _setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    anonymous: false
  });

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount('');
  };

  const handlePaymentSuccess = async () => {
    setPaymentStatus('success');
    setShowPayment(false);
    
    // Send donation receipt
    const receiptData = {
      donorName: 'John Doe', // Get from form
      donorEmail: 'john@example.com', // Get from form
      amount: finalAmount,
      isMonthly,
      campaignTitle: campaignName || 'General Donation',
      campaignId: campaignId || 'general',
      transactionId: `txn_${Date.now()}`, // Generate or get from payment processor
      date: new Date().toISOString()
    };

    try {
      await EmailService.sendDonationReceipt(receiptData);
      console.log('Donation receipt sent successfully');
    } catch (error) {
      console.error('Failed to send donation receipt:', error);
    }
    
    // Reset form after successful payment
    setTimeout(() => {
      setPaymentStatus('idle');
      setAmount('');
      setCustomAmount('');
    }, 3000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus('error');
    setErrorMessage(error);
    setShowPayment(false);
  };

  const handleDonateClick = () => {
    const finalAmount = customAmount || amount;
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      setErrorMessage('Please enter a valid donation amount');
      setPaymentStatus('error');
      return;
    }
    setShowPayment(true);
    setPaymentStatus('idle');
    setErrorMessage('');
  };

  const finalAmount = parseFloat(customAmount || amount || '0');

  if (paymentStatus === 'success') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Donation!</h2>
        <p className="text-gray-600 mb-6">
          Your generous donation of ${finalAmount} {isMonthly ? 'per month' : ''} will make a real difference.
        </p>
        <p className="text-sm text-gray-500">
          A receipt has been sent to your email address.
        </p>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <button
            onClick={() => setShowPayment(false)}
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Back to donation form
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            Complete Your Donation
          </h2>
          <div className="mt-2 text-lg text-gray-600">
            ${finalAmount} {isMonthly ? 'per month' : ''} {campaignName && `to ${campaignName}`}
          </div>
        </div>

        {paymentMethod === 'card' ? (
          <PaymentProcessor
            amount={finalAmount}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            isMonthly={isMonthly}
            campaignId={campaignId}
          />
        ) : paymentMethod === 'paypal' ? (
          <PayPalButton
            amount={finalAmount}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            isMonthly={isMonthly}
            campaignId={campaignId}
          />
        ) : (
          <CryptoPayment
            amount={finalAmount}
            campaignName={campaignName || 'General Donation'}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        {campaignName ? `Support ${campaignName}` : 'Make a Donation'}
      </h2>

      {paymentStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{errorMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Donation Type */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            type="button"
            onClick={() => setIsMonthly(false)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              !isMonthly
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            One Time
          </button>
          <button
            type="button"
            onClick={() => setIsMonthly(true)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              isMonthly
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Amount ({isMonthly ? 'per month' : ''})
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
            {presetAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                type="button"
                onClick={() => handleAmountSelect(presetAmount)}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition ${
                  amount === presetAmount.toString() && !customAmount
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
            ${presetAmount}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Quick Personal Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-not-allowed opacity-50 bg-gray-100">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
                disabled
              />
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                <span>Credit/Debit Card (Maintenance)</span>
              </div>
            </label>
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-not-allowed opacity-50 bg-gray-100">
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
                disabled
              />
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.419c.103-.596.628-1.034 1.235-1.034h7.65c1.674 0 3.091.69 3.824 1.845.34.538.495 1.164.453 1.79-.003.05-.009.1-.016.148l-.018.12c-.014.086-.032.17-.053.253-.002.008-.004.016-.006.024-.022.08-.047.158-.075.234l-.012.032c-.028.07-.058.138-.09.203l-.018.036c-.032.06-.066.118-.102.174l-.027.042c-.036.053-.074.104-.113.154l-.036.046c-.04.05-.082.098-.125.145l-.04.043c-.045.048-.09.094-.138.138l-.04.038c-.05.045-.1.088-.152.13l-.038.03c-.055.043-.11.084-.168.123l-.025.017c-.06.04-.12.078-.182.113l-.018.01c-.064.036-.13.07-.196.1l-.01.005c-.068.032-.137.062-.207.09l-.004.002c-.072.028-.145.054-.22.078l-.002.001c-.075.024-.15.046-.227.066h-.002c-.077.02-.155.038-.233.054h-.002c-.08.016-.16.03-.24.042h-.002c-.082.012-.164.022-.247.03h-.002c-.084.008-.168.014-.253.018h-.002c-.086.004-.172.006-.26.006H6.342l-.413 2.405h6.975c.088 0 .174.002.26.006h.002c.085.004.17.01.253.018h.002c.083.008.165.018.247.03h.002c.08.012.16.026.24.042h.002c.078.016.156.034.233.054h.002c.077.02.152.042.227.066l.002.001c.075.024.148.05.22.078l.004.002c.07.028.14.058.207.09l.01.005c.067.03.132.064.196.1l.018.01c.062.035.122.073.182.113l.025.017c.058.04.113.08.168.123l.038.03c.052.042.102.085.152.13l.04.038c.048.044.093.09.138.138l.04.043c.053.047.095.095.14.145l.036.046c.04.05.077.1.113.154l.027.042c.036.056.07.114.102.174l.018.036c.032.065.062.133.09.203l.012.032c.028.076.053.154.075.234l.006.024c.02.083.04.167.053.253l.018.12c.007.05.013.1.016.148.042.626-.113 1.252-.453 1.79-.733 1.155-2.15 1.845-3.824 1.845h-7.65c-.607 0-1.132-.438-1.235-1.034z"/>
                </svg>
                <span>PayPal (Maintenance)</span>
              </div>
            </label>
            
            {/* Crypto Payment Options */}
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="crypto"
                checked={paymentMethod === 'crypto'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div className="flex items-center">
                <div className="w-6 h-6 mr-2 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">₿</span>
                </div>
                <span>Cryptocurrency (BTC/USDT)</span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleDonateClick}
          className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Donate ${finalAmount || '0'} {isMonthly ? '/month' : ''}
        </button>

        {/* Security Note */}
        <p className="text-center text-sm text-gray-600">
          🔒 Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default DonationForm;
