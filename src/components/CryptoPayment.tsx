import React, { useState } from 'react';

interface CryptoPaymentProps {
  amount: number;
  campaignName: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const CryptoPayment: React.FC<CryptoPaymentProps> = ({ amount, campaignName, onSuccess, onError }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'USDT'>('BTC');
  const [selectedUSDTNetwork, setSelectedUSDTNetwork] = useState<'TRC20' | 'ERC20'>('TRC20');
  const [walletAddress, setWalletAddress] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);

  // Your crypto wallet addresses
  const cryptoAddresses = {
    BTC: 'bc1qq93e7fkk5p7wasngx8dpwcakhxxxhxpaea2kt3',
    USDT_TRC20: 'TYQXn9x2NMp3Y5dfgJrxDQa2QsB7nhSmku',
    USDT_ERC20: '0x2c0Ea0f216d1870934888E40728bE0F16F5390A1' // This is USDT on Ethereum network
  };

  const cryptoPrices = {
    BTC: 43250, // Mock BTC price in USD
    USDT: 1 // USDT is stablecoin
  };

  const generateCryptoAddress = async () => {
    setIsGenerating(true);
    try {
      let address = '';
      if (selectedCrypto === 'BTC') {
        address = cryptoAddresses.BTC;
      } else if (selectedCrypto === 'USDT') {
        address = selectedUSDTNetwork === 'TRC20' ? cryptoAddresses.USDT_TRC20 : cryptoAddresses.USDT_ERC20;
      }
      setWalletAddress(address);
      setShowQRCode(true);
    } catch (error) {
      onError('Failed to generate wallet address');
    } finally {
      setIsGenerating(false);
    }
  };

  const calculateCryptoAmount = () => {
    if (selectedCrypto === 'BTC') {
      return (amount / cryptoPrices.BTC).toFixed(8);
    }
    return amount.toFixed(2);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = () => {
    const cryptoAmount = calculateCryptoAmount();
    const txId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setTransactionId(txId);
    onSuccess(txId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Donate with Cryptocurrency</h2>
          <button
            onClick={() => onError('User closed payment')}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Campaign Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-1">{campaignName}</h3>
          <p className="text-blue-700">Amount: ${amount.toLocaleString()}</p>
        </div>

        {/* Crypto Selection */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedCrypto('BTC')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              selectedCrypto === 'BTC'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-2">₿</span>
              Bitcoin
            </div>
          </button>
          <button
            onClick={() => setSelectedCrypto('USDT')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              selectedCrypto === 'USDT'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-2">₮</span>
              USDT (ERC-20)
            </div>
          </button>
        </div>

        {/* USDT Network Selection (only show when USDT is selected) */}
        {selectedCrypto === 'USDT' && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSelectedUSDTNetwork('TRC20')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition ${
                selectedUSDTNetwork === 'TRC20'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                <span className="text-sm mr-1">TRON</span>
                USDT (TRC-20)
              </div>
            </button>
            <button
              onClick={() => setSelectedUSDTNetwork('ERC20')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition ${
                selectedUSDTNetwork === 'ERC20'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center">
                <span className="text-sm mr-1">ETH</span>
                USDT (ERC-20)
              </div>
            </button>
          </div>
        )}

        {/* Generate Address Button */}
        {!walletAddress && (
          <button
            onClick={generateCryptoAddress}
            disabled={isGenerating}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 mb-6"
          >
            {isGenerating ? 'Generating...' : 'Generate Payment Address'}
          </button>
        )}

        {/* Payment Info */}
        {walletAddress && (
          <div className="space-y-4">
            {/* Amount in Crypto */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">You send:</span>
                <span className="font-mono font-bold text-lg">
                  {selectedCrypto === 'BTC' ? `${calculateCryptoAmount()} BTC` : `${calculateCryptoAmount()} USDT`}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                1 {selectedCrypto} = ${selectedCrypto === 'BTC' ? cryptoPrices.BTC.toLocaleString() : '1.00'}
              </div>
            </div>

            {/* Wallet Address */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-yellow-800 mb-2">
                Send {selectedCrypto} to this address:
                {selectedCrypto === 'USDT' && (
                  <span className="ml-2 text-xs bg-yellow-200 px-2 py-1 rounded">
                    {selectedUSDTNetwork === 'TRC20' ? 'TRON Network' : 'Ethereum Network'}
                  </span>
                )}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="flex-1 font-mono text-sm bg-white border border-yellow-300 rounded px-3 py-2"
                />
                <button
                  onClick={() => handleCopy(walletAddress)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* QR Code Placeholder */}
            {showQRCode && (
              <div className="flex justify-center">
                <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <p className="text-sm text-gray-600">QR Code</p>
                      <p className="text-xs text-gray-500 mt-1">Scan to pay</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">How to Pay:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Copy the wallet address above</li>
                <li>2. Open your crypto wallet</li>
                <li>3. Send {calculateCryptoAmount()} {selectedCrypto} to the address</li>
                <li>4. Transaction will be confirmed automatically</li>
              </ol>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">⚠️ Important:</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Send only {selectedCrypto} to this address</li>
                <li>• Double-check the address before sending</li>
                <li>• Crypto transactions are irreversible</li>
                <li>• Minimum amount: {selectedCrypto === 'BTC' ? '0.0001 BTC' : '10 USDT'}</li>
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {walletAddress && (
            <button
              onClick={handlePayment}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              I've Sent Payment
            </button>
          )}
          <button
            onClick={() => onError('User cancelled payment')}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoPayment;
