import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router, { Router } from "next/router";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import useSWR from "swr";
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

const Account:NextPage = () => {
    const fetcher = (url:any) => instance.get(url).then((res) => {console.log(res);res.data;}).catch((res) => {console.log('e'); res.error;});
    const { data: userData, error: userDataError } = useSWR('/account/user',fetcher);
    const [postSelection, setPostSelection] = useState(true);
    useEffect(() => {
        fetcher('/account/user').catch(()=>{console.log('e1');});
    },[])
    return(
        <NavBar stage={3}>
            <MainHolder>
                <UpperHolder>
                    <ProfilePic type={true} handleClick1={() => { router.push('/account/settings?s=1'); } } handleClick2={() => {router.push('/account/code')}}></ProfilePic>
                    <IconButtonHolder>
                        <IconButton icon={'Settings'} handleClick={() => { router.push('/account/settings?s=0') }} ></IconButton>
                        <IconButton icon={'Votes'} handleClick={() => { console.log('as') }} ></IconButton>
                        <IconButton icon={'Notifications'} handleClick={() => { console.log('as') }} ></IconButton>
                    </IconButtonHolder>
                </UpperHolder>
                <ButtonHolder>
                    <PostButton isSelected={postSelection} onClick={()=>{setPostSelection(true)}}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPathStroke isSelected={postSelection} d="M21.75 26.25L4.5 9V4.5H9L26.25 21.75M19.5 28.5L28.5 19.5M24 24L30 30M28.5 31.5L31.5 28.5M21.75 9.75L27 4.5H31.5V9L26.25 14.25M7.5 21L13.5 27M10.5 25.5L6 30M4.5 28.5L7.5 31.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </PostButton>
                    <PostButton isSelected={!postSelection} onClick={()=>{setPostSelection(false)}}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPathFill isSelected={!postSelection} d="M9.792 11.625C9.792 11.9234 9.67347 12.2095 9.46249 12.4205C9.25152 12.6315 8.96537 12.75 8.667 12.75C8.36863 12.75 8.08248 12.6315 7.8715 12.4205C7.66053 12.2095 7.542 11.9234 7.542 11.625C7.542 11.3266 7.66053 11.0405 7.8715 10.8295C8.08248 10.6185 8.36863 10.5 8.667 10.5C8.96537 10.5 9.25152 10.6185 9.46249 10.8295C9.67347 11.0405 9.792 11.3266 9.792 11.625ZM8.6715 22.5C8.37313 22.5 8.08698 22.6185 7.87601 22.8295C7.66503 23.0405 7.5465 23.3266 7.5465 23.625C7.5465 23.9234 7.66503 24.2095 7.87601 24.4205C8.08698 24.6315 8.37313 24.75 8.6715 24.75H16.1715C16.4699 24.75 16.756 24.6315 16.967 24.4205C17.178 24.2095 17.2965 23.9234 17.2965 23.625C17.2965 23.3266 17.178 23.0405 16.967 22.8295C16.756 22.6185 16.4699 22.5 16.1715 22.5H8.6715ZM7.5465 17.625C7.5465 17.3266 7.66503 17.0405 7.87601 16.8295C8.08698 16.6185 8.37313 16.5 8.6715 16.5H16.1715C16.3192 16.5 16.4655 16.5291 16.602 16.5856C16.7385 16.6422 16.8625 16.725 16.967 16.8295C17.0715 16.934 17.1543 17.058 17.2109 17.1945C17.2674 17.331 17.2965 17.4773 17.2965 17.625C17.2965 17.7727 17.2674 17.919 17.2109 18.0555C17.1543 18.192 17.0715 18.316 16.967 18.4205C16.8625 18.525 16.7385 18.6078 16.602 18.6644C16.4655 18.7209 16.3192 18.75 16.1715 18.75H8.6715C8.37313 18.75 8.08698 18.6315 7.87601 18.4205C7.66503 18.2095 7.5465 17.9234 7.5465 17.625ZM22.5 31.5C23.1853 31.4953 23.8481 31.2545 24.3765 30.8181C24.9049 30.3818 25.2668 29.7766 25.401 29.1045L26.121 25.5H30.375C31.0712 25.5 31.7389 25.2234 32.2312 24.7312C32.7234 24.2389 33 23.5712 33 22.875V13.8915C33 12.9949 32.645 12.1347 32.0125 11.4992C31.38 10.8636 30.5216 10.5044 29.625 10.5V10.494H21.75V7.875C21.75 6.97989 21.3944 6.12145 20.7615 5.48851C20.1285 4.85558 19.2701 4.5 18.375 4.5H6.375C5.47989 4.5 4.62145 4.85558 3.98851 5.48851C3.35558 6.12145 3 6.97989 3 7.875V26.625C3 27.9179 3.51361 29.1579 4.42785 30.0721C5.34209 30.9864 6.58207 31.5 7.875 31.5H22.5ZM5.25 7.875C5.25 7.57663 5.36853 7.29048 5.5795 7.0795C5.79048 6.86853 6.07663 6.75 6.375 6.75H18.375C18.6734 6.75 18.9595 6.86853 19.1705 7.0795C19.3815 7.29048 19.5 7.57663 19.5 7.875V28.521C19.5 28.7715 19.53 29.016 19.59 29.25H7.875C7.17881 29.25 6.51113 28.9734 6.01884 28.4812C5.52656 27.9889 5.25 27.3212 5.25 26.625V7.875ZM21.75 12.744H26.415C26.3592 12.9015 26.3151 13.063 26.283 13.227L23.1945 28.6635C23.1597 28.8416 23.0598 29.0003 22.9143 29.1087C22.7687 29.217 22.588 29.2672 22.4074 29.2494C22.2269 29.2315 22.0594 29.147 21.9378 29.0123C21.8163 28.8776 21.7493 28.7024 21.75 28.521V12.744ZM28.488 13.668C28.5423 13.3888 28.6988 13.1399 28.927 12.9701C29.1551 12.8003 29.4385 12.7218 29.7215 12.7499C30.0045 12.7781 30.2669 12.9109 30.4571 13.1223C30.6473 13.3338 30.7518 13.6086 30.75 13.893V22.875C30.75 22.9745 30.7105 23.0698 30.6402 23.1402C30.5698 23.2105 30.4745 23.25 30.375 23.25H26.5725L28.488 13.668Z" />
                        </svg>
                    </PostButton>
                </ButtonHolder>
            </MainHolder>
        </NavBar>
    )
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['account'])),
        },
    };
}

export default Account;