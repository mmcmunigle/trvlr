import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import AuthProvider from './auth/Provider';
import NavBar from './components/NavBar/NavBar';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mantine/dates/styles.css';
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
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
