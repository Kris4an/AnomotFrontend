import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import router, { Router } from "next/router";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import instance from "../../axios_instance";
import Battle from "../../components/Battle";
import IconButton from "../../components/IconButton";
import { EBattlePost, ENotification, EPost, ESelfBattle } from "../../components/Intefaces";
import MiniProfile from "../../components/MiniProfile";
import NavBar from "../../components/NavBar";
import Post from "../../components/Post";
import ProfilePic from "../../components/ProfilePic";
import useUser from "../../components/useUser";

const MainHolder = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const IconButtonHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-right: 1rem;
`;
const UpperHolder = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    width: 100%;//-3rem;
    gap: 12px;
`;
const ButtonHolder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0px 10px;
`;
const PostHolder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    overflow-y: scroll;
`;
interface PostButtonProps {
    readonly isSelected: boolean
}
const PostButton = styled.button<PostButtonProps>`
    width: 50%;
    height: 3rem;
    background: none;
    border-bottom: 2px solid; 
    border-bottom-color: ${(props) => (props.isSelected ? props => props.theme.colors.primary : 'transparent')};
    border-left: none;
    border-right: none;
    border-top: none;
    cursor: pointer;
    transition: border ease-in-out 300ms, background ease-in-out 300ms;

    &:hover{
        background: ${props => props.theme.colors.switchButtonHover};;
        border-bottom-color: ${props => props.theme.colors.primary};  
    }
`;
const StyledPathStroke = styled.path<PostButtonProps>`
    stroke: ${(props) => (props.isSelected ? props => props.theme.colors.primary : props => props.theme.colors.navBarSecondary)};
    transition: all ease-in-out 300ms;
`;
const StyledPathFill = styled.path<PostButtonProps>`
    fill: ${(props) => (props.isSelected ? props => props.theme.colors.primary : props => props.theme.colors.navBarSecondary)};
    transition: all ease-in-out 300ms;
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
const BattleText = styled.span`
    padding-left: 2rem;
    padding-right: 2rem;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: ${props => props.theme.colors.inputPlaceholder};
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.inputPlaceholder};
`;
const MainNotiHolder = styled.div`
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    padding-top: 1rem;
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
const NotiHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;
const NotiTitle = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 36px;
    line-height: 42px;
    display: flex;
    align-items: flex-end;
    text-indent: 14px;

    color: ${props => props.theme.colors.inputPlaceholder};
`;
const NotiText = styled.span`
    font-size: 18px;
    line-height: 21px;
    font-family: 'Roboto';
    color: ${props => props.theme.colors.primary};
    font-style: normal;
    font-weight: 400;
`;
const NotiHolder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
`;

