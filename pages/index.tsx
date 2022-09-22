import type { NextPage } from 'next'
import Button from '../components/Button';
import LogoSlogan from '../components/LogoSlogan';
import AuthContainer from '../components/AuthContainer';
import LoginInput from '../components/LoginInput';
import styled from 'styled-components'

const Holder = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  gap: 25rem;
  justify-content: center;
  align-items: center;
`;

const Holder2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: #F10000;
  width: 16rem;
  font-size: 14px;
  align-self: flex-start;
  margin: 0.5rem;
`;

const Home: NextPage = () => {

  return (
    <Holder>
      <LogoSlogan></LogoSlogan>
      <AuthContainer style={{scale: '110%'}}>
        <LoginInput inputType = 'Email' placeHolder = 'Имейл'></LoginInput>
        <Holder2>
          <LoginInput inputType = 'Password' placeHolder = 'Парола'></LoginInput>
          {false? <ErrorMessage>Имейл адреса или паролата са грешни</ErrorMessage>:null}
        </Holder2>
        <Button buttonType='Default' text = 'Вход'></Button>
        <Button buttonType='Teriatary' text = 'Забравена парола?' style = {{scale: '80%'}}></Button>
        <Button buttonType='Solid' text = 'Създай профил' style = {{scale: '80%'}}></Button>
      </AuthContainer>
      

    </Holder>
  )
}

export default Home