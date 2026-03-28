# Nexus Trading AI - GlobalHelper Integration

This script connects your Nexus Trading AI with the GlobalHelper AI Brain for continuous intelligence evolution.

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Update configuration:**
   - Change `SECRET_KEY` in `pull_from_globalhelper.py` to match your AI Brain secret
   - Update `current_data` with your actual trading data

3. **Run the integration:**
   ```bash
   python pull_from_globalhelper.py
   ```

## Features

- **Automatic Evolution**: Pulls intelligence every 15 minutes
- **Strategy Adaptation**: Adjusts trading strategies based on urgency
- **Signal Detection**: Reacts to market signals from GlobalHelper
- **Insight Storage**: Logs all insights for analysis
- **Error Handling**: Robust error handling and retry logic

## What It Does

1. **Calls Secret Endpoint**: Uses `/secret-evolve-nexus` endpoint
2. **Receives Evolved Intelligence**: Gets latest insights from GlobalHelper
3. **Adapts Trading Logic**: Adjusts strategies based on urgency and signals
4. **Stores Insights**: Saves data for analysis and learning
5. **Continuous Operation**: Runs 24/7 with automatic scheduling

## Integration Points

### Position Sizing
```python
if urgency == 'HIGH':
    # Reduce position sizes
    adjust_position_sizes(0.5)
```

### Signal Detection
```python
if 'CRYPTO ACTIVITY DETECTED' in signals:
    # Monitor crypto correlations
    monitor_crypto_correlations()
```

### Strategy Adjustment
```python
if suggested_strategy:
    # Update trading strategy
    update_trading_strategy(suggested_strategy)
```

## Customization

Replace the placeholder functions with your actual trading logic:
- `adjust_position_sizes()`
- `activate_defensive_mode()`
- `monitor_crypto_correlations()`
- `adjust_sentiment_indicators()`

## Deployment

For production deployment:
1. Run as a systemd service on Linux
2. Use screen/tmux for persistent sessions
3. Deploy on cloud servers (AWS, DigitalOcean)
4. Add monitoring and alerting

## Security

- Secret key authentication ensures only Nexus can access evolved intelligence
- All communication is logged for audit trails
- Error handling prevents information leaks
