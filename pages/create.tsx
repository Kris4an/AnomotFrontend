import type { NextPage } from 'next'
import Button from '../components/Button';
import LogoSlogan from '../components/LogoSlogan';
import AuthContainer from '../components/AuthContainer';
import LoginInput from '../components/LoginInput';
import styled from 'styled-components'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import Checkbox from '../components/Checkbox';
import instance from '../axios_instance';
import MessageScreen from '../components/MessageScreen';
import router from 'next/router';
import CreatePassword from '../components/CreatePassword';


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
    color: ${props => props.theme.colors.text};
    text-align: center;
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
          <LogoSlogan style={{marginTop: '4rem'}}/>
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

  const handleChecboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptedTerms(event.target.checked);
  }

  const handleButtonPasword = () => {
    goToPage(2);
  }

  const usernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const weSentEmail = () => {
    router.push('/login');
  }


  switch(stage){
      case 0:
        return(
            <AuthContainer style={{height: '32rem', gap: '2rem', width: '28rem'}}>
                <Text>{t2("letsBegin")}</Text>
                <LoginInput inputType = 'Email' handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value);}} placeHolder = {t1("email")} style = {{width: '20rem', height: '3.5rem', fontSize: '20px'}}></LoginInput>
                <Checkbox text={t2("acceptTerms")} handleChange={handleChecboxChange} style = {{marginBottom: '1rem'}}></Checkbox>
                <Button buttonType='Solid' handleClick={() => {goToPage(1);}} disabled = {!(acceptedTerms && email.length>=3 && email.includes('@'))} text = {t1("continue")} style = {{width: '20rem', fontSize: '20px'}}></Button>
            </AuthContainer>
        )
      case 1:
        return(
            <CreatePassword handleButtonPasword = {handleButtonPasword} updatePassword = {(newPassword: string) => (setPassword(newPassword))}/>
        )
      case 2:
        return(
          <AuthContainer style={{height: '32rem', gap: '3rem', width: '30rem'}}>
            <Text style={{marginBottom: '6rem', marginTop: '0rem'}}>{t2("chooseUserName")}</Text>
            <LoginInput inputType={"Text"} handleChange={usernameInput} maxLength={40} placeHolder={t1("userName")} style={{width: '20rem', height: '3.5rem'}}></LoginInput>
            <Button buttonType='Solid' handleClick={() => {
                fetcher('/account/new', email, password, username).catch(function (error){setSuccess(false);});
                goToPage(3);
              }} 
            text={t1("continue")} disabled={username.length == 0} style = {{width: '20rem', fontSize: '20px'}}/>
          </AuthContainer>
        )
      case 3:
          return(
            <MessageScreen handleClick={(success? () => (goToPage(4)) : () => (window.location.reload()))} stage = {success} text = {(success? t2("messageScreen1") : t2("messageScreen0"))} continueTxt = {t1("continue")}></MessageScreen>
        )
      case 4:
          return(
            <MessageScreen handleClick={weSentEmail} stage = {true} text = {t2("weSentEmail")} continueTxt = {t1("continue")}></MessageScreen>
        )
    }
    return <div>ERROR refresh the page</div>
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
