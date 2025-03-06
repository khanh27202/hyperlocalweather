import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import { useWeatherHossainData } from "./useFetchData.tsx";

const TableComponent = () => {
    const { hossainData, loading, refetch } = useWeatherHossainData();
    const items = hossainData ? [
      {
        name: "Green",
        alt: hossainData.green === "N/A" ? "N/A" : `${hossainData.green} lbs/1000sqft`
      },
      {
        name: "Blue",
        alt: hossainData.blue === "N/A" ? "N/A" : `${hossainData.blue} lbs/1000sqft`
      },
      {
        name: "Slicer",
        alt: hossainData.slicer === "N/A" ? "N/A" : `${hossainData.slicer} lbs/1000sqft`
      },
      {
        name: "Jet Blue",
        alt: hossainData.jet_blue === "N/A" ? "N/A" : `${hossainData.jet_blue} lbs/1000sqft`
      },
      
    ] : []

      
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
          header: "Amount",
          cell: item => item.alt,
          sortingField: "alt"
        }
      ]}
      columnDisplay={[
        { id: "variable", visible: true },
        { id: "value", visible: true }
      ]}
      enableKeyboardNavigation
      items={items}
      loadingText="Loading resources"
      loading={loading}
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button onClick={refetch}>Reload</Button>
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