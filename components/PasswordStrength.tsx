import { useState } from "react";
import styled from "styled-components";

interface StyledProps {
    color: string;
  }
const StrengthStage = styled.div<StyledProps>`
    width: 72px;
    height: 15px;

    background: ${(props) => props.color};
`;
const StrengthStage2 = styled(StrengthStage)`
    border-radius: 5px 0px 0px 5px;
`;
const StrengthStage3 = styled(StrengthStage)`
    border-radius: 0px 5px 5px 0px;
`;
const Holder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: fit-content;
    height: fit-content;
    gap: 13px;
`;
const Holder2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    height: fit-content;
    gap: 13px;
`;
const Text = styled.label`
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: ${props => props.theme.colors.text};
`;

type Props = {
    stage: number,
    text: string
};
function PasswordStrength({stage, text}:Props){
    const colorsPalette:string[] = ["#9499AE","#F10000","#F3A712","#F3F655","#3FD918"];

    return(
        <Holder>
            <Holder2>
                <StrengthStage2 color = {colorsPalette[stage]}/>
                {stage>=2? <StrengthStage color = {colorsPalette[stage]}/>:<StrengthStage color = {colorsPalette[0]}/>}
                {stage>=3? <StrengthStage color = {colorsPalette[stage]}/>:<StrengthStage color = {colorsPalette[0]}/>}
                {stage==4? <StrengthStage3 color = {colorsPalette[stage]}/>:<StrengthStage3 color = {colorsPalette[0]}/>}
            </Holder2>
            <Text>{text}</Text>
        </Holder>
    )
}

export default PasswordStrength;