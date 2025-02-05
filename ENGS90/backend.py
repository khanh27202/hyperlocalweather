from flask import Flask, jsonify, render_template, session
import requests
import math

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Needed for session

# API Keys and Endpoint
ENDPOINT = "https://rt.ambientweather.net/v1/devices?"
API_KEY = '80d0cbf141844d2e8afdd8dd4caf9d6979393c605d85477386ceff64899bb067'
APP_KEY = 'a784dc6788c74457b7d77bbe095f1b9f9488b233772d4d92bab211b9ea3bac85'

def f_to_c(tempf):
    return (tempf - 32) * (5 / 9)

def lb_to_cup(lb):
    return lb /3

def api_call(endpoint, appkey, apikey):
    try:
        response = requests.get(f"{endpoint}applicationKey={appkey}&apiKey={apikey}")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"API call failed: {e}")
        return None  # Return None instead of an exception

def Hossain_2014(H, p, Ce, Te, T, B, BPRT):
    try:
        denominator = (Te - Ce * T) * (T - Te) * BPRT * B
        if denominator == 0 or math.isnan(denominator) or math.isinf(denominator):
            return None  # Avoid division by zero or invalid numbers
        
        R = math.log(0.2) * Te * Ce * T * p * (H / denominator)
        return max(0, R)  # Ensure R is not negative
    except (ZeroDivisionError, ValueError, TypeError) as e:
        print(f"Error in Hossain_2014 calculation: {e}")
        return None


@app.route('/')
def home():
    return "Welcome to Flask Weather API!"

@app.route('/api/weather')
def get_weather():
    session['weather_data'] = api_call(ENDPOINT, APP_KEY, API_KEY)
    return jsonify(session['weather_data'])

@app.route('/api/weather/hossain')
def get_hossain():
    weather_data = session.get('weather_data')
    try:
        if not weather_data or not isinstance(weather_data, list) or "lastData" not in weather_data[0]:
            return jsonify({'error': 'Invalid or missing weather data'}), 500

        temp_f = weather_data[0]["lastData"].get("tempf")
        if temp_f is None:
            return jsonify({'error': 'Temperature data unavailable'}), 500

        sample_data = {
            'snow_height': 1.5,
            'snow_density': 0.56,
            'salt_concentration': 1,
            'salt_temp': f_to_c(temp_f) + 2,
            'pave_temp': f_to_c(temp_f),
            'melt_speed': 0.49,
            'BPRT': 2.04
        }

        result = Hossain_2014(
            sample_data['snow_height'],
            sample_data['snow_density'],
            sample_data['salt_concentration'],
            sample_data['salt_temp'],
            sample_data['pave_temp'],
            sample_data['melt_speed'],
            sample_data['BPRT']
        )

        return jsonify({'Optimal Salt Distribution in lb/1000sqft: ': result if result is not None else "Calculation error", 'Optimal Salt Distribution in Foco Cups: ': lb_to_cup(result) if result is not None else "Calculation error",'Sample Data: ': sample_data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
