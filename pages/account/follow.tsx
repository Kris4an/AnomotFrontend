import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router, { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../axios_instance";
import MessageScreen from "../../components/MessageScreen";

const Holder = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${props => props.theme.colors.secondary};
`;

const Follow:NextPage = () => {
    const [success, setSuccess] = useState(0);
    const fetcherPostCode = (code: string) => instance.post('/follow/code', {
        "code": code
    }).then(() => {setSuccess(1) }).catch((e) => { setSuccess(2); });
    const router = useRouter();
    const [t1] = useTranslation("common");
    const [t2] = useTranslation("account");

    useEffect(() => {
        if(router.isReady){
            const {code}:any = router.query;
            fetcherPostCode(code);
        }
    },[router.isReady])
    
    return(
        <>
            {success == 0? <Holder></Holder>:<MessageScreen continueTxt={t1("continue")} handleClick={() => {router.push('/account')}} stage={success==1} text={success==1? t2("successfulFollow"): t2("unsuccessfulFollow")}></MessageScreen>}
        </>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'account'])),
        },
    };
}

export default Follow;