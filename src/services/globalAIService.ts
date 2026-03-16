// GlobalAI Service - Nexus Trading Intelligence Integration
const GLOBALAI_API_URL = 'https://api.globalai-nexus.com/v1';

interface GlobalAIInsight {
  id: string;
  title: string;
  analysis: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  nexusScore: number;
}

export class GlobalAIService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.REACT_APP_GLOBALAI_API_KEY || 'demo-globalai-key';
    this.baseUrl = GLOBALAI_API_URL;
  }

  // Analyze news with GlobalAI Nexus Trading Intelligence
  async analyzeWithNexus(newsContent: string, newsTitle: string): Promise<GlobalAIInsight> {
    try {
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newsContent,
          title: newsTitle,
          context: 'humanitarian-fundraising',
          nexus_integration: true
        })
      });

      if (!response.ok) {
        throw new Error('GlobalAI API request failed');
      }

      const data = await response.json();
      
      return {
        id: data.id || Date.now().toString(),
        title: newsTitle,
        analysis: data.analysis || this.generateDemoAnalysis(newsContent),
        recommendations: data.recommendations || this.generateDemoRecommendations(),
        urgency: data.urgency || this.calculateUrgency(newsContent),
        timestamp: new Date().toISOString(),
        nexusScore: data.nexusScore || this.calculateNexusScore(newsContent)
      };
    } catch (error) {
      console.error('GlobalAI analysis failed:', error);
      return this.getDemoInsight(newsTitle, newsContent);
    }
  }

  // Get trading insights from Nexus system
  async getTradingInsights(): Promise<GlobalAIInsight[]> {
    try {
      const response = await fetch(`${this.baseUrl}/trading-insights`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });

      if (!response.ok) {
        return this.getDemoTradingInsights();
      }

      const data = await response.json();
      return data.insights || this.getDemoTradingInsights();
    } catch (error) {
      console.error('Trading insights failed:', error);
      return this.getDemoTradingInsights();
    }
  }

  private generateDemoAnalysis(content: string): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('crisis') || lowerContent.includes('emergency')) {
      return "Critical humanitarian situation detected. Immediate international response required. Nexus trading systems indicate potential market volatility in affected regions.";
    }
    if (lowerContent.includes('donation') || lowerContent.includes('fundraising')) {
      return "Positive fundraising momentum detected. Nexus AI shows increased charitable giving patterns across cryptocurrency markets.";
    }
    if (lowerContent.includes('war') || lowerContent.includes('conflict')) {
      return "Conflict zone identified. Nexus trading intelligence suggests commodity market disruptions and increased humanitarian aid needs.";
    }
    
    return "GlobalAI analysis: Content shows significant humanitarian impact. Nexus systems monitoring related market movements.";
  }

  private generateDemoRecommendations(): string[] {
    return [
      "Increase cryptocurrency donation channels",
      "Monitor regional market volatility",
      "Prepare emergency response funds",
      "Coordinate with international aid organizations",
      "Activate Nexus trading protocols for humanitarian relief"
    ];
  }

  private calculateUrgency(content: string): 'low' | 'medium' | 'high' | 'critical' {
    const lowerContent = content.toLowerCase();
    const urgencyWords = {
      critical: ['critical', 'emergency', 'immediate', 'urgent'],
      high: ['high', 'severe', 'serious', 'major'],
      medium: ['moderate', 'significant', 'important'],
      low: ['low', 'minor', 'limited']
    };

    for (const [level, words] of Object.entries(urgencyWords)) {
      if (words.some(word => lowerContent.includes(word))) {
        return level as 'low' | 'medium' | 'high' | 'critical';
      }
    }
    
    return 'medium';
  }

  private calculateNexusScore(content: string): number {
    let score = 50;
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('crisis')) score += 30;
    if (lowerContent.includes('war')) score += 25;
    if (lowerContent.includes('donation')) score += 15;
    if (lowerContent.includes('crypto')) score += 10;
    if (lowerContent.includes('humanitarian')) score += 20;
    
    return Math.min(score, 100);
  }

  private getDemoInsight(title: string, content: string): GlobalAIInsight {
    return {
      id: Date.now().toString(),
      title,
      analysis: this.generateDemoAnalysis(content),
      recommendations: this.generateDemoRecommendations(),
      urgency: this.calculateUrgency(content),
      timestamp: new Date().toISOString(),
      nexusScore: this.calculateNexusScore(content)
    };
  }

  private getDemoTradingInsights(): GlobalAIInsight[] {
    return [
      {
        id: 'nexus-1',
        title: 'Nexus Trading Alert: Humanitarian Crypto Donations Up 47%',
        analysis: 'Nexus AI detects significant increase in cryptocurrency donations to humanitarian causes. Trading patterns suggest sustained growth.',
        recommendations: [
          'Expand crypto donation infrastructure',
          'Monitor blockchain transaction volumes',
          'Prepare for increased donation processing'
        ],
        urgency: 'high',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        nexusScore: 85
      },
      {
        id: 'nexus-2',
        title: 'Nexus Market Intelligence: Conflict Zone Economic Impact',
        analysis: 'Nexus trading systems show significant market disruption in conflict-affected regions. Humanitarian aid corridors prioritized.',
        recommendations: [
          'Establish emergency trading protocols',
          'Coordinate with international relief agencies',
          'Monitor supply chain cryptocurrency flows'
        ],
        urgency: 'critical',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        nexusScore: 92
      }
    ];
  }
}

const globalAIServiceInstance = new GlobalAIService();
export default globalAIServiceInstance;
