import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
    lastData: {
      tempf: number;
    };
  }
  
  interface HossainData {
    Hossain_2014_Result: string;
  }

  interface IceProbabilityData {
    probability: number;
    sequence_length: number;
    timestamp: string;
  }

  export const useWeatherHossainData = () => {
    const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
    const [hossainData, setHossainData] = useState<HossainData | null>(null);
    const [iceProbability, setIceProbability] = useState<IceProbabilityData[] | null>(null);
    const [loading, setLoading] = useState(true);
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const iceResponse = await axios.get('https://weather-app-67dat.ondigitalocean.app/api/weather/ice?n=10');
        setIceProbability(iceResponse.data);
        const weatherResponse = await axios.get('https://api.dartmouth-team1snowremoval.com/api/weather');
        setWeatherData(weatherResponse.data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const hossainResponse = await axios.get('https://api.dartmouth-team1snowremoval.com/api/weather/hossain');
        setHossainData(hossainResponse.data);

        
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return { weatherData, hossainData, iceProbability, loading, refetch: fetchData };
  };