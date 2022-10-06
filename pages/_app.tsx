import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import theme from '../components/Theme';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';



function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    //document.body.style.backgroundColor = "#1D2440"
    document.title = "Anomot";
  },[])
  return <ThemeProvider theme = {theme}> 
  <Component {...pageProps} /> 
  </ThemeProvider>
}

export default appWithTranslation(MyApp);
