import React from "react";
import { Cards } from "@cloudscape-design/components";

const SingleCardComponent = ({ item }) => {
    return (
        <Cards
            cardDefinition={{
                header: item => item.name,
                sections: item.sections.map(section => ({
                    id: section.id,
                    header: section.header,
                    content: item => item[section.id] || "N/A"
                })),
            }}
            items={[item]}
        />
    );
}

export default SingleCardComponent;
