import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const Title = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 40px;
    line-height: 42px;
    display: flex;
    align-items: flex-end;
    text-indent: 14px;
    color: ${props => props.theme.colors.inputPlaceholder};
`;
const MainHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const Chat:NextPage = () => {
    const [t1] = useTranslation("chat");
    return(
        <NavBar stage={4}>
            <MainHolder>
                <Title>{t1("comingSoon")}</Title>
            </MainHolder>
        </NavBar>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['chat'])),
        },
    };
}

export default Chat;