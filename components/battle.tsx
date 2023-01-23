import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import tempPic from "../public/tempPic.jpg";
import tempPic2 from "../public/tempPic2.webp";
import { useTranslation } from "next-i18next";
import React from "react";
import MiniProfilePic from "./MiniProfilePic";
import Link from "next/link";

const MainHolder = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    overflow: hidden;
`;
const shadowFlashGold = keyframes`
    0% {
        box-shadow: inset 0rem 0rem 10rem "#ff12a80", inset -0rem -0rem 10rem "#ff12a80";
    }
    50% {
        box-shadow: inset 3rem 3rem 10rem #F3A712, inset -3rem -6rem 10rem #F3A712;
    }
    100% {
        box-shadow: inset 0rem 0rem 10rem "#ff12a80", inset -0rem -0rem 10rem "#ff12a80";
    }
`;
const shadowFlashRed = keyframes`
    0% {
        box-shadow: inset 0rem 0rem 10rem "#ff12a80", inset -0rem -0rem 10rem "#ff12a80";
    }
    50% {
        box-shadow: inset 3rem 3rem 10rem #F10000, inset -3rem -6rem 10rem #F10000;
    }
    100% {
        box-shadow: inset 0rem 0rem 10rem "#ff12a80", inset -0rem -0rem 10rem "#ff12a80";
    }
