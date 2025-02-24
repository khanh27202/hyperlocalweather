import pandas as pd
from airflow import DAG
from datetime import timedelta, datetime
from airflow.providers.http.sensors.http import HttpSensor
from airflow.providers.http.operators.http import HttpOperator
from airflow.operators.python import PythonOperator
import boto3
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Retrieve the AWS keys from environment variables
aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')

# Initialize the S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name='us-east-2'
)


def upload_file(file_path, bucket_name, s3_key):    
    try:
        s3_client.upload_file(file_path, bucket_name, s3_key)
        print(f"File uploaded successfully to {bucket_name}/{s3_key}")
        return True
    except Exception as e:
        print(f"Error uploading file: {str(e)}")
        return False

def transform_loaded_data(task_instance):
    weather_data = task_instance.xcom_pull(task_ids="extract_weather_data")

    if weather_data is None:
        print("No data from Ambient Weather Station")
        return None  

    last_data = weather_data[0]["lastData"]
 
    date_utc = datetime.fromtimestamp(last_data["dateutc"] / 1000)  
    
    transformed_data = {
        "Temperature (F)": last_data["tempf"],
        "Wind Gust (mph)": last_data["windgustmph"],
        "Wind Speed (mph)": last_data["windspeedmph"],
        "Humidity": last_data["humidity"],
        "Hourly Rain (in)": weather_data[0]["lastData"]["hourlyrainin"],
        "Date UTC": date_utc
    }
    
    transformed_data_list = [transformed_data]
    df_data = pd.DataFrame(transformed_data_list)

    now = datetime.now()
    dt_string = now.strftime("%m_%d_%Y_%H_%M_%S")  
    dt_string = 'current_weather_data_thayer_' + dt_string
    df_data.to_csv(f"{dt_string}.csv", index=False) # add , storage_options=aws_credential

    file_path = dt_string+".csv"
    bucket_name = 'weatherapi741-yml'
    s3_key = dt_string+".csv"
    upload_file(file_path, bucket_name, s3_key)
    
    return df_data


default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 2, 2),  
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=1),
}

with DAG('weather_dag',
         default_args=default_args,
         schedule='@hourly',
         catchup=False) as dag:

    is_weather_api_react = HttpSensor(
        task_id='is_weather_api_react',
        http_conn_id='ambient_weather_api',
        endpoint='/v1/devices/',
        request_params={
            "apiKey": 'efea75f4b5644cc1aca6bc1fc771ce87f8f0da14af5448fbbf4b04d3eecc1168',
            "applicationKey": 'a784dc6788c74457b7d77bbe095f1b9f9488b233772d4d92bab211b9ea3bac85'
        }
    )

    extract_weather_data = HttpOperator(
        task_id='extract_weather_data',
        http_conn_id='ambient_weather_api',
        endpoint='/v1/devices/',
        method='GET',
        data={
            "apiKey": 'efea75f4b5644cc1aca6bc1fc771ce87f8f0da14af5448fbbf4b04d3eecc1168',
            "applicationKey": 'a784dc6788c74457b7d77bbe095f1b9f9488b233772d4d92bab211b9ea3bac85'
        },
        response_filter=lambda response: response.json(),
        log_response=True
    )

    transform_loaded_weather_data = PythonOperator(
        task_id='transform_loaded_weather_data',
        python_callable=transform_loaded_data,
    )

    is_weather_api_react >> extract_weather_data >> transform_loaded_weather_data