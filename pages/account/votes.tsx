import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../axios_instance";
import Battle from "../../components/Battle";
import { EVotedBattle } from "../../components/Intefaces";
import NavBar from "../../components/NavBar";

const MianHolder = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 3rem;
    padding-top: 2rem;
`;
const Title = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 36px;
    line-height: 42px;
    display: flex;
    align-items: flex-end;
    text-indent: 14px;
    color: ${props => props.theme.colors.inputPlaceholder};
    padding-left: 2rem;
`;
const BattleHolder = styled.div`
    width: 100%;
    min-height: 40rem;
    max-height: calc(100vw / 2);
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const BattleMainHolder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    overflow-y: scroll;
`;
const Votes: NextPage = () => {
    const fetcherGetPage = (url: string, page: number) => instance.get(url, { params: { page: page } });
    const [page, setPage] = useState(0);
    const [battles, setBattles] = useState<EVotedBattle[]>()
    const [t2] = useTranslation("votes");
    useEffect(() => {
        fetcherGetPage('/account/votes', page).then((res) => {
            setBattles(res.data);
        }).catch((e) => { console.log(e) });
    }, [])

    return (
        <NavBar stage={3} >
            <MianHolder>
                <Title>{t2("votedFor")}</Title>
                {
                    battles !== undefined &&
                    <BattleMainHolder onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        if (bottom) {
                            if (battles.length % 10 != 0) return;
                            fetcherGetPage('/account/votes', page + 1).then((res) => {
                                let arr = [];
                                arr = battles;
                                arr = arr.concat(res?.data);
                                setBattles(arr);
                                setPage(page + 1);
                            })
                        }
                    }}>
                        {
                            battles?.map((battle: EVotedBattle, key: number) => 
                                <BattleHolder key={key}>
                                    <Battle goldPost={{
                                        id: battle.votedPost.id,
                                        type: battle.votedPost.type,
                                        text: battle.votedPost.text,
                                        media: battle.votedPost.media,
                                        user: battle.votedPost.poster!
                                    }} redPost={battle.otherPost} jwt={""} id={battle.id} selfBattle={true} selfVotes={battle.votesForVoted} otherVotes={battle.votesForOther} nextBattle={function (): void {
                                        throw new Error("Function not implemented.");
                                    } }/>
                                </BattleHolder>
                            )
                        }
                    </BattleMainHolder>
                }
            </MianHolder>
        </NavBar>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['votes', 'battle'])),
        },
    };
}

export default Votes;