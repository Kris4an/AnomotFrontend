import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../axios_instance";
import { EAdminAppeal, EPost, EReportTicket } from "../components/Intefaces";
import MiniPostHeader from "../components/MiniPostHeader";
import NavBar from "../components/NavBar";
import useUser from "../components/useUser";
import Image from "next/image";
import Post from "../components/Post";
import Link from "next/link";
import Battle from "../components/Battle";
import Comment from "../components/Comment";

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
    const { user: userData, isError: userDataError } = useUser();
    const fetcherPage = (url: string, page: number) => instance.get(url, { params: { page: page } })
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
    }, [userData])

    const Switcher = () => {
        switch (selType) {
            case 0: {
                return (
                    <ContentHolder onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        if (bottom && tickets!=undefined) {
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
                            tickets?.map((ticket: EReportTicket, key:number) => 
                                <Report report={ticket} key={key}/>
                            )
                        }
                    </ContentHolder>
                )
            }
            case 1: {
                return (
                    <ContentHolder onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        if (bottom && ticketsAll!=undefined) {
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
                            ticketsAll?.map((ticket: EReportTicket, key:number) => 
                                <Report report={ticket} key={key}/>
                            )
                        }
                    </ContentHolder>
                )
            }
            case 2: {
                return (
                    <ContentHolder onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        if (bottom && appeals !=undefined) {
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
                        if (bottom && appealsAll!=undefined) {
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
            default: {
                setSelType(1);
                return (
                    <></>
                )
            }
        }
    }

    return (
        <NavBar stage={9}>
            <MainHolder>
                <ButtonHolder>
                    <ButtonType onClick={() => { setSelType(0) }}>{t2("tickets")}</ButtonType>
                    <ButtonType onClick={() => { setSelType(1) }}>{t2("tickets")} + {t2("decided")}</ButtonType>
                    <ButtonType onClick={() => { setSelType(2) }}>{t2("appeals")}</ButtonType>
                    <ButtonType onClick={() => { setSelType(3) }}>{t2("appeals")} + {t2("decided")}</ButtonType>
                </ButtonHolder>
                {Switcher()}
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
`;
const StyledVideo = styled.video`
    max-width: 100%;
    max-height: 100%;
`;
const AppealTitle = styled.span`
    color: ${props => props.theme.colors.primary};
    font-size: 18px;
    line-height: 20px;
    font-family: 'Roboto';
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
            <AppealTitle>{appeal.reason} {appeal.objective}</AppealTitle>
            <MiniPostHeader name={appeal.appealedBy.username} date={appeal.creationDate} src={appeal.appealedBy.avatarId} id={appeal.appealedBy.id} />
            {
                appeal.media?.type == "IMAGE" ?
                    <ImageHolder>
                        <Image src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + appeal.media.id} objectFit={"contain"} layout={"fill"}></Image>
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
    const Switcher = () => {

        switch (report.reportType) {
            case "BATTLE": {
                if(report.battle == null || report.battle == undefined) return(<></>);
                return (
                    <BattleHolder>
                        <Battle goldPost={report.battle!.goldPost!} redPost={report.battle?.redPost!} jwt={""} id={""} selfBattle={false} disableVote={true} nextBattle={function (): void {
                            throw new Error("Function not implemented.");
                        } }></Battle>
                    </BattleHolder>
                )
            }
            case "POST": {
                if(report.post == null || report.post == undefined) return(<></>);
                return (
                    <Post post={report.post!}></Post>
                )
            }
            case "COMMENT": {
                if(report.comment == null || report.comment == undefined) return(<></>);
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
                        <a><AppealTitle>{report.user.username + ": " + report.user.id}</AppealTitle></a>
                    </Link>
                )
            }
            default: return (
                <></>
            )
        }
    }
    return (
        <AppealMainHolder>
            <AppealTitle>{report.reportType} - {new Intl.DateTimeFormat(i18n.language, { timeStyle: 'short', dateStyle: 'medium' }).format(new Date(report.creationDate))}</AppealTitle>
            {Switcher()}
            <DecisionButton onClick={() => {
                let decision = prompt("Decision");
                if(decision!=undefined) instance.post('/admin/ticket/decide', {
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