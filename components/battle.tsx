import { useState } from "react";
import styled from "styled-components";

const MainHolder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
`;
const HalfHolder = styled.div<ButtonProps>`
    height: 100%;
    flex-grow: 1;
    border-left: ${props => props.isLeft? 'none':'1px solid'};
    border-color: ${props => props.theme.colors.primary};;
    display: flex;
    flex-direction: column-reverse;
`;
interface ButtonProps {
    isExpanded?: boolean,
    isLeft?: boolean
}
const ButtonHolder = styled.div<ButtonProps>`
    width: 100%;
    height: ${props => props.isExpanded? '10rem':'4.5rem'};
    box-shadow: 7px 0px 15px ${props => props.theme.colors.authContainerShadow};
    background-color: ${props => props.theme.colors.secondaryButtonBackground};
    transition: all 0.4s ease-in-out;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding-top: 0.5rem;
    border-radius: ${props => props.isLeft? '10px 0px 0px 0px;':'0px 10px 0px 0px;'};
`;
const BoldText = styled.span`
    font-family: 'Roboto';
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
`;
const StyledPath = styled.path`
    fill: ${props => props.theme.colors.primary};
`;
const VoteButton = styled.button<ButtonProps>`
    height: 3.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;

    &:hover ${BoldText}{
        color: ${props => props.theme.colors.secondary};
    }
    &:hover ${StyledPath}{
        fill: ${props => props.theme.colors.secondary}
    }
    &:active ${BoldText}{
        color: ${props => props.isLeft? '#F3A712;':'red'};
    }
    &:active ${StyledPath}{
        fill: ${props => props.isLeft? '#F3A712;':'red'};
    }
`;
const ExpandButton = styled.button<ButtonProps>`
    height: 3.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    left: ${props => props.isLeft? '4rem':'calc((100vw - 47px)/2 + 4rem)'};
    transition: transform 0.3s ease-in;
    transform: ${props => props.isExpanded? 'rotate(180deg)':'rotate(0deg)'};
`;
const ExpandedHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    height: 100%;
    padding-bottom: 1rem;
`;
const ExpandedButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
`;

function Content(){
    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);

    return(
        <MainHolder>
            <HalfHolder>
                <ButtonHolder isExpanded={isExpanded1} isLeft={true}>
                    <ExpandButton isLeft={true} isExpanded={isExpanded1} onClick={() => {setIsExpanded1(!isExpanded1)}}>
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPath d="M2.115 0.88501L9 7.75501L15.885 0.88501L18 3.00001L9 12L0 3.00001L2.115 0.88501Z"/>
                        </svg>
                    </ExpandButton>
                    <ExpandedHolder>
                        <VoteButton isLeft={true}>
                            <svg width="49" height="54" viewBox="0 0 49 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M40.5 29.3369H38.6867L33.3533 34.6702H38.4467L43.1667 40.0036H5.83333L10.58 34.6702H16.0467L10.7133 29.3369H8.5L0.5 37.3369V48.0036C0.5 50.9369 2.87333 53.3369 5.80667 53.3369H43.1667C44.5812 53.3369 45.9377 52.775 46.9379 51.7748C47.9381 50.7746 48.5 49.4181 48.5 48.0036V37.3369L40.5 29.3369ZM43.1667 48.0036H5.83333V45.3369H43.1667V48.0036ZM22.74 34.7236C23.78 35.7636 25.46 35.7636 26.5 34.7236L43.46 17.7636C43.7072 17.5169 43.9033 17.2238 44.0372 16.9012C44.171 16.5786 44.2399 16.2328 44.2399 15.8836C44.2399 15.5343 44.171 15.1885 44.0372 14.8659C43.9033 14.5433 43.7072 14.2503 43.46 14.0036L30.26 0.803579C30.0194 0.55185 29.7307 0.351014 29.411 0.212986C29.0913 0.0749589 28.7472 0.00255349 28.399 6.63299e-05C28.0508 -0.00242083 27.7056 0.065061 27.384 0.198508C27.0624 0.331954 26.7708 0.528646 26.5267 0.776912L9.54 17.7636C9.29279 18.0103 9.09666 18.3033 8.96285 18.6259C8.82903 18.9485 8.76015 19.2943 8.76015 19.6436C8.76015 19.9928 8.82903 20.3386 8.96285 20.6612C9.09666 20.9838 9.29279 21.2769 9.54 21.5236L22.74 34.7236ZM28.3933 6.43025L37.8333 15.8702L24.6333 29.0702L15.1933 19.6302L28.3933 6.43025Z" />
                            </svg>
                            <BoldText>Гласувай</BoldText>
                        </VoteButton>
                        {isExpanded1? <ExpandedButton>Докладвай</ExpandedButton>:<></>}
                    </ExpandedHolder>
                </ButtonHolder>
            </HalfHolder>
            <HalfHolder>
                <ButtonHolder isExpanded={isExpanded2} isLeft={false}>
                    <ExpandButton isLeft={false} isExpanded={isExpanded2} onClick={() => {setIsExpanded2(!isExpanded2)}}>
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPath d="M2.115 0.88501L9 7.75501L15.885 0.88501L18 3.00001L9 12L0 3.00001L2.115 0.88501Z"/>
                        </svg>
                    </ExpandButton>
                    <ExpandedHolder>
                        <VoteButton isLeft={false}>
                            <svg width="49" height="54" viewBox="0 0 49 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M40.5 29.3369H38.6867L33.3533 34.6702H38.4467L43.1667 40.0036H5.83333L10.58 34.6702H16.0467L10.7133 29.3369H8.5L0.5 37.3369V48.0036C0.5 50.9369 2.87333 53.3369 5.80667 53.3369H43.1667C44.5812 53.3369 45.9377 52.775 46.9379 51.7748C47.9381 50.7746 48.5 49.4181 48.5 48.0036V37.3369L40.5 29.3369ZM43.1667 48.0036H5.83333V45.3369H43.1667V48.0036ZM22.74 34.7236C23.78 35.7636 25.46 35.7636 26.5 34.7236L43.46 17.7636C43.7072 17.5169 43.9033 17.2238 44.0372 16.9012C44.171 16.5786 44.2399 16.2328 44.2399 15.8836C44.2399 15.5343 44.171 15.1885 44.0372 14.8659C43.9033 14.5433 43.7072 14.2503 43.46 14.0036L30.26 0.803579C30.0194 0.55185 29.7307 0.351014 29.411 0.212986C29.0913 0.0749589 28.7472 0.00255349 28.399 6.63299e-05C28.0508 -0.00242083 27.7056 0.065061 27.384 0.198508C27.0624 0.331954 26.7708 0.528646 26.5267 0.776912L9.54 17.7636C9.29279 18.0103 9.09666 18.3033 8.96285 18.6259C8.82903 18.9485 8.76015 19.2943 8.76015 19.6436C8.76015 19.9928 8.82903 20.3386 8.96285 20.6612C9.09666 20.9838 9.29279 21.2769 9.54 21.5236L22.74 34.7236ZM28.3933 6.43025L37.8333 15.8702L24.6333 29.0702L15.1933 19.6302L28.3933 6.43025Z" />
                            </svg>
                            <BoldText>Гласувай</BoldText>
                        </VoteButton>
                        {isExpanded2? <ExpandedButton>Докладвай</ExpandedButton>:<></>}
                    </ExpandedHolder>
                </ButtonHolder>
            </HalfHolder>
        </MainHolder>
    );
}

export default Content;