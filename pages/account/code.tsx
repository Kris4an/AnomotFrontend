import { NextPage } from "next"
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../axios_instance";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";

const MainHolder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
`;
interface TextProps {
    fontSize: string;
}
const Text =styled.span<TextProps>`
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.fontSize};
    line-height: 26px;
    font-family: 'Roboto';
`

const codePath = `${process.env.NEXT_PUBLIC_FRONTEND_URL}account/follow?code=`

const Code:NextPage = () => {
    const [t2] = useTranslation("settings");
    const [t3] = useTranslation("account");
    const [code, setCode] = useState("");
    const fetcherGetCode = () => instance.get('/follow/code').then((res) => { setCode(res.data.code)}).catch((res) => {console.log('e'); res.error;});
    
    useEffect(() => {
        fetcherGetCode();
    },[])

    return(
        <NavBar stage = {3}>
            <MainHolder>    
                <Text fontSize="30px">{t3("codeInfo")}</Text>
                <QRCodeSVG value={codePath+code} style={{ width: '40%', height: '40%' }} />
                <a href={codePath+code}><Text fontSize="24px">{codePath+code}</Text></a>
                <Button buttonType={"Solid"} text={t2("copy")} handleClick={() => {navigator.clipboard.writeText(codePath+code);}} style={{width: "30rem", maxWidth: '90vw'}}></Button>
            </MainHolder>
        </NavBar>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['account', 'settings'])),
        },
    };
}

export default Code;