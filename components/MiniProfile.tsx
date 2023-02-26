import { useTranslation } from "next-i18next";
import styled from "styled-components";
import MiniProfilePic from "./MiniProfilePic";

interface HolderProps {
    anon: boolean
}
const Holder = styled.button<HolderProps>`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px;
    border: none;
    background-color: transparent;
    width: 30%;
    cursor: ${props => !props.anon? 'pointer':'default'};

    @media (max-width: 840px) {
        width: 100%;
    }
`;
const Text = styled.span`
    font-size: 20px;
    font-family: 'Roboto';
    line-height: 22px;
    color: ${props => props.theme.colors.primary};
`;

interface Props {
    src: string | null,
    name?: string,
    style?: any,
    anon: boolean,
    handleClick?: any
}
function Content({src, name, style, anon, handleClick}:Props) {
    const [t2] = useTranslation("account");
    return(
        <Holder style={style} anon={anon} onClick={handleClick}>
            <MiniProfilePic src={src} anon={anon}></MiniProfilePic>
            <Text>{!anon? name:t2("anon")}</Text>
        </Holder>
    )
}

export default Content;