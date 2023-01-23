import styled from "styled-components";
import Image from 'next/image'
import tempPic from "../public/tempPic.jpg";
import { title } from "process";

const PicHolder = styled.div`
    position: relative;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    width: 48px;
    height: 48px;
`;

interface Props {
    src: string,
    title?: string
}
function Content({src, title}: Props){
    return(
        <PicHolder title={title}>
            <Image src={tempPic} width={48} height={48} className={'profilePic'} objectFit={"cover"}></Image>
        </PicHolder>
    )
}

export default Content;