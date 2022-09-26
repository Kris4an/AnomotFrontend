import type { NextPage } from 'next'
import Button from '../components/Button';
import LogoSlogan from '../components/LogoSlogan';
import AuthContainer from '../components/AuthContainer';
import LoginInput from '../components/LoginInput';
import styled from 'styled-components'
import { Suspense, useState } from 'react';
import { useTranslation } from 'next-i18next';

const Holder = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  //gap: 25rem;
  gap: 25vw;
  justify-content: center;
  align-items: center;
`;

const Holder2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Holder3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const ErrorMessage = styled.p`
  color: #F10000;
  width: 16rem;
  font-size: 14px;
  align-self: flex-start;
  margin: 0.5rem;
`;

const MfaText = styled.p`
  color: black;
  font-size: 24px;
  text-align: center;
`;

const MfaInput = styled.input`
  border: none;
  background: none;
  border-bottom: 3.5px solid ${props => props.theme.colors.buttonDisabled};;
  color: black;
  width: 2.5rem;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
`;

const Login: NextPage = () => {
  
  return (
    <Suspense fallback = {"Loading😴"}>
      <Holder>
        <LogoSlogan/>
        <Content stage = {2}/>
      </Holder>
    </Suspense>
  )
}

type Props = {
  stage: number
}

function Content({stage}:Props){
  const [t1] = useTranslation("common");
  const [t2] = useTranslation("login");

  const [mfaInputCount, setMfaInputCount] = useState(1);
  const [mfaInputMaxLenght, setMfaInputMaxLenght] = useState(6);

  const inp0:any = React.createRef();
  const inp1:any = React.createRef();
  const inp2:any = React.createRef();
  const inp3:any = React.createRef();
  const inp4:any = React.createRef();
  const inp5:any = React.createRef();
  //const but:any = React.createRef();
  
  
  const mfaInputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length >= 6){
      console.log("hello");
      const s:string = event.target.value;
      inp0.current.value = s.charAt(0);
      inp1.current.value = s.charAt(1);
      inp2.current.value = s.charAt(2);
      inp3.current.value = s.charAt(3);
      inp4.current.value = s.charAt(4);
      inp5.current.value = s.charAt(5);
      return;
    }

    setMfaInputMaxLenght(1);
    if(event.target.value != "") setMfaInputCount(mfaInputCount+1);
    else {
      setMfaInputCount(mfaInputCount-1);
      if(mfaInputCount == 2) setMfaInputMaxLenght(6);
      return;
    }

    switch (mfaInputCount){
      case 0: {
        inp0.current.focus();
        break;
      }
      case 1: {
        inp1.current.focus();
        break;
      }
      case 2: {
        inp2.current.focus();
        break;
      }
      case 3: {
        inp3.current.focus();
        break;
      }
      case 4: {
        inp4.current.focus();
        break;
      }
      case 5: {
        inp5.current.focus();
        break;
      }
    }
    
  };

  switch(stage){
      case 0:
        return(
          <AuthContainer style={{scale: '110%'}}>
            <LoginInput inputType = 'Email' placeHolder = {t1("email")}></LoginInput>
            <Holder2>
              <LoginInput inputType = 'Password' placeHolder = {t1("password")}></LoginInput>
              {true? <ErrorMessage>{t2("errorMessage")}</ErrorMessage>:null}
            </Holder2>
            <Button buttonType='Default' text = {t2("login")}></Button>
            <Button buttonType='Teriatary' text = {t2("forgotPassword")} style = {{scale: '80%'}}></Button>
            <Button buttonType='Solid' text = {t2("createAccount")} style = {{scale: '80%'}}></Button>
        </AuthContainer>
        )
      case 1:
        return(
          <AuthContainer style={{scale: '110%', width: '30rem', height: '25rem'}}>
            <MfaText>{t2("mfa")}</MfaText>
            <Button buttonType='Secondary' text = {t1("email")} style = {{width: '23rem'}}></Button>
            <Button buttonType='Secondary' text = 'TOTP' style = {{width: '23rem'}}></Button>
            <Button buttonType='Teriatary' text= {t2("recover")} style = {{scale: '100%', width: '20rem', marginTop: '0rem'}}></Button>
          </AuthContainer>
        )
      case 2:
        return(
          <AuthContainer style={{scale: '110%', width: '25.6rem', height: '20rem'}}>
            <MfaText>{t2("code")}</MfaText>
            <Holder3>
              <MfaInput ref={inp0} type="text" minLength={1} maxLength={mfaInputMaxLenght} pattern='[0-9]' onChange={mfaInputHandleChange}></MfaInput>
              <MfaInput ref={inp1} type="text" minLength={1} maxLength={mfaInputMaxLenght} pattern='[0-9]' onChange={mfaInputHandleChange}></MfaInput>
              <MfaInput ref={inp2} type="text" minLength={1} maxLength={mfaInputMaxLenght} pattern='[0-9]' onChange={mfaInputHandleChange}></MfaInput>
              <MfaInput ref={inp3} type="text" minLength={1} maxLength={mfaInputMaxLenght} pattern='[0-9]' onChange={mfaInputHandleChange}></MfaInput>
              <MfaInput ref={inp4} type="text" minLength={1} maxLength={mfaInputMaxLenght} pattern='[0-9]' onChange={mfaInputHandleChange}></MfaInput>
              <MfaInput ref={inp5} type="text" minLength={1} maxLength={mfaInputMaxLenght} pattern='[0-9]' onChange={mfaInputHandleChange}></MfaInput>
            </Holder3>
            <Button buttonType='Solid' text = {t1("continue")} ></Button>
          </AuthContainer>
        )
    }
    return <div></div>
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
      // Will be passed to the page component as props
    },
  };
}

export default Login