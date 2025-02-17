import React from "react";
import { Cards, Link } from "@cloudscape-design/components";

const SingleCardComponent = ({ item }) => {
    return (
        <Cards
            cardDefinition={{
                header: item => (
                    <Link href="#" fontSize="heading-m">
                        {item.name}
                    </Link>
                ),
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