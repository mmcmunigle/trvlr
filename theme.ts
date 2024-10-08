'use client';

import { createTheme, virtualColor } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    'burnt-sienna': [
      '#fdf5f3',
      '#fde8e3',
      '#fbd6cd',
      '#f8b9a9',
      '#f19078',
      '#e76f51',
      '#d3502f',
      '#b14024',
      '#933821',
      '#7a3422',
      '#42180d',
    ],
    'blue-dianne': [
      '#f0fafb',
      '#d9f2f4',
      '#b7e4ea',
      '#85d0db',
      '#4cb2c4',
      '#3196a9',
      '#2b798f',
      '#296475',
      '#295361',
      '#264653',
      '#142d38',
    ],
    'persian-green': [
      '#f2fbf9',
      '#d3f4ed',
      '#a6e9db',
      '#72d6c6',
      '#44bdac',
      '#2a9d8f',
      '#208177',
      '#1d6861',
      '#1c534f',
      '#1b4642',
      '#0a2928',
    ],
    'rob-roy': [
      '#fdf9ed',
      '#f8edcd',
      '#f0d997',
      '#e9c46a',
      '#e2ab3d',
      '#da8d26',
      '#c16c1e',
      '#a04f1d',
      '#833e1d',
      '#6c331b',
      '#3d190b',
    ],
    'sandy-brown': [
      '#fef6ee',
      '#fdead7',
      '#fad2ae',
      '#f4a261',
      '#f18746',
      '#ed6722',
      '#de4e18',
      '#b83a16',
      '#933019',
      '#762a18',
      '#40120a',
    ],
    terracotta: [
      '#fdf4f0',
      '#f9d8d0',
      '#f0a698',
      '#e07362',
      '#d1523f',
      '#b43f30',
      '#90332a',
      '#732a25',
      '#5d2321',
      '#4a1d1b',
      '#290e0d',
    ],
    clay: [
      '#fdf7f1',
      '#fbe6d8',
      '#f4b899',
      '#e6875a',
      '#d96a37',
      '#b94f29',
      '#964127',
      '#773523',
      '#602c1e',
      '#4d241a',
      '#2b130e',
    ],
    ochre: [
      '#fefaf2',
      '#fcedd2',
      '#f7d5a2',
      '#f0b66e',
      '#e89742',
      '#d67d1e',
      '#b66618',
      '#944f18',
      '#7a4018',
      '#623417',
      '#3a1c0e',
    ],
    'slate-earth': [
      '#f0f4f8',
      '#d9e2ec',
      '#bcccdc',
      '#9fb3c8',
      '#829ab1',
      '#627d98',
      '#486581',
      '#334e68',
      '#243b53',
      '#102a43',
      '#071e28',
    ],
    primary: virtualColor({
      name: 'primary',
      dark: 'cyan',
      light: 'persian-green',
    }),
  },
  primaryColor: 'persian-green',
});
