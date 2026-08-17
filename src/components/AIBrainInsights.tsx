import React, { useState, useEffect } from 'react';
import aiBrainService from '../services/aiBrainService';

interface AIInsight {
  urgency_score: number;
  humanitarian_impact: string;
  discovery_potential: string;
  nexus_strategy_hints: string;
  grok_analysis: string;
  timestamp: string;
}

const AIBrainInsights: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [_loading, _setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [healthStatus, setHealthStatus] = useState<'online' | 'offline'>('offline');

  useEffect(() => {
    checkAIHealth();
  }, []);

  const checkAIHealth = async () => {
    try {
      const health = await aiBrainService.checkHealth();
      setHealthStatus(health.status as 'online' | 'offline');
    } catch (error) {
      setHealthStatus('offline');
    }
  };

  const analyzeWithAIBrain = async (newsText: string, newsTitle: string, category: string) => {
    setAnalyzing(true);
    try {
      const insight = await aiBrainService.getAIInsights(newsText, newsTitle, category);
      setInsights([insight, ...insights].slice(0, 10));
    } catch (error) {
      console.error('Error analyzing with AI Brain:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getUrgencyColor = (score: number) => {
    if (score >= 8) return 'bg-red-600 text-white';
    if (score >= 6) return 'bg-orange-500 text-white';
    if (score >= 4) return 'bg-yellow-500 text-black';
    return 'bg-green-500 text-white';
  };

  const getUrgencyLabel = (score: number) => {
    if (score >= 8) return 'CRITICAL';
    if (score >= 6) return 'HIGH';
    if (score >= 4) return 'MEDIUM';
    return 'LOW';
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-lg p-6 mb-8 border border-indigo-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <span className="mr-3">🧠</span>
          AI Brain Insights
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${healthStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {healthStatus === 'online' ? 'AI Brain Online' : 'AI Brain Offline'}
          </span>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-semibold">
            AI Powered
          </span>
        </div>
      </div>

      {/* Analyze with AI Brain Section */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-indigo-200">
        <h3 className="text-lg font-semibold mb-4 text-indigo-800">Analyze with AI Brain</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => analyzeWithAIBrain(
              "Breaking: Major humanitarian crisis requires immediate international response. Crypto donations urgently needed for relief efforts.",
              "Humanitarian Crisis Analysis",
              "humanitarian"
            )}
            disabled={analyzing}
            className="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
          >
            {analyzing ? 'Analyzing...' : '🔍 Analyze Crisis'}
          </button>
          <button
            onClick={() => analyzeWithAIBrain(
              "Bitcoin donations surge to humanitarian causes as crypto community rallies for disaster relief efforts worldwide.",
              "Bitcoin Donation Surge",
              "crypto"
            )}
            disabled={analyzing}
            className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
          >
            {analyzing ? 'Analyzing...' : '📊 Analyze Crypto'}
          </button>
        </div>
        <div className="mt-3 text-sm text-indigo-600 bg-indigo-50 p-2 rounded">
          <strong>🤖 AI Brain:</strong> GlobalHelper + Nexus Intelligence with Grok xAI analysis
        </div>
      </div>

      {/* Insights Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🧠 AI Brain Analysis</h3>
        
        {insights.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
            No AI Brain insights available. Click analyze buttons to start.
          </div>
        ) : (
          insights.map((insight, index) => (
            <div key={index} className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">AI Analysis</h4>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(insight.urgency_score)}`}>
                      {getUrgencyLabel(insight.urgency_score)} ({insight.urgency_score}/10)
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(insight.timestamp).toLocaleDateString()} at {new Date(insight.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grok Analysis */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h5 className="font-semibold text-sm text-gray-700 mb-2">🤖 Grok xAI Analysis:</h5>
                <p className="text-gray-700 text-sm">{insight.grok_analysis}</p>
              </div>

              {/* Humanitarian Impact */}
              <div className="mb-4">
                <h5 className="font-semibold text-sm text-gray-700 mb-1">🌍 Humanitarian Impact:</h5>
                <p className="text-gray-600 text-sm">{insight.humanitarian_impact}</p>
              </div>

              {/* Discovery Potential */}
              <div className="mb-4">
                <h5 className="font-semibold text-sm text-gray-700 mb-1">🔬 Discovery Potential:</h5>
                <p className="text-gray-600 text-sm">{insight.discovery_potential}</p>
              </div>

              {/* Nexus Strategy Hints */}
              <div className="border-t pt-3">
                <h5 className="font-semibold text-sm text-gray-700 mb-2">📊 Nexus Trading Strategy Hints:</h5>
                <p className="text-gray-600 text-sm bg-blue-50 p-2 rounded">{insight.nexus_strategy_hints}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AIBrainInsights;
