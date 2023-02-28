import '../styles/globals.css'
import '../styles/tiptapStyles.scss'
import '../styles/images.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import theme from '../components/Theme';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import instance from '../axios_instance';
import useUser from '../components/useUser';
import { useRouter } from 'next/router';
import { Head } from 'next/document';
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

  const [t4] = useTranslation("title");

  return <ThemeProvider theme={theme}>
    <Head>
        <title>{t4("title")}</title>
        <meta
          name='description'
          content={t4("description")}
          key='desc'
        />
      </Head>
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
