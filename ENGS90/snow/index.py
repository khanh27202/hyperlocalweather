from flask import Flask, jsonify, render_template
import requests
app = Flask(__name__)

#might have to change to AWS
endPoint = "https://rt.ambientweather.net/v1/devices?"
apiKey ='80d0cbf141844d2e8afdd8dd4caf9d6979393c605d85477386ceff64899bb067'
appKey ='a784dc6788c74457b7d77bbe095f1b9f9488b233772d4d92bab211b9ea3bac85'
import requests
import math
response = requests.get(endPoint + "applicationKey=" + appKey + "&apiKey=" + apiKey)
weather_data = response.json()

def f_to_c(tempf):
  return (tempf - 32)*(5/9)

#tempc = f_to_c(weather_data[0]['lastData']['tempf'])

#data = {'pave temp': tempc, 'snow height': 1.5, 'snow density': 0.56, 'salt concentration': 1, 'salt temp': tempc, 'melt speed': 0.49, 'BPRT': 2.04}
def Hossain_2014(H, p, Ce, Te, T, B, BPRT):
  R = math.log(0.2) * Te * Ce* T * p * (H/((Te - Ce*T)*(T - Te)*BPRT*B))
  return R
@app.route('/')
def home():
    return "Welcome to Flask API tutorial!"

@app.route('/api/data')
def get_data():
    try:
        response = requests.get(endPoint + "applicationKey=" + appKey + "&apiKey=" + apiKey)
        response.raise_for_Status()
        data = response.json()
    except requests.exceptions.HTTPError as http_err:
       return jsonify({'error': f'HTTP error occurred: {http_err}'}), 500
    except Exception as err:
       return jsonify({'error': f'Other error occurred: {err}'}), 500
    return render_template('data.html', data=data)
        
#@app.route('/data', methods = ['GET'])
#def get_snow():
    #return jsonify(Hossain_2014(data['snow height'], data['snow density'],data['salt concentration'], data['salt temp'], data['pave temp'], data['melt speed'], data['BPRT']))

if __name__ == '__main__':
    app.run()