const Account: NextPage = () => {
    const [postSelection, setPostSelection] = useState(true);
    const [overlay, setOverlay] = useState(0);
    const fetcher = (url: any) => instance.get(url).then((res) => res.data).catch((res) => res.error);
    const fetcherGetPage = (url: string, page: number) => instance.get(url, { params: { page: page } });
    const { user: userData, isError: userDataError } = useUser();
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [posts, setPosts] = useState<EPost[]>([]);
    const [battles, setBattles] = useState<ESelfBattle[]>([]);
    const [pageP, setPageP] = useState(0);
    const [pageB, setPageB] = useState(0);
    const { t, i18n } = useTranslation();
    const [t2] = useTranslation("account");
    const [stage, setStage] = useState(0);
    const [notis, setNotis] = useState<ENotification[]>();
    const [notiPage, setNotiPage] = useState(0);
    const [ureadNotis, setUnreadNotis] = useState(0);
    useEffect(() => {
        fetcher('/account/followers/count').then((res: any) => { setFollowersCount(res?.count); }).catch((e) => { console.log(e); });
        fetcher('/account/followed/count').then((res: any) => { setFollowingCount(res?.count); }).catch((e) => { console.log(e); });
        fetcherGetPage('/account/posts', pageP).then((res) => { setPosts(res.data) }).catch((e) => { console.log(e); });
        fetcherGetPage('/account/battles', pageB).then((res) => { setBattles(res.data); }).catch((e) => { console.log(e); });
        fetcherGetPage('/account/notifications', notiPage).then((res) => {
            console.table(res.data);
            setNotis(res.data);
            let cnt = 0;
            let arr: ENotification[] = res.data;
            arr.forEach((el: ENotification) => {
                if (!el.read) cnt++;
            });
            setUnreadNotis(cnt);
        }).catch((e) => { console.log(e); });
        //console.table(userData)
    }, [])
    switch (stage) {
        case 0: {
            return (
                <NavBar stage={3}>
                    {overlay != 0 ? <Overlay buttonSelected={overlay == 1} close={() => { setOverlay(0); }} followingCount={followingCount} followersCount={followersCount}></Overlay> : <></>}
                    <MainHolder>
                        <UpperHolder>
                            <ProfilePic src={userData?.avatarId} type={true} handleClick1={() => { router.push('/account/settings?s=1'); }} handleClick2={() => { router.push('/account/code'); }} handleClickFollowers={() => { setOverlay(1); }} handleClickFollowing={() => { setOverlay(2); }} followingCount={followingCount} followersCount={followersCount} username={userData?.username}></ProfilePic>
                            <IconButtonHolder>
                                <IconButton icon={'Settings'} handleClick={() => { router.push('/account/settings?s=0') }} ></IconButton>
                                <IconButton icon={'Votes'} handleClick={() => { router.push('/account/votes') }} ></IconButton>
                                <IconButton icon={'Notifications'} notis={ureadNotis} handleClick={() => { setStage(1); }} ></IconButton>
                            </IconButtonHolder>
                        </UpperHolder>
                        <ButtonHolder>
                            <PostButton isSelected={postSelection} onClick={() => { setPostSelection(true) }}>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <StyledPathStroke isSelected={postSelection} d="M21.75 26.25L4.5 9V4.5H9L26.25 21.75M19.5 28.5L28.5 19.5M24 24L30 30M28.5 31.5L31.5 28.5M21.75 9.75L27 4.5H31.5V9L26.25 14.25M7.5 21L13.5 27M10.5 25.5L6 30M4.5 28.5L7.5 31.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </PostButton>
                            <PostButton isSelected={!postSelection} onClick={() => { setPostSelection(false) }}>
                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <StyledPathFill isSelected={!postSelection} d="M9.792 11.625C9.792 11.9234 9.67347 12.2095 9.46249 12.4205C9.25152 12.6315 8.96537 12.75 8.667 12.75C8.36863 12.75 8.08248 12.6315 7.8715 12.4205C7.66053 12.2095 7.542 11.9234 7.542 11.625C7.542 11.3266 7.66053 11.0405 7.8715 10.8295C8.08248 10.6185 8.36863 10.5 8.667 10.5C8.96537 10.5 9.25152 10.6185 9.46249 10.8295C9.67347 11.0405 9.792 11.3266 9.792 11.625ZM8.6715 22.5C8.37313 22.5 8.08698 22.6185 7.87601 22.8295C7.66503 23.0405 7.5465 23.3266 7.5465 23.625C7.5465 23.9234 7.66503 24.2095 7.87601 24.4205C8.08698 24.6315 8.37313 24.75 8.6715 24.75H16.1715C16.4699 24.75 16.756 24.6315 16.967 24.4205C17.178 24.2095 17.2965 23.9234 17.2965 23.625C17.2965 23.3266 17.178 23.0405 16.967 22.8295C16.756 22.6185 16.4699 22.5 16.1715 22.5H8.6715ZM7.5465 17.625C7.5465 17.3266 7.66503 17.0405 7.87601 16.8295C8.08698 16.6185 8.37313 16.5 8.6715 16.5H16.1715C16.3192 16.5 16.4655 16.5291 16.602 16.5856C16.7385 16.6422 16.8625 16.725 16.967 16.8295C17.0715 16.934 17.1543 17.058 17.2109 17.1945C17.2674 17.331 17.2965 17.4773 17.2965 17.625C17.2965 17.7727 17.2674 17.919 17.2109 18.0555C17.1543 18.192 17.0715 18.316 16.967 18.4205C16.8625 18.525 16.7385 18.6078 16.602 18.6644C16.4655 18.7209 16.3192 18.75 16.1715 18.75H8.6715C8.37313 18.75 8.08698 18.6315 7.87601 18.4205C7.66503 18.2095 7.5465 17.9234 7.5465 17.625ZM22.5 31.5C23.1853 31.4953 23.8481 31.2545 24.3765 30.8181C24.9049 30.3818 25.2668 29.7766 25.401 29.1045L26.121 25.5H30.375C31.0712 25.5 31.7389 25.2234 32.2312 24.7312C32.7234 24.2389 33 23.5712 33 22.875V13.8915C33 12.9949 32.645 12.1347 32.0125 11.4992C31.38 10.8636 30.5216 10.5044 29.625 10.5V10.494H21.75V7.875C21.75 6.97989 21.3944 6.12145 20.7615 5.48851C20.1285 4.85558 19.2701 4.5 18.375 4.5H6.375C5.47989 4.5 4.62145 4.85558 3.98851 5.48851C3.35558 6.12145 3 6.97989 3 7.875V26.625C3 27.9179 3.51361 29.1579 4.42785 30.0721C5.34209 30.9864 6.58207 31.5 7.875 31.5H22.5ZM5.25 7.875C5.25 7.57663 5.36853 7.29048 5.5795 7.0795C5.79048 6.86853 6.07663 6.75 6.375 6.75H18.375C18.6734 6.75 18.9595 6.86853 19.1705 7.0795C19.3815 7.29048 19.5 7.57663 19.5 7.875V28.521C19.5 28.7715 19.53 29.016 19.59 29.25H7.875C7.17881 29.25 6.51113 28.9734 6.01884 28.4812C5.52656 27.9889 5.25 27.3212 5.25 26.625V7.875ZM21.75 12.744H26.415C26.3592 12.9015 26.3151 13.063 26.283 13.227L23.1945 28.6635C23.1597 28.8416 23.0598 29.0003 22.9143 29.1087C22.7687 29.217 22.588 29.2672 22.4074 29.2494C22.2269 29.2315 22.0594 29.147 21.9378 29.0123C21.8163 28.8776 21.7493 28.7024 21.75 28.521V12.744ZM28.488 13.668C28.5423 13.3888 28.6988 13.1399 28.927 12.9701C29.1551 12.8003 29.4385 12.7218 29.7215 12.7499C30.0045 12.7781 30.2669 12.9109 30.4571 13.1223C30.6473 13.3338 30.7518 13.6086 30.75 13.893V22.875C30.75 22.9745 30.7105 23.0698 30.6402 23.1402C30.5698 23.2105 30.4745 23.25 30.375 23.25H26.5725L28.488 13.668Z" />
                                </svg>
                            </PostButton>
                        </ButtonHolder>
                        <PostHolder onScroll={(e: any) => {
                            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                            if (bottom) {
                                if (postSelection) {
                                    if (battles.length % 10 != 0) return;
                                    fetcherGetPage('account/battles', pageB + 1).then((res) => {
                                        let arr = [];
                                        arr = battles;
                                        arr = arr.concat(res?.data);
                                        setBattles(arr);
                                        setPageB(pageB + 1);
                                    })
                                }
                                else {
                                    if (posts.length % 9 != 0) return;
                                    fetcherGetPage('account/posts', pageP + 1).then((res) => {
                                        let arr = [];
                                        arr = posts;
                                        arr = arr.concat(res?.data);
                                        setPosts(arr);
                                        setPageP(pageP + 1);
                                    })
                                }

                            }
                        }}>
                            {
                                postSelection ?
                                    <>
                                        {
                                            (Array.isArray(battles)) &&
                                            battles.map((battle: ESelfBattle, key: number) =>
                                                <BattleHolder key={key}>
                                                    <BattleText>{battle.isFinished ? t2("finished") : t2("willFinish")}: {new Intl.DateTimeFormat(i18n.language, { timeStyle: 'short', dateStyle: 'medium' }).format(new Date(battle.until))}</BattleText>
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
                                                    }} jwt={""} id={battle.id} selfBattle={true} selfVotes={battle.selfVotes} otherVotes={battle.otherVotes} nextBattle={function (): void {
                                                        throw new Error("Function not implemented.");
                                                    }}></Battle>
                                                </BattleHolder>
                                            )
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            (Array.isArray(posts)) &&
                                            posts.map((post: EPost, key: number) => {
                                                return (
                                                    <Post post={post} key={key}></Post>
                                                )
                                            })
                                        }
                                    </>
                            }
                        </PostHolder>
                    </MainHolder>
                </NavBar>
            )
        }
        case 1: {

            return (
                <NavBar stage={3} >
                    <MainNotiHolder>
                        <NotiHeader>
                            <SvgButton style={{ width: '4rem', height: '4rem' }} onClick={() => { setStage(0) }}>
                                <svg style={{ transform: 'rotate(90deg)' }} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                    <StyledPath d="M24 40 8 24l2.1-2.1 12.4 12.4V8h3v26.3l12.4-12.4L40 24Z" />
                                </svg>
                            </SvgButton>
                            <NotiTitle>{t2("notifications")}</NotiTitle>
                        </NotiHeader>
                        {notis !== undefined &&
                            <PostHolder onScroll={(e: any) => {
                                const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                                if (bottom) {
                                    if (notis.length % 20 != 0) return;
                                    fetcherGetPage('/account/notifications', notiPage + 1).then((res) => {
                                        let arr = [];
                                        arr = notis;
                                        arr = arr.concat(res?.data);
                                        setNotis(arr);
                                        setNotiPage(notiPage + 1);
                                    })
                                }
                            }}>
                                {
                                    notis.map((noti: ENotification, key: number) => {
                                        switch (noti.type) {
                                            case 'BATTLE_BEGIN': {
                                                return (
                                                    <NotiHolder key={key}>
                                                        <Link href={{
                                                            pathname: '/account/battle/[id]',
                                                            query: { id: noti.payload },
                                                        }}>
                                                            <a><NotiText>{t2("notiBattleBegin")}</NotiText></a>
                                                        </Link>
                                                    </NotiHolder>
                                                )
                                            }
                                            case 'BATTLE_END': {
                                                return (
                                                    <NotiHolder key={key}>
                                                        <Link href={{
                                                            pathname: '/account/battle/[id]',
                                                            query: { id: noti.payload },
                                                        }}>
                                                            <a><NotiText>{t2("notiBattleEnd")}</NotiText></a>
                                                        </Link>
                                                    </NotiHolder>
                                                )
                                            }
                                            case 'NEW_LOGIN': {
                                                return (
                                                    <NotiHolder key={key}>
                                                        <Link href={"account/settings?s=5"}>
                                                            <a><NotiText>{t2("notiNewLogin")}</NotiText></a>
                                                        </Link>
                                                    </NotiHolder>
                                                )
                                            }
                                            default: return (
                                                <span key={key}>{noti.type}</span>
                                            )
                                        }
                                    }
                                    )
                                }
                            </PostHolder>
                        }
                    </MainNotiHolder>
                </NavBar>
            )
        }
        default: return (<></>)
    }

}

