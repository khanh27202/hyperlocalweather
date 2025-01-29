
from flask import Flask, jsonify, render_template
import requests
import math

app = Flask(__name__)

# API Keys and Endpoint
ENDPOINT = "https://rt.ambientweather.net/v1/devices?"
API_KEY = '80d0cbf141844d2e8afdd8dd4caf9d6979393c605d85477386ceff64899bb067'
APP_KEY = 'a784dc6788c74457b7d77bbe095f1b9f9488b233772d4d92bab211b9ea3bac85'

def f_to_c(tempf):
    return (tempf - 32) * (5 / 9)

def Hossain_2014(H, p, Ce, Te, T, B, BPRT):
    try:
        denominator = (Te - Ce * T) * (T - Te) * BPRT * B
        if denominator == 0:
            return None
        R = math.log(0.2) * Te * Ce * T * p * (H / denominator)
        return R
    except (ZeroDivisionError, ValueError):
        return None

@app.route('/')
def home():
    return "Welcome to Flask Weather API!"

@app.route('/api/weather')
def get_weather():
    try:
        response = requests.get(f"{ENDPOINT}applicationKey={APP_KEY}&apiKey={API_KEY}")
        response.raise_for_status()
        data = response.json()
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/weather/hossain')
def get_hossain():
    try:
        response = requests.get(f"{ENDPOINT}applicationKey={APP_KEY}&apiKey={API_KEY}")
        response.raise_for_status()
        data = response.json()
        sample_data = {
        'snow_height': 1.5,
        'snow_density': 0.56,
        'salt_concentration': 1,
        'salt_temp': f_to_c(data[0]["lastData"]["tempf"])+2,
        'pave_temp': f_to_c(data[0]["lastData"]["tempf"]),
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
        return jsonify({'Hossain_2014_Result': result if result is not None else "Calculation error"})
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
