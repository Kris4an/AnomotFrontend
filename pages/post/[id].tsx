import { GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { EComment, EPost } from "../../components/Intefaces";
import Post from "../../components/Post";
import Comment from "../../components/Comment";
import CommentInput from "../../components/CommentInput";
import useUser from "../../components/useUser";
import instance from "../../axios_instance";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavBar from "../../components/NavBar";

const MainHolder = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    padding-top: 2rem;
    padding-left: 3rem;
    gap: 6rem;
    overflow-y: hidden;
    padding-bottom: 4rem;

    @media (max-width: 840px) {
        flex-direction: column;
        padding-left: 0px;
        gap: 0.5rem;
        align-items: center;
    }
`;
const CommentsHolder = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow-y: scroll;
    overflow-x: hidden;

    @media (max-width: 840px) {
        align-self: flex-start;
    }
`;

const PostPage: NextPage = () => {
    const router = useRouter();
    const { user: userData, isError: userDataError } = useUser();
    const [post, setPost] = useState<EPost>();
    //only for new user comments
    const [userComments, setUserComments] = useState<EComment[]>();
    const [comments, setComments] = useState<EComment[]>();
    const [page, setPage] = useState(0);
    const fetcherGet = (url: any, id: string) => instance.get(url, { params: { id: id } }).then((res) => res.data).catch((res) => res.error);
    const fetcherGetPage = (url: any, id: string, page: number) => instance.get(url, { params: { page: page, id: id } }).then((res) => res.data).catch((res) => res.error);
    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            fetcherGet('/post', id + "").then((res) => {
                setPost(res);
                fetcherGetPage('/post/comment', res.id, page).then((res) => { setComments(res); }).catch((e) => { console.log(e) })
            }).catch(() => { router.push('404') })
        }
    }, [router])
    return (
        <NavBar stage={1}>
            <MainHolder>
                {post !== undefined &&
                    <>
                        <Post post={post!}></Post>
                        <CommentsHolder onScroll={(e: any) => {
                            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                            if (bottom && comments !== undefined) {
                                if (comments.length % 10 != 0) return;
                                fetcherGetPage('/post/comment', post.id, page + 1).then((res: any) => {
                                    let arr = [];
                                    arr = comments;
                                    arr = arr.concat(res);
                                    setComments(arr);
                                    setPage(page + 1);
                                });
                            }
                        }}>
                            {
                                userComments != null && userComments !== undefined &&
                                userComments.map((comment: EComment, key: number) =>
                                    <Comment comment={comment} key={key} notFechedComment={true}></Comment>
                                )
                            }
                            {
                                comments != null && comments !== undefined &&
                                comments.map((comment: EComment) =>
                                    <Comment comment={comment} key={comment?.id}></Comment>
                                )
                            }
                        </CommentsHolder>
                        <CommentInput style={{ position: 'absolute', left: '0', bottom: '0' }} id={post?.id!} userComment={function (text: string, date: string): void {
                            const comment: EComment = {
                                text: text,
                                commenter: {
                                    username: userData.username,
                                    id: userData.id,
                                    avatarId: userData?.avatarId
                                },
                                isEdited: false,
                                responseCount: 0,
                                likes: 0,
                                hasUserLiked: false,
                                lastChangeDate: date,
                                id: ""
                            };
                            let arr = [];
                            arr.push(comment);
                            if (userComments != null && userComments !== undefined) {
                                arr = arr.concat(userComments);
                            }
                            setUserComments(arr);
                        }} typeP={"POST"} />
                    </>
                }
            </MainHolder>
        </NavBar>
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
            ...(await serverSideTranslations(locale, ['battle', 'common', "burgerMenu"])),
        },
    };
}
export default PostPage;