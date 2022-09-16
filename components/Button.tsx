import type { NextPage } from 'next'
import styled from 'styled-components'

const Button = styled.button`
    width: 16rem;
    height: 3rem;
    padding: 25px 50px;
    gap: 10px;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textInverted};
    border: none;
    border-radius: 0px 100px;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    
    &:hover{
        background: ${props => props.theme.colors.buttonHover};
    }
    &:focus {
        background: ${props => props.theme.colors.primary};
    }
    &:active {
        background: ${props => props.theme.colors.secondary};
    }
    &:disabled{
        background: ${props => props.theme.colors.buttonDisabled};
    }

    
`;

export default Button;