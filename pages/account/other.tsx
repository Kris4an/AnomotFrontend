import { NextPage } from "next";
import styled from "styled-components";
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

    return(
        <NavBar stage={3}>
            <MainHolder>
                <ProfilePic type={false} handleClick1={undefined} handleClick2={undefined}></ProfilePic>
                <IconButton icon={'Notifications'} handleClick={() => { console.log('as') }} style={{position: "absolute", top: '2rem', right: '2rem'}}></IconButton>
            </MainHolder>
        </NavBar>
    )
}


export default Account;