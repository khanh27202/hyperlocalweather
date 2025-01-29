endPoint = "https://rt.ambientweather.net/v1/devices?"
apiKey ='80d0cbf141844d2e8afdd8dd4caf9d6979393c605d85477386ceff64899bb067'
applicationKey ='a784dc6788c74457b7d77bbe095f1b9f9488b233772d4d92bab211b9ea3bac85'

import requests
import math
response = requests.get(endPoint + "applicationKey=" + applicationKey + "&apiKey=" + apiKey)
weather_data = response.json()

def f_to_c(tempf):
  return (tempf - 32)*(5/9)

tempc = f_to_c(weather_data[0]['lastData']['tempf'])

def Hossain_2014(H, p, Ce, Te, T, B, BPRT):
  R = math.log(0.2) * Te * Ce* T * p * (H/((Te - Ce*T)*(T - Te)*BPRT*B))
  return R

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'key': 'value'}
    return jsonify(data)

if __name__ == '__main__':
    app.run()

import os
os.environ["FLASK_APP"]="backend.py"
