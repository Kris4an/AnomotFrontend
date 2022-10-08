import styled, { CSSProperties } from "styled-components";

const CheckboxStyle = styled.input`
    -webkit-appearance: none;
    appearance: none;
    height: 36px;
    width: 36px;
    background: ${props => props.theme.colors.secondaryButtonBackground};
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    margin: 0px;
    cursor: pointer;
    position: relative;
    z-index: 1;

    &:checked{
        border: 10px solid ${props => props.theme.colors.primary};
        border-radius: 10px;
        background: transparent;
    }
`;
const Holder = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
`;
const Holder2 = styled.div`
    width: 36px;
    height: 36px;
`;
const Round = styled.div`
    position: relative;
    top: -40px;
    left: 0px;
    border: 4px solid ${props => props.theme.colors.primary};;
    width: 24px;
    height: 24px;
    margin: 6px;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.secondaryButtonBackground};;
`;
type Props = {
    text: string,
    style?: CSSProperties,
    handleChange?: any
}
function Checkbox({text, style, handleChange}:Props){
    return(
        <Holder style={style}>
            <Holder2>
                <CheckboxStyle type="checkbox" onChange={handleChange}></CheckboxStyle>
                <Round></Round>
            </Holder2>
            <label>{text}</label>
        </Holder>
    )
}

export default Checkbox;