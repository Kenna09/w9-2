import sys
import pandas as pd
from prophet import Prophet
import json

# Read the data passed from Node.js (in JSON format)
data = json.loads(sys.argv[1])

# Convert the data to a DataFrame (assuming 'date' and 'value' are columns)
df = pd.DataFrame(data)

# Prophet requires a specific format
df.columns = ['ds', 'y']  # 'ds' for datetime, 'y' for the value you're predicting

# Create and train the Prophet model
model = Prophet()
model.fit(df)

# Create a dataframe to hold future dates (e.g., 365 days ahead)
future = model.make_future_dataframe(df, periods=365)

# Forecast the future values
forecast = model.predict(future)

# Extract relevant forecast information
forecast_data = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]

# Convert the forecast result back to JSON for Node.js
result = forecast_data.to_dict(orient='records')
print(json.dumps(result))
