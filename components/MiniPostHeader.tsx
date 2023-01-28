import { i18n, useTranslation } from "next-i18next";
import styled from "styled-components";
import Image from 'next/image'
import tempPic from "../public/tempPic.jpg";
import MiniProfilePic from "./MiniProfilePic";

const PicHolder = styled.div`
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    width: 48px;
    height: 48px;
`;
const MainHolder = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 50px;
`;
interface TextProps {
    fontSize: string
}
const Text = styled.span<TextProps>`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: ${props => props.fontSize};
    //line-height: ${props => props.fontSize};
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.inputPlaceholder};
`;
const Holder2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
interface Props{
    name: string,
    date: string,
    src: string | null
}
function Content({name, date, src}:Props){
    const { t, i18n } = useTranslation();
    return(
        <MainHolder>
            <MiniProfilePic src={src} anon={false}></MiniProfilePic>
            <Holder2>
                <Text fontSize={"14px"}>{new Intl.DateTimeFormat(i18n.language, { timeStyle: 'short', dateStyle: 'medium' }).format(new Date(date))}</Text>
                <Text fontSize={"18px"}>{name}</Text>
            </Holder2>
        </MainHolder>
    )
}
export default Content;