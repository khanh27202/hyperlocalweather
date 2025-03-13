import pandas as pd
from airflow import DAG
from datetime import timedelta, datetime
from airflow.providers.http.sensors.http import HttpSensor
from airflow.providers.http.operators.http import SimpleHttpOperator
from airflow.operators.python import PythonOperator
import psycopg2


DB_HOST = "hyperlocal-db.c41iwuymw07w.us-east-1.rds.amazonaws.com" 
DB_NAME = "weather_db"
DB_USER = "postgres"
DB_PASSWORD = "Team1isfire!"  
DB_PORT = "5432" 

def get_db_connection():
    """
    Function to create and return a database connection
    """
    try:
        # Establish the connection with additional options to handle authentication
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT,
            options="-c client_min_messages=notice"  # Add options to handle authentication
        )
        return conn
    except psycopg2.Error as e:
        print(f"Database connection error: {e}")
        return None  # Return None instead of raising an exception

def test_connection():
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Simple test query
        cur.execute("SELECT version();")
        version = cur.fetchone()
        print(f"Connected to PostgreSQL: {version[0]}")
        cur.close()
        return conn  # Return the connection for further use
    except Exception as e:
        print(f"Error: {e}")
        if conn:
            conn.close()
        return None
    
def insert_weather_data(tempf, humidity, windspeedmph, windgustmph, winddir):
    """
    Function to insert weather data into the weather_t table
    """
    conn = None
    try:
        conn = get_db_connection()
        if conn is None:
            print("Failed to establish database connection")
            return
            
        cur = conn.cursor()
        insert_query = """
        INSERT INTO weather_t (tempf, humidity, windspeedmph, windgustmph, winddir, timestamp)
        VALUES (%s, %s, %s, %s, %s, EXTRACT(EPOCH FROM NOW())::INTEGER);
        """
        cur.execute(insert_query, (tempf, humidity, windspeedmph, windgustmph, winddir))
        conn.commit()
        print("Weather data inserted successfully.")
        cur.close()
    except Exception as e:
        print(f"Error inserting data: {e}")
        if conn is not None:  # Check if conn exists before calling rollback
            conn.rollback()
    finally:
        if conn is not None:  # Check if conn exists before calling close
            conn.close()
            print("Database connection closed.")

def upload_weather_data(task_instance):
    weather_data = task_instance.xcom_pull(task_ids="extract_weather_data")

    if weather_data is None:
        print("No data from Ambient Weather Station")
        return None  

    last_data = weather_data[0]["lastData"]

    insert_weather_data(last_data["tempf"], last_data["humidity"], last_data["windspeedmph"], last_data["windgustmph"], last_data["winddir"])
    
    return 1


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
         schedule_interval='*/10 * * * *',
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

    extract_weather_data = SimpleHttpOperator(
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

    upload_weather_data = PythonOperator(
        task_id='upload_weather_data',
        python_callable=upload_weather_data,
    )

    is_weather_api_react >> extract_weather_data >> upload_weather_data