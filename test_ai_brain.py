import requests
import json

# Test AI Brain
print("🧠 Testing AI Brain...")
print("=" * 50)

# Test health endpoint
try:
    response = requests.get('http://localhost:8500/health')
    print(f"✅ Health Status: {response.status_code}")
    print(f"   Response: {response.json()}")
except Exception as e:
    print(f"❌ Health Error: {e}")

print()

# Test AI insights endpoint
try:
    data = {
        "news_text": "Iran attacks Israel oil facilities, oil prices spike to $115 per barrel",
        "news_title": "Middle East Crisis",
        "category": "humanitarian"
    }
    response = requests.post('http://localhost:8500/ai-insights', json=data)
    print(f"✅ AI Insights Status: {response.status_code}")
    print(f"   Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"❌ AI Insights Error: {e}")

print()
print("=" * 50)
print("🎉 AI Brain is working!")