`;
const HalfHolder = styled.div<ButtonProps>`
    position: relative;
    height: 100%;
    width: 100%;
    padding-bottom: 4.5rem;
    border-left: 1px solid;
    border-color: ${props => props.isLeft? 'transparent':props => props.theme.colors.primary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    animation-duration: 1s;// ${props => props.isReady? '1s':'0s'};
    animation-name:  ${props => props.isLeft? shadowFlashGold:shadowFlashRed}; ;
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-play-state: ${props => props.isReady? 'running':'paused'};;
`;
interface ButtonProps {
    isExpanded?: boolean,
    isLeft: boolean,
    isReady?: boolean
}
const ButtonHolder = styled.div<ButtonProps>`
    position: absolute;
    bottom: 0;
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
    transition: all 0.3s ease-in-out;

    &:hover ${BoldText}{
        color: ${props => props.theme.colors.secondary};
    }
    &:hover ${StyledPath}{
        fill: ${props => props.theme.colors.secondary};
    }
    &:active ${BoldText}{
        color: ${props => props.isLeft? '#F3A712;':'red'};
    }
    &:active ${StyledPath}{
        fill: ${props => props.isLeft? '#F3A712;':'red'};
    }
    &:disabled ${BoldText}{
        color: ${props => props.theme.colors.buttonDisabled};
    }
    &:disabled ${StyledPath}{
        fill: ${props => props.theme.colors.buttonDisabled};
    }
`;
const ExpandButton = styled.button<ButtonProps>`
    height: 3.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    left: 1.5rem;   
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
const SvgButton = styled.button`
    width: 3rem;
    height: 3rem;
    background: ${props => props.theme.colors.secondaryButtonBackground};
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.theme.colors.primary};
    }
    &:hover ${StyledPath} {
        fill: ${props => props.theme.colors.secondaryButtonBackground};
        transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    }
`;
const slideInFromBottom = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-30%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
`;
const PostVoteButtons = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    left: calc(50% - 4rem);
    top: 40vh;
    z-index: 1;
    width: 8rem;
    background-color: ${props => props.theme.colors.secondaryButtonBackground};
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    padding: 1rem;

    animation: 0.5s cubic-bezier(0.215, 0.610, 0.355, 1) 0s 1 ${slideInFromBottom};
`;
const ProfileHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;
`;
function Content(){
    const [t2] = useTranslation("battle");
    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [voted, setVoted] = useState(false);
    const [isGold, setIsGold] = useState(0);
    

    return(
        <MainHolder>
            {voted? <PostVoteButtons>
                <SvgButton>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <StyledPath d="m 6,3 h 24 c 1.65,0 3,1.35 3,3 V 33 L 27,27 H 6 C 4.35,27 3,25.65 3,24 V 6 C 3,4.35 4.35,3 6,3 Z m 0,21 h 21 l 3,3 V 6 H 6 Z"/>
                    </svg>
                </SvgButton>
                <SvgButton style={{width: '7rem', height: '7rem'}}>
                    <svg style={{scale: '170%'}} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                        <StyledPath  d="M24 40 8 24l2.1-2.1 12.4 12.4V8h3v26.3l12.4-12.4L40 24Z"/>
                    </svg>
                </SvgButton>
                <Link href='/account'>
                    <ProfileHolder title="Gosho">
                        <MiniProfilePic src={""} title={'Gosho'}></MiniProfilePic>
                        <BoldText>Gosho</BoldText>
                    </ProfileHolder>
                </Link>
                
            </PostVoteButtons>:<></>}
            <HalfHolder isLeft={true} isReady={isGold==1}>
                <Image src={tempPic2} objectFit={'contain'} alt={'gold image'}></Image>
                <ButtonHolder isExpanded={isExpanded1} isLeft={true}>
                    <ExpandButton isLeft={true} isExpanded={isExpanded1} onClick={() => {setIsExpanded1(!isExpanded1)}}>
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPath d="M2.115 0.88501L9 7.75501L15.885 0.88501L18 3.00001L9 12L0 3.00001L2.115 0.88501Z"/>
                        </svg>
                    </ExpandButton>
                    <ExpandedHolder>
                        <VoteButton isLeft={true} onClick={() => {setVoted(true); setIsGold(1)}} disabled={voted}>
                            <svg width="49" height="54" viewBox="0 0 49 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M40.5 29.3369H38.6867L33.3533 34.6702H38.4467L43.1667 40.0036H5.83333L10.58 34.6702H16.0467L10.7133 29.3369H8.5L0.5 37.3369V48.0036C0.5 50.9369 2.87333 53.3369 5.80667 53.3369H43.1667C44.5812 53.3369 45.9377 52.775 46.9379 51.7748C47.9381 50.7746 48.5 49.4181 48.5 48.0036V37.3369L40.5 29.3369ZM43.1667 48.0036H5.83333V45.3369H43.1667V48.0036ZM22.74 34.7236C23.78 35.7636 25.46 35.7636 26.5 34.7236L43.46 17.7636C43.7072 17.5169 43.9033 17.2238 44.0372 16.9012C44.171 16.5786 44.2399 16.2328 44.2399 15.8836C44.2399 15.5343 44.171 15.1885 44.0372 14.8659C43.9033 14.5433 43.7072 14.2503 43.46 14.0036L30.26 0.803579C30.0194 0.55185 29.7307 0.351014 29.411 0.212986C29.0913 0.0749589 28.7472 0.00255349 28.399 6.63299e-05C28.0508 -0.00242083 27.7056 0.065061 27.384 0.198508C27.0624 0.331954 26.7708 0.528646 26.5267 0.776912L9.54 17.7636C9.29279 18.0103 9.09666 18.3033 8.96285 18.6259C8.82903 18.9485 8.76015 19.2943 8.76015 19.6436C8.76015 19.9928 8.82903 20.3386 8.96285 20.6612C9.09666 20.9838 9.29279 21.2769 9.54 21.5236L22.74 34.7236ZM28.3933 6.43025L37.8333 15.8702L24.6333 29.0702L15.1933 19.6302L28.3933 6.43025Z" />
                            </svg>
                            <BoldText>{t2("vote")}</BoldText>
                        </VoteButton>
                        {isExpanded1? <ExpandedButton>{t2("report")}</ExpandedButton>:<></>}
                    </ExpandedHolder>
                </ButtonHolder>
            </HalfHolder>
            <HalfHolder isLeft={false} isReady={isGold==2}>
                <Image src={tempPic} objectFit={'contain'} alt={'red image'}></Image>
                <ButtonHolder isExpanded={isExpanded2} isLeft={false}>
                    <ExpandButton isLeft={false} isExpanded={isExpanded2} onClick={() => {setIsExpanded2(!isExpanded2)}}>
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPath d="M2.115 0.88501L9 7.75501L15.885 0.88501L18 3.00001L9 12L0 3.00001L2.115 0.88501Z"/>
                        </svg>
                    </ExpandButton>
                    <ExpandedHolder>
                        <VoteButton isLeft={false} onClick={() => {setVoted(true); setIsGold(2)}} disabled={voted}>
                            <svg width="49" height="54" viewBox="0 0 49 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M40.5 29.3369H38.6867L33.3533 34.6702H38.4467L43.1667 40.0036H5.83333L10.58 34.6702H16.0467L10.7133 29.3369H8.5L0.5 37.3369V48.0036C0.5 50.9369 2.87333 53.3369 5.80667 53.3369H43.1667C44.5812 53.3369 45.9377 52.775 46.9379 51.7748C47.9381 50.7746 48.5 49.4181 48.5 48.0036V37.3369L40.5 29.3369ZM43.1667 48.0036H5.83333V45.3369H43.1667V48.0036ZM22.74 34.7236C23.78 35.7636 25.46 35.7636 26.5 34.7236L43.46 17.7636C43.7072 17.5169 43.9033 17.2238 44.0372 16.9012C44.171 16.5786 44.2399 16.2328 44.2399 15.8836C44.2399 15.5343 44.171 15.1885 44.0372 14.8659C43.9033 14.5433 43.7072 14.2503 43.46 14.0036L30.26 0.803579C30.0194 0.55185 29.7307 0.351014 29.411 0.212986C29.0913 0.0749589 28.7472 0.00255349 28.399 6.63299e-05C28.0508 -0.00242083 27.7056 0.065061 27.384 0.198508C27.0624 0.331954 26.7708 0.528646 26.5267 0.776912L9.54 17.7636C9.29279 18.0103 9.09666 18.3033 8.96285 18.6259C8.82903 18.9485 8.76015 19.2943 8.76015 19.6436C8.76015 19.9928 8.82903 20.3386 8.96285 20.6612C9.09666 20.9838 9.29279 21.2769 9.54 21.5236L22.74 34.7236ZM28.3933 6.43025L37.8333 15.8702L24.6333 29.0702L15.1933 19.6302L28.3933 6.43025Z" />
                            </svg>
                            <BoldText>{t2("vote")}</BoldText>
                        </VoteButton>
                        {isExpanded2? <ExpandedButton>{t2("report")}</ExpandedButton>:<></>}
                    </ExpandedHolder>
                </ButtonHolder>
            </HalfHolder>
        </MainHolder>
    );
}




export default Content;