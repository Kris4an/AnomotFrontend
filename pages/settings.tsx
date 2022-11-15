import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router, { Router } from "next/router";
import React, { useEffect } from "react";
import { HtmlHTMLAttributes, useState } from "react";
import styled, { keyframes } from "styled-components";
import useSWR from "swr";
import instance from "../axios_instance";
import Button from "../components/Button";
import CreatePassword from "../components/CreatePassword";
import LoginInput from "../components/LoginInput";
import NavBar from "../components/NavBar";

const MainHolder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
`;
const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    width: 96%;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.secondary};
    border-bottom: 1px solid ${props => props.theme.colors.inputPlaceholder};
    padding: 20px 10px;
    text-align: center;
`;
const MenuContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
`;
const Options = styled.div`
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
`;
const Others = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    padding-bottom: 2rem;
`;
const Version = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${props => props.theme.colors.text};
`;
const MiniHolder = styled.div`
    width: 100%;
    display: flex;
    align-content: center;
    align-items: center; 
    gap: 5px;
`;
const OptionButton = styled.button`
    cursor: pointer;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    border: none;
    background: transparent;
    color: ${props => props.theme.colors.secondary};
    padding: 0px;

    &:hover{
        text-decoration-line: underline;
        text-decoration-color: ${props => props.theme.colors.secondary};
    }
`;
const StyledPath = styled.path`
    fill: ${props => props.theme.colors.text};
    stroke: ${props => props.theme.colors.text};
`;
const ChooseLanguage = styled.select`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    border: none;
    background: transparent;
    color: ${props => props.theme.colors.secondary};

    &:hover{
        text-decoration-line: underline;
        text-decoration-color: ${props => props.theme.colors.secondary};
    }
`;
const AnotherHolder = styled.div`
    width: 100%;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    border: none;
    background: transparent;
    color: ${props => props.theme.colors.secondary};
    display: flex;
    //gap: 1rem;
    justify-content: space-between;
