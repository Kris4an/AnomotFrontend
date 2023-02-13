import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import styled from "styled-components";
import { EAdminAppeal, EReportTicket } from "../components/Intefaces";
import NavBar from "../components/NavBar";

const MainHolder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
`;
const ButtonHolder = styled.div`
    width: 100%;
    display: flex;
`;
const ButtonType = styled.button`
    width: 100%;
    color: ${props => props.theme.colors.primary};
    text-align: center;
    border: 1px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.secondaryButtonBackground};
    height: 3rem;
    font-family: 'Roboto';
    font-size: 20px;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
    }
`;
const ContentHolder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: scroll;
`;

const Admin: NextPage = () => {
    const [t2] = useTranslation("admin");
    const [selType, setSelType] = useState(0);
    const [appeals, setAppeals] = useState<EAdminAppeal[]>();
    const [tickets, setTickets] = useState<EReportTicket[]>();
    
    return(
        <NavBar stage={9}>
            <MainHolder>
                <ButtonHolder>
                    <ButtonType onClick={() => {setSelType(0)}}>{t2("tickets")}</ButtonType>
                    <ButtonType onClick={() => {setSelType(1)}}>{t2("appeals")}</ButtonType>
                </ButtonHolder>
                <ContentHolder>
                    
                </ContentHolder>
            </MainHolder>
        </NavBar>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['admin', 'common', "burgerMenu"])),
        },
    };
}

export default Admin;