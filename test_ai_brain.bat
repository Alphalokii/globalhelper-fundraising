@echo off
echo Testing AI Brain on Railway.app...
echo.

curl -k -X POST "https://globalhelper-nexus-ai-brain.up.railway.app/ai-insights" ^
  -H "Content-Type: application/json" ^
  -d "{\"news_text\": \"Iran attacks Israel oil facilities, oil prices spike to $115\", \"news_title\": \"Middle East Crisis\", \"category\": \"humanitarian\"}"

echo.
echo Testing Nexus endpoint...
echo.

curl -k -X POST "https://globalhelper-nexus-ai-brain.up.railway.app/secret-evolve-nexus" ^
  -H "Content-Type: application/json" ^
  -H "X-Secret-Key: YOUR_SUPER_SECRET_KEY_2026" ^
  -d "{\"trading_data\": {\"current_positions\": [{\"symbol\": \"BTC/USDT\", \"position\": \"long\"}], \"current_strategy\": \"momentum\"}}"

echo.
echo Testing health endpoint...
echo.

curl -k "https://globalhelper-nexus-ai-brain.up.railway.app/health"

pause
