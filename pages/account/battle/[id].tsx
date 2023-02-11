import { GetStaticPaths, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import instance from "../../../axios_instance";
import Battle from "../../../components/Battle";
import { ESelfBattle, EVotedBattle } from "../../../components/Intefaces";
import MessageScreen from "../../../components/MessageScreen";
import NavBar from "../../../components/NavBar";
import useUser from "../../../components/useUser";

const SelfBattle: NextPage = () => {
    const router = useRouter();
    const { user: userData, isError: userDataError } = useUser();
    const fetcherGet = (url: any, id: string) => instance.get(url, { params: { id: id } })
    const fetcherGetPage = (url: any, id: string, page: number) => instance.get(url, { params: { page: page, id: id } })
    const [battle, setBattle] = useState<ESelfBattle>();
    const [showEndM, setEndM] = useState(false);
    const [t1] = useTranslation('common');
    const [t2] = useTranslation('battle');
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            fetcherGet('/account/battle', id + "").then((res: any) => {
                setBattle(res.data);
                setEndM(res.data.isFinished);
                if(res.data.isFinished){
                    if(res.data.selfVotes>res.data.otherVotes){
                        setMessage(t2("battleWon") + "\n " + res.data.selfVotes + " " + t2("vs") + " " + res.data.otherVotes);
                        return;
                    }
                    if(res.data.selfVotes<res.data.otherVotes){
                        setMessage(t2("battleLost") + "\n " + res.data.selfVotes + " " + t2("vs") + " " + res.data.otherVotes);
                        return;
                    }
                    else{
                        setMessage(t2("battleDraw") + "\n " + res.data.selfVotes + " " + t2("vs") + " " + res.data.otherVotes);
                        return;
                    }
                }
            }).catch(() => { router.push('404') })
        }
    }, [router])
    return (
        <NavBar stage={3}>

            {battle != undefined &&
                <>
                    {showEndM ?
                        <MessageScreen stage={battle.selfVotes>=battle.otherVotes} text={message} continueTxt={t1("continue")} handleClick={() => {setEndM(false)}}></MessageScreen>
                        :
                        <Battle goldPost={{
                            id: battle.selfPost.id,
                            type: battle.selfPost.type,
                            text: battle.selfPost.text,
                            media: battle.selfPost.media,
                            user: battle.selfPost.poster!
                        }} redPost={{
                            id: battle.otherPost.id,
                            type: battle.otherPost.type,
                            text: battle.otherPost.text,
                            media: battle.otherPost.media,
                            user: battle.otherPost.poster!
                        }} otherVotes={battle?.otherVotes} selfVotes={battle?.selfVotes} jwt={""} id={battle.id} selfBattle={true} nextBattle={function (): void {
                            throw new Error("Function not implemented.");
                        }} ></Battle>}
                </>
            }

        </NavBar >
    )
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['battle', 'common'])),
        },
    };
}

export default SelfBattle;