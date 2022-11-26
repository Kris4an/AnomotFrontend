import styled, { CSSProperties } from 'styled-components'
import Logo from './Logo'

const Name = styled.div`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 70px;
    line-height: 70px;
    text-transform: uppercase;
    user-select: none;
    color: ${props => props.theme.colors.text};

    @media (max-width: 800px) {
      font-size: 56px;
    }
`;
const Slogan = styled.div`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 30px;
    text-transform: lowercase;
    user-select: none;
    margin-bottom: 1.75rem;
    color: ${props => props.theme.colors.text};

    @media (max-width: 800px) {
      font-size: 24px;
    }
`;

const Container1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`;

type Props = {
    style?: CSSProperties
  }

function LogoSlogan({style}:Props){
    return(
        <Container1 translate='no' style={style}>
            <Logo></Logo>
            <Container2>
                <Name>ANOMOT</Name>
                <Slogan>be nobody.</Slogan>
            </Container2>
        </Container1>
    )
}

export default LogoSlogan;