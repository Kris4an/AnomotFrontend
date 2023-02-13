import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

function PrivacyPolicy() {
    const [t] = useTranslation("privacy-policy");
    return <React.Fragment>
        <h1>{t("h1")}</h1>
        <h3>{t("h3")}</h3>
        <p>{t("p1")}</p>
        <p dangerouslySetInnerHTML={
            {__html: t('p2', {interpolation: {escapeValue: false}})}}></p>
        <p>{t("p3")}</p>
        <p>{t("p4")}</p>
        <p dangerouslySetInnerHTML={
            {__html: t('p5', {interpolation: {escapeValue: false}})}}></p>
        <h3>{t("h31")}</h3>
        <p>{t("p6")}</p>
        <p>{t("p7")}</p>
        <p>{t("p8")}</p>
        <p>{t("p9")}</p>
        <p>{t("p10")}</p>
        <p>{t("p11")}</p>
        <p>{t("p12")}</p>
        <p>{t("p13")}</p>
        <p dangerouslySetInnerHTML={
            {__html: t('p14', {interpolation: {escapeValue: false}})}}></p>
        <h3>{t("h32")}</h3>
        <ol>
            <li>{t("li1")}</li>
            <li>{t("li2")}</li>
            <li>{t("li3")}</li>
            <li>{t("li4")}</li>
            <li>{t("li5")}</li>
            <li>{t("li6")}</li>
            <li>{t("li7")}</li>
            <li>{t("li8")}</li>
            <li>{t("li9")}</li>
            <li>{t("li10")}</li>
            <li>{t("li11")}</li>
            <li>{t("li12")}</li>
            <li>{t("li13")}</li>
        </ol>
        <h4>{t("h41")}</h4>
        <p>{t("p15")}</p>
        <p>{t("p16")}</p>
        <p>{t("p17")}</p>
        <p>{t("p18")}</p>
        <ul>
            <li>{t("li14")}</li>
            <li>{t("li15")}</li>
            <li>{t("li16")}</li>
            <li>{t("li17")}</li>
            <li>{t("li18")}</li>
        </ul>
        <p>{t("p19")}</p>
        <p>{t("p20")}</p>
        <p>{t("p21")}</p>
        <p>{t("p22")}</p>
        <p>{t("p23")}</p>
        <p>{t("p24")}</p>
        <p>{t("p25")}</p>
        <p>{t("p26")}</p>
        <h4>{t("p28")}</h4>
        <p>{t("p30")}</p>
        <p>{t("p32")}</p>
        <p>{t("p34")}</p>
        <p>{t("p36")}</p>
        <ul>
            <li>{t("p38")}</li>
            <li>{t("p40")}</li>
            <li>{t("p42")}</li>
        </ul>
        <h4>{t("p44")}</h4>
        <p>{t("p46")}</p>
        <p>{t("p48")}</p>
        <ul>
            <li>{t("p50")}</li>
            <li>{t("p52")}</li>
            <li>{t("p54")}</li>
            <li>{t("p56")}</li>
            <li>{t("p58")}</li>
            <li>{t("p60")}</li>
            <li>{t("p62")}</li>
            <li>{t("p64")}</li>
        </ul>
        <h4>{t("p66")}</h4>
        <p>{t("p68")}</p>
        <p>{t("p70")}</p>
        <p>{t("p72")}</p>
        <ul>
            <li>{t("p74")}</li>
            <li>{t("p76")}</li>
            <li>{t("p78")}</li>
            <li>{t("p80")}</li>
            <li>{t("p82")}</li>
            <li>{t("p84")}</li>
            <li>{t("p86")}</li>
            <li>{t("p88")}</li>
        </ul>
        <h4>{t("p90")}</h4>
        <p>{t("p92")}</p>
        <ul>
            <li>{t("p94")}</li>
            <li>{t("p96")}</li>
        </ul>
        <h4>{t("p98")}</h4>
        <p>{t("p100")}</p>
        <h4>{t("p102")}</h4>
        <p>{t("p104")}</p>
        <p>{t("p106")}</p>
        <h4>{t("p108")}</h4>
        <p>{t("p110")}</p>
        <h4>{t("p112")}</h4>
        <p dangerouslySetInnerHTML={
            {__html: t('p114', {interpolation: {escapeValue: false}})}}></p>
        <h4>{t("p116")}</h4>
        <p>{t("p118")}</p>
        <p>{t("p120")}</p>
        <p>{t("p122")}</p>
        <p dangerouslySetInnerHTML={
            {__html: t('p124', {interpolation: {escapeValue: false}})}}></p>
        <p dangerouslySetInnerHTML={
            {__html: t('p126', {interpolation: {escapeValue: false}})}}></p>
        <p>{t("p128")}</p>
        <p>{t("p130")}</p>
        <p>{t("p132")}</p>
        <p>{t("p134")}</p>
        <p>{t("p136")}</p>
        <p>{t("p138")}</p>
        <p>{t("p140")}</p>
        <p dangerouslySetInnerHTML={
            {__html: t('p142', {interpolation: {escapeValue: false}})}}></p>
        <h4>{t("p144")}</h4>
        <p>{t("p146")}</p>
        <h4>{t("p148")}</h4>
        <p>{t("p150")}</p>
        <h4>{t("p152")}</h4>
        <p dangerouslySetInnerHTML={
            {__html: t('p154', {interpolation: {escapeValue: false}})}}></p>
        <h4>{t("p156")}</h4>
        <p dangerouslySetInnerHTML={
            {__html: t('p158', {interpolation: {escapeValue: false}})}}></p>
    </React.Fragment>
}

export async function getStaticProps({ locale }:any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['privacy-policy'])),
            // Will be passed to the page component as props
        },
    };
}
  
export default PrivacyPolicy;