import { CSSProperties, HTMLInputTypeAttribute, MouseEventHandler, useState } from 'react';
import styled, { css } from 'styled-components'
import { Eye, EyeSlash } from './EyeIcon';

const InputStyle = styled.input`
    padding: 10px 10px 10px 15px;
    gap: 10px;

    width: 16rem;
    height: 3rem;
    aspect-ratio: 0.1875;

    background: ${props => props.theme.colors.secondaryButtonBackground};
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 10px;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: ${props => props.theme.colors.secondary};

    &::placeholder {
        color: ${props => props.theme.colors.inputPlaceholder};
    }
    &.password {
        width: 14rem;
        border-right: none;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
`;

type Props = {
    inputType: HTMLInputTypeAttribute,
    placeHolder: string,
    style?: CSSProperties,
    handleChange?: any
}

const Holder = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

function LoginInput({inputType, placeHolder, style, handleChange}: Props){
    const [showPassword, setshowPassword] = useState(false);
    
    const handleClick = (e: any) => {
        setshowPassword(!showPassword);
    }

    switch(inputType){
        case 'Text': 
            return(<InputStyle onChange = {handleChange} type = 'text' placeholder = {placeHolder} style={style}></InputStyle>)
        case 'Email': 
            return(<InputStyle onChange = {handleChange} type = 'email' placeholder = {placeHolder} style={style}></InputStyle>)
        case 'Password': 
            return(
                <Holder>
                    <InputStyle onChange = {handleChange} className='password' type = {showPassword ? 'text':'password'} placeholder = {placeHolder} minLength = {10} maxLength = {512} style={style}></InputStyle>
                    <span onClick={handleClick}>
                        {showPassword ? <EyeSlash></EyeSlash>: <Eye></Eye>}
                    </span>
                </Holder>
            )
    }
    return <input></input>;
}

export default LoginInput;