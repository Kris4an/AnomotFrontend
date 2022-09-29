import type { NextPage } from 'next'
import Button from '../components/Button';
import LogoSlogan from '../components/LogoSlogan';
import AuthContainer from '../components/AuthContainer';
import LoginInput from '../components/LoginInput';
import styled from 'styled-components'
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const Holder = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
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
    <Holder>
      <LogoSlogan/>
      <Content stage = {3}/>
    </Holder>
  )
}

type Props = {
  stage: number
}

function Content({stage}:Props){
  const [t1] = useTranslation("common");
  const [t2] = useTranslation("login");

  const inp0: any = React.createRef();
  const inp1: any = React.createRef();
  const inp2: any = React.createRef();
  const inp3: any = React.createRef();
  const inp4: any = React.createRef();
  const inp5: any = React.createRef();

  const inp10: any = React.createRef();
  const inp11: any = React.createRef();
  const inp12: any = React.createRef();
  const inp13: any = React.createRef();
  const inp14: any = React.createRef();
  const inp15: any = React.createRef();
  const inp16: any = React.createRef();
  const inp17: any = React.createRef();
  
  const mfaInputHandleChange = (event: React.ChangeEvent<HTMLInputElement>,  inpsProp:any[]) => {
    const inps: any[] = inpsProp;

    if(event.target.value == "") return;
    

    if(inps.length == 6 && (isNaN(Number(event.target.value)) || event.target.value.charAt(0) == ' ')) {
      event.target.value = "";
      return;
    }
    else{
      for(let i = 0; i < event.target.value.length;i++){
        if((isNaN(Number(event.target.value)) || event.target.value.charAt(0) == ' ') && !(event.target.value.charAt(i).toLowerCase() !== event.target.value.charAt(i).toUpperCase())){
          event.target.value = "";
          return;
        }
      }
    }
    if(event.target.value.length > 2){
      const s: string = event.target.value;
      for(let i = 0; i < inps.length;i++){
        if(s.charAt(i)=="") {
          inps[i].current.focus();
          return;
        }
        inps[i].current.value = s.charAt(i);
      }

      inps[inps.length-1].current.focus();
      return;
    }
    if(event.target.value.length > 1) inps[Number(event.currentTarget.id)].current.value = event.target.value.charAt(0);
    if(Number(event.currentTarget.id) < inps.length-1)inps[Number(event.currentTarget.id)+1].current.focus();
  };


  switch(stage){
      case 0:
        return(
          <AuthContainer>
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
          <AuthContainer style={{width: '30rem', height: '25rem'}}>
            <MfaText>{t2("mfa")}</MfaText>
            <Button buttonType='Secondary' text = {t1("email")} style = {{width: '23rem'}}></Button>
            <Button buttonType='Secondary' text = 'TOTP' style = {{width: '23rem'}}></Button>
            <Button buttonType='Teriatary' text= {t2("recover")} style = {{width: '20rem'}}></Button>
          </AuthContainer>
        )
      case 2:{
        const inps: any[] = [inp0, inp1, inp2, inp3, inp4, inp5];
        return(
          <AuthContainer style={{width: '25.6rem', height: '20rem'}}>
            <MfaText>{t2("code")}</MfaText>
            <Holder3>
              <MfaInput id={"0"} ref={inp0} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
              <MfaInput id={"1"} ref={inp1} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
              <MfaInput id={"2"} ref={inp2} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
              <MfaInput id={"3"} ref={inp3} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
              <MfaInput id={"4"} ref={inp4} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
              <MfaInput id={"5"} ref={inp5} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
            </Holder3>
            <Button buttonType='Solid' text = {t1("continue")} ></Button>
          </AuthContainer>
        )
      }
        case 3:{
          const inps: any[] = [inp10, inp11, inp12, inp13, inp14, inp15, inp16, inp17];
          return(
            <AuthContainer style={{width: '27.6rem', height: '24rem'}}>
              <MfaText>{t2("recoverText")}</MfaText>
              <Holder3>
                <MfaInput id={"0"} ref={inp10} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
                <MfaInput id={"1"} ref={inp11} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
                <MfaInput id={"2"} ref={inp12} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
                <MfaInput id={"3"} ref={inp13} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
                <MfaInput id={"4"} ref={inp14} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
                <MfaInput id={"5"} ref={inp15} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
                <MfaInput id={"6"} ref={inp16} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
                <MfaInput id={"7"} ref={inp17} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)}></MfaInput>
              </Holder3>
              <Button buttonType='Solid' text = {t1("continue")} ></Button>
            </AuthContainer>
          )
        }
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