// Grok AI Service for Real-time News Analysis
const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';

interface GrokResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface NewsAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  categories: string[];
  summary: string;
  impact_score: number;
}

export class GrokService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.REACT_APP_GROK_API_KEY || 'demo-key';
  }

  async analyzeNews(newsContent: string): Promise<NewsAnalysis> {
    try {
      const response = await fetch(GROK_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: [{
            role: 'user',
            content: `Analyze this news for humanitarian impact: ${newsContent}`
          }],
          max_tokens: 500
        })
      });

      const data: GrokResponse = await response.json();
      const analysis = data.choices[0]?.message?.content || '';

      return this.parseAnalysis(analysis);
    } catch (error) {
      console.error('Grok analysis failed:', error);
      return this.getDefaultAnalysis();
    }
  }

  private parseAnalysis(analysis: string): NewsAnalysis {
    // Parse AI response for structured data
    return {
      sentiment: this.extractSentiment(analysis),
      urgency: this.extractUrgency(analysis),
      categories: this.extractCategories(analysis),
      summary: analysis.substring(0, 200),
      impact_score: this.calculateImpactScore(analysis)
    };
  }

  private extractSentiment(text: string): 'positive' | 'negative' | 'neutral' {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('positive') || lowerText.includes('hope')) return 'positive';
    if (lowerText.includes('negative') || lowerText.includes('crisis')) return 'negative';
    return 'neutral';
  }

  private extractUrgency(text: string): 'low' | 'medium' | 'high' | 'critical' {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('critical') || lowerText.includes('emergency')) return 'critical';
    if (lowerText.includes('urgent') || lowerText.includes('immediate')) return 'high';
    if (lowerText.includes('important')) return 'medium';
    return 'low';
  }

  private extractCategories(text: string): string[] {
    const categories = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('war') || lowerText.includes('conflict')) categories.push('conflict');
    if (lowerText.includes('refugee') || lowerText.includes('displaced')) categories.push('humanitarian');
    if (lowerText.includes('climate') || lowerText.includes('environment')) categories.push('environmental');
    if (lowerText.includes('donation') || lowerText.includes('fundraising')) categories.push('fundraising');
    
    return categories;
  }

  private calculateImpactScore(text: string): number {
    // Simple impact scoring algorithm
    let score = 50; // Base score
    
    const lowerText = text.toLowerCase();
    if (lowerText.includes('critical')) score += 30;
    if (lowerText.includes('urgent')) score += 20;
    if (lowerText.includes('global')) score += 15;
    if (lowerText.includes('humanitarian')) score += 10;
    
    return Math.min(score, 100);
  }

  private getDefaultAnalysis(): NewsAnalysis {
    return {
      sentiment: 'neutral',
      urgency: 'medium',
      categories: ['general'],
      summary: 'Analysis unavailable',
      impact_score: 50
    };
  }
}

export default new GrokService();
