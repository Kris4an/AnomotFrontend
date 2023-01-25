import { GetStaticPaths, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../axios_instance";
import IconButton from "../../components/IconButton";
import NavBar from "../../components/NavBar";
import ProfilePic from "../../components/ProfilePic";

const MainHolder = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Account:NextPage = () => {
    const fetcherGetFollwersCount = (url: string, id: any) => instance.get(url, { params: { id: id } });
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const router = useRouter();
    useEffect(() => {
        if(router.isReady){
            const {id} = router.query
        fetcherGetFollwersCount('/followers/count', id).then((res) => {setFollowersCount(res?.data.count)}).catch((e) => {console.log(e)})
        fetcherGetFollwersCount('/followed/count', id).then((res) => {setFollowingCount(res?.data.count)}).catch((e) => {console.log(e)})
    }
    },[])

    return(
        <NavBar stage={3}>
            <MainHolder>
                <ProfilePic src={""} type={false} handleClick1={undefined} handleClick2={undefined} followingCount={followingCount} followersCount={followersCount} username={"gosho"} ></ProfilePic>
                <IconButton icon={'Notifications'} handleClick={() => { }} style={{position: "absolute", top: '2rem', right: '2rem'}}></IconButton>
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