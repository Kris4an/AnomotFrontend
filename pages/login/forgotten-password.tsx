import type { NextPage } from 'next'
import Button from '../../components/Button';
import LogoSlogan from '../../components/LogoSlogan';
import AuthContainer from '../../components/AuthContainer';
import LoginInput from '../../components/LoginInput';
import styled from 'styled-components'
import { useTranslation } from 'next-i18next';
import router from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import MessageScreen from '../../components/MessageScreen';
import instance from '../../axios_instance';


const Holder = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 15vh;
`;
const Text = styled.p`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 37px;
    color: ${props => props.theme.colors.text};
    text-align: center;
    margin-top: 10px;

    @media (max-width: 800px) {
      margin-top: 10px;
  }
`;
interface ModifiedAuthContainerProps{
  height: string,
  width: string,
  gap: string,
  padding?: string,
  paddingMedia?: string
}
const ModifiedAuthContainer = styled(AuthContainer)<ModifiedAuthContainerProps>`
  height: ${props => props.height};
  gap: ${props => props.gap};
  width: ${props => props.width};
  padding: ${props => props.padding};
  align-items: center;

  @media (max-width: 800px) {
    width: 90vw;
    height: fit-content;
    gap: 1rem;
    box-shadow: none;
    padding: ${props => props.paddingMedia};
  }
`;

const fetcher = (url: any, email: string) => instance.post(url, {
  "email": email
});

const ForgotPassword: NextPage = () => {
    return(
      <Holder>
        <LogoSlogan style={{marginTop: '4rem'}}/>
        <Content/>
      </Holder>
    )
}

function Content(){
  const [t1] = useTranslation("common");
  const [t2] = useTranslation("forgotten-password");
  const [stage, goToPage] = useState(0);
  const [email, setEmail] = useState('');

  switch(stage){
    case 0:
      return(
          <ModifiedAuthContainer height='28rem' gap='2rem' width='28rem' padding='2rem 1rem'>
              <Text>{t2("enterEmail")}</Text>
              <LoginInput inputType = 'Email' handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value);}} placeHolder = {t1("email")} style = {{width: '20rem', height: '3.5rem', fontSize: '20px', maxWidth: '75vw'}}></LoginInput>
              <Button buttonType='Solid' handleClick={() => {
                fetcher('/account/password/reset/new', email);
                goToPage(1);}} disabled = {!(email.length>=3 && email.includes('@'))} text = {t1("continue")} style = {{width: '20rem', fontSize: '20px', maxWidth: '75vw'}}></Button>
          </ModifiedAuthContainer>
      )
    case 1:
      return(
        <MessageScreen handleClick={() => {router.push('/login');}} stage = {true} text = {t2("weSentEmail")} continueTxt = {t1("continue")}></MessageScreen>
      )
  }
  return <div>forgor</div>;
}

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'forgotten-password'])),
      // Will be passed to the page component as props
    },
  };
}

export default ForgotPassword;