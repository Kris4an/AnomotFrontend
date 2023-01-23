import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router, { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../axios_instance";
import MessageScreen from "../../components/MessageScreen";

const Holder = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 5rem;
    background: #1D2440;
    //z-index: 99999;
`;
const Verify: NextPage = () => {
    const [t1] = useTranslation("common");
    const [t2] = useTranslation("create");
    const router = useRouter();
    const [success, setSuccess] = useState(0);
    const fetcher = (url: any, code: string) => instance.post(url, {
        "verificationCode": code
    });
    
    if(router.isReady) {if(success==0) {
      const {code}:any = router.query;
      console.log(router.query);
      console.log(code)
      fetcher('/account/email/verify', code).then(()=>{setSuccess(1);}).catch((e)=>{console.log(e);setSuccess(2)});
    }}

    return(
      (success==0? <Holder></Holder>:<MessageScreen stage={success==1} text={(success==1? t2("verified"):t2("verifyFail"))} continueTxt={t1("continue")} handleClick={() => {router.push('/login')}}></MessageScreen>)
    )
}

export async function getStaticProps({ locale }:any) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'create'])),
      },
    };
  }
  
export default Verify;