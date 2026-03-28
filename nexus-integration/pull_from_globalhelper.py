#!/usr/bin/env python3
"""
Nexus Trading AI - GlobalHelper Integration
Pulls evolved intelligence from GlobalHelper AI Brain every 15 minutes
"""

import requests
import json
import time
import schedule
from datetime import datetime

# Configuration (Update after Render.com deployment)
AI_BRAIN_URL = "https://globalhelper-ai-brain.onrender.com"
SECRET_KEY = "YOUR_SUPER_SECRET_KEY_2026"  # Change this to match your AI Brain

def pull_from_globalhelper_ai():
    """Pull latest evolved knowledge from GlobalHelper AI Brain"""
    try:
        print(f"🧠 Nexus AI: Pulling intelligence from GlobalHelper... ({datetime.now()})")
        
        # Current trading data (customize based on your actual data)
        current_data = {
            "current_positions": [
                {"symbol": "BTC/USDT", "position": "long", "size": 0.5},
                {"symbol": "ETH/USDT", "position": "short", "size": 1.2}
            ],
            "current_strategy": "momentum",
            "market_sentiment": "neutral",
            "portfolio_value": 125000
        }
        
        # Call the secret endpoint
        response = requests.post(
            f"{AI_BRAIN_URL}/secret-evolve-nexus",
            headers={"X-Secret-Key": SECRET_KEY},
            json={
                "trading_data": current_data,
                "current_strategy": current_data["current_strategy"]
            },
            timeout=30
        )
        
        if response.status_code == 200:
            new_knowledge = response.json()
            
            # Process evolved insights
            print("✅ Nexus AI evolved with GlobalHelper knowledge!")
            print(f"📊 Strategy: {new_knowledge.get('suggested_strategy', 'N/A')}")
            print(f"🚨 Urgency: {new_knowledge.get('urgency_level', 'N/A')}")
            print(f"💡 Insights: {new_knowledge.get('evolved_insights', 'N/A')}")
            
            # Market signals
            signals = new_knowledge.get('market_signals', [])
            if signals:
                print(f"📈 Market Signals: {', '.join(signals)}")
            
            # Discovery opportunities
            opportunities = new_knowledge.get('discovery_opportunities', [])
            if opportunities:
                print("🔬 Discovery Opportunities:")
                for opp in opportunities:
                    print(f"  - {opp}")
            
            # Feed into your trading logic here
            feed_into_trading_logic(new_knowledge)
            
        else:
            print(f"❌ Error connecting to AI Brain: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"🌐 Network error: {e}")
    except Exception as e:
        print(f"💥 Unexpected error: {e}")

def feed_into_trading_logic(evolved_data):
    """Feed evolved intelligence into your trading algorithms"""
    
    # Extract key insights
    urgency = evolved_data.get('urgency_level', 'LOW')
    strategy = evolved_data.get('suggested_strategy', '')
    signals = evolved_data.get('market_signals', [])
    
    # Example: Adjust position sizing based on urgency
    if urgency == 'HIGH':
        print("🔴 HIGH URGENCY: Reducing position sizes, increasing defensive positions")
        # Your logic here: adjust_position_sizes(0.5)
        
    elif urgency == 'CRITICAL':
        print("🚨 CRITICAL: Activating defensive trading protocols")
        # Your logic here: activate_defensive_mode()
    
    # Example: React to crypto activity signals
    if 'CRYPTO ACTIVITY DETECTED' in signals:
        print("🪙 Crypto activity detected: Monitoring BTC/USDT correlation")
        # Your logic here: monitor_crypto_correlations()
    
    # Example: React to donation momentum
    if 'DONATION MOMENTUM' in signals:
        print("💰 Donation momentum: Positive sentiment indicator")
        # Your logic here: adjust_sentiment_indicators('positive')
    
    # Store insights for analysis
    store_insights_for_analysis(evolved_data)

def store_insights_for_analysis(evolved_data):
    """Store insights for later analysis and learning"""
    
    insight_data = {
        "timestamp": datetime.now().isoformat(),
        "urgency_level": evolved_data.get('urgency_level'),
        "suggested_strategy": evolved_data.get('suggested_strategy'),
        "market_signals": evolved_data.get('market_signals', []),
        "evolved_insights": evolved_data.get('evolved_insights'),
        "discovery_opportunities": evolved_data.get('discovery_opportunities', [])
    }
    
    # Save to file for analysis
    with open("nexus_insights_log.json", "a") as f:
        f.write(json.dumps(insight_data) + "\n")
    
    print("📝 Insights stored for analysis")

def main():
    """Main execution loop"""
    print("🚀 Nexus Trading AI - GlobalHelper Integration Started")
    print(f"🌐 AI Brain URL: {AI_BRAIN_URL}")
    print(f"🔐 Secret Key: {'✅ Configured' if SECRET_KEY != 'YOUR_SUPER_SECRET_KEY_2026' else '⚠️  Update needed!'}")
    print("⏰ Pulling intelligence every 15 minutes...")
    print("=" * 60)
    
    # Schedule the function to run every 15 minutes
    schedule.every(15).minutes.do(pull_from_globalhelper_ai)
    
    # Run immediately on start
    pull_from_globalhelper_ai()
    
    # Keep the script running
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    main()
