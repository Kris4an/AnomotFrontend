import '../styles/globals.css'
import '../styles/tiptapStyles.scss'
import '../styles/images.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import theme from '../components/Theme';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import instance from '../axios_instance';

const fetcher = (url: any) => instance.get(url).then(res => {
  return res.data;
})

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    fetcher("/account/user");
    //document.body.style.backgroundColor = "#1D2440"
    document.title = "Anomot";
  },[])
  return <ThemeProvider theme = {theme}>
  <Component {...pageProps} /> 
  </ThemeProvider>
}

export default appWithTranslation(MyApp);
