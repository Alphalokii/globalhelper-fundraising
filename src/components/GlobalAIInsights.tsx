import React, { useState, useEffect } from 'react';
import globalAIService from '../services/globalAIService';

interface GlobalAIInsight {
  id: string;
  title: string;
  analysis: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  nexusScore: number;
}

const GlobalAIInsights: React.FC = () => {
  const [insights, setInsights] = useState<GlobalAIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Load trading insights on mount
  useEffect(() => {
    loadTradingInsights();
  }, []);

  const loadTradingInsights = async () => {
    setLoading(true);
    try {
      const tradingInsights = await globalAIService.getTradingInsights();
      setInsights(tradingInsights);
    } catch (error) {
      console.error('Error loading trading insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeWithGlobalAI = async (newsContent: string, newsTitle: string) => {
    setAnalyzing(true);
    try {
      const analysis = await globalAIService.analyzeWithNexus(newsContent, newsTitle);
      setInsights([analysis, ...insights].slice(0, 10));
    } catch (error) {
      console.error('Error analyzing with GlobalAI:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getNexusScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-600 font-bold';
    if (score >= 70) return 'text-orange-600 font-semibold';
    if (score >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-lg p-6 mb-8 border border-purple-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="mr-3">🌐</span>
        GlobalAI Nexus Intelligence
      </h2>

      {/* Analyze with GlobalAI Section */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold mb-4 text-purple-800">Analyze with GlobalAI Nexus</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => analyzeWithGlobalAI(
              "Breaking: Major humanitarian crisis requires immediate international response. Crypto donations urgently needed for relief efforts.",
              "Humanitarian Crisis Analysis"
            )}
            disabled={analyzing}
            className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
          >
            {analyzing ? 'Analyzing...' : '🔍 Analyze Crisis'}
          </button>
          <button
            onClick={() => analyzeWithGlobalAI(
              "Nexus trading systems detect unusual cryptocurrency patterns indicating massive humanitarian donation surge.",
              "Nexus Trading Pattern Analysis"
            )}
            disabled={analyzing}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {analyzing ? 'Analyzing...' : '📊 Analyze Trading'}
          </button>
        </div>
      </div>

      {/* Trading Insights Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🧠 Nexus Trading Intelligence</h3>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
            No GlobalAI insights available. Click analyze buttons to start.
          </div>
        ) : (
          insights.map((insight) => (
            <div key={insight.id} className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-lg text-gray-800 flex-1">{insight.title}</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(insight.urgency)}`}>
                    {insight.urgency.toUpperCase()}
                  </span>
                  <span className={`text-sm ${getNexusScoreColor(insight.nexusScore)}`}>
                    Nexus: {insight.nexusScore}/100
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-gray-700 mb-2">{insight.analysis}</p>
                <p className="text-sm text-gray-500">
                  {new Date(insight.timestamp).toLocaleDateString()} at {new Date(insight.timestamp).toLocaleTimeString()}
                </p>
              </div>

              {insight.recommendations && insight.recommendations.length > 0 && (
                <div className="border-t pt-3">
                  <h5 className="font-semibold text-sm text-gray-700 mb-2">🎯 Nexus Recommendations:</h5>
                  <ul className="space-y-1">
                    {insight.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GlobalAIInsights;
