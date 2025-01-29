import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Link from "@cloudscape-design/components/link";


const CardsComponent = () => {

  const getSections = (item) => {
    if (item.name === "Weather Condition") {
      return [
        {
          id: "temperature",
          header: "Current Temperature",
          content: item => item.temperature || "N/A"
        },
        {
          id: "iceForm",
          header: "Ice Form",
          content: item => item.iceForm || "N/A"
        }
      ];
    } else if (item.name === "Salt Distribution Recommendation") {
      return [
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
      ];
    }
    return [];
  };
    
  return (
    <Cards
      
      cardDefinition={{
        header: item => (
          <Link href="#" fontSize="heading-m">
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
              id: "iceForm",
              header: "Ice Form",
              content: item => item.iceForm || "N/A"
            },
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
        { cards: 1 },
        { minWidth: 500, cards: 2 }
      ]}
      items={[
        {
            name: "Weather Condition",
            temperature: "32°F",
            iceForm: "No"
          },
          {
            name: "Salt Distribution Recommendation",
            material: "Rock salt",
            amount: "50 pounds / 1000 square feet"
          }
      ]}
      loadingText="Loading resources"
      trackBy="name"
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
      
      
    />
  );
}


export default CardsComponent;