import React, { useState, useEffect } from 'react';
import grokService from '../services/grokService';

interface AIInsight {
  id: string;
  newsTitle: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  categories: string[];
  summary: string;
  impact_score: number;
  timestamp: string;
}

const AINewsInsights: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [_loading, _setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Load insights from localStorage
  useEffect(() => {
    const savedInsights = localStorage.getItem('grok_insights');
    if (savedInsights) {
      setInsights(JSON.parse(savedInsights));
    }
  }, []);

  const saveInsights = (newInsights: AIInsight[]) => {
    localStorage.setItem('grok_insights', JSON.stringify(newInsights));
    setInsights(newInsights);
  };

  const analyzeNews = async (newsContent: string, newsTitle: string) => {
    setAnalyzing(true);
    try {
      const analysis = await grokService.analyzeNews(newsContent);
      
      const newInsight: AIInsight = {
        id: Date.now().toString(),
        newsTitle,
        sentiment: analysis.sentiment,
        urgency: analysis.urgency,
        categories: analysis.categories,
        summary: analysis.summary,
        impact_score: analysis.impact_score,
        timestamp: new Date().toISOString()
      };

      const updatedInsights = [newInsight, ...insights].slice(0, 10); // Keep only 10 recent
      saveInsights(updatedInsights);
    } catch (error) {
      console.error('Error analyzing news:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😟';
      case 'neutral': return '😐';
      default: return '❓';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="mr-2">🤖</span>
        AI News Insights (Powered by Grok)
      </h2>

      {/* Analyze News Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Analyze News Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => analyzeNews(
              "Breaking: Humanitarian crisis escalates in conflict zones, thousands displaced急需 immediate international aid and relief efforts.",
              "Humanitarian Crisis Escalation"
            )}
            disabled={analyzing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Crisis News'}
          </button>
          <button
            onClick={() => analyzeNews(
              "Bitcoin donations surge to humanitarian causes as crypto community rallies for disaster relief efforts worldwide.",
              "Bitcoin Donations Surge"
            )}
            disabled={analyzing}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Crypto News'}
          </button>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid gap-4">
        {insights.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No AI insights yet. Click "Analyze Crisis News" to start.
          </div>
        ) : (
          insights.map((insight) => (
            <div key={insight.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-lg flex-1">{insight.newsTitle}</h4>
                <span className={`px-2 py-1 rounded text-white text-sm ${getUrgencyColor(insight.urgency)}`}>
                  {insight.urgency.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-3 text-sm">
                <span className="flex items-center">
                  <span className="mr-1">{getSentimentIcon(insight.sentiment)}</span>
                  {insight.sentiment}
                </span>
                <span className="font-semibold">Impact: {insight.impact_score}/100</span>
                <span>{new Date(insight.timestamp).toLocaleDateString()}</span>
              </div>

              <p className="text-gray-700 mb-3">{insight.summary}</p>

              <div className="flex flex-wrap gap-2">
                {insight.categories.map((category, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AINewsInsights;
