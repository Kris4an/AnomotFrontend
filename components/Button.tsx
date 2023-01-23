import styled, { CSSProperties } from 'styled-components'

const DefaultButton = styled.button`
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
    text-align: center;
    cursor: pointer;
    transition: background ease-in-out 300ms;
    font-family: 'Roboto';

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
    text-align: center;
    cursor: pointer;
    transition: background ease-in-out 300ms;
    font-family: 'Roboto';


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
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    text-align: center;
    cursor: pointer;
    transition: background ease-in-out 300ms;
    font-family: 'Roboto';

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
        color: ${props => props.theme.colors.buttonDisabled};
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
    text-align: center;
    cursor: pointer;
    font-family: 'Roboto';

    &:hover{
        text-decoration-line: underline;
    }
`;

type Props = {
    disabled?: boolean,
    buttonType: string,
    text: string,
    style?: CSSProperties,
    ref?: any,
    handleClick: any,
    title?: string
}
function Button({disabled, buttonType, text, style, ref, handleClick, title}: Props){

    switch (buttonType) {
        case "Default":
            return(<DefaultButton onClick={handleClick} ref={ref} disabled = {disabled} style = {style} title={title}>{text}</DefaultButton>);
        case "Solid":
            return(<SolidButton onClick={handleClick} ref={ref} disabled = {disabled} style = {style} title={title}>{text}</SolidButton>);
        case "Secondary":
            return(<SecondaryButton onClick={handleClick} ref={ref} disabled = {disabled} style = {style} title={title}>{text}</SecondaryButton>);
        case "Teriatary":
            return(<TeriataryButton onClick={handleClick} ref={ref} disabled = {disabled} style = {style} title={title}>{text}</TeriataryButton>);  
    }
    return <button disabled = {disabled}>{text}</button>;
;
}
export default Button;