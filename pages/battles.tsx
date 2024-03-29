import { NextPage } from "next";
import NavBar from "../components/NavBar";
import styled, { keyframes } from "styled-components";
import Battle from "../components/Battle";
import instance from "../axios_instance";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Logo from "../components/Logo";
import { EBattlePost } from "../components/Interfaces";

const MainHolder = styled.div`
   display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  //max-height: 100vh;
  height: 100%;
  align-items: center;
`;
const PlaceHolder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    position: relative;
`;
const Text = styled.span`
    color: ${props => props.theme.colors.primary};
    font-size: 30px;
    line-height: 32px;
    font-family: 'Montserrat';
`;

const LogoAnim = keyframes`
    0% {
        transform: translateX(-200%);
    }
    100% {
        transform: translateX(200%);
    }
`;

const LogoHolder = styled.div`
    position: absolute;
    animation: ${LogoAnim} 1s ease-in-out 0s infinite alternate;
`;

const Battles: NextPage = () => {
    const fetcher = (url: any, page: number) => instance.get(url, { params: { page: page } }).then((res) => res.data).catch((res) => res.error);
    const [goldPost, setGoldPost] = useState<EBattlePost>();
    const [redPost, setRedPost] = useState<EBattlePost>();
    const [jwt, setJwt] = useState("");
    const [battleId, setBattleId] = useState("");
    const [isReady, setIsReady] = useState(false);
    const [battleNum, setBattleNum] = useState(0);
    const [t2] = useTranslation("battle");

    const BattleGetter = () => {
        fetcher('/battle', battleNum).then((res) => {
            setGoldPost(res.goldPost);
            setRedPost(res.redPost);
            setJwt(res.voteJWT);
            setBattleId(res.id)
            setIsReady(true);
            setBattleNum(battleNum + 1);
        }).catch((e) => { console.log(e) });
    }
    useEffect(() => {
        BattleGetter();
    }, [])

    return (
        <NavBar stage={0} >
            <MainHolder>
                {
                    (isReady && redPost != undefined && goldPost != undefined) ?
                        <Battle goldPost={goldPost!} redPost={redPost!} jwt={jwt} nextBattle={() => {
                            BattleGetter();
                            setIsReady(false);
                        }} id={battleId} selfBattle={false}></Battle>
                        :
                        <PlaceHolder>
                            <LogoHolder>
                                <Logo />
                            </LogoHolder>
                            <Text>{t2("lookingForBattle")}</Text>
                        </PlaceHolder>
                }
            </MainHolder>
        </NavBar>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['battle', 'account', 'common', "burgerMenu"])),
        },
    };
}

export default Battles;