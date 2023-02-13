import type { NextPage } from 'next'
import Button from '../../components/Button';
import LogoSlogan from '../../components/LogoSlogan';
import AuthContainer from '../../components/AuthContainer';
import LoginInput from '../../components/LoginInput';
import styled from 'styled-components'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import Checkbox from '../../components/Checkbox';
import instance from '../../axios_instance';
import MessageScreen from '../../components/MessageScreen';
import router from 'next/router';
import CreatePassword from '../../components/CreatePassword';


const Holder = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 800px) {
    min-height: 100%;
    justify-content: space-evenly;
    gap: 0.5rem;
    padding-bottom: 5px;
  }
`;
const Text = styled.p`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 37px;
    color: ${props => props.theme.colors.text};
    text-align: center;

    @media (max-width: 800px) {
      font-size: 25px;
      margin-top: 0px ;
      margin-bottom: 10px;
    }
`;
interface ModifiedAuthContainerProps{
  height: string,
  width: string,
  gap: string,
  padding?: string
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
    gap: 2rem;
    box-shadow: none;
    //padding: 10px 5px;
  }
`;

const fetcher = (url: any, email: string, password: string, username: string) => instance.post(url, {
  "email": email,
  "password": password,
  "username": username
});

const Create: NextPage = () => {
  useEffect(() => {
    document.title = "Anomot - Create Account";
  },[])
    return (
      <Holder>
          <LogoSlogan style={{marginTop: '0rem'}}/>
          <Content/>
      </Holder>
    )
  }

function Content(){
  const [t1] = useTranslation("common");
  const [t2] = useTranslation("create");
  const [stage,goToPage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    goToPage(0);
  },[])

  switch(stage){
      case 0:
        return(
            <ModifiedAuthContainer height={'32rem'} gap={'2rem'} width={'28rem'} padding={'2rem 2rem'}>
                <Text>{t2("letsBegin")}</Text>
                <LoginInput inputType = 'Email' handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value);}} placeHolder = {t1("email")} style = {{width: '20rem', height: '3.5rem', fontSize: '20px'}}></LoginInput>
                <Checkbox dangerouslySet={true} text={t2("acceptTerms", {interpolation: {escapeValue: false}})} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => (setAcceptedTerms(event.target.checked))} style = {{marginBottom: '0.5rem', width: '20rem'}}></Checkbox>
                <Button buttonType='Solid' handleClick={() => {goToPage(1);}} disabled = {!(acceptedTerms && email.length>=3 && email.includes('@'))} text = {t1("continue")} style = {{width: '20rem', fontSize: '20px'}}></Button>
                <Button buttonType='Teriatary' handleClick={() => {router.push('/login')}} text = {t2("alrearyHaveAnAccount")} style = {{width: '18rem', fontSize: '18px'}}></Button>
            </ModifiedAuthContainer>
        )
      case 1:
        return(
            <CreatePassword title = {t2("chooseSecurePassword")} handleButtonPasword = {() => (goToPage(2))} updatePassword = {(newPassword: string) => (setPassword(newPassword))} buttonText = {t1("continue")}/>
        )
      case 2:
        return(
          <ModifiedAuthContainer height={'32rem'} gap={'3rem'} width={'28rem'} padding={'2rem 2rem'}>
            <Text style={{}}>{t2("chooseUserName")}</Text>
            <LoginInput inputType={"Text"} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => (setUsername(event.target.value))} maxLength={40} placeHolder={t1("userName")} style={{width: '20rem', height: '3.5rem', fontSize: '20px'}}></LoginInput>
            <Button buttonType='Solid' handleClick={() => {
                fetcher('/account/new', email, password, username).then(() => {goToPage(3);}).catch(function (error){goToPage(3); setSuccess(false);}); 
              }} 
            text={t1("continue")} disabled={username.length == 0} style = {{width: '20rem', fontSize: '20px'}}/>
          </ModifiedAuthContainer>
        )
      case 3:
          return(
            <MessageScreen handleClick={(success? () => goToPage(4) : () => window.location.reload())} stage = {success} text = {(success? t2("messageScreen1") : t2("messageScreen0"))} continueTxt = {t1("continue")}></MessageScreen>
        )
      case 4:
          return(
            <MessageScreen handleClick={() => {router.push('/login');}} stage = {true} text = {t2("weSentEmail")} continueTxt = {t1("continue")}></MessageScreen>
        )
    }
    return <></>
}

export async function getStaticProps({ locale }:any) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'create'])),
      },
    };
  }
  
export default Create;