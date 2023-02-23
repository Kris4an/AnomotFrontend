import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../axios_instance";
import { EPost } from "../components/Intefaces";
import NavBar from "../components/NavBar";
import Post from "../components/Post";

const PostHolder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    overflow-y: scroll;
    margin-top: 3rem;
`;
const Title = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 40px;
    line-height: 42px;
    display: flex;
    align-items: flex-end;
    text-indent: 14px;
    color: ${props => props.theme.colors.inputPlaceholder};
`;

const Feed: NextPage = () => {
    const fetcherGetPage = (url: string, page: number) => instance.get(url, { params: { page: page } });
    const [posts, setPosts] = useState<EPost[]>([]);
    const [noDubPosts, setNoDubPosts] = useState<EPost[]>([]);
    const [page, setPage] = useState(0);
    const [t2] = useTranslation("feed");
    useEffect(() => {
        fetcherGetPage('/feed', page).then((res) => {
            setPosts(res.data);
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
    }, [])
    return (
        <NavBar stage={1}>
            <PostHolder onScroll={(e: any) => {
                const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                if (bottom) {
                    if (posts.length % 8 != 0) return;
                    fetcherGetPage('/feed', page + 1).then((res) => {
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
                {
                    (posts.length!=0 && (Array.isArray(posts)) && noDubPosts!=undefined && (Array.isArray(noDubPosts)))?
                    noDubPosts.filter(post => post != undefined).map((post: EPost, key: number) => {
                        return (
                            <Post post={post} key={key}></Post>
                        )
                    })
                    :
                    <Title>{t2("noPosts")}</Title>
                }
            </PostHolder>
        </NavBar>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["burgerMenu", "feed"])),
        },
    };
}

export default Feed;