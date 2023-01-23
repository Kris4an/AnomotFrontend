import styled from "styled-components";
import MiniPostHeader from "./MiniPostHeader";
import Image from "next/image";
import { useEffect, useState } from "react";
import tempPic from "../public/tempPic.jpg";
import tempPic2 from "../public/tempPic2.webp";

interface Props {
    name: string,
    date: string,
    title: string,
    content?: string,
    imageSrc?: string
}

const MainHolder = styled.div`
    //height: fit-content;
    width: 40rem;
    //max-height: 10rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
interface TextProps {
    fontSize: string,
    fontWeight: string,
    isExpandable?: boolean,
    isExpanded?: boolean
}
const Text = styled.span<TextProps>`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: ${props => props.fontWeight};
    font-size: ${props => props.fontSize};
    line-height: 27px;
    color: ${props => props.theme.colors.text};
    transition: all 300ms ease-in-out;
    overflow: hidden;
    
    
`;
const Text2 = styled(Text)`
    max-height: ${props => props.isExpanded? 'auto':'30.5rem'};

    &:hover{
        background-color: ${props =>  props.theme.colors.switchButtonHover};
        cursor: pointer;
    }
`
const CommentButton = styled.button`
    width: 100%;
    min-height: 2.5rem;
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 300ms ease-out;

    &:hover{
        background-color: ${props => props.theme.colors.switchButtonHover};
    }
`;
const StyledSVG = styled.svg`
    height: 2rem;
`;
const StyledPath = styled.path`
    fill: ${props => props.theme.colors.primary};
`;
const ImageHolder = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: bisque;
    //overflow: "hidden";
    height: 30.5rem;
    //position: relative;
`;
function Content({name, date, title, content, imageSrc}:Props){
    //{imageSrc!=null? <Image src={"https://www.w3schools.com/images/lamp.jpg"} layout={'fill'}></Image>:<></>}
    // {content!=null? <Text fontSize={"18px"} fontWeight={"400"} isExpandable={content.length>1000} onClick={() => {
    //     if(content.length>1000) setIsExpanded(!isExpanded);
    // }}>{isExpanded? content:content.substring(0,999)+"..."}</Text>:<></>}
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        if(content!=null){
            if(content.length<=1000) setIsExpanded(true);
            else setIsExpanded(false);
        }
    },[])
    return (
        <MainHolder>
            <MiniPostHeader name={name} date={date} src={""}></MiniPostHeader>
            <Text fontSize={"22px"} fontWeight={"500"}>{title}</Text>
            {content!=null? <Text2 title={"Click to expand"} fontSize={"18px"} fontWeight={"400"} isExpandable={true} isExpanded={isExpanded} onClick={() => {
                setIsExpanded(!isExpanded);
            }}>{content}</Text2>:<></>}
            {imageSrc!=null? <ImageHolder><Image src={tempPic2} objectFit={'contain'} width={488} height={488} style={{marginLeft: '66px'}}></Image></ImageHolder>:<></>}
            <CommentButton>
                <StyledSVG width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <StyledPath d="m 6,3 h 24 c 1.65,0 3,1.35 3,3 V 33 L 27,27 H 6 C 4.35,27 3,25.65 3,24 V 6 C 3,4.35 4.35,3 6,3 Z m 0,21 h 21 l 3,3 V 6 H 6 Z"/>
                </StyledSVG>
            </CommentButton>
        </MainHolder>
    )
}
export default Content;