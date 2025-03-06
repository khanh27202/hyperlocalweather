import React from 'react';
import { Cards } from '@cloudscape-design/components';

const InfoCardsComponent = () => {
  const items = [
    {
      description: "Dartmouth uses 900 tons of salt per year."
    },
    {
      description: "Rock Salt is most effective above 15oF or -9oC."
    },
    {
      description: "The recommended amount of salt: 1 cup per 10 sq. ft."
    },
    {
      description: "Road salt can contaminate drinking water, endanger wildlife, and damage infrastructure."
    },
    {
      description: "Slips, trips, and falls are some of the most common injuries caused by snow and ice."
    },
    {
      description: "1 foco cup ~ 300 grams ~ 3 handfuls."
    },
    {
      description: "Beet juice, sand, and stone dust are also effective in melting ice."
    }
  ];

  return (
    <Cards
      cardDefinition={{
        sections: [
          {
            id: "description",
            content: item => item.description
          }
        ]
      }}
      items={items}
      cardsPerRow={[
        { cards: 1 },
        { minWidth: 200, cards: 3 }
      ]}
    />
  );
};

export default InfoCardsComponent;