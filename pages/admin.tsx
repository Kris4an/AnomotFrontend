import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../axios_instance";
import { EAdminAppeal, EPost, EReportTicket } from "../components/Interfaces";
import MiniPostHeader from "../components/MiniPostHeader";
import NavBar from "../components/NavBar";
import useUser from "../components/useUser";
import Image from "next/image";
import Post from "../components/Post";
import Link from "next/link";
import Battle from "../components/Battle";
import Comment from "../components/Comment";
import Button from "../components/Button";

const MainHolder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
`;
const ButtonHolder = styled.div`
    width: 100%;
    display: flex; 
    
    @media (max-width: 840px) {
        flex-wrap: wrap;
    }
`;
const ButtonType = styled.button`
    width: 100%;
    color: ${props => props.theme.colors.primary};
    text-align: center;
    border: 1px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.secondaryButtonBackground};
    height: 3rem;
    font-family: 'Roboto';
    font-size: 20px;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
    }
`;
const ContentHolder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: scroll;
`;
const Title = styled.span`
    color: ${props => props.theme.colors.primary};
    font-size: 18px;
    line-height: 20px;
    font-family: 'Roboto';
`;
const StyledInput = styled.input`
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    font-size: 20px;
    width: 4rem;
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.secondaryButtonBackground};
`;
interface VotePossibilities {
    averageActualVotes: number
    averageVotePossibilities: number
}
const Admin: NextPage = () => {
    const [t2] = useTranslation("admin");
    const [selType, setSelType] = useState(0);
    const [appeals, setAppeals] = useState<EAdminAppeal[]>();
    const [tickets, setTickets] = useState<EReportTicket[]>();
    const [appealsAll, setAppealsAll] = useState<EAdminAppeal[]>();
    const [ticketsAll, setTicketsAll] = useState<EReportTicket[]>();
    const [pageA, setPageA] = useState(0);
    const [pageAA, setPageAA] = useState(0);
    const [pageT, setPageT] = useState(0);
    const [pageTA, setPageTA] = useState(0);
    const { user: userData, isError: userDataError, isValidating: isValidating } = useUser();
    const fetcherPage = (url: string, page: number) => instance.get(url, { params: { page: page } })
    const fetcherDays = (url: string, days: number) => instance.get(url, { params: { days: days } })
    const [usersCount, setUsersCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const [loginsCount, setLoginsCount] = useState(0);
    const [votePossibilities, setVotePossibilities] = useState<VotePossibilities>();
    const [battlesCount, setBattlesCount] = useState(0);
    const [queueLenght, setQueueLenght] = useState(0);
    const [statsPage, setStatsPage] = useState(365);
    useEffect(() => {
        if (userData == undefined) {
            //router.push('/account');
            return;
        }
        if (!userData.roles.includes("ROLE_ADMIN")) {
            router.push('/account');
            return;
        }
        fetcherPage('/admin/ticket/undecided', pageT).then((res: any) => { setTickets(res.data); }).catch((e: any) => { console.log(e) })
        fetcherPage('/admin/tickets', pageTA).then((res: any) => { setTicketsAll(res.data); }).catch((e: any) => { console.log(e) })
        fetcherPage('/admin/appeals/undecided', pageA).then((res: any) => { setAppeals(res.data); }).catch((e: any) => { console.log(e) })
        fetcherPage('/admin/appeals', pageAA).then((res: any) => { setAppealsAll(res.data); }).catch((e: any) => { console.log(e) })
        updateStats();
    }, [userData])
    const updateStats = () => {
        fetcherDays('/admin/statistics/users/count', statsPage).then((res) => { setUsersCount(res.data.count) }).catch((e: any) => { console.log(e) })
        fetcherDays('/admin/statistics/post/count', statsPage).then((res) => { setPostsCount(res.data.count) }).catch((e: any) => { console.log(e) })
        fetcherDays('/admin/statistics/logins/count', statsPage).then((res) => { setLoginsCount(res.data.count) }).catch((e: any) => { console.log(e) })
        fetcherDays('/admin/statistics/vote/possibilities', statsPage).then((res) => { setVotePossibilities(res.data); console.log(res.data)}).catch((e: any) => { console.log(e) })
        fetcherDays('/admin/statistics/battle/count', statsPage).then((res) => { setBattlesCount(res.data.count) }).catch((e: any) => { console.log(e) })
        fetcherDays('/admin/statistics/queue/count', statsPage).then((res) => { setQueueLenght(res.data.count) }).catch((e: any) => { console.log(e) })
    }

    const Switcher = (stage: number) => {
        switch (stage) {
            case 0: {
                return (
                    <ContentHolder onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        if (bottom && tickets != undefined) {
                            if (tickets.length % 10 != 0) return;
                            fetcherPage('/admin/ticket/undecided', pageT + 1).then((res) => {
                                let arr = [];
                                arr = tickets;
                                arr = arr.concat(res?.data);
                                setTickets(arr);
                                setPageT(pageT + 1);
                            })
                        }
                    }}>
                        {
                            tickets != undefined &&
                            tickets?.map((ticket: EReportTicket, key: number) =>
                                <Report report={ticket} key={key} />
                            )
                        }
                    </ContentHolder>
                )
            }
            case 1: {
                return (
                    <ContentHolder onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        if (bottom && ticketsAll != undefined) {
                            if (ticketsAll.length % 10 != 0) return;
                            fetcherPage('/admin/ticket/undecided', pageTA + 1).then((res) => {
                                let arr = [];
                                arr = ticketsAll;
                                arr = arr.concat(res?.data);
                                setTicketsAll(arr);
                                setPageTA(pageTA + 1);
                            })
                        }
                    }}>
                        {
                            ticketsAll != undefined &&
                            ticketsAll?.map((ticket: EReportTicket, key: number) =>
                                <Report report={ticket} key={key} />
                            )
                        }
                    </ContentHolder>
                )
            }
            case 2: {
                return (
                    <ContentHolder onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        if (bottom && appeals != undefined) {
                            if (appeals.length % 10 != 0) return;
                            fetcherPage('/admin/appeals/undecided', pageA + 1).then((res) => {
                                let arr = [];
                                arr = appeals;
                                arr = arr.concat(res?.data);
                                setAppeals(arr);
                                setPageA(pageA + 1);
                            })
                        }
                    }}>
                        {
                            appeals != undefined &&
                            appeals?.map((appeal: EAdminAppeal, key: number) =>
                                <Appeal appeal={appeal} key={key}></Appeal>
                            )
                        }
                    </ContentHolder>
                )
            }
            case 3: {
                return (
                    <ContentHolder onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        if (bottom && appealsAll != undefined) {
                            if (appealsAll.length % 10 != 0) return;
                            fetcherPage('/admin/appeals', pageAA + 1).then((res) => {
                                let arr = [];
                                arr = appealsAll;
                                arr = arr.concat(res?.data);
                                setAppealsAll(arr);
                                setPageAA(pageAA + 1);
                            })
                        }
                    }}>
                        {
                            appealsAll != undefined &&
                            appealsAll?.map((appeal: EAdminAppeal, key: number) =>
                                <Appeal appeal={appeal} key={key}></Appeal>
                            )
                        }
                    </ContentHolder>
                )
            }
            case 4: {
                return (
                    <ContentHolder style={{alignItems: 'center', gap: '3rem'}}>
                        <div style={{display: 'flex', gap: '2rem'}}>
                            <StyledInput type='text' defaultValue={statsPage} onChange={(e) => {
                                if(!isNaN(Number(e.currentTarget.value))){
                                    setStatsPage(Number(e.currentTarget.value));
                                }
                            }}></StyledInput>
                            <Button buttonType={"Solid"} text={t2("updateStats")} handleClick={function (): void {
                                updateStats();
                            } }></Button>
                        </div>
                        <Title>{t2("usersCount")}: {usersCount}</Title>
                        <Title>{t2("postsCount")}: {postsCount}</Title>
                        <Title>{t2("loginsCount")}: {loginsCount}</Title>
                        <Title>{t2("battlesCount")}: {battlesCount}</Title>
                        <Title>{t2("queueCount")}: {queueLenght}</Title>
                        <Title>{t2("possibleVotes1")}: {votePossibilities?.averageActualVotes!=null? votePossibilities?.averageActualVotes+"":0}</Title>
                        <Title>{t2("possibleVotes2")}: {votePossibilities?.averageVotePossibilities!=null? votePossibilities?.averageVotePossibilities+"":0}</Title>
                    </ContentHolder>
                )
            }
            default: {
                setSelType(0);
                return (
                    <></>
                )
            }
        }
    }

    return (
        <NavBar stage={5}>
            <MainHolder>
                {!isValidating &&
                    <>
                        <ButtonHolder>
                            <ButtonType onClick={() => { setSelType(0) }}>{t2("tickets")}</ButtonType>
                            <ButtonType onClick={() => { setSelType(1) }}>{t2("tickets")} + {t2("decided")}</ButtonType>
                            <ButtonType onClick={() => { setSelType(2) }}>{t2("appeals")}</ButtonType>
                            <ButtonType onClick={() => { setSelType(3) }}>{t2("appeals")} + {t2("decided")}</ButtonType>
                            <ButtonType onClick={() => { setSelType(4) }}>{t2("stats")}</ButtonType>
                        </ButtonHolder>
                        {Switcher(selType)}
                    </>
                }

            </MainHolder>
        </NavBar>
    )
}

