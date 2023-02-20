import '../styles/globals.css'
import '../styles/tiptapStyles.scss'
import '../styles/images.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import theme from '../components/Theme';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import instance from '../axios_instance';
import useUser from '../components/useUser';
import { useRouter } from 'next/router';

const fetcher = (url: any) => instance.get(url).then(res => {
  return res.data;
})

function MyApp({ Component, pageProps }: AppProps) {
  const { user: userData, isError: userDataError, isValidating: isValidating } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isValidating) {
      if (router.pathname == "/login") return;
      if(userData == undefined){
        if (router.pathname == "/account") {
          router.push("/account/create");
          return;
        }
        if(router.pathname == '/terms-of-service' || router.pathname == '/privacy-policy') return;
        router.push('/login');
        return;
      }
      if (userData.id == undefined) {
        if (router.pathname == "/account") {
          router.push("/account/create");
          return;
        }
        if(router.pathname == '/terms-of-service' || router.pathname == '/privacy-policy') return;
        else router.push('/login');
      }
    }
  }, [isValidating])
  useEffect(() => {
    fetcher("/account/user");
    //document.body.style.backgroundColor = "#1D2440"
    document.title = "Anomot";
  }, [])
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export default appWithTranslation(MyApp);
