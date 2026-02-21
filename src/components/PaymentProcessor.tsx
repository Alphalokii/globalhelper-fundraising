import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Initialize Stripe (you'll need to add your publishable key)
const stripePromise = loadStripe('pk_test_51234567890abcdef'); // Replace with actual key

interface PaymentProcessorProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  isMonthly: boolean;
  campaignId?: string;
}

const PaymentForm: React.FC<PaymentProcessorProps> = ({
  amount,
  onSuccess,
  onError,
  isMonthly,
  campaignId
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: 'usd',
          isMonthly,
          campaignId,
        }),
      });

      const { clientSecret, error: serverError } = await response.json();

      if (serverError) {
        onError(serverError);
        setIsProcessing(false);
        return;
      }

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              // You can get these from your form
              name: 'John Doe',
              email: 'john@example.com',
            },
          },
        }
      );

      if (stripeError) {
        onError(stripeError.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess();
      }

      setIsProcessing(false);
    } catch (error) {
      onError('An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="p-4 border border-gray-300 rounded-lg bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Pay $${amount} ${isMonthly ? '/month' : ''}`
        )}
      </button>

      <div className="text-center text-sm text-gray-600">
        <p>🔒 Your payment information is secure and encrypted</p>
        <p className="mt-1">Powered by Stripe</p>
      </div>
    </form>
  );
};

const PaymentProcessor: React.FC<PaymentProcessorProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default PaymentProcessor;
