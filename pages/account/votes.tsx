import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router from "next/router";
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

    @media (max-width: 840px) {
        gap: 1rem;
    }
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

    @media (max-width: 840px) {
        font-size: 24px;
        line-height: 26px;
        padding-right: 5px;
    }
`;
const BattleHolder = styled.div`
    width: 100%;
    min-height: 40rem;
    max-height: calc(100vw / 2);
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 840px) {
        border-bottom: 1px solid ${props => props.theme.colors.primary};
    }
`;
const BattleMainHolder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    overflow-y: scroll;

    @media (max-width: 840px) {
        gap: 4rem;
    }
`;
const UpperHolder = styled.div`
    width: 100%;
    display: flex;
    gap: 3rem;
    padding-left: 2rem;
    align-items: center;

    @media (max-width: 840px) {
        padding-top: 1rem;
        padding-left: 1rem;
    }
`;
const StyledPath = styled.path`
    fill: ${props => props.theme.colors.primary};
`;
const SvgButton = styled.button`
    width: 3rem;
    height: 3rem;
    background: ${props => props.theme.colors.secondaryButtonBackground};
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.theme.colors.primary};
    }
    &:hover ${StyledPath} {
        fill: ${props => props.theme.colors.secondaryButtonBackground};
        transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    }
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
                <UpperHolder>
                    <SvgButton style={{ width: '4rem', height: '4rem' }} onClick={() => { router.push('/account') }}>
                        <svg style={{ transform: 'rotate(90deg)' }} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                            <StyledPath d="M24 40 8 24l2.1-2.1 12.4 12.4V8h3v26.3l12.4-12.4L40 24Z" />
                        </svg>
                    </SvgButton>
                    <Title>{t2("votedFor")}</Title>
                </UpperHolder>
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
                                    {battle!=undefined && battle!=null && battle.votedPost!=null && battle.otherPost!=null &&
                                        <Battle goldPost={{
                                            id: battle.votedPost.id,
                                            type: battle.votedPost.type,
                                            text: battle.votedPost.text,
                                            media: battle.votedPost.media,
                                            user: battle.votedPost.poster!
                                        }} redPost={battle.otherPost} jwt={""} id={battle.id} selfBattle={true} selfVotes={battle.votesForVoted} otherVotes={battle.votesForOther} nextBattle={function (): void {
                                            throw new Error("Function not implemented.");
                                        }} />
                                    }
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
            ...(await serverSideTranslations(locale, ['votes', 'battle', "burgerMenu", 'common'])),
        },
    };
}

export default Votes;