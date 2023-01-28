import { GetStaticPaths, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../axios_instance";
import IconButton from "../../components/IconButton";
import NavBar from "../../components/NavBar";
import Post from "../../components/Post";
import ProfilePic from "../../components/ProfilePic";

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
`;
interface MediaPost{
    id: string,
    type: string
}
interface NonSelfUser{
    username: string,
    id: string,
    avatarId: string
}
interface Post {
    type: string,
    text: string | null,
    media: MediaPost | null,
    poster: NonSelfUser | null,
    likes: number | null,
    hasUserLiked: boolean | null,
    creationDate: string,
    id: string
}
const Account:NextPage = () => {
    const fetcherGet = (url: string, id: any) => instance.get(url, { params: { id: id } });
    const fetcherGetPage = (url: string, id: any, page: number) => instance.get(url, { params: { id: id, page: page } });
    const fetcherPost = (url: string, id: any) => instance.post(url, null, { params: { id: id } });
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState<boolean>();
    const [user, setUser] = useState<NonSelfUser>();
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();
    const [page, setPage] = useState(0);
    useEffect(() => {
        if(router.isReady){
            const {id} = router.query
            fetcherGet('/followers/count', id).then((res) => {setFollowersCount(res?.data.count)}).catch((e) => {console.log(e)})
            fetcherGet('/followed/count', id).then((res) => {setFollowingCount(res?.data.count)}).catch((e) => {console.log(e)})
            fetcherGet('/user', id).then((res) => {setUser(res?.data)}).catch((e) => {console.log(e)})
            fetcherGet('/account/follows', id).then((res) => {console.log(res); setIsFollowed(res.data)}).catch((e) => {console.log(e)})
            fetcherGetPage('/posts', id, page).then((res) => {setPosts(res.data)})
        }
    },[router])

    return(
        <NavBar stage={3}>
            <MainHolder>
                <ProfilePic src={user?.avatarId} type={false} handleClick1={() => {
                    if(isFollowed!=undefined) switch(isFollowed){
                        case true: {
                            fetcherPost('/unfollow', user?.id).then(() => {setIsFollowed(false)}).catch((e) => {console.log(user?.id); console.log(e)});
                            break;
                        }
                        case false: {
                            fetcherPost('/follow', user?.id).then(() => {setIsFollowed(true)}).catch((e) => {console.log(user?.id); console.log(e)});
                            break;
                        }
                    }
                }} followingCount={followingCount} followersCount={followersCount} username={user?.username+""} followed={isFollowed}></ProfilePic>
                <IconButton icon={'Notifications'} handleClick={() => { }} style={{position: "absolute", top: '2rem', right: '2rem'}}></IconButton>
                <PostHolder onScroll={(e: any) => {
                    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                    if (bottom) {
                        if (posts.length % 9 != 0) return;
                        fetcherGetPage('/posts', user?.id, page + 1).then((res) => {
                            let arr = [];
                            arr = posts;
                            arr = arr.concat(res?.data);
                            setPosts(arr);
                            setPage(page + 1);
                        })
                    }
                }}>
                    <>
                        {
                            posts.map((post: Post, key: number) => {
                                return(
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
            ...(await serverSideTranslations(locale, ['account'])),
        },
    };
}


export default Account;