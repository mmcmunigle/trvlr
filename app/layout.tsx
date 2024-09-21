import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import AuthProvider from './auth/Provider';
import NavBar from './NavBar/NavBar';

import './globals.css';

export const metadata = {
  title: 'TRVLR - AI Travel Planner',
  description: 'TRVLR is an AI Powered Travel Planner',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <AuthProvider>
          <MantineProvider theme={theme}>
            <NavBar />
            <Container>{children}</Container>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
