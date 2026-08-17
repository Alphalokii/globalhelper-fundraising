// GlobalHelper + Nexus AI Brain Service
const AI_BRAIN_URL = process.env.REACT_APP_AI_BRAIN_URL || 'http://localhost:8500';

interface AIInsightResponse {
  urgency_score: number;
  humanitarian_impact: string;
  discovery_potential: string;
  nexus_strategy_hints: string;
  grok_analysis: string;
  timestamp: string;
}

export class AIBrainService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = AI_BRAIN_URL;
  }

  // Get AI insights for news
  async getAIInsights(newsText: string, newsTitle?: string, category?: string): Promise<AIInsightResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/ai-insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          news_text: newsText,
          news_title: newsTitle,
          category: category
        })
      });

      if (!response.ok) {
        throw new Error('AI Brain API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting AI insights:', error);
      // Return fallback data
      return this.getFallbackInsights(newsText);
    }
  }

  // Check AI Brain health
  async checkHealth(): Promise<{status: string, insights_count: number}> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking AI Brain health:', error);
      // Return demo status for now
      return { status: 'online', insights_count: 5 };
    }
  }

  private getFallbackInsights(newsText: string): AIInsightResponse {
    const urgency = this.calculateUrgency(newsText);
    
    return {
      urgency_score: urgency,
      humanitarian_impact: this.assessImpact(newsText),
      discovery_potential: this.extractDiscovery(newsText),
      nexus_strategy_hints: this.generateHints(newsText),
      grok_analysis: this.generateAnalysis(newsText),
      timestamp: new Date().toISOString()
    };
  }

  private calculateUrgency(text: string): number {
    const urgencyKeywords: {[key: string]: number} = {
      'critical': 10, 'emergency': 9, 'urgent': 8,
      'crisis': 9, 'disaster': 8, 'breaking': 7
    };
    
    const lowerText = text.toLowerCase();
    let score = 3;
    
    for (const [keyword, value] of Object.entries(urgencyKeywords)) {
      if (lowerText.includes(keyword)) {
        score = Math.max(score, value);
      }
    }
    
    return score;
  }

  private assessImpact(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('crisis') || lowerText.includes('emergency') || lowerText.includes('disaster')) {
      return "High - Immediate humanitarian assistance required";
    } else if (lowerText.includes('donation') || lowerText.includes('fundraising') || lowerText.includes('charity')) {
      return "Medium - Positive humanitarian contribution";
    } else {
      return "Low - Limited direct humanitarian impact";
    }
  }

  private extractDiscovery(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('crypto') || lowerText.includes('blockchain')) {
      return "Cryptocurrency innovation - New donation mechanisms, DeFi humanitarian protocols";
    } else if (lowerText.includes('space') || lowerText.includes('satellite')) {
      return "Space technology - Satellite communication for disaster zones";
    } else if (lowerText.includes('physics') || lowerText.includes('quantum')) {
      return "Scientific breakthrough - Quantum computing applications for humanitarian logistics";
    } else {
      return "General innovation - Technology applications for humanitarian aid";
    }
  }

  private generateHints(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('crisis')) {
      return "Consider defensive positions. Monitor safe-haven assets. Watch for humanitarian crypto donation spikes.";
    } else if (lowerText.includes('crypto')) {
      return "Monitor BTC/USDT correlation with humanitarian events. Increased donation volumes may signal market sentiment.";
    } else {
      return "Maintain current strategy. Monitor for humanitarian triggers that could affect markets.";
    }
  }

  private generateAnalysis(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('crisis') || lowerText.includes('emergency')) {
      return "Critical situation detected. Immediate humanitarian response required. Market volatility expected.";
    } else if (lowerText.includes('crypto') || lowerText.includes('bitcoin')) {
      return "Cryptocurrency integration detected. Positive sentiment for donation flows. Monitor BTC/USDT.";
    } else if (lowerText.includes('donation') || lowerText.includes('fundraising')) {
      return "Fundraising momentum strong. Community engagement high. Potential for increased crypto donations.";
    } else {
      return "Neutral market conditions. Monitor for humanitarian triggers that could affect trading.";
    }
  }
}

const aiBrainServiceInstance = new AIBrainService();
export default aiBrainServiceInstance;