const AppealMainHolder = styled.div`
position: relative;
    width: 100%;
    height: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
const ImageHolder = styled.div`
    position: relative;
    width: 100%;
    height: 30rem;
    max-height: 50rem;
`;
const VideoHolder = styled.div`
    position: relative;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    max-height: 40rem;
`;
const StyledVideo = styled.video`
    max-width: 100%;
    max-height: 100%;
`;
const DecisionButton = styled.button`
    background-color: transparent;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    color: ${props => props.theme.colors.primary};
    font-size: 18px;
    height: 3rem;
    min-width: 6rem;
    cursor: pointer;
`;
const DecisionButtonHolder = styled.div`
    display: flex;
    gap: 1rem;
`;
const SimilarHolder = styled.div`
    border: 1px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.textInverted};
    position  : absolute;
    width: 45rem;
    height: 50rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    gap: 1rem;
    z-index: 3;
`;
interface ApealProps {
    appeal: EAdminAppeal
}
function Appeal({ appeal }: ApealProps) {
    const [t2] = useTranslation("admin");
    const [showSimilar, setShowSimilar] = useState(false);

    return (
        <AppealMainHolder>
            <Title>{appeal.reason} {appeal.objective}</Title>
            <MiniPostHeader name={appeal.appealedBy.username} date={appeal.creationDate} src={appeal.appealedBy.avatarId} id={appeal.appealedBy.id} />
            {
                appeal.media?.type == "IMAGE" ?
                    <ImageHolder>
                        <Image unoptimized={true} src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + appeal.media.id} objectFit={"contain"} layout={"fill"}></Image>
                    </ImageHolder>
                    :
                    <VideoHolder>
                        <StyledVideo controls={true}>
                            <source src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + appeal.media.id} />
                        </StyledVideo>
                    </VideoHolder>
            }
            {appeal.reason == "SIMILAR_FOUND" && <DecisionButton onClick={() => { setShowSimilar(true) }}>{t2("showSimilar")}</DecisionButton>}
            {
                showSimilar && appeal.similarPosts != null &&
                <SimilarHolder>
                    <DecisionButton onClick={() => { setShowSimilar(false) }}>close</DecisionButton>
                    {
                        appeal.similarPosts.map((post: EPost, key: number) =>
                            <Post post={post} key={key} />
                        )
                    }
                </SimilarHolder>
            }
            <DecisionButtonHolder>
                <DecisionButton onClick={() => {
                    let reason = prompt("Reason");
                    if (reason != undefined) instance.post('/admin/appeal/decide', {
                        "id": appeal.id,
                        "decision": "PROMOTED",
                        "explanation": reason
                    })
                }}>{t2("accept")}</DecisionButton>
                <DecisionButton onClick={() => {
                    let reason = prompt("Reason");
                    if (reason != undefined) instance.post('/admin/appeal/decide', {
                        "id": appeal.id,
                        "decision": "ACTION_TAKEN",
                        "explanation": reason
                    })
                }}>{t2("deny")}</DecisionButton>
                <DecisionButton onClick={() => {
                    let reason = prompt("Reason");
                    let days = prompt("banLenght");
                    let date = new Date();
                    date.setDate(date.getDate() + Number(days));
                    if (reason != undefined) instance.post('/admin/user/ban', {
                        "userId": appeal.appealedBy.id,
                        "reason": reason,
                        "until": date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
                    }).then(() => { alert("success"); })
                }}>Ban</DecisionButton>
            </DecisionButtonHolder>
        </AppealMainHolder>
    )
}

const BattleHolder = styled.div`
    width: 100%;
    min-height: 40rem;
    max-height: calc(100vw / 2);
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

