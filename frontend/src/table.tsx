import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import { useWeatherHossainData } from "./useFetchData.tsx";

const TableComponent = () => {
    const { weatherData, hossainData, loading, refetch } = useWeatherHossainData();
      
  return (
    <Table
      renderAriaLive={({
        firstIndex,
        lastIndex,
        totalItemsCount
      }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      columnDefinitions={[
        {
          id: "variable",
          header: "Salt Type",
          cell: item => item.name,
          sortingField: "name",
          isRowHeader: true
        },
        {
          id: "value",
          header: "Text value",
          cell: item => item.alt,
          sortingField: "alt"
        }
      ]}
      columnDisplay={[
        { id: "variable", visible: true },
        { id: "value", visible: true }
      ]}
      enableKeyboardNavigation
      items={[
        {
          name: "Green",
          alt: "First"
        },
        {
          name: "Blue",
          alt: "Second"
        },
        {
          name: "Slicer",
          alt: "Third"
        },
        {
          name: "Jet Blue",
          alt: "Fourth"
        },
      ]}
      loadingText="Loading resources"
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
      header={
        <Header
        >
          Alternative Salt Materials
        </Header>
      }
    
    />
  );
}

export default TableComponent;