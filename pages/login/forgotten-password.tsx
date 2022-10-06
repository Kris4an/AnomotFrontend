import type { NextPage } from 'next'
import Button from '../../components/Button';
import LogoSlogan from '../../components/LogoSlogan';
import AuthContainer from '../../components/AuthContainer';
import LoginInput from '../../components/LoginInput';
import styled from 'styled-components'
import { useTranslation } from 'next-i18next';
import create from 'zustand'
import router, { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import Link from 'next/link';


const ForgotPassword: NextPage = () => {
    return(
        <div>forgor💀</div>
    )
}

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
      // Will be passed to the page component as props
    },
  };
}

export default ForgotPassword;