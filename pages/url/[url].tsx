import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../axios_instance";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

const getUrl = (url: string) => instance.get<Url>(`/url/${url}`)

interface Url {
    url: string,
    threats: string[]
}

const Message = styled.p`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    text-align: center;
    max-width: 80vw;
    color: ${props => props.theme.colors.secondaryButtonBackground};

    @media (max-width: 800px) {
      font-size: 30px;
    }
`;

const UrlText = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    text-align: center;
    max-width: 80vw;
    color: ${props => props.theme.colors.secondaryButtonBackground};

    @media (max-width: 800px) {
      font-size: 30px;
    }
`;

const Holder = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    //height: 100%;
    justify-content: center;
    gap: 5rem;
    background: #1D2440;
    overflow-y: hidden;
    overflow-x: hidden;
    
    @media (max-width: 800px) {
      //height: 100%;
      //width: 100%;
      gap: 0px;
      justify-content: space-evenly;
    }
`;

function Url() {
    const router = useRouter();
    const [realUrl, setRealUrl] = useState<Url>();
    const [t] = useTranslation("url")

    useEffect(() => {
        if (router.isReady) {
            const { url }: any = router.query
            if (url == null || url?.length != 64) {
                router.replace("/404")
                return
            }

            getUrl(url).then((res) => {
                setRealUrl(res.data)
            }).catch((err) => {
                console.log(err)
                router.replace("/404")
            })
        }
    }, [router])

    return <Holder>
        {realUrl && 
        <React.Fragment><Logo/>
            <Message>{t("redirectNotice")}</Message>
            <UrlText>{realUrl?.url}</UrlText>
            <a href={realUrl.url}>
                <Button buttonType='Solid' handleClick={() => {}} text={t("redirectButton")} style={{ width: '24rem', maxWidth: '90vw' }}></Button>
            </a>
        </React.Fragment>
        }
  </Holder>
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['url'])),
        },
    };
}

export default Url;