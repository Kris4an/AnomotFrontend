import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

function PrivacyPolicy() {
    const [t] = useTranslation("terms-of-service");
    return <React.Fragment>
        <h1>{t("p0")}</h1>
        <h3>{t("p2")}</h3>
        <h3>{t("p4")}</h3>
        <ol>
            <li>{t("p6.0")}</li>
            <li>{t("p6.2")}</li>
            <li>{t("p6.4")}</li>
            <li>{t("p6.6")}</li>
            <li>{t("p6.8")}</li>
            <li>{t("p6.10")}</li>
            <li>{t("p6.12")}</li>
            <li>{t("p6.14")}</li>
            <li>{t("p6.16")}</li>
            <li>{t("p6.18")}</li>
            <li>{t("p6.20")}</li>
            <li>{t("p6.22")}</li>
            <li>{t("p6.24")}</li>
            <li>{t("p6.26")}</li>
            <li>{t("p6.28")}</li>
            <li>{t("p6.30")}</li>
            <li>{t("p6.32")}</li>
            <li>{t("p6.34")}</li>
            <li>{t("p6.36")}</li>
            <li>{t("p6.38")}</li>
        </ol>
        <h4>{t("p8")}</h4>
        <p dangerouslySetInnerHTML={
            {__html: t('p10', {interpolation: {escapeValue: false}})}}></p>
        <p>{t("p12")}</p>
        <p>{t("p14")}</p>
        <h4>{t("p16")}</h4>
        <p>{t("p18")}</p>
        <p>{t("p20")}</p>
        <h4>{t("p22")}</h4>
        <p>{t("p24")}</p>
        <p>{t("p26")}</p>
        <h4>{t("p28")}</h4>
        <p>{t("p30")}</p>
        <p>{t("p32")}</p>
        <ul>
            <li>{t("p34.0")}</li>
            <li>{t("p34.2")}</li>
            <li>{t("p34.4")}</li>
            <li>{t("p34.6")}</li>
            <li>{t("p34.8")}</li>
            <li>{t("p34.10")}</li>
            <li>{t("p34.12")}</li>
            <li>{t("p34.14")}</li>
            <li>{t("p34.16")}</li>
            <li>{t("p34.18")}</li>
            <li>{t("p34.20")}</li>
            <li>{t("p34.22")}</li>
            <li>{t("p34.24")}</li>
            <li>{t("p34.26")}</li>
            <li>{t("p34.28")}</li>
            <li>{t("p34.30")}</li>
            <li>{t("p34.32")}</li>
            <li>{t("p34.34")}</li>
            <li>{t("p34.36")}</li>
            <li>{t("p34.38")}</li>
            <li>{t("p34.40")}</li>
            <li>{t("p34.42")}</li>
        </ul>
        <h4>{t("p36")}</h4>
        <p>{t("p38")}</p>
        <ul>
            <li>{t("p40.0")}</li>
            <li>{t("p40.2")}</li>
            <li>{t("p40.4")}</li>
            <li>{t("p40.6")}</li>
            <li>{t("p40.8")}</li>
            <li>{t("p40.10")}</li>
            <li>{t("p40.12")}</li>
            <li>{t("p40.14")}</li>
            <li>{t("p40.16")}</li>
            <li>{t("p40.18")}</li>
            <li>{t("p40.20")}</li>
            <li>{t("p40.22")}</li>
            <li>{t("p40.24")}</li>
        </ul>
        <p>{t("p42")}</p>
        <h4>{t("p44")}</h4>
        <p>{t("p46")}</p>
        <p>{t("p48")}</p>
        <p>{t("p50")}</p>
        <h4>{t("p52")}</h4>
        <p>{t("p54")}</p>
        <h4>{t("p56")}</h4>
        <p>{t("p58")}</p>
        <h4>{t("p60")}</h4>
        <p>{t("p62")}</p>
        <p>{t("p64")}</p>
        <h4>{t("p66")}</h4>
        <p>{t("p68")}</p>
        <p>{t("p70")}</p>
        <h4>{t("p72")}</h4>
        <p>{t("p74")}</p>
        <h4>{t("p76")}</h4>
        <h5>{t("p78")}</h5>
        <p>{t("p80")}</p>
        <h5>{t("p82")}</h5>
        <p>{t("p84")}</p>
        <h5>{t("p86")}</h5>
        <p>{t("p88")}</p>
        <h4>{t("p90")}</h4>
        <p>{t("p92")}</p>
        <h4>{t("p94")}</h4>
        <p>{t("p96")}</p>
        <h4>{t("p98")}</h4>
        <p>{t("p100")}</p>
        <h4>{t("p102")}</h4>
        <p>{t("p104")}</p>
        <h4>{t("p106")}</h4>
        <p>{t("p108")}</p>
        <h4>{t("p110")}</h4>
        <p>{t("p112")}</p>
        <h4>{t("p114")}</h4>
        <p>{t("p116")}</p>
        <h4>{t("p118")}</h4>
        <p dangerouslySetInnerHTML={
            {__html: t('p120', {interpolation: {escapeValue: false}})}}></p>
    </React.Fragment>
}

export async function getStaticProps({ locale }:any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['terms-of-service'])),
            // Will be passed to the page component as props
        },
    };
}
  
export default PrivacyPolicy;