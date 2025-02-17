'use client';
import React from 'react';
import {
  AppLayout,
  BreadcrumbGroup,
  Container,
  ContentLayout,
  Flashbar,
  Header,
  Link,
  ButtonDropdown
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import { useState } from "react";

import messages from '@cloudscape-design/components/i18n/messages/all.en';
import CardsComponent from './cards.tsx';
import CardsComponentHossain from './card_hossain.tsx';
import LineChartComponent from './linechart.tsx';

const LOCALE = 'en';

export default function AppLayoutPreview() {

  const [unit, setUnit] = useState("lbs");

  const handleDropdownClick = (event) => {
    const selectedUnit = event.detail.id;
    setUnit(selectedUnit);
  };

  return (
    <I18nProvider locale={LOCALE} messages={[messages]}>
      <AppLayout
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Home', href: '#' },
              { text: 'Service', href: '#' },
            ]}
          />
        }
        notifications={
          <Flashbar
            items={[
              {
                type: 'info',
                dismissible: true,
                content: 'Ice is forming in 1 hour at Dicks House Parking Lot!',
                id: 'message_1',
              },
            ]}
          />
        }
        content={
          <ContentLayout
            header={
              <Header variant="h1" info={<Link variant="info">Info</Link> }
                actions={<ButtonDropdown
                  items={[
                    { text: "Foco Cups", id: "cups", disabled: false },
                    { text: "Buckets", id: "bucket", disabled: false },
                    { text: "Pounds", id: "lbs", disabled: false },
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
            <Container
              // header={
              //   <Header variant="h2" description="Container description">
              //     Container header
              //   </Header>
              // }
            >
              {/* <div className="contentPlaceholder" /> */}
              <div style={{ display: 'flex', gap: '40px,', justifyContent: 'space-evenly' }}>
                <CardsComponent unit={unit} />
                <CardsComponentHossain unit={unit} />
              </div>

              <LineChartComponent />
            </Container>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}