interface ReportProps {
    report: EReportTicket
}
function Report({ report }: ReportProps) {
    const { t, i18n } = useTranslation();
    const Switcher = (reportType: string) => {

        switch (reportType) {
            case "BATTLE": {
                if (report.battle == null || report.battle == undefined) return (<></>);
                return (
                    <BattleHolder>
                        <>
                            <Button buttonType={"Solid"} text={"Delete gold post post"} handleClick={function (): void {
                                instance.delete('/admin/post', { params: { id: report.battle?.goldPost.id } }).then(() => { alert("success") })
                            }}></Button>
                            <Button buttonType={"Solid"} text={"Delete red post post"} handleClick={function (): void {
                                instance.delete('/admin/post', { params: { id: report.battle?.redPost.id } }).then(() => { alert("success") })
                            }}></Button>
                        </>

                        <Battle goldPost={report.battle!.goldPost!} redPost={report.battle?.redPost!} jwt={""} id={""} selfBattle={false} disableVote={true} nextBattle={function (): void {
                            throw new Error("Function not implemented.");
                        }}></Battle>
                    </BattleHolder>
                )
            }
            case "POST": {
                if (report.post == null || report.post == undefined) return (<></>);
                return (
                    <Post post={report.post!} disableLiking={true}></Post>
                )
            }
            case "COMMENT": {
                if (report.comment == null || report.comment == undefined) return (<></>);
                return (
                    <Comment comment={report.comment!}></Comment>
                )
            }
            case "USER": {
                return (
                    <Link href={{
                        pathname: '/user/[username]',
                        query: { username: report.user.username, id: report.user.id },
                    }}>
                        <a><Title>{report.user.username + ": " + report.user.id}</Title></a>
                    </Link>
                )
            }
        }
        return(
            <></>
        )
    }
    return (
        <AppealMainHolder>
            <Title>{report.reportType} - {new Intl.DateTimeFormat(i18n.language, { timeStyle: 'short', dateStyle: 'medium' }).format(new Date(report.creationDate))}</Title>
            {report!=undefined && Switcher(report.reportType)}
            <DecisionButton onClick={() => {
                let decision = prompt("Decision");
                if (decision != undefined) instance.post('/admin/ticket/decide', {
                    "reportTicketId": report.id,
                    "decision": decision
                })
            }}>Decide</DecisionButton>
        </AppealMainHolder>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['admin', 'common', "burgerMenu"])),
        },
    };
}

export default Admin;