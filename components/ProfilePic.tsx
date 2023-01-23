import { useTranslation } from "next-i18next";
import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import instance from "../axios_instance";
import Button from "./Button";
import Image from "next/image";
import tempPic from "../public/tempPic.jpg";

const Holder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 3rem;
    margin-left: 3rem;
    align-items: flex-start;
    height: fit-content;
`;
const Holder2 = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    align-items: flex-start;
`;
const Pic = styled.div`
    position: relative;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 25px;
    aspect-ratio: 1;
    height: 8rem;
`;
const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
`;
const FollowersMainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 4rem;
`;
const FollowersContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;
const FollowerNumberText = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${props => props.theme.colors.primary};
`;
const FollowerText = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${props => props.theme.colors.inputPlaceholder};
`;
const UserNameText = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 35px;
    display: flex;
    align-items: flex-end;
    text-align: center;
    letter-spacing: 0.03em;
    color: ${props => props.theme.colors.buttonHover};
`;
const ButtonHolder = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
type Props = {
    type: boolean,
    handleClick1: any,
    handleClick2: any
}



function ProfilePic({type, handleClick1, handleClick2}:Props){
    switch (type) {
        case true: {
            const fetcher = (url: any) => instance.get(url).then((res) => res.data).catch((res) => res.error);
            const { data: userData, error: userDataError } = useSWR('/account/user', fetcher);
            const { data: followesCount, error: followesCountError } = useSWR('/account/followers/count', fetcher);
            const { data: followingCount, error: followingCountError } = useSWR('/account/followed/count', fetcher);
            const [t2] = useTranslation("account");
            return (
                <Holder>
                    <Holder2>
                        <Pic>
                            <Image src={tempPic} height={128} width={128} objectFit={'cover'} className={'profilePicBig'}></Image>
                        </Pic>
                        <Info>
                            <UserNameText>{userData?.username}</UserNameText>
                            <FollowersMainContainer>
                                <FollowersContainer>
                                    <FollowerNumberText>{followingCount?.count}</FollowerNumberText>
                                    <FollowerText>{t2("following")}</FollowerText>
                                </FollowersContainer>
                                <FollowersContainer>
                                    <FollowerNumberText>{followesCount?.count}</FollowerNumberText>
                                    <FollowerText>{t2("followers")}</FollowerText>
                                </FollowersContainer>
                            </FollowersMainContainer>
                        </Info>
                    </Holder2>
                    <ButtonHolder>
                        <Button buttonType={"Solid"} text={t2("customizeProfile")} style={{ width: '30rem' }} handleClick={handleClick1}></Button>
                        <Button buttonType={"Secondary"} text={t2("generateCode")} style={{ width: '20rem' }} handleClick={handleClick2}></Button>
                    </ButtonHolder>
                    
                </Holder>
            )
        }
        case false: {
            const fetcher = (url: any) => instance.get(url).then((res) => res.data).catch((res) => res.error);
            const { data: userData, error: userDataError } = useSWR('/account/user', fetcher);
            const { data: followesCount, error: followesCountError } = useSWR('/account/followers/count', fetcher);
            const { data: followingCount, error: followingCountError } = useSWR('/account/followed/count', fetcher);
            const [t2] = useTranslation("account");
            return (
                <Holder style={{width: 'auto'}}>
                    <Holder2>
                        <Pic>
                            <Image src={tempPic} height={128} width={128} objectFit={'cover'} className={'profilePicBig'}></Image>
                        </Pic>
                        <Info>
                            <UserNameText>{userData?.username}</UserNameText>
                            <FollowersMainContainer>
                                <FollowersContainer>
                                    <FollowerNumberText>{followingCount?.count}</FollowerNumberText>
                                    <FollowerText>{t2("following")}</FollowerText>
                                </FollowersContainer>
                                <FollowersContainer>
                                    <FollowerNumberText>{followesCount?.count}</FollowerNumberText>
                                    <FollowerText>{t2("followers")}</FollowerText>
                                </FollowersContainer>
                            </FollowersMainContainer>
                        </Info>
                    </Holder2>
                    <ButtonHolder>
                        <Button buttonType={"Solid"} text={t2("follow")} style={{ width: '30rem' }} handleClick={handleClick1}></Button>
                        <Button buttonType={"Secondary"} text={t2("message")} style={{ width: '20rem' }} handleClick={handleClick2}></Button>
                    </ButtonHolder>
                    
                </Holder>
            )
        }
        
    }
    
}



export default ProfilePic;