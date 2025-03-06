'use client';
import React, { useState } from 'react';
import {
  AppLayout,
  Container,
  ContentLayout,
  Header,
  Link,
  ButtonDropdown,
  Modal,
  Box,
  SpaceBetween,
  Button
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';

import messages from '@cloudscape-design/components/i18n/messages/all.en';
import CardsComponent from './cards.tsx';
import CardsComponentHossain from './card_hossain.tsx';
import TableComponent from './table.tsx';
import InfoCardsComponent from './infocards.tsx';

const LOCALE = 'en';

export default function AppLayoutPreview() {

  const [unit, setUnit] = useState("lbs/1000sqft");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDropdownClick = (event) => {
    const selectedUnit = event.detail.id;
    setUnit(selectedUnit);
  };

  const handleInfoClick = () => {
    setIsModalVisible(true);
  };

  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <AppLayout
        content={
          <ContentLayout
            header={
              <Header variant="h1" 
                info={<Link variant="info" onClick={handleInfoClick}>Info</Link>}
                actions={<ButtonDropdown
                  items={[
                    { text: "Foco Cups", id: "cups/1000sqft", disabled: false },
                    { text: "Grams", id: "grams/sidewalk square", disabled: false },
                    { text: "Pounds", id: "lbs/1000sqft", disabled: false },
                  ]}
                  onItemClick={handleDropdownClick}
                >
                  Unit Display
                </ButtonDropdown>}
              >
                Weather Dashboard
              </Header>
            }
          >
            <Container>
              <div style={{ display: 'flex', gap: '40px,', justifyContent: 'space-evenly' }}>
                <CardsComponent unit={unit} />
                <CardsComponentHossain unit={unit} />
              </div>
              <TableComponent />
            </Container>
          </ContentLayout>
        }
      />
      <Modal
        onDismiss={() => setIsModalVisible(false)}
        visible={isModalVisible}
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="link" onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsModalVisible(false)}>Ok</Button>
            </SpaceBetween>
          </Box>
        }
        header="Salting Info Deck"
      >
        <InfoCardsComponent/>
      </Modal>
    </I18nProvider>
  );
}