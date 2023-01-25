import { NextPage } from "next";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import Battle from "../components/Battle";
import instance from "../axios_instance";
import { useEffect, useState } from "react";

const MainHolder = styled.div`
    width: 100%;
    height: 100vh;
    //display: flex;
    //flex-direction: column;
    //gap: 1rem;
    //align-items: center;
    overflow-y: scroll;
`;

interface MediaPost{
    id: string,
    type: string
}
interface NonSelfUser{
    username: string,
    id: string,
    avatarId?: string
}
interface Post {
    id: string,
    type: string,
    text?: string,
    media?: MediaPost,
    user: NonSelfUser
}

const Battles:NextPage = () => { 
    const fetcher = (url: any, page: number) => instance.get(url, { params: { page: page } }).then((res) => res.data).catch((res) => res.error);
    const [goldPost, setGoldPost] = useState<Post>();
    const [redPost, setRedPost] = useState<Post>();
    useEffect(() => {
        fetcher('/battle', 0).then((res) => {
            setGoldPost(res.data.goldPost);
            setRedPost(res.data.redPost);
        }).catch((e) => {console});
    },[])
    return(
        <NavBar stage={0} >
            <MainHolder>
                <Battle goldPost={goldPost} redPost={redPost}></Battle>
            </MainHolder>
        </NavBar>
    )
}

export default Battles;