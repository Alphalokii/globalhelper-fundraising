import React, { useEffect, useCallback } from 'react';

interface PayPalButtonProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
  isMonthly: boolean;
  campaignId?: string;
}

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  onSuccess,
  onError,
  isMonthly: _isMonthly,
  campaignId
}) => {
  const setupPayPal = useCallback(() => {
    if (!window.paypal) {
      onError('PayPal SDK failed to load');
      return;
    }

    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toString(),
            },
            custom_id: campaignId,
          }],
        });
      },
      onApprove: async (data: any, actions: any) => {
        try {
          const _order = await actions.order.capture();
          
          // Send order details to your server
          const response = await fetch('/api/paypal-capture', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderID: data.orderID,
              amount,
              campaignId,
            }),
          });

          if (response.ok) {
            onSuccess();
          } else {
            onError('PayPal payment failed');
          }
        } catch (error) {
          onError('PayPal payment error');
        }
      },
      onError: (_err: any) => {
        onError('PayPal payment error');
      },
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'pay',
      },
    }).render('#paypal-button-container');
  }, [amount, campaignId, onError, onSuccess]);

  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD'; // Replace with actual client ID
    script.addEventListener('load', setupPayPal);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [setupPayPal]);

  return (
    <div className="space-y-4">
      <div id="paypal-button-container"></div>
      <div className="text-center text-sm text-gray-600">
        <p>🔒 Secure payment powered by PayPal</p>
      </div>
    </div>
  );
};

export default PayPalButton;
