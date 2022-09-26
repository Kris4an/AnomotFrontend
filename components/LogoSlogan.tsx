import type { NextPage } from 'next'
import styled from 'styled-components'
import Logo from './Logo'

const Name = styled.div`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 70px;
    line-height: 70px;
    text-transform: uppercase;
    user-select: none;

    color: #000000;
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

    color: #000000; 
`;

const Container1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    //justify-content: safe;
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
`;

function LogoSlogan(){
    return(
        <Container1 translate='no'>
            <Logo></Logo>
            <Container2>
                <Name>ANOMOT</Name>
                <Slogan>be nobody.</Slogan>
            </Container2>
        </Container1>
    )
}

export default LogoSlogan;