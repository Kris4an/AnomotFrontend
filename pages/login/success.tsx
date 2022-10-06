import type { NextPage } from 'next'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next';
import router, { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import MessageScreen from '../../components/messageScreen';


const Success: NextPage = () => {
  const handleClick = () => {
    router.push("/login");
  }
  const [t1] = useTranslation("message-screens");
  const [t2] = useTranslation("common");
    return(
        <MessageScreen handleClick={handleClick} stage = {true} text = {t1("mfaS")} continueTxt = {t2("continue")}></MessageScreen>
    )
}

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['message-screens', 'common'])),
      // Will be passed to the page component as props
    },
  };
}

export default Success;