`;

const Settings:NextPage = () => {
    
    return(
        <NavBar stage={3}>
            <Content></Content>
        </NavBar>
    )
}

const Switch = styled.label`
        position: relative;
        display: inline-block;
        width: 3rem;
        height: 1.55rem;
    `;
    const Slider = styled.span`
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 1.5rem;

        &:before {
            position: absolute;
            content: "";
            height: 1.3rem;
            width: 1.3rem;
            left: 2px;
            bottom: 2px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 50%;
        }
    `;
    const SwitchInput = styled.input`
        opacity: 0;
        width: 0;   
        height: 0;

        &:checked + ${Slider} {
            background-color: #2196F3;
        }
        &:focus + ${Slider} {
            box-shadow: 0 0 1px #2196F3;
        }
        &:checked + ${Slider}:before {
            -webkit-transform: translateX(1.45rem);
            -ms-transform: translateX(1.45rem);
            transform: translateX(1.45rem);
        }
    `;

    interface PSHolderSettings {
        isLast: boolean;
    }
    const ProfileSettingsHolder = styled.div<PSHolderSettings>`
        width: 100%;
        display: flex;
        flex-direction: column;
        //align-items: flex-start;
        padding: 0px 20px 30px;
        gap: 0.8rem;
        border-bottom: ${(props) => (props.isLast? 'none':'1px solid' )};
        border-color: ${props => props.theme.colors.inputPlaceholder};
    `;
    const ProfileSettingsHeading = styled.p`
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px; 
        ${props => props.theme.colors.text};
    `;
    const ProfileSettingsMainHolder = styled.div`
        width: 40rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        //overflow-y: scroll;
    `;
    const ProfileSettingsText = styled.span`
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 1rem;
        ${props => props.theme.colors.text};
    `
    const YetAnotherHolder = styled.div`
        display: flex;
        height: 100%;
        justify-content: center;
        flex-direction: column;
    `;
    const IDKHolder = styled.div`
        overflow-y: scroll;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    `

const fetcherGetUser = (url: any) => instance.get(url).then((res)=>{console.log(res.data)}).catch(() => {router.push('/login')})
const fecherChangeUsername = (url: any, username: string) => instance.put(url, {
    "username": username
})

function Content(){  
    const [t1] = useTranslation("common");
    const [t2] = useTranslation("settings");
    const [darkTheme, setDarkTheme] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const user = useSWR(fetcherGetUser("account/user"));
    useEffect(() => {
        let s = window.location.search;
        if(s.length > 1){
            s=s.substring(1);
            if(Number(s) != NaN) setStage(Number(s));
        } 
        console.log(Number(s));
            console.log(s);
    },[]);

    const [stage, setStage] = useState(0);
    switch(stage){
        case 0: return(
            <MainHolder>
                <Title>{t1("settings")}</Title>
                <MenuContent>
                    <Options>
                        <MiniHolder>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M18 31.5C13.6742 31.5 9.82122 29.4616 7.34996 26.2937L7.63583 26.6381C10.527 30.121 14.5776 31.5 18 31.5ZM18 31.5C22.3258 31.5 26.1788 29.4616 28.6501 26.2937L28.3642 26.6381C25.473 30.121 21.4224 31.5 18 31.5ZM7.86409 24.4999L6.7119 25.4039C5.3137 23.2775 4.5 20.7331 4.5 18C4.5 10.5484 10.5484 4.5 18 4.5C25.4516 4.5 31.5 10.5484 31.5 18C31.5 20.7331 30.6863 23.2775 29.2881 25.4039L28.1359 24.4999C25.2789 22.2583 21.7605 21.0278 18.1317 20.9987C21.7946 20.9284 24.75 17.9294 24.75 14.25C24.75 10.5266 21.7234 7.5 18 7.5C14.2766 7.5 11.25 10.5266 11.25 14.25C11.25 17.9294 14.2054 20.9284 17.8683 20.9987C14.2395 21.0278 10.7211 22.2583 7.86409 24.4999Z" stroke="#1D2440" strokeWidth="3" />
                            </svg>
                            <OptionButton onClick={() => {setStage(1)}}>{t2("profile")}</OptionButton>
                        </MiniHolder>
                        <MiniHolder>
                            <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M19.475 23.505C19.685 22.965 19.55 22.35 19.13 21.93L15.995 18.84L16.04 18.795C18.5812 15.9707 20.4798 12.6289 21.605 9H24.515C25.325 9 26 8.325 26 7.515V7.485C26 6.675 25.325 6 24.515 6H15.5V4.5C15.5 3.675 14.825 3 14 3C13.175 3 12.5 3.675 12.5 4.5V6H3.485C2.675 6 2 6.675 2 7.485C2 8.31 2.675 8.97 3.485 8.97H18.755C17.726 11.9466 16.109 14.6859 14 17.025C12.785 15.69 11.765 14.235 10.91 12.705C10.7972 12.4925 10.6287 12.3146 10.4226 12.1905C10.2166 12.0663 9.9806 12.0005 9.74 12C8.705 12 8.045 13.125 8.555 14.025C9.5 15.72 10.655 17.34 12.005 18.84L5.45 25.305C5.30757 25.4434 5.19435 25.609 5.11704 25.7919C5.03973 25.9748 4.99989 26.1714 4.99989 26.37C4.99989 26.5686 5.03973 26.7652 5.11704 26.9481C5.19435 27.131 5.30757 27.2966 5.45 27.435C6.035 28.02 6.98 28.02 7.58 27.435L14 21L17.03 24.03C17.795 24.795 19.1 24.51 19.475 23.505ZM26.75 15C25.85 15 25.04 15.555 24.725 16.41L19.22 31.11C18.86 32.025 19.55 33 20.525 33C21.11 33 21.635 32.64 21.845 32.085L23.18 28.5H30.305L31.655 32.085C31.865 32.625 32.39 33 32.975 33C33.95 33 34.64 32.025 34.295 31.11L28.79 16.41C28.46 15.555 27.65 15 26.75 15ZM24.32 25.5L26.75 19.005L29.18 25.5H24.32Z" fill="black" />
                            </svg>
                                <ChooseLanguage onChange={(event: any) => {
                                    switch(event.target.value){
                                        case 'bg': {
                                            router.push('http://localhost:3000/bg/settings');
                                        break;
                                        }
                                        case 'en': {
                                            router.push('http://localhost:3000/en/settings');
                                        break;
                                        }
                                        default: {
                                            router.push('http://localhost:3000/en/settings');
                                            break;
                                        }
                                    }
                                }}>
                                    <option value='bg'>Български</option>
                                    <option value='en'>English</option>
                                </ChooseLanguage>
                        </MiniHolder>
                        <MiniHolder>
                            <svg width="37" height="36" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{padding: '5px 4px'}}>
                                <StyledPath d="M13.5 0.5C9.91958 0.5 6.4858 1.92232 3.95406 4.45406C1.42232 6.9858 0 10.4196 0 14C0 17.5804 1.42232 21.0142 3.95406 23.5459C6.4858 26.0777 9.91958 27.5 13.5 27.5C14.745 27.5 15.75 26.495 15.75 25.25C15.75 24.665 15.525 24.14 15.165 23.735C14.82 23.345 14.595 22.82 14.595 22.25C14.595 21.005 15.6 20 16.845 20H19.5C23.64 20 27 16.64 27 12.5C27 5.87 20.955 0.5 13.5 0.5ZM5.25 14C4.005 14 3 12.995 3 11.75C3 10.505 4.005 9.5 5.25 9.5C6.495 9.5 7.5 10.505 7.5 11.75C7.5 12.995 6.495 14 5.25 14ZM9.75 8C8.505 8 7.5 6.995 7.5 5.75C7.5 4.505 8.505 3.5 9.75 3.5C10.995 3.5 12 4.505 12 5.75C12 6.995 10.995 8 9.75 8ZM17.25 8C16.005 8 15 6.995 15 5.75C15 4.505 16.005 3.5 17.25 3.5C18.495 3.5 19.5 4.505 19.5 5.75C19.5 6.995 18.495 8 17.25 8ZM21.75 14C20.505 14 19.5 12.995 19.5 11.75C19.5 10.505 20.505 9.5 21.75 9.5C22.995 9.5 24 10.505 24 11.75C24 12.995 22.995 14 21.75 14Z" fill="black" />
                            </svg>
                            <AnotherHolder>
                                {t2("theme")}
                                
                                <Switch>
                                    <SwitchInput type="checkbox"/>
                                    <Slider></Slider>
                                </Switch>
                            </AnotherHolder>
                            
                        </MiniHolder>
                        <MiniHolder>
                            <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M18.5 1.5L5 7.5V16.5C5 24.825 10.76 32.61 18.5 34.5C26.24 32.61 32 24.825 32 16.5V7.5L18.5 1.5ZM18.5 17.985H29C28.205 24.165 24.08 29.67 18.5 31.395V18H8V9.45L18.5 4.785V17.985Z" fill="black" />
                            </svg>

                            <OptionButton onClick={() => { }}>{t2("security")}</OptionButton>
                        </MiniHolder>
                        <MiniHolder>
                            <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M25.385 13.5H23V6C23 5.175 22.325 4.5 21.5 4.5H15.5C14.675 4.5 14 5.175 14 6V13.5H11.615C10.28 13.5 9.605 15.12 10.55 16.065L17.435 22.95C18.02 23.535 18.965 23.535 19.55 22.95L26.435 16.065C27.38 15.12 26.72 13.5 25.385 13.5ZM8 28.5C8 29.325 8.675 30 9.5 30H27.5C28.325 30 29 29.325 29 28.5C29 27.675 28.325 27 27.5 27H9.5C8.675 27 8 27.675 8 28.5Z" fill="black" />
                            </svg>
                            <OptionButton onClick={() => { }}>{t2("downloadInfo")}</OptionButton>
                        </MiniHolder>
                    </Options>
                    <Others>
                        <Button buttonType={"Teriatary"} text={t2("terms")} handleClick={() => {}} style={{width: 'fit-content', padding: '0px', height: 'fit-content'}}></Button>
                        <Button buttonType={"Teriatary"} text={t2("policy")} handleClick={() => {}} style={{width: 'fit-content', padding: '0px', height: 'fit-content'}}></Button>
                        <Button buttonType={"Teriatary"} text={t2("openSource")} handleClick={() => {}} style={{width: 'fit-content', padding: '0px', height: 'fit-content'}}></Button>
                        <Version>{t2("version")} 0.0.0</Version>
                    </Others>
                </MenuContent>
            </MainHolder>
        )
        case 1: return(
            <MainHolder>
                <Title>{t2("profile")}</Title>
                <IDKHolder>
                    <ProfileSettingsMainHolder>
                        <ProfileSettingsHolder isLast={false}>
                            <ProfileSettingsHeading>{t2("username")}</ProfileSettingsHeading>
                            <LoginInput inputType={"Text"} placeHolder={t2("newUsername")} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewUsername(event.currentTarget.value) }}></LoginInput>
                            <Button buttonType={"Solid"} text={t1("save")} handleClick={() => { fecherChangeUsername("/account/username", newUsername) }}></Button>
                        </ProfileSettingsHolder>
                        <ProfileSettingsHolder isLast={false}>
                            <ProfileSettingsHeading>{t1("email")}</ProfileSettingsHeading>
                            <LoginInput inputType={"Email"} placeHolder={t2("newEmail")} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }}></LoginInput>
                            <LoginInput inputType={"Password"} placeHolder={t1("password")} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }} passwordStyle={{ height: '3.5rem' }}></LoginInput>
                            <Button buttonType={"Solid"} text={t1("save")} handleClick={() => { }}></Button>
                        </ProfileSettingsHolder>
                        <ProfileSettingsHolder isLast={true}>
                            <ProfileSettingsHeading>{t1("password")}</ProfileSettingsHeading>
                            <ProfileSettingsText>{t2("changePasswordText")}</ProfileSettingsText>
                            <LoginInput inputType={"Password"} placeHolder={t1("password")} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }} passwordStyle={{ height: '3.5rem' }}></LoginInput>
                            <Button buttonType={"Solid"} text={t1("continue")} handleClick={() => { setStage(2) }}></Button>
                        </ProfileSettingsHolder>
                    </ProfileSettingsMainHolder>
                </IDKHolder>
            </MainHolder>
        )
        case 2: return(
            <MainHolder style={{height: '100%'}}>
                <Title>{t2("profile")}</Title>
                <YetAnotherHolder>
                    <CreatePassword handleButtonPasword={() => {}} updatePassword={() => {}} title={t2("changePassword")} buttonText={t1("save")}></CreatePassword>
                </YetAnotherHolder>
            </MainHolder>
        )
    }
    return <div></div>;
}

export async function getStaticProps({ locale }:any) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'settings', 'create'])),
      },
    };
  }

export default Settings;