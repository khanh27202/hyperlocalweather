import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";
import { GiSaltShaker } from "react-icons/gi";
import { useWeatherHossainData } from "./useFetchData.tsx";

const CardsComponentHossain = ({ unit }) => {

  const { hossainData, loading, refetch } = useWeatherHossainData();

  const convertAmount = (amount: number, unit: string) => {
    switch (unit) {
      case "cups/1000sqft":
        return Math.round(amount / 0.55); // 1 cup = 250 gram
      case "grams/sidewalk square":
        return Math.round(amount * 12.7);
      case "lbs/1000sqft":
      default:
        return amount;
    }
  };

  const items =  hossainData ? [
    {
      name: "Salt Distribution Recommendation",
      material: "Rock salt",
      amount: `${convertAmount(Math.floor(parseFloat(hossainData.normal_salt)), unit)} ${unit}`
    }
  ] : [];

  return (
    <Cards
      cardDefinition={{
        header: item => (
          <Link fontSize="heading-m">
            {item.name === "Salt Distribution Recommendation" && <GiSaltShaker style={{ marginRight: '8px' }}/>}
            {item.name}
          </Link>
        ),
        sections: [
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
            <Button onClick={refetch}>Reload</Button>
          </SpaceBetween>
        </Box>
      }
    />
    
  );
}

export default CardsComponentHossain;