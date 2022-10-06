import type { NextPage } from 'next'
import Button from '../components/Button';
import LogoSlogan from '../components/LogoSlogan';
import AuthContainer from '../components/AuthContainer';
import LoginInput from '../components/LoginInput';
import styled from 'styled-components'
import { useTranslation } from 'next-i18next';
import create from 'zustand'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';


const Holder = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 15vh;
  //align-content: center;
`;
const Text = styled.p`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 37px;
    display: flex;
    align-items: center;
    text-align: center;

    color: ${props => props.theme.colors.text};
`;
const Create: NextPage = () => {
  useEffect(() => {
    document.title = "Anomot - Create Account";
  },[])
    return (
        <Holder>
            <LogoSlogan style={{marginTop: '4rem'}}/>
            <Content stage = {0}/>
      </Holder>
    )
  }

type Props = {
  stage: number
}

function Content({stage}:Props){
  const [t1] = useTranslation("common");
  const [t2] = useTranslation("create");
    //style = {{width: '90%', height: '16.875%'}}
  switch(stage){
      case 0:
        return(
            <AuthContainer style={{height: '30rem', gap: '4rem', width: '28rem'}}>
                <Text>{t2("letsBegin")}</Text>
                <LoginInput inputType = 'Email' placeHolder = {t1("email")} style = {{width: '20rem', height: '3.5rem', fontSize: '20px'}}></LoginInput>
                <Button buttonType='Solid' text = {t1("continue")} style = {{width: '20rem', height: '20rem', fontSize: '20px'}}></Button>
            </AuthContainer>
        )
    }
    return <div></div>
}

export async function getStaticProps({ locale }:any) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'create'])),
        // Will be passed to the page component as props
      },
    };
  }
  
export default Create;
