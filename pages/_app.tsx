import '../styles/globals.css'
import '../styles/tiptapStyles.scss'
import '../styles/images.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import theme from '../components/Theme';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import useUser from '../components/useUser';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
    document.title = "Anomot";
  }, [])

  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['title'])),
      // Will be passed to the page component as props
    },
  };
}

export default appWithTranslation(MyApp);
