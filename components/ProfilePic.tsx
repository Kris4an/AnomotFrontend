import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import instance from "../axios_instance";
import Button from "./Button";

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
type Props = {
    type: boolean,
    handleClickProfile?: any
}



function ProfilePic({type,handleClickProfile}:Props){
    const [username, setUsername] = useState('');
    const fetcher = (url: any) => instance.get(url).then((res) => {console.log(res.data.username); setUsername(res.data.username)});
    const user = useSWR(fetcher("account/user"));
    return(
        <Holder>
            <Holder2>
                <Pic></Pic>
                <Info>
                    <UserNameText>{username}</UserNameText>
                    <FollowersMainContainer>
                        <FollowersContainer>
                            <FollowerNumberText>300</FollowerNumberText>
                            <FollowerText>следва</FollowerText>
                        </FollowersContainer>
                        <FollowersContainer>
                            <FollowerNumberText>300</FollowerNumberText>
                            <FollowerText>последователя</FollowerText>
                        </FollowersContainer>
                    </FollowersMainContainer>
                </Info>
            </Holder2>
            {{type}? <Button buttonType={"Secondary"} text={"Редактирай си профила"} style={{width: '30rem'}} handleClick={handleClickProfile}></Button>:<div></div>}
        </Holder>
    )
}



export default ProfilePic;