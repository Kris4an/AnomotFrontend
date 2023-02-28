import type { NextPage } from 'next'
import Button from '../../components/Button';
import LogoSlogan from '../../components/LogoSlogan';
import AuthContainer from '../../components/AuthContainer';
import LoginInput from '../../components/LoginInput';
import styled from 'styled-components'
import { useTranslation } from 'next-i18next';
import router, { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import MessageScreen from '../../components/MessageScreen';
import instance from '../../axios_instance';
import Checkbox from '../../components/Checkbox';

const Holder = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 822px) {
    flex-direction: column;
    gap: 0px;
    justify-content: space-around;
  }
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
  font-size: 14px;
  align-self: flex-start;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-family: 'Roboto';
`;
const MfaText = styled.p`
  color: ${props => props.theme.colors.text};;
  font-size: 24px;
  text-align: center;
  
  @media (max-width: 800px) {
    
  }
`;
const MfaInput = styled.input`
  border: none;
  background: none;
  border-bottom: 3.5px solid ${props => props.theme.colors.buttonDisabled};
  color: ${props => props.theme.colors.text};;
  width: 2.5rem;
  font-size: 36px;
  line-height: 42px;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 30px;
    width: 2rem;
  }
`;
interface ModifiedAuthContainerProps {
  height: string,
  width: string,
  gap: string,
  padding?: string,
  paddingMedia?: string
}
const ModifiedAuthContainer = styled(AuthContainer) <ModifiedAuthContainerProps>`
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

const Login: NextPage = () => {
  return (
    <Holder>
      <LogoSlogan />
      <Content />
    </Holder>
  )
}

