import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import { TiWeatherShower } from "react-icons/ti";
import { GiSaltShaker } from "react-icons/gi";
import { useWeatherHossainData } from "./useFetchData.tsx";

const CardsComponent = ({ unit }) => {

  const { weatherData, hossainData, iceProbability, loading, refetch } = useWeatherHossainData();
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

  const items = weatherData && iceProbability ? [
    {
      name: "Weather Condition",
      temperature: `${weatherData[0].lastData.tempf}°F`,
      location: "Thayer Parking Lot",
      iceprobability: `${iceProbability.probability * 100} %`,
    },
  ] : [];

  return (
    <Cards
      cardDefinition={{
        header: item => (
          <Link href="#" fontSize="heading-m">
            {item.name === "Weather Condition" && <TiWeatherShower style={{ marginRight: '8px' }} />} 
            {item.name === "Salt Distribution Recommendation" && <GiSaltShaker style={{ marginRight: '8px' }}/>}
            {item.name}
          </Link>
        ),
        sections: [
          {
            id: "temperature",
            header: "Current Temperature",
            content: item => item.temperature || "N/A"
          },
          {
            id: "location",
            header: "Location",
            content: item => item.location || "N/A"
          },
          {
            id: "iceprobability",
            header: "Ice Probability",
            content: item => item.iceprobability || "N/A"
          },
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
            <Button onClick={refetch}>Reload</Button>
          </SpaceBetween>
        </Box>
      }
    />
    
  );
}

export default CardsComponent;

  // const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  // const [hossainData, setHossainData] = useState<HossainData | null>(null);
  // const [loading, setLoading] = useState(true);

  // const fetchData = () => {
  //   setLoading(true);
  //   console.log("Fetching data...");

  //   axios.get('https://api.dartmouth-team1snowremoval.com/api/weather')
  //     .then(weatherResponse => {
  //       console.log('Weather data:', weatherResponse.data);
  //       setWeatherData(weatherResponse.data);

  //       // Introduce a delay before making the second request
  //       setTimeout(() => {
  //         axios.get('https://api.dartmouth-team1snowremoval.com/api/weather/hossain')
  //           .then(hossainResponse => {
  //             console.log('Hossain data:', hossainResponse.data);
  //             setHossainData(hossainResponse.data);
  //             setLoading(false);
  //           })
  //           .catch(error => {
  //             console.error("There was an error fetching the Hossain data!", error);
  //             setLoading(false);
  //           });
  //       }, 1000); // 1 second delay
  //     })
  //     .catch(error => {
  //       console.error("There was an error fetching the weather data!", error);
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
