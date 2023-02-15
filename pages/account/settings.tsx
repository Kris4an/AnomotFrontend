import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import router, { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useSWR from "swr";
import instance from "../../axios_instance";
import Button from "../../components/Button";
import CreatePassword from "../../components/CreatePassword";
import LoginInput from "../../components/LoginInput";
import MessageScreen from "../../components/MessageScreen";
import NavBar from "../../components/NavBar";
import { QRCodeSVG } from 'qrcode.react';
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'
import useUser from "../../components/useUser";

const MainHolder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    @media (max-width: 800px) {
        width: 100vw;
        //height: 100vh;
        //min-height: fit-content;
    }
`;
interface TitleProps {
    mediaMarginTop?: string
}
const Title = styled.div<TitleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
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

    @media (max-width: 800px) {
        padding: 15px 7px;
        margin-top: ${props => props.mediaMarginTop};
    }
`;
const MenuContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    
    @media (max-width: 800px) {
       
    }
`;
const Options = styled.div`
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    @media (max-width: 800px) {
        gap: 1.5rem;
    }
`;
const Others = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    padding-bottom: 2rem;

    @media (max-width: 800px) {
        gap: 1rem;
    }
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

const Settings: NextPage = () => {

    return (
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
    //align-items: center;
    padding: 0px 20px 30px;
    gap: 0.8rem;
    border-bottom: ${(props) => (props.isLast ? 'none' : '1px solid')};
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

    @media (max-width: 800px) {
        width: 95vw;
        height: fit-content;
    }
`;
const ProfileSettingsText = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 1rem;
    ${props => props.theme.colors.text};
`;
const YetAnotherHolder = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    flex-direction: column;
`;
const ScrollHolder = styled.div`
    overflow-y: auto;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (max-width: 800px) {
        width: 100vw;
        //height: fit-content;
    }
`;
const CriticalButton = styled.button`
    width: 100%;
    height: 3rem;
    padding: 10px 20px;
    gap: 10px;
    background: red;
    color: ${props => props.theme.colors.textInverted};
    border: none;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    text-align: center;
    cursor: pointer;
    transition: background ease-in-out 300ms;
    font-family: 'Roboto';


    &:hover{
        background: darkred;
    }
    &:active {
        background: #5e0000
    }
    &:disabled{
        background: #835656;
    }
`;
const ErrorMessage = styled.span`
  color: #F10000;
  font-size: 14px;
  align-self: flex-start;
  font-family: 'Roboto';
`;
const TotpHolder = styled.div`
    width: 96%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
interface TextProps {
    fontSize: string,
    mediaFontSize?: string
}
const TotpText = styled.span<TextProps>`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: ${props => props.fontSize};
    line-height: 37px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${props => props.theme.colors.text};

    @media (max-width: 800px) {
        font-size: ${props => props.mediaFontSize};
    }
`;
const TotpMiniHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 40rem;
    gap: 1rem;
`;
const slideInFromBottom = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-50%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
`;
const RecoveryCodesGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    max-width: 100%;
    border: 1px solid ${props => props.theme.colors.inputPlaceholder};
    padding: 10px;
    animation: 1s ease-out 0s 1 ${slideInFromBottom};

    @media (max-width: 800px) {
        grid-template-columns: auto auto;
    }
`;
const SecurityMainHolder = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    align-items: center;
    gap: 4rem;

    @media (max-width: 800px) {
        gap: 3rem;
        width: 100vw;
    }
`;
const SecurityTextHolder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const SecurityMiniHolder = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 3rem;

    @media (max-width: 800px) {
        gap: 2rem;
        width: fit-content;
        justify-content: space-between;
        max-width: 95vw;
    }
`;
const SecurityText = styled.span<TextProps>`
    color: ${props => props.theme.colors.secondary};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: ${props => props.fontSize};
    line-height: ${props => props.fontSize};
    text-align: center;
`


const UploadFileButtonText = styled.span`
    font-size: 20px;
    font-family: 'Roboto';
    color: ${props => props.theme.colors.secondary};
`;
const CustomUpload = styled.label`
    align-self: center;
    width: 3rem;
    //height: fit-content;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    //gap: 1rem;
    align-items: center;
    cursor: pointer;

    &:hover ${UploadFileButtonText}{
        text-decoration: underline;
    }
`;
const StyledPath1 = styled.path`
    fill: ${props => props.theme.colors.primary};
`

function Content() {
    const router = useRouter();
    const { user: userData, isError: userDataError } = useUser();
    const [t1] = useTranslation("common");
    const [t2] = useTranslation("settings");
    const [t3] = useTranslation("create");
    const [newUsername, setNewUsername] = useState('');
    const [message, setMessage] = useState(0);
    const [messageS, setMessageS] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newEmailPassword, setNewEmailPassword] = useState('');
    const [newEmailSuccess, setNewEmailSuccess] = useState(true);
    const [changePasswordP, setChangePasswordP] = useState('');
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [stage, setStage] = useState(0);
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>();
    const [deleteAccPassword, setDeleteAccPassword] = useState('');
    const { t, i18n } = useTranslation();
    const [resendP, setResendP] = useState("");
    const [resendS, setResendS] = useState(true);
    interface TotpRes {
        "secret": string,
        "uri": string
    }
    const [totpRes, setTotpRes] = useState<TotpRes>()
    const [pastLogins, setPastLogins] = useState([]);
    const [loginsPage, setLoginsPage] = useState(0);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState<string>();
    const [fileState, setFileState] = useState<File>();
    const [crop, setCrop] = useState<Crop>({
        unit: 'px', // Can be 'px' or '%'
        x: 0,
        y: 0,
        width: 225,
        height: 225
    })
    const imgRef = useRef<any>()

    useEffect(() => {
        changeStageOnRouterQuery();
    }, [router.query.s]);
    

    useEffect(() => {
        setNewEmailSuccess(true);
        setChangePasswordSuccess(true);
    }, [newEmailPassword, changePasswordP]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    
    const changeStageOnRouterQuery = () => {
        let s = window.location.search;
        if (s.length > 1) {
            s = s.substring(3);
            if (s == '1' || s == '0' || s == '5') {
                if (Number(s) != stage) {
                    setStage(Number(s));
                    if (s == '5') {
                        fetcherGetLogins(0).then((res: any) => {
                            setPastLogins(res?.data);
                        })
                    }
                }
            }
            else {
                if (s != "0") setStageUrl(0);
                else setStage(0);
            }
            return;
        }
        setStageUrl(0);
    }

    const setStageUrl = (newStage: number) => {
        if (stage == 1 || stage == 0) {
            router.push('/account/settings?s=' + String(newStage), undefined, { shallow: true });
        }
        else setStage(newStage);
    }

    const fetcherGetLogins = (page: number) => instance.get('/account/security/logins', { params: { page: page } });
    const fecherChangeUsername = (url: any, username: string) => instance.put(url, {
        "username": username
    })
    const fecherChangeEmail = (url: any, newEmail: string, password: string) => instance.put(url, {
        "newEmail": newEmail,
        "password": password
    })
    const fetcherPost = (url: string) => instance.post(url);
    const fetcherMfa = (url: any, isMfaEnabled: boolean) => instance.put(url, {
        "isMfaEnabled": isMfaEnabled
    });
    const fetcherGetMfaStatus = (password: string, email: any) => instance.post('/account/mfa/status', {
        'email': email,
        'password': password
    });
    const fetcherChangePassword = (oldPassword: string, newPassword: string) => instance.put("/account/password", {
        "oldPassword": oldPassword,
        "newPassword": newPassword
    })
    const fetcherRecoveryCodes = () => instance.put('/account/mfa/recovery/codes');
    const fetcherDeleteRecoveryCodes = () => instance.delete('/account/mfa/recovery/codes');
    const fetcherDeleteAccount = (password: string) => instance.delete('/account', {
        data: {
            'password': password
        }
    });
    const uploadFileFetcher = (url: string, formData: any, left: number, top: number, cropSize: number) => instance.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        params: {
            left: Math.floor(left),
            top: Math.floor(top),
            cropSize: Math.floor(cropSize)
        }
    }).then((res: any) => { console.log(res) }).catch((e: any) => { console.log(e) });

    switch (stage) {
        case 0: return (
            <MainHolder>
                <Title>{t1("settings")}</Title>
                <MenuContent>
                    <Options>
                        <MiniHolder>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M18 31.5C13.6742 31.5 9.82122 29.4616 7.34996 26.2937L7.63583 26.6381C10.527 30.121 14.5776 31.5 18 31.5ZM18 31.5C22.3258 31.5 26.1788 29.4616 28.6501 26.2937L28.3642 26.6381C25.473 30.121 21.4224 31.5 18 31.5ZM7.86409 24.4999L6.7119 25.4039C5.3137 23.2775 4.5 20.7331 4.5 18C4.5 10.5484 10.5484 4.5 18 4.5C25.4516 4.5 31.5 10.5484 31.5 18C31.5 20.7331 30.6863 23.2775 29.2881 25.4039L28.1359 24.4999C25.2789 22.2583 21.7605 21.0278 18.1317 20.9987C21.7946 20.9284 24.75 17.9294 24.75 14.25C24.75 10.5266 21.7234 7.5 18 7.5C14.2766 7.5 11.25 10.5266 11.25 14.25C11.25 17.9294 14.2054 20.9284 17.8683 20.9987C14.2395 21.0278 10.7211 22.2583 7.86409 24.4999Z" stroke="#1D2440" strokeWidth="3" />
                            </svg>
                            <OptionButton onClick={() => { setStageUrl(1) }}>{t2("profile")}</OptionButton>
                        </MiniHolder>
                        <MiniHolder>
                            <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M19.475 23.505C19.685 22.965 19.55 22.35 19.13 21.93L15.995 18.84L16.04 18.795C18.5812 15.9707 20.4798 12.6289 21.605 9H24.515C25.325 9 26 8.325 26 7.515V7.485C26 6.675 25.325 6 24.515 6H15.5V4.5C15.5 3.675 14.825 3 14 3C13.175 3 12.5 3.675 12.5 4.5V6H3.485C2.675 6 2 6.675 2 7.485C2 8.31 2.675 8.97 3.485 8.97H18.755C17.726 11.9466 16.109 14.6859 14 17.025C12.785 15.69 11.765 14.235 10.91 12.705C10.7972 12.4925 10.6287 12.3146 10.4226 12.1905C10.2166 12.0663 9.9806 12.0005 9.74 12C8.705 12 8.045 13.125 8.555 14.025C9.5 15.72 10.655 17.34 12.005 18.84L5.45 25.305C5.30757 25.4434 5.19435 25.609 5.11704 25.7919C5.03973 25.9748 4.99989 26.1714 4.99989 26.37C4.99989 26.5686 5.03973 26.7652 5.11704 26.9481C5.19435 27.131 5.30757 27.2966 5.45 27.435C6.035 28.02 6.98 28.02 7.58 27.435L14 21L17.03 24.03C17.795 24.795 19.1 24.51 19.475 23.505ZM26.75 15C25.85 15 25.04 15.555 24.725 16.41L19.22 31.11C18.86 32.025 19.55 33 20.525 33C21.11 33 21.635 32.64 21.845 32.085L23.18 28.5H30.305L31.655 32.085C31.865 32.625 32.39 33 32.975 33C33.95 33 34.64 32.025 34.295 31.11L28.79 16.41C28.46 15.555 27.65 15 26.75 15ZM24.32 25.5L26.75 19.005L29.18 25.5H24.32Z" fill="black" />
                            </svg>
                            <ChooseLanguage defaultValue={i18n.language} onChange={(event: any) => {
                                switch (event.target.value) {
                                    case 'bg': {
                                        router.push('/account/settings', '/account/settings', { locale: 'bg' });
                                        break;
                                    }
                                    case 'en': {
                                        router.push('/account/settings', '/account/settings', { locale: 'en' });
                                        break;
                                    }
                                    default: {
                                        router.push('/account/settings', '/account/settings', { locale: 'en' });
                                        break;
                                    }
                                }
                            }}>
                                <option value='bg'>Български</option>
                                <option value='en'>English</option>
                            </ChooseLanguage>
                        </MiniHolder>
                        <MiniHolder>
                            <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M18.5 1.5L5 7.5V16.5C5 24.825 10.76 32.61 18.5 34.5C26.24 32.61 32 24.825 32 16.5V7.5L18.5 1.5ZM18.5 17.985H29C28.205 24.165 24.08 29.67 18.5 31.395V18H8V9.45L18.5 4.785V17.985Z" />
                            </svg>

                            <OptionButton onClick={() => {
                                fetcherGetLogins(0).then((res: any) => {
                                    setPastLogins(res?.data);
                                    setStage(5);
                                })
                            }}>{t2("security")}</OptionButton>
                        </MiniHolder>
                        <MiniHolder>
                            <svg xmlns="http://www.w3.org/2000/svg" height="36" width="36">
                                <StyledPath style={{scale: '130%'}} d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19v-4h2v4h14V5H5v4H3V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm5.5-4-1.4-1.45L11.65 13H3v-2h8.65L9.1 8.45 10.5 7l5 5Z" />
                            </svg>
                            <OptionButton onClick={() => { instance.post('/account/logout/all').then(() => {alert(t2("successLogOut"))}) }}>{t2("logOutSession")}</OptionButton>
                        </MiniHolder>
                        <MiniHolder>
                            <svg xmlns="http://www.w3.org/2000/svg" height="37" width="36" style={{ padding: '2px 4px' }}>
                                <StyledPath style={{ scale: '130%' }} d="M15.325 16.275q-.275-.325-.275-.738 0-.412.275-.687l1.85-1.85H10q-.425 0-.712-.288Q9 12.425 9 12t.288-.713Q9.575 11 10 11h7.175l-1.85-1.85q-.3-.3-.3-.712 0-.413.3-.713.275-.3.688-.3.412 0 .687.275l3.6 3.6q.15.15.213.325.062.175.062.375t-.062.375q-.063.175-.213.325l-3.6 3.6q-.325.325-.712.287-.388-.037-.663-.312ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h6q.425 0 .713.287Q12 3.575 12 4t-.287.712Q11.425 5 11 5H5v14h6q.425 0 .713.288.287.287.287.712t-.287.712Q11.425 21 11 21Z" />
                            </svg>
                            <OptionButton onClick={() => { fetcherPost("/account/logout").then(() => { router.push('/login') }); }}>{t2("logOut")}</OptionButton>
                        </MiniHolder>
                    </Options>
                    <Others>
                        <Button buttonType={"Teriatary"} text={t2("terms")} handleClick={() => { router.push('/terms-of-service') }} style={{ width: 'fit-content', padding: '0px', height: 'fit-content' }}></Button>
                        <Button buttonType={"Teriatary"} text={t2("policy")} handleClick={() => { router.push('/privacy-policy') }} style={{ width: 'fit-content', padding: '0px', height: 'fit-content' }}></Button>
                        <Version>{t2("version")} 1.0.0</Version>
                    </Others>
                </MenuContent>
            </MainHolder>
        )
        case 1: {
            return (
                <MainHolder>
                    <Title mediaMarginTop='3rem'>{t2("profile")}</Title>
                    <ScrollHolder>
                        <ProfileSettingsMainHolder>
                            <ProfileSettingsHolder isLast={false}>
                                <ProfileSettingsHeading>{t2("profilePic")}</ProfileSettingsHeading>
                                <form method="post" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <CustomUpload onChange={(e: any) => {
                                        if (!e.target.files || e.target.files.length === 0) {
                                            setSelectedFile(undefined)
                                            return;
                                        }

                                        setSelectedFile(e.target.files[0])
                                    }}>
                                        {<div style={{ display: !selectedFile ? 'flex' : 'none', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                                            <input type="file" name="file" style={{ display: 'none' }} onChange={(e) => { if (e.target.files != null) setFileState(e.target.files[0]) }} accept={"image/png, image/jpeg, image/webp, image/heif, image/heic"} />
                                            <svg style={{ scale: '200%' }} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                                <StyledPath1 d="M9 42q-1.25 0-2.125-.875T6 39V9q0-1.25.875-2.125T9 6h20.45v3H9v30h30V18.6h3V39q0 1.25-.875 2.125T39 42Zm26-24.9v-4.05h-4.05v-3H35V6h3v4.05h4.05v3H38v4.05ZM12 33.9h24l-7.2-9.6-6.35 8.35-4.7-6.2ZM9 9v30V9Z" />
                                            </svg>
                                            <UploadFileButtonText>{t2("uploadFile")}</UploadFileButtonText>
                                        </div>}


                                    </CustomUpload>
                                    {selectedFile && <ReactCrop style={{ maxWidth: '30rem', maxHeight: '30rem', position: 'relative' }} aspect={1} minWidth={225} crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)}>
                                        <img ref={imgRef} src={preview!} />
                                    </ReactCrop>}
                                </form>
                                <Button disabled={!selectedFile} buttonType={"Solid"} text={t1("save")} handleClick={() => {

                                    let file = fileState;
                                    const formData = new FormData();
                                    if (file != null) {
                                        formData.append('file', file, file.name);
                                        uploadFileFetcher('/account/avatar', formData, (crop.x / 100) * imgRef.current.naturalWidth, (crop.y / 100) * imgRef.current.naturalWidth, (crop.width / 100) * imgRef.current.naturalWidth)
                                            .then(() => {
                                                setMessage(8);
                                                setMessageS(true);
                                                setStage(3);
                                            }).catch(() => {
                                                setMessage(8);
                                                setMessageS(false);
                                                setStage(3);
                                            });
                                    }
                                }}></Button>
                            </ProfileSettingsHolder>

                            <ProfileSettingsHolder isLast={false}>
                                <ProfileSettingsHeading>{t2("username")}</ProfileSettingsHeading>
                                <LoginInput inputType={"Text"} placeHolder={t2("newUsername")} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewUsername(event.currentTarget.value) }}></LoginInput>
                                <Button disabled={newUsername.length < 1} buttonType={"Solid"} text={t1("save")} handleClick={() => {
                                    fecherChangeUsername("/account/username", newUsername).then(() => {
                                        setMessage(0);
                                        setMessageS(true);
                                        setStage(3);
                                    }).catch(() => {
                                        setMessage(0);
                                        setMessageS(false);
                                        setStage(3);
                                    })
                                }}></Button>
                            </ProfileSettingsHolder>

                            <ProfileSettingsHolder isLast={false}>
                                <ProfileSettingsHeading>{t1("email")}</ProfileSettingsHeading>
                                <LoginInput inputType={"Email"} placeHolder={t2("newEmail")} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewEmail(event.currentTarget.value) }} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }}></LoginInput>
                                <LoginInput inputType={"Password"} placeHolder={t1("password")} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => { setNewEmailPassword(event.currentTarget.value) }} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }} passwordStyle={{ height: '3.5rem' }}></LoginInput>
                                <Button buttonType={"Solid"} disabled={newEmail.length < 3 || !newEmail.includes('@') || newEmailPassword.length < 1} text={t1("save")} handleClick={() => {
                                    fecherChangeEmail("/account/email", newEmail, newEmailPassword).then(() => {
                                        setMessage(1);
                                        setMessageS(true);
                                        setStage(3);
                                    }).catch((e) => {
                                        setNewEmailSuccess(false);
                                    })
                                }}></Button>
                                {newEmailSuccess ? null : <ErrorMessage>{t2("errorMessage")}</ErrorMessage>}
                            </ProfileSettingsHolder>

                            <ProfileSettingsHolder isLast={false}>
                                <ProfileSettingsHeading>{t1("password")}</ProfileSettingsHeading>
                                <ProfileSettingsText>{t2("changePasswordText")}</ProfileSettingsText>
                                <LoginInput inputType={"Password"} placeHolder={t1("password")} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => { setChangePasswordP(event.currentTarget.value) }} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }} passwordStyle={{ height: '3.5rem' }}></LoginInput>
                                <Button buttonType={"Solid"} disabled={changePasswordP.length < 1} text={t1("continue")} handleClick={() => { fetcherGetMfaStatus(changePasswordP, userData?.email).then(() => { setStage(2) }).catch(() => { setChangePasswordSuccess(false); }) }}></Button>
                                {changePasswordSuccess ? null : <ErrorMessage>{t2("errorMessage")}</ErrorMessage>}
                            </ProfileSettingsHolder>

                            <ProfileSettingsHolder isLast={false}>
                                <ProfileSettingsHeading>{t2("verifyEmail")}</ProfileSettingsHeading>
                                <LoginInput inputType={"Password"} placeHolder={t1("password")} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => { setResendP(event.currentTarget.value) }} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }} passwordStyle={{ height: '3.5rem' }}></LoginInput>
                                <Button buttonType={"Solid"} text={t2("resendEmail")} disabled={resendP.length < 1} handleClick={() => {
                                    fetcherGetMfaStatus(resendP, userData?.email).then(() => {
                                        setMessage(5);
                                        setMessageS(true);
                                        setStage(3)
                                    }).catch((e) => { setResendS(false); console.log(e) })
                                }}></Button>
                                {resendS ? null : <ErrorMessage>{t2("errorMessage")}</ErrorMessage>}
                            </ProfileSettingsHolder>

                            <ProfileSettingsHolder isLast={false}>
                                <ProfileSettingsHeading>{t2("add2FA")}</ProfileSettingsHeading>
                                <Button buttonType={"Solid"} text={userData?.mfaMethods?.includes("email") ? t2("removeEmail2fa") : t1("email")} handleClick={() => {
                                    fetcherMfa('/account/mfa/email', !userData?.mfaMethods?.includes("email")).then(() => {
                                        setMessage(!userData?.mfaMethods?.includes("email") ? 2 : 6);
                                        setMessageS(true);
                                        setStage(3);
                                    }).catch(() => {
                                        setMessage(!userData?.mfaMethods?.includes("email") ? 2 : 6);
                                        setMessageS(false);
                                        setStage(3);
                                    })
                                }}></Button>
                                <Button buttonType={"Solid"} text={userData?.mfaMethods?.includes("totp") ? t2("removeTotp2fa") : "TOTP"} handleClick={() => {
                                    fetcherMfa('/account/mfa/totp', !userData?.mfaMethods?.includes("totp")).then((res) => {
                                        setTotpRes(res.data);
                                        setMessage(!userData?.mfaMethods?.includes("totp") ? 3 : 7);
                                        setMessageS(true);
                                        setStage(3);
                                    }).catch(() => {
                                        setMessage(!userData?.mfaMethods?.includes("totp") ? 3 : 7);
                                        setMessageS(false);
                                        setStage(3);
                                    })
                                }}></Button>
                            </ProfileSettingsHolder>

                            <ProfileSettingsHolder isLast={false}>
                                <ProfileSettingsHeading>{t2("recoveryCodes")}</ProfileSettingsHeading>
                                <ProfileSettingsText>{t2("recoveryCodesInfo")}</ProfileSettingsText>
                                {recoveryCodes == undefined ? null : <RecoveryCodesGrid>
                                    {recoveryCodes.map((code, index: any) =>
                                        <ProfileSettingsText key={index} style={{ textAlign: 'center', margin: '5px', fontFamily: 'Montserrat' }}>{code}</ProfileSettingsText>
                                    )}
                                </RecoveryCodesGrid>}
                                <Button buttonType={"Solid"} disabled={!(userData?.mfaMethods?.includes("totp") || userData?.mfaMethods?.includes("email"))} text={t2("generateRecoveryCodes")} handleClick={() => {
                                    fetcherRecoveryCodes().then((res) => {
                                        setRecoveryCodes(res?.data?.codes);
                                    }).catch((e) => { console.log(e) })
                                }}></Button>

                                <Button buttonType={"Solid"} disabled={!(userData?.mfaMethods?.includes("totp") || userData?.mfaMethods?.includes("email"))} text={t2("deleteRecoveryCodes")} handleClick={() => { fetcherDeleteRecoveryCodes().then(() => { setRecoveryCodes(undefined) }) }}></Button>
                            </ProfileSettingsHolder>

                            <ProfileSettingsHolder isLast={true}>
                                <ProfileSettingsHeading>{t2("criticalActions")}</ProfileSettingsHeading>
                                <LoginInput inputType={"Password"} handleChange={(event: React.ChangeEvent<HTMLInputElement>) => { setDeleteAccPassword(event.currentTarget.value) }} placeHolder={t1("password")} style={{ width: '100%', height: '3.5rem', fontSize: '20px' }} passwordStyle={{ height: '3.5rem' }}></LoginInput>
                                <CriticalButton disabled={deleteAccPassword.length < 1} onClick={() => { fetcherDeleteAccount(deleteAccPassword) }} >{t2("delete")}</CriticalButton>
                            </ProfileSettingsHolder>

                        </ProfileSettingsMainHolder>
                    </ScrollHolder>
                </MainHolder>
            )
        }
        case 2: return (
            <MainHolder style={{ height: '100%' }}>
                <Title>{t2("profile")}</Title>
                <YetAnotherHolder>
                    <CreatePassword handleButtonPasword={() => {
                        fetcherChangePassword(changePasswordP, newPassword).then(() => {
                            setMessage(4);
                            setMessageS(true);
                            setStage(3);
                        }).catch(() => {
                            setMessage(4);
                            setMessageS(false);
                            setStage(3);
                        })
                    }} updatePassword={(newPassword: string) => (setNewPassword(newPassword))} title={t2("changePassword")} buttonText={t1("save")}></CreatePassword>
                </YetAnotherHolder>
            </MainHolder>
        )
        case 3: {
            const messagesT = [t2("changeUsernameMessage1"), t2("changeEmailMessage1"), t2("changeEmail2faMessage1"), t2("changeTotp2faMessage1"), t2("changePasswordMessage1"), t3("weSentEmail"), t2("removeEmail2faMessage1"), t2("removeTotp2faMessage1"), t2("profilePicMessage1")];
            const messagesF = [t2("changeUsernameMessage0"), t2("changeEmailMessage0"), t2("changeEmail2faMessage0"), t2("changeTotp2faMessage0"), t2("changePasswordMessage0"), t2("resendVerificationEmailMessage0"), t2("removeEmail2faMessage0"), t2("removeTotp2faMessage1"), t2("profilePicMessage0")];
            return (
                <MessageScreen stage={messageS} text={messageS ? messagesT[message] : messagesF[message]} continueTxt={t1("continue")} handleClick={() => {
                    if (message == 3 && messageS) {
                        setStage(4)
                        return;
                    }

                    router.push('/account/settings?s=1', undefined, { shallow: true });
                    window.location.reload();
                    return;
                }} ></MessageScreen>
            )
        }
        case 4: {
            return (
                <MainHolder>
                    <Title>TOTP</Title>
                    <TotpHolder>
                        <TotpMiniHolder>
                            <TotpText fontSize={'30px'}>{t2("scan")}</TotpText>
                            <QRCodeSVG value={totpRes?.uri + ""} style={{ width: '65%', height: '65%' }} />
                        </TotpMiniHolder>
                        <TotpMiniHolder>
                            <TotpText fontSize={'24px'}>{t2("orUseTheCode")}</TotpText>
                            <ProfileSettingsText>{totpRes?.secret + ""}</ProfileSettingsText>
                            <Button buttonType={"Secondary"} text={t2("copy")} handleClick={() => { navigator.clipboard.writeText(totpRes?.secret + ""); }}></Button>
                        </TotpMiniHolder>
                    </TotpHolder>
                </MainHolder>
            )
        }
        case 5: {
            return (
                <MainHolder>
                    <Title mediaMarginTop='3rem'>{t2("security")}</Title>
                    <SecurityMainHolder onScroll={(e: any) => {
                        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                        if (bottom) {
                            if (pastLogins.length % 20 != 0) return;
                            fetcherGetLogins(loginsPage + 1).then((res: any) => {
                                let arr = [];
                                arr = pastLogins;
                                arr = arr.concat(res?.data);
                                setPastLogins(arr);
                                setLoginsPage(loginsPage + 1);
                            }).catch((e) => { console.log(e) });
                        }
                    }}>
                        {pastLogins?.map((log: any, key: number) =>
                            <SecurityMiniHolder key={key}>
                                <SecurityIcon deviceType={String(log.deviceType)}></SecurityIcon>
                                <SecurityTextHolder>
                                    <SecurityText fontSize={'24px'}>{t2("loginFrom")} {log.browser} {log.browserVersion} {log.platform} {log.platformVersion}</SecurityText>
                                    <SecurityText fontSize={'20px'}>{t2("on")} {new Intl.DateTimeFormat(i18n.language, { timeStyle: 'medium', dateStyle: 'medium' }).format(new Date(log.date))}</SecurityText>
                                    <SecurityText fontSize={'20px'}>{t2("near")} {log.city}, {log.country}</SecurityText>
                                </SecurityTextHolder>
                            </SecurityMiniHolder>
                        )}
                    </SecurityMainHolder>
                </MainHolder>
            )
        }
        default: {
            setStageUrl(0);
        };
    }
    return <div></div>;
}
type SecurityIconProps = {
    deviceType: string
}
function SecurityIcon({ deviceType }: SecurityIconProps) {
    switch (deviceType) {
        case 'Desktop': return (
            <svg width="97" height="64" viewBox="0 0 97 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80.5 56C84.9 56 88.5 52.4 88.5 48V8C88.5 3.6 84.9 0 80.5 0H16.5C12.1 0 8.5 3.6 8.5 8V48C8.5 52.4 12.1 56 16.5 56H4.5C2.3 56 0.5 57.8 0.5 60C0.5 62.2 2.3 64 4.5 64H92.5C94.7 64 96.5 62.2 96.5 60C96.5 57.8 94.7 56 92.5 56H80.5ZM20.5 8H76.5C78.7 8 80.5 9.8 80.5 12V44C80.5 46.2 78.7 48 76.5 48H20.5C18.3 48 16.5 46.2 16.5 44V12C16.5 9.8 18.3 8 20.5 8Z" fill="#29335C" />
            </svg>
        )
        case "Mobile Phone": return (
            <svg width="53" height="88" viewBox="0 0 53 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.5 0H10.5C7.84784 0 5.3043 1.05357 3.42893 2.92893C1.55357 4.8043 0.5 7.34784 0.5 10V78C0.5 80.6522 1.55357 83.1957 3.42893 85.0711C5.3043 86.9464 7.84784 88 10.5 88H42.5C45.1522 88 47.6957 86.9464 49.5711 85.0711C51.4464 83.1957 52.5 80.6522 52.5 78V10C52.5 7.34784 51.4464 4.8043 49.5711 2.92893C47.6957 1.05357 45.1522 0 42.5 0ZM26.5 84C23.18 84 20.5 81.32 20.5 78C20.5 74.68 23.18 72 26.5 72C29.82 72 32.5 74.68 32.5 78C32.5 81.32 29.82 84 26.5 84ZM44.5 68H8.5V12H44.5V68Z" fill="#29335C" />
            </svg>
        )
        default: return <div></div>
    }
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'settings', 'create'])),
        },
    };
}

export default Settings;