const OverlayMainHolder = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    padding-top: 10vh;
    justify-content: center;
    background-color: #29335c50;//${props => props.theme.colors.primary};
    z-index: 10;  
`;
const Holder = styled.div`
    width: 40rem;
    height: fit-content;
    max-height: 80%;
    min-height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${props => props.theme.colors.authContainerBackground};
    border-radius: 1rem;
`;
const OverlayPostButton = styled(PostButton)`
    font-family: 'Roboto';
    font-size: 20px;
    line-height: 22px;
    color: ${(props) => (props.isSelected ? props => props.theme.colors.primary : props => props.theme.colors.navBarSecondary)};
    transition: all ease-in-out 300ms;
`;


interface Follower {
    username: string,
    id: string,
    avatarId?: string
}
interface OverlayProps {
    buttonSelected: boolean,
    followingCount: number,
    followersCount: number,
    close: any,
}
function Overlay({ buttonSelected, close, followingCount, followersCount }: OverlayProps) {
    const fetcherGetFollwers = (url: string, page: number) => instance.get(url, { params: { page: page } });
    const [pageFollowers, setPageFollowers] = useState(0);
    const [pageFollowing, setPageFollowing] = useState(0);
    const [followers, setFollowers] = useState<Follower[]>([]);
    const [following, setFollowing] = useState<Follower[]>([]);
    useEffect(() => {
        fetcherGetFollwers('/account/followers', pageFollowers).then((res: any) => { setFollowers(res?.data); console.log(res?.data); }).catch((e) => { console.log(e); });
        fetcherGetFollwers('/account/followed', pageFollowing).then((res: any) => { setFollowing(res?.data); console.log(res?.data); }).catch((e) => { console.log(e); });
    }, [])
    const [isSelected, setIsSelected] = useState(buttonSelected);

    const [t2] = useTranslation("account");


    const displayAnons = (cnt: number) => {
        const anons: any = [];
        for (let i = 0; i < cnt; i++) {
            anons.push(<MiniProfile anon={true} src={""}></MiniProfile>);
        }
        return anons;
    }
    // TODO: Warning / Възможен проблем при визуализацията на повече от 30 профила
    return (
        <OverlayMainHolder onClick={close}>
            <Holder onClick={(e: any) => {
                e.stopPropagation();
                e.cancelBubble = true;
            }} onScroll={(e: any) => {
                const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                if (bottom) {
                    if (isSelected) {
                        if (followers.length % 30 != 0) return;
                        fetcherGetFollwers('/account/followers', pageFollowers + 1).then((res) => {
                            let arr = [];
                            arr = followers;
                            arr = arr.concat(res?.data);
                            setFollowers(arr);
                            setPageFollowers(pageFollowers + 1);
                        })
                    }
                    else {
                        if (following.length % 30 != 0) return;
                        fetcherGetFollwers('/account/followed', pageFollowing + 1).then((res) => {
                            let arr = [];
                            arr = following;
                            arr = arr.concat(res?.data);
                            setFollowing(arr);
                            setPageFollowing(pageFollowing + 1);
                        })
                    }
                }
            }}>
                <ButtonHolder>
                    <OverlayPostButton isSelected={!isSelected} onClick={() => { setIsSelected(false); }}>{t2("following2")}</OverlayPostButton>
                    <OverlayPostButton isSelected={isSelected} onClick={() => { setIsSelected(true); }}>{t2("followers2")}</OverlayPostButton>
                </ButtonHolder>
                {isSelected ?
                    <>
                        {followers?.map((f: any, key: number) => {
                            return (<MiniProfile src={f.avatarId} name={f.username} anon={false} key={key} handleClick={() => {
                                router.push({
                                    pathname: '/user/[username]',
                                    query: { username: f.username, id: f.id },
                                });
                            }}></MiniProfile>)
                        })}
                        {/* Възможен проблем при визуализацията на повече от 30 профила */}
                        {displayAnons(followersCount - followers.length)}
                    </>
                    :
                    <>
                        {following.map((f: any, key: number) => {
                            return (<MiniProfile src={f.avatarId} name={f.username} anon={false} key={key} handleClick={() => {
                                router.push({
                                    pathname: '/user/[username]',
                                    query: { username: f.username, id: f.id },
                                });
                            }}></MiniProfile>)
                        })}
                        {displayAnons(followingCount - following.length)}
                    </>
                }
            </Holder>
        </OverlayMainHolder>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['account', 'battle', 'common'])),
        },
    };
}

export default Account;