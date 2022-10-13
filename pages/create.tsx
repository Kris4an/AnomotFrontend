import type { NextPage } from 'next'
import Button from '../components/Button';
import LogoSlogan from '../components/LogoSlogan';
import AuthContainer from '../components/AuthContainer';
import LoginInput from '../components/LoginInput';
import styled from 'styled-components'
import { useTranslation } from 'next-i18next';
import create from 'zustand'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import Checkbox from '../components/Checkbox';
import PasswordStrength from '../components/PasswordStrength';


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
const Holder2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;
const Dot = styled.div<{DotColor: string}>`
  //box-sizing: border-box;
  width: 16px;
  height: 16px;
  background: ${(props) => props.DotColor};
  border-radius: 16px;
`;
const PasswordRequirementsHolder = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  align-items: center;
`;
const RequirementText = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: ${props => props.theme.colors.text};
`;
const Holder3 = styled.div`
  height: 18rem;
  width: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const Holder4 = styled.div`
  height: 18rem;
  width: 21rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
const Create: NextPage = () => {
  useEffect(() => {
    document.title = "Anomot - Create Account";
  },[])
    return (
      <Holder>
          <LogoSlogan style={{marginTop: '4rem'}}/>
          <Content stage = {3}/>
      </Holder>
    )
  }

type Props = {
  stage: number
}

function Content({stage}:Props){
  const [t1] = useTranslation("common");
  const [t2] = useTranslation("create");
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const handleChecboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptedTerms(event.target.checked);
  }
  switch(stage){
      case 0:
        return(
            <AuthContainer style={{height: '32rem', gap: '2rem', width: '28rem'}}>
                <Text>{t2("letsBegin")}</Text>
                <LoginInput inputType = 'Email' placeHolder = {t1("email")} style = {{width: '20rem', height: '3.5rem', fontSize: '20px'}}></LoginInput>
                <Checkbox text={t2("acceptTerms")} handleChange={handleChecboxChange} style = {{marginBottom: '1rem'}}></Checkbox>
                <Button buttonType='Solid' disabled = {!acceptedTerms} text = {t1("continue")} style = {{width: '20rem', fontSize: '20px'}}></Button>
            </AuthContainer>
        )
      case 1:
        return(
            <AuthContainer style={{height: '32rem', gap: '1rem', width: '45rem'}}>
              <Text>{t2("chooseSecurePassword")}</Text>
              <Holder2>
                <Holder3>
                  <LoginInput inputType="Password" placeHolder={t1("password")} style={{width: '17rem', height: '3.5rem'}} passwordStyle={{height: '3.5rem'}}></LoginInput>
                  <LoginInput inputType="Password" placeHolder={t1("repeatPassword")} style={{width: '17rem', height: '3.5rem'}} passwordStyle={{height: '3.5rem'}}></LoginInput>
                </Holder3>
                <Holder4>
                  <PasswordStrength stage = {0} text = {"Very bad"}></PasswordStrength>
                  <PasswordRequirementsHolder>
                    <div><Dot DotColor='#F10000'></Dot></div>
                    <RequirementText>{t2("passwordRequirement0")}</RequirementText>
                  </PasswordRequirementsHolder>
                  <PasswordRequirementsHolder>
                    <div><Dot DotColor='#3FD918'></Dot></div>
                    <RequirementText>{t2("passwordRequirement1")}</RequirementText>
                  </PasswordRequirementsHolder>
                  <PasswordRequirementsHolder>
                    <div><Dot DotColor='#3FD918'></Dot></div>
                    <RequirementText>{t2("passwordRequirement2")}</RequirementText>
                  </PasswordRequirementsHolder>
                  <PasswordRequirementsHolder>
                    <div><Dot DotColor='#F3A712'></Dot></div>
                    <RequirementText>{t2("passwordRequirement3")}</RequirementText>
                  </PasswordRequirementsHolder>
                  
                </Holder4>
                
              </Holder2>
              <Button buttonType='Solid' text={t1("continue")} style = {{width: '20rem', fontSize: '20px'}}/>
            </AuthContainer>
        )
      case 2:
        return(
          <AuthContainer style={{height: '32rem', gap: '3rem', width: '30rem'}}>
            <Text style={{marginBottom: '6rem', marginTop: '0rem'}}>{t2("chooseUserName")}</Text>
            <LoginInput inputType={"Text"} placeHolder={t1("userName")} style={{width: '20rem', height: '3.5rem'}}></LoginInput>
            <Button buttonType='Solid' text={t1("continue")} style = {{width: '20rem', fontSize: '20px'}}/>
          </AuthContainer>
        )
      case 3:
        return(
          <AuthContainer style={{height: '32rem', gap: '3rem', width: '60rem', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}> 
            <Holder5>
              <Text style={{marginBottom: '6rem', marginTop: '0rem', width: '20rem'}}>{t2("chooseProfilePic")}</Text>
              <Button buttonType='Solid' text={t1("continue")} style = {{width: '20rem', fontSize: '20px'}}/>
              <Button buttonType='Secondary' text={t1("skip")} style = {{width: '20rem', fontSize: '20px'}}/>
            </Holder5>
            <AddProfilePic></AddProfilePic>
          </AuthContainer>
        )
      /*case 4:
        return(
          <button>
            <UploadPicSVG width="86" height="108" viewBox="0 0 86 108" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M53.6663 0.666687H10.9997C5.13301 0.666687 0.386342 5.46669 0.386342 11.3334L0.333008 96.6667C0.333008 102.533 5.07967 107.333 10.9463 107.333H74.9997C80.8663 107.333 85.6663 102.533 85.6663 96.6667V32.6667L53.6663 0.666687ZM74.9997 96.6667H10.9997V11.3334H48.333V38H74.9997V96.6667ZM21.6663 70.0534L29.1863 77.5733L37.6663 69.1467V91.3334H48.333V69.1467L56.813 77.6267L64.333 70.0534L43.053 48.6667L21.6663 70.0534Z" fill="#29335C"/>
            </UploadPicSVG>
          </button>
          
        )*/
        
    }
    return <div>ERROR refresh the page</div>
}
const UploadPicSVG = styled.svg`
  width: auto;
`;
const Holder5 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  //align-self: baseline;
`;
const AddProfilePicButton = styled.button`
  width: 20rem;
  height: 20rem;
  background: ${props => props.theme.colors.secondaryButtonBackground};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 20px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AddProfilePicCross = styled.div`
  //position: relative;
  //top: -11.3rem;
  //left: 8.7rem;
  width: 2.6rem;
  height: 2.6rem;
  background: transparent;
  border: 5px solid ${props => props.theme.colors.primary};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color:  ${props => props.theme.colors.primary};
  font-size: 20px;
  line-height: 20px;
  vertical-align: middle;
`;

function AddProfilePic(){
  return(
      <AddProfilePicButton>
        <AddProfilePicCross>
        <div>✚</div>
        </AddProfilePicCross>
      </AddProfilePicButton>
      
  );
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
