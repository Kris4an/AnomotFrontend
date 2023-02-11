import { NextPage } from "next";
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

const Feed: NextPage = () => {
    const fetcherGetPage = (url: string, page: number) => instance.get(url, { params: { page: page } });
    const [posts, setPosts] = useState<EPost[]>([]);
    const [page, setPage] = useState(0);
    useEffect(() => {
        fetcherGetPage('/feed', page).then((res) => { setPosts(res.data); console.log(res.data) })
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
                        setPage(page + 1);
                    })
                }
            }}>
                {
                    (Array.isArray(posts)) &&
                    posts.map((post: EPost, key: number) => {
                        return (
                            <Post post={post} key={key}></Post>
                        )
                    })
                }
            </PostHolder>
        </NavBar>
    )
}

export default Feed;