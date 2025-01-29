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
} from '@cloudscape-design/components';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import CardsComponent from './cards.tsx';
import LineChartComponent from './linechart.tsx';

const LOCALE = 'en';

export default function AppLayoutPreview() {
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
              <Header variant="h1" info={<Link variant="info">Info</Link>}>
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
              <CardsComponent />
              <LineChartComponent />
            </Container>
          </ContentLayout>
        }
      />
    </I18nProvider>
  );
}
