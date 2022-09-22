import type { NextPage } from 'next'
import styled, { CSSProperties } from 'styled-components'

const DefaultButton = styled.button`
    max-width: 16rem;
    width: 100%;
    height: 3rem;
    padding: 10px 20px;
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
    transition: background ease-in-out 200ms;

    &:hover{
        background: ${props => props.theme.colors.buttonHover};
    }
    &:active {
        background: ${props => props.theme.colors.secondary};
    }
    &:disabled{
        background: ${props => props.theme.colors.buttonDisabled};
    }

`;

const SolidButton = styled.button`
    width: 100%;
    max-width: 16rem;
    height: 3rem;
    padding: 10px 20px;
    gap: 10px;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textInverted};
    border: none;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    transition: background ease-in-out 200ms;


    &:hover{
        background: ${props => props.theme.colors.buttonHover};
    }
    &:active {
        background: ${props => props.theme.colors.secondary};
    }
    &:disabled{
        background: ${props => props.theme.colors.buttonDisabled};
    }
`;

const SecondaryButton = styled.button`
    width: 16rem;
    height: 3rem;
    padding: 10px 20px;
    gap: 10px;
    background: ${props => props.theme.colors.secondaryButtonBackground};
    color: ${props => props.theme.colors.primary};
    border: none;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    transition: background ease-in-out 200ms;

    &:hover{
        background: ${props => props.theme.colors.buttonHover};
        color: ${props => props.theme.colors.secondaryButtonBackground};
    }
    &:active {
        background: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondaryButtonBackground};
    }
    &:disabled{
        background: ${props => props.theme.colors.secondaryButtonBackground};
        color: ${props => props.theme.colors.secondaryButtonDisabled};
    }
`;

const TeriataryButton = styled.button`
    width: 16rem;
    height: 3rem;
    padding: 10px 20px;
    gap: 10px;
    background: none;
    color: ${props => props.theme.colors.primary};
    border: none;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;

    &:hover{
        text-decoration-line: underline;
    }
`;

type Props = {
    disabled?: boolean,
    buttonType: string,
    text: string
    style?: CSSProperties
}
function Button({disabled, buttonType, text, style}: Props){

    switch (buttonType) {
        case "Default":
            return(<DefaultButton disabled = {disabled} style = {style}>{text}</DefaultButton>);
        case "Solid":
            return(<SolidButton disabled = {disabled} style = {style}>{text}</SolidButton>);
        case "Secondary":
            return(<SecondaryButton disabled = {disabled} style = {style}>{text}</SecondaryButton>);
        case "Teriatary":
            return(<TeriataryButton disabled = {disabled} style = {style}>{text}</TeriataryButton>);  
    }
    return <button disabled = {disabled}>{text}</button>;
;
}
export default Button;