function Content() {
  const [t1] = useTranslation("common");
  const [t2] = useTranslation("login");
  const [stage, goToPage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [enableEmail, setEnableEmail] = useState(false);
  const [enableTOTP, setEnableTOTP] = useState(false);
  const [code, setCode] = useState('');
  const [isLogging, setIsLogging] = useState(false);

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

  const fetcher1 = (url: any, email: string, password: string) => instance.post(url, {
    'email': email,
    'password': password
  })

  const fetcher2 = (url: any, email: string, password: string, mfaCode: any, rememberMe: boolean, mfaMethod: any, recoveryCode: any) => instance.post(url, {
    "email": email,
    "password": password,
    "mfaCode": mfaCode,
    "rememberMe": rememberMe,
    "mfaMethod": mfaMethod,
    "mfaRecoveryCode": recoveryCode
  })


  const mfaInputHandleChange = (event: React.ChangeEvent<HTMLInputElement>, inpsProp: any[]) => {
    const inps: any[] = inpsProp;
    if (event.target.value == "") {
      let c = "";
      for (let i = 0; i < inps.length; i++) {
        c += inps[i].current.value;
      }
      setCode(c);
      return;
    };

    if (inps.length == 6 && (isNaN(Number(event.target.value)) || event.target.value.charAt(0) == ' ')) {
      event.target.value = "";
      return;
    }
    if (inps.length == 8) {
      for (let i = 0; i < event.target.value.length; i++) {
        if ((event.target.value.charAt(0) == ' ') && (event.target.value.charAt(i).toLowerCase() == event.target.value.charAt(i).toUpperCase())) {
          event.target.value = "";
          return;
        }
        else { }
      }
    }
    if (event.target.value.length > 2) {
      const s: string = event.target.value;
      if (event.target.value.length == inps.length) setCode(event.target.value);
      for (let i = 0; i < inps.length; i++) {
        if (s.charAt(i) == "") {
          inps[i].current.focus();
          return;
        }
        inps[i].current.value = s.charAt(i);
      }

      inps[inps.length - 1].current.focus();
      return;
    }
    if (event.target.value.length > 1) inps[Number(event.currentTarget.id)].current.value = event.target.value.charAt(0);
    if (Number(event.currentTarget.id) < inps.length - 1) inps[Number(event.currentTarget.id) + 1].current.focus();
    let c = "";
    for (let i = 0; i < inps.length; i++) {
      c += inps[i].current.value;
    }
    setCode(c);
  };
  switch (stage) {
    case 0:
      return (
        <ModifiedAuthContainer width='' height='' gap='1rem' padding='4rem 3.5rem'>
          <LoginInput handleChange={(event: React.ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); }} inputType='Email' placeHolder={t1("email")}></LoginInput>
          <Holder2>
            <LoginInput handleChange={(event: React.ChangeEvent<HTMLInputElement>) => { setPassword(event.target.value); if(loginError) setLoginError(false); }} inputType='Password' placeHolder={t1("password")}></LoginInput>
            {loginError ? <ErrorMessage>{t2("errorMessage")}</ErrorMessage> : null}
          </Holder2>
          <Checkbox text={t2("rememberMe")} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => (setRememberMe(event.target.checked))} style={{ alignSelf: 'flex-start', scale: '90%' }} />
          <Button isLoading={isLogging} buttonType='Default' disabled={!(email.includes('@') && email.length >= 3 && password.length >= 1)} text={t2("login")} handleClick={() => {
            if (!isLogging) {
              setIsLogging(true);
              fetcher1('/account/mfa/status', email, password).then((res) => {
                setIsLogging(false);
                if (!res.data.isEnabled) fetcher2('/account/login', email, password, undefined, rememberMe, undefined, undefined).then(() => { router.push('/'); });
                else {
                  const methods: any[] = res.data.mfaMethods;
                  if (methods.includes('email')) setEnableEmail(true);
                  if (methods.includes('totp')) setEnableTOTP(true);
                  goToPage(1);
                }
                //console.log(res.data.mfaMethods);
              }).catch((e) => { setIsLogging(false); if (e.response.status == '401') setLoginError(true); })
            }

          }
          } />
          <Button buttonType='Teriatary' handleClick={() => { router.push('/login/forgotten-password'); }} text={t2("forgotPassword")} style={{ scale: '80%' }} />
          <Button buttonType='Solid' handleClick={() => { router.push('/account/create'); }} text={t2("createAccount")} style={{ scale: '80%' }} />
        </ModifiedAuthContainer>
      )
    case 1:
      return (
        <ModifiedAuthContainer width='30rem' height='25rem' gap='1rem' padding='4rem 3.5rem' paddingMedia='3rem 0.5rem'>
          <MfaText>{t2("mfa")}</MfaText>
          <Button buttonType='Secondary' disabled={!enableEmail} handleClick={() => {
            fetcher1('/account/mfa/email/send', email, password);
            setEnableTOTP(false);
            goToPage(4);
          }} text={t1("email")} style={{ width: '23rem', maxWidth: '80vw' }}></Button>
          <Button buttonType='Secondary' disabled={!enableTOTP} handleClick={() => { goToPage(4); }} text='TOTP' style={{ width: '23rem', maxWidth: '80vw' }}></Button>
          <Button buttonType='Teriatary' handleClick={() => { goToPage(3); }} text={t2("recover")} style={{ width: '20rem', maxWidth: '80vw' }}></Button>
        </ModifiedAuthContainer>
      )
    case 2: {
      const inps: any[] = [inp0, inp1, inp2, inp3, inp4, inp5];

      return (
        <ModifiedAuthContainer width='26rem' height='20rem' gap='1rem' padding='1rem 3.5rem'>
          <MfaText>{t2("code")}</MfaText>
          <Holder3>
            <MfaInput id={"0"} ref={inp0} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"1"} ref={inp1} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"2"} ref={inp2} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"3"} ref={inp3} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"4"} ref={inp4} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"5"} ref={inp5} type="text" minLength={1} maxLength={6} onChange={event => mfaInputHandleChange(event, inps)} />
          </Holder3>
          <Button buttonType='Solid' handleClick={() => {

            const method = (enableEmail ? 'email' : 'totp');
            fetcher2('/account/login', email, password, code, rememberMe, method, undefined).then(() => { router.push('/'); }).catch((res) => { console.log(res.error) });

          }} text={t1("continue")} disabled={code.length != 6} />
        </ModifiedAuthContainer>
      )
    }
    case 3: {
      const inps: any[] = [inp10, inp11, inp12, inp13, inp14, inp15, inp16, inp17];
      return (
        <ModifiedAuthContainer width='30rem' height='25rem' gap='1rem' padding='4rem 3.5rem' paddingMedia='4rem 0.5rem'>
          <MfaText>{t2("recoverText")}</MfaText>
          <Holder3>
            <MfaInput id={"0"} ref={inp10} type="text" minLength={1} maxLength={8} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"1"} ref={inp11} type="text" minLength={1} maxLength={8} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"2"} ref={inp12} type="text" minLength={1} maxLength={8} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"3"} ref={inp13} type="text" minLength={1} maxLength={8} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"4"} ref={inp14} type="text" minLength={1} maxLength={8} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"5"} ref={inp15} type="text" minLength={1} maxLength={8} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"6"} ref={inp16} type="text" minLength={1} maxLength={8} onChange={event => mfaInputHandleChange(event, inps)} />
            <MfaInput id={"7"} ref={inp17} type="text" minLength={1} maxLength={8} onChange={event => mfaInputHandleChange(event, inps)} />
          </Holder3>
          <Button buttonType='Solid' text={t1("continue")} disabled={code.length != 8} handleClick={() => {
            fetcher2('/account/login', email, password, undefined, rememberMe, undefined, code).then(() => { router.push('/'); }).catch((res) => { console.log(res.error) });
          }} />
        </ModifiedAuthContainer>
      )
    }
    case 4: {
      return (
        <MessageScreen handleClick={() => { goToPage(2); }} stage={true} text={t2("mfaS")} continueTxt={t1("continue")}></MessageScreen>
      )
    }
  }
  return <div></div>
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
      // Will be passed to the page component as props
    },
  };
}

export default Login