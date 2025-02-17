import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import { TiWeatherShower } from "react-icons/ti";
import { GiSaltShaker } from "react-icons/gi";



interface WeatherData {
  lastData: {
    tempf: number;
  };
}

interface HossainData {
  Hossain_2014_Result: string;
}

const CardsComponentHossain = ({ unit }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [hossainData, setHossainData] = useState<HossainData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    console.log("Fetching data...");

    axios.get('${process.env.REACT_APP_API_URL}/weather')
      .then(weatherResponse => {
        setWeatherData(weatherResponse.data);

        // Introduce a delay before making the second request
        setTimeout(() => {
          axios.get('${process.env.REACT_APP_API_URL}/weather/hossain')
            .then(hossainResponse => {
              setHossainData(hossainResponse.data);
              setLoading(false);
            })
            .catch(error => {
              console.error("There was an error fetching the Hossain data!", error);
              setLoading(false);
            });
        }, 1000); // 1 second delay
      })
      .catch(error => {
        console.error("There was an error fetching the weather data!", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const convertAmount = (amount: number, unit: string) => {
    switch (unit) {
      case "cups":
        return amount / 4; // 1 cup = 4 lbs
      case "bucket":
        return amount / 10; // 1 bucket = 10 lbs
      case "lbs":
      default:
        return amount;
    }
  };

  const items =  hossainData ? [
    // {
    //   name: "Weather Condition",
    //   temperature: `${weatherData[0].lastData.tempf}°F`,
    //   location: "Thayer Parking Lot",
    //   material: "Rock salt",
    //   amount: `${convertAmount(Math.floor(parseFloat(hossainData.Hossain_2014_Result)), unit)} ${unit}`
    // },
    {
      name: "Salt Distribution Recommendation",
      material: "Rock salt",
      amount: `${convertAmount(Math.floor(parseFloat(hossainData.Hossain_2014_Result)), unit)} ${unit}`
    }
  ] : [];

  return (
    <Cards
      cardDefinition={{
        header: item => (
          <Link href="#" fontSize="heading-m">
            {/* {item.name === "Weather Condition" && <TiWeatherShower style={{ marginRight: '8px' }} />}  */}
            {item.name === "Salt Distribution Recommendation" && <GiSaltShaker style={{ marginRight: '8px' }}/>}
            {item.name}
          </Link>
        ),
        sections: [
        //   {
        //     id: "temperature",
        //     header: "Current Temperature",
        //     content: item => item.temperature || "N/A"
        //   },
        //   {
        //     id: "location",
        //     header: "Location",
        //     content: item => item.location || "N/A"
        //   },
          {
            id: "material",
            header: "Material",
            content: item => item.material || "N/A"
          },
          {
            id: "amount",
            header: "Amount",
            content: item => item.amount || "N/A"
          }
        ]
      }}
      cardsPerRow={[
        // { minWidth: 500, cards: 2 }
      ]}
      items={items}
      loadingText="Loading resources"
      loading={loading}
      trackBy="name"
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>Reload to see current temperature and salt distribution.</b>
            <Button onClick={fetchData}>Reload</Button>
          </SpaceBetween>
        </Box>
      }
    />
    
  );
}

export default CardsComponentHossain;