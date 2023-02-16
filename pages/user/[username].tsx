import { GetStaticPaths, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../axios_instance";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import { ENonSelfUser, EPost } from "../../components/Intefaces";
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
const PostHolder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    overflow-y: scroll;
    
    @media (max-width: 840px) {
        height: calc(100vh - 260px);
    }
`;
const BurgerMenuButton = styled.button`
    background-color: transparent;
    border: none;
    width: min-content;
    height: fit-content;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0px;
    position: relative;
    position: absolute;
    top: 1rem;
    right: 2rem;

    @media (max-width: 840px) {
        right: 1rem;
    }
`;
const StyledPath = styled.path`
    fill: ${props => props.theme.colors.primary};
`;
const BurgerMenuHolder = styled.div`
    right: 5px;
    top: 2.5rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    width: 20rem;
    background: ${props => props.theme.colors.textInverted};
    border: 1px solid ${props => props.theme.colors.primary};
    box-shadow: 0px -10px 10px ${props => props.theme.colors.authContainerShadow};
    border-radius: 10px;
    z-index: 2;
`;

enum Reasons {
    "ADVERTISING", "INAPPROPRIATE_USERNAME", "TERRORISM", "UNDERAGE", "ABUSE_OF_SERVICE"
}
const Account: NextPage = () => {
    const fetcherGet = (url: string, id: any) => instance.get(url, { params: { id: id } });
    const fetcherGetPage = (url: string, id: any, page: number) => instance.get(url, { params: { id: id, page: page } });
    const fetcherPost = (url: string, id: any) => instance.post(url, null, { params: { id: id } });
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState<boolean>();
    const [user, setUser] = useState<ENonSelfUser>();
    const [posts, setPosts] = useState<EPost[]>([]);
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [noDubPosts, setNoDubPosts] = useState<EPost[]>([]);
    const [t1] = useTranslation("burgerMenu");
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const fetcherReport = (url: string, id: string, reason: Reasons, other: string | undefined) => instance.post(url, {
        "userId": id,
        "reason": reason,
        "other": other
    })
    const [showReports, setShowReports] = useState(false);
    const { user: userData, isError: userDataError, isValidating: isValidating } = useUser();

    useEffect(() => {
        if (router.isReady && !isValidating && user == undefined) {
            const { id } = router.query
            fetcherGet('/account/follows', id).then((res: any) => { setIsFollowed(res.data) }).catch((e) => { console.log(e) })
            if (!userData.roles.includes("ROLE_ADMIN")) {
                fetcherGet('/followers/count', id).then((res: any) => { setFollowersCount(res?.data.count) }).catch((e) => { console.log(e) })
                fetcherGet('/followed/count', id).then((res: any) => { setFollowingCount(res?.data.count) }).catch((e) => { console.log(e) })
                fetcherGet('/user', id).then((res: any) => { setUser(res?.data); }).catch((e) => { router.push('/404'); console.log(e) })
                fetcherGetPage('/posts', id, page).then((res: any) => {
                    setPosts(res.data)
                    const arr1: EPost[] = res.data;
                    let arr2: EPost[] = [];
                    arr2.push(arr1[0])
                    for (let i = 1; i < arr1.length; i++) {
                        if (arr1[i - 1].id != arr1[i].id) {
                            arr2.push(arr1[i]);
                        }
                    }
                    setNoDubPosts(arr2);
                })
            }
            else{
                fetcherGet('/admin/user/followers/count', id).then((res: any) => { setFollowersCount(res?.data.count) }).catch((e) => { console.log(e) })
                fetcherGet('/admin/user/followed/count', id).then((res: any) => { setFollowingCount(res?.data.count) }).catch((e) => { console.log(e) })
                fetcherGet('/admin/user', id).then((res: any) => { setUser(res?.data); }).catch((e) => { router.push('/404'); console.log(e) })
                fetcherGetPage('/admin/posts', id, page).then((res: any) => {
                    setPosts(res.data)
                    const arr1: EPost[] = res.data;
                    let arr2: EPost[] = [];
                    arr2.push(arr1[0])
                    for (let i = 1; i < arr1.length; i++) {
                        if (arr1[i - 1].id != arr1[i].id) {
                            arr2.push(arr1[i]);
                        }
                    }
                    setNoDubPosts(arr2);
                })
            }

        }
    }, [router, isValidating])

    return (
        <NavBar stage={3}>
            <BurgerMenuButton onClick={() => { setShowBurgerMenu(!showBurgerMenu); setShowReports(false); }}>
                <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <StyledPath d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" />
                </svg>
            </BurgerMenuButton>
            {
                showBurgerMenu &&
                <BurgerMenuHolder>
                    <Button buttonType={"Teriatary"} text={t1("report")} handleClick={function (): void {
                        setShowReports(!showReports);
                    }}></Button>
                    {
                        user != undefined && userData.roles.includes("ROLE_ADMIN") &&
                        <>
                            <Button buttonType={"Teriatary"} text={t1("changeUsername")} style={{ color: 'red' }} handleClick={function (): void {
                                let newUsername = prompt(t1("changeUsername"));
                                instance.put('/admin/user/username', { "username": newUsername }).then(() => { alert(t1("success")); })
                            }}></Button>
                            <Button buttonType={"Teriatary"} text={t1("deleteAvatar")} style={{ color: 'red' }} handleClick={function (): void {
                                instance.delete('/admin/user/avatar', { params: { id: user.id } }).then(() => { alert(t1("success")); })
                            }}></Button>
                            <Button buttonType={"Teriatary"} text={t1("ban")} style={{ color: 'red' }} handleClick={function (): void {
                                let reason = prompt("Reason");
                                let days = prompt(t1("banLenght"));
                                let date = new Date();
                                date.setDate(date.getDate() + Number(days));
                                if (reason != undefined) instance.post('/admin/user/ban', {
                                    "userId": user.id,
                                    "reason": reason,
                                    "until": date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
                                }).then(() => { alert(t1("success")); })
                            }}></Button>
                            <Button buttonType={"Teriatary"} text={t1("delete")} style={{ color: 'red' }} handleClick={function (): void {
                                let password = prompt(t1("enterPassword"));
                                if (password != undefined) instance.delete('/admin/user', {
                                    data: { "password": password },
                                    params: { id: user.id }
                                }).then(() => { alert(t1("success")); })
                            }}></Button>
                        </>

                    }
                    {
                        showReports && user != undefined &&
                        <>
                            <Button buttonType={"Teriatary"} text={t1("advertising")} handleClick={function (): void {
                                fetcherReport('/user/report', user.id, Reasons.ADVERTISING, undefined).then(() => {
                                    setShowBurgerMenu(false);
                                    setShowReports(false);
                                    alert(t1("successReport"));
                                }).catch((e: any) => console.log(e))
                            }}></Button>
                            <Button buttonType={"Teriatary"} text={t1("innapropriateUsername")} handleClick={function (): void {
                                fetcherReport('/user/report', user.id, Reasons.INAPPROPRIATE_USERNAME, undefined).then(() => {
                                    setShowBurgerMenu(false);
                                    setShowReports(false);
                                    alert(t1("successReport"));
                                }).catch((e: any) => console.log(e))
                            }}></Button>
                            <Button buttonType={"Teriatary"} text={t1("terrorism")} handleClick={function (): void {
                                fetcherReport('/user/report', user.id, Reasons.TERRORISM, undefined).then(() => {
                                    setShowBurgerMenu(false);
                                    setShowReports(false);
                                    alert(t1("successReport"));
                                }).catch((e: any) => console.log(e))
                            }}></Button>
                            <Button buttonType={"Teriatary"} text={t1("underage")} handleClick={function (): void {
                                fetcherReport('/user/report', user.id, Reasons.UNDERAGE, undefined).then(() => {
                                    setShowBurgerMenu(false);
                                    setShowReports(false);
                                    alert(t1("successReport"));
                                }).catch((e: any) => console.log(e))
                            }}></Button>
                            <Button buttonType={"Teriatary"} text={t1("abuseOfService")} handleClick={function (): void {
                                fetcherReport('/user/report', user.id, Reasons.ABUSE_OF_SERVICE, undefined).then(() => {
                                    setShowBurgerMenu(false);
                                    setShowReports(false);
                                    alert(t1("successReport"));
                                }).catch((e: any) => console.log(e))
                            }}></Button>
                            <Button buttonType={"Teriatary"} text={t1("other")} handleClick={function (): void {
                                let other = prompt(t1("enterReason"));
                                if (other != undefined) {
                                    if (other.length > 1000) other = other.substring(0, 999);
                                    fetcherReport('/user/report', user.id, Reasons.ABUSE_OF_SERVICE, other).then(() => {
                                        setShowBurgerMenu(false);
                                        setShowReports(false);
                                        alert(t1("successReport"));
                                    }).catch((e: any) => console.log(e))
                                }
                            }}></Button>
                        </>
                    }
                    <Button buttonType={"Teriatary"} text={t1("close")} handleClick={function (): void {
                        setShowBurgerMenu(false);
                    }}></Button>
                </BurgerMenuHolder>
            }
            <MainHolder>
                <ProfilePic src={user?.avatarId} type={false} handleClick1={() => {
                    if (isFollowed != undefined) switch (isFollowed) {
                        case true: {
                            fetcherPost('/unfollow', user?.id).then(() => { setIsFollowed(false); setFollowersCount(followersCount - 1) }).catch((e) => { console.log(user?.id); console.log(e) });
                            break;
                        }
                        case false: {
                            fetcherPost('/follow', user?.id).then(() => { setIsFollowed(true); setFollowersCount(followersCount + 1) }).catch((e) => { console.log(user?.id); console.log(e) });
                            break;
                        }
                    }
                }} followingCount={followingCount} followersCount={followersCount} username={user?.username + ""} followed={isFollowed}></ProfilePic>
                <PostHolder onScroll={(e: any) => {
                    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                    if (bottom) {
                        if (posts.length % 9 != 0) return;
                        const url = userData.roles.includes("ROLE_ADMIN")? "/admin":"";
                        fetcherGetPage(url+'/posts', user?.id, page + 1).then((res) => {
                            let arr = [];
                            arr = posts;
                            arr = arr.concat(res?.data);
                            setPosts(arr);

                            let arr2: EPost[] = [];
                            arr2.push(arr[0])
                            for (let i = 1; i < arr.length; i++) {
                                if (arr[i - 1].id != arr[i].id) {
                                    arr2.push(arr[i]);
                                }
                            }
                            setNoDubPosts(arr2);

                            setPage(page + 1);
                        })
                    }
                }}>
                    <>
                        {
                            (Array.isArray(posts)) &&
                            noDubPosts
                            .filter(post => post != undefined)
                            .map((post: EPost, key: number) => {
                                return (
                                    <Post post={post} key={key}></Post>
                                )
                            })
                        }
                    </>
                </PostHolder>
            </MainHolder>
        </NavBar>
    )
}

export const getStaticPaths: GetStaticPaths<{ username: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['account', "burgerMenu"])),
        },
    };
}


export default Account;