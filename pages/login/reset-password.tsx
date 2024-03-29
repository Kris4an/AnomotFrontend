import type { NextPage } from 'next'
import LogoSlogan from '../../components/LogoSlogan';
import styled from 'styled-components'
import { useTranslation } from 'next-i18next';
import router, { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import CreatePassword from '../../components/CreatePassword';
import instance from '../../axios_instance';

const Holder = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 800px) {
    justify-content: space-between;
  }
`;

const fetcher = (url: any, code: any, identifier: any, newPassword: string) => instance.put(url, {
    "code": code,
    "identifier": identifier,
    "newPassword": newPassword
  });
  
const ResetPassword: NextPage = () => {
    const router = useRouter();
    
    const [t1] = useTranslation("forgotten-password");
    const [password, setPassword] = useState('');

    return(
        <Holder>
          <LogoSlogan/>
          <CreatePassword handleButtonPasword = {() => {fetcher('/account/password/reset', router.query.code, router.query.id, password).then(()=>{router.push('/login')}).catch(()=>{});}} updatePassword = {(newPassword: string) => (setPassword(newPassword))} title = {t1("createNewPassword")} buttonText = {t1("save")}/>
      </Holder>
    )
}

export async function getStaticProps({ locale }:any) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'forgotten-password', 'create'])),
        // Will be passed to the page component as props
      },
    };
  }

export default ResetPassword;