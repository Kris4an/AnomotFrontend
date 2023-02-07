import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AuthContainer from "../components/AuthContainer";
import Button from "../components/Button";
import NavBar from "../components/NavBar"
import Tiptap from "../components/Tiptap";
import Image from "next/image";
import instance from "../axios_instance";
import MessageScreen from "../components/MessageScreen";
import { sanitizeHtml } from "../sanitize";

const Create: NextPage = () => {
    return (
        <NavBar stage={2}>
            <Content></Content>
        </NavBar>
    )
}

const SelectionButtonHolder = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0rem 7rem 0rem 7rem;
    height: 70%;
`;
const SelButtonSvg = styled.svg`
    height: 8rem;
    transition: all 300ms ease-in-out;
    &:hover{
       
    }
`;
interface SelectionButtonProps {
    isFirst: boolean
}
const SelectionButton = styled.button<SelectionButtonProps>`
    background-color: transparent;
    height: 100%;
    flex-grow: 1;
    border-right: none;
    border-top: none;
    border-bottom: none;
    border-left: ${(props) => (props.isFirst ? 'none' : '3px solid')};
    border-color: ${props => props.theme.colors.secondary};
    cursor: pointer;
    transition: background 300ms ease-in-out, box-shadow 400ms ease-in-out;
    &:hover{
        background-color: ${props => props.theme.colors.switchButtonHover};;
        box-shadow: 10px 10px inset #d6d6d6;
    }
    &:hover ${SelButtonSvg}{
        scale: 95%;
    }   
`;
const SelectionButtonMainHolder = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
`;
const SelectionButtonText = styled.span`
    font-family: 'Montserrat';
    font-size: 30px;
    line-height: 36px;
    color: ${props => props.theme.colors.secondary};
    text-align: center;
    max-width: 70%;
    height: 2rem;
`;
const CreateBattleHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    height: 90%;
    gap: 2rem;
    //border: 2px solid ${props => props.theme.colors.secondary};
`;
const CreateBattleMainHolder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    //padding: 5rem;
`;
const SwitchTypeButtonHolder = styled.div`
    display: flex;
    width: 100%;
`;
interface IsSelectedProps {
    isSelected: boolean
}
const SwitchTypeButton = styled.button<IsSelectedProps>`
    width: 50%;
    height: 4rem;
    border: none;
    background-color: transparent;
    border-right: none;
    border-top: none;
    border-left: none;
    border-bottom: 2px solid; 
    border-bottom-color: ${(props) => (props.isSelected ? props => props.theme.colors.secondary : 'transparent')};
    transition: background 300ms ease-in-out, border 400ms ease-in-out;
    cursor: pointer;
    
    &:hover{
        background-color: ${props => props.theme.colors.switchButtonHover};;
        border-bottom-color: ${props => props.theme.colors.secondary};
    }
`;
const UploadImageHolder = styled.div`
    position: relative;
    width: 100%;
    flex-grow: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
    border-top: 1px solid ${props => props.theme.colors.secondary};
`;

const UploadTextHolder = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.secondary};
    border-top: 1px solid ${props => props.theme.colors.secondary};
`
const UploadFileButtonText = styled.span`
    font-size: 20px;
    font-family: 'Roboto';
    color: ${props => props.theme.colors.secondary};;
`;
const PostTypePath = styled.path<IsSelectedProps>`
    fill: ${(props) => (props.isSelected ? props => props.theme.colors.primary : props => props.theme.colors.navBarSecondary)};
    transition: all 300ms ease-in-out;
`;
const TitleContentHolder = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
`;
const CustomUpload = styled.label`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    cursor: pointer;

    &:hover ${UploadFileButtonText}{
        text-decoration: underline;
    }
`;

const VideoWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledVideo = styled.video`
    width: 100%;
`

interface MessageScreenI {
    success: boolean,
    messsage: string
}
function Content() {
    const router = useRouter();
    const [t1] = useTranslation("common");
    const [t2] = useTranslation("create-post");
    const [stage, setStage] = useState(0);
    const [selButton, setSelButton] = useState(0);
    const [selectedPostType, setSelectedPostType] = useState(true)
    const [overlay, setOverlay] = useState(false);
    const [overlayStage, setOverlayStage] = useState(0);
    const fileUpload: any = React.createRef();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const [postType, setPostType] = useState("");
    const [html, setHtml] = useState("");
    const [text, setText] = useState("");
    const [messageScr, setMessageScr] = useState<MessageScreenI>({
        "messsage": "",
        "success": false
    });

    const uploadFileFetcher = (url: string, formData: any) => instance.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((res: any) => { console.log(res); }).catch((e: any) => { console.log(e) });
    const uploadTextFetcher = (url: string, text: any) => instance.post(url, {
        "text": text
    }).then((res: any) => { console.log(res) }).catch((e: any) => { console.log(e) });

    useEffect(() => {
        router.push('/create?s=0');
    }, [])

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    useEffect(() => {
        const s = window.location.search.substring(3);
        if (s == "0" || s == "1") {
            setStage(Number(s));
            setOverlay(false);
            return;
        }
        if (s == "2" && stage == 1) {
            setStage(0);
            setOverlay(false);
            return;
        }
    }, [router.query.s]);

    switch (stage) {
        case 0: {
            const text = [t2("choosePostType"), t2("battleInfo"), t2("postInfo"), t2("geopostInfo")];

            const updateUrlOverlay = (stage: number) => {
                setOverlayStage(stage);
                setOverlay(true);
                router.push('/create?s=2');
            }
            return (
                <>
                    {overlay ? <OverlayWindow stage={overlayStage} close={() => { setOverlay(false); setPostType("") }} handleClick={() => { setStage(1); router.push('/create?s=1'); }} /> : null}
                    <SelectionButtonMainHolder>
                        <SelectionButtonHolder>
                            <SelectionButton onClick={() => { updateUrlOverlay(0); setPostType("battle"); }} isFirst={true} onMouseOver={() => { setSelButton(1); }} onMouseLeave={() => { setSelButton(0) }}>
                                <SelButtonSvg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.75 26.25L4.5 9V4.5H9L26.25 21.75M19.5 28.5L28.5 19.5M24 24L30 30M28.5 31.5L31.5 28.5M21.75 9.75L27 4.5H31.5V9L26.25 14.25M7.5 21L13.5 27M10.5 25.5L6 30M4.5 28.5L7.5 31.5" stroke='#29335C' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </SelButtonSvg>
                            </SelectionButton>
                            <SelectionButton onClick={() => { setStage(1); setPostType("post"); router.push('/create?s=1'); }} isFirst={false} onMouseOver={() => { setSelButton(2) }} onMouseLeave={() => { setSelButton(0) }}>
                                <SelButtonSvg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.792 11.625C9.792 11.9234 9.67347 12.2095 9.46249 12.4205C9.25152 12.6315 8.96537 12.75 8.667 12.75C8.36863 12.75 8.08248 12.6315 7.8715 12.4205C7.66053 12.2095 7.542 11.9234 7.542 11.625C7.542 11.3266 7.66053 11.0405 7.8715 10.8295C8.08248 10.6185 8.36863 10.5 8.667 10.5C8.96537 10.5 9.25152 10.6185 9.46249 10.8295C9.67347 11.0405 9.792 11.3266 9.792 11.625ZM8.6715 22.5C8.37313 22.5 8.08698 22.6185 7.87601 22.8295C7.66503 23.0405 7.5465 23.3266 7.5465 23.625C7.5465 23.9234 7.66503 24.2095 7.87601 24.4205C8.08698 24.6315 8.37313 24.75 8.6715 24.75H16.1715C16.4699 24.75 16.756 24.6315 16.967 24.4205C17.178 24.2095 17.2965 23.9234 17.2965 23.625C17.2965 23.3266 17.178 23.0405 16.967 22.8295C16.756 22.6185 16.4699 22.5 16.1715 22.5H8.6715ZM7.5465 17.625C7.5465 17.3266 7.66503 17.0405 7.87601 16.8295C8.08698 16.6185 8.37313 16.5 8.6715 16.5H16.1715C16.3192 16.5 16.4655 16.5291 16.602 16.5856C16.7385 16.6422 16.8625 16.725 16.967 16.8295C17.0715 16.934 17.1543 17.058 17.2109 17.1945C17.2674 17.331 17.2965 17.4773 17.2965 17.625C17.2965 17.7727 17.2674 17.919 17.2109 18.0555C17.1543 18.192 17.0715 18.316 16.967 18.4205C16.8625 18.525 16.7385 18.6078 16.602 18.6644C16.4655 18.7209 16.3192 18.75 16.1715 18.75H8.6715C8.37313 18.75 8.08698 18.6315 7.87601 18.4205C7.66503 18.2095 7.5465 17.9234 7.5465 17.625ZM22.5 31.5C23.1853 31.4953 23.8481 31.2545 24.3765 30.8181C24.9049 30.3818 25.2668 29.7766 25.401 29.1045L26.121 25.5H30.375C31.0712 25.5 31.7389 25.2234 32.2312 24.7312C32.7234 24.2389 33 23.5712 33 22.875V13.8915C33 12.9949 32.645 12.1347 32.0125 11.4992C31.38 10.8636 30.5216 10.5044 29.625 10.5V10.494H21.75V7.875C21.75 6.97989 21.3944 6.12145 20.7615 5.48851C20.1285 4.85558 19.2701 4.5 18.375 4.5H6.375C5.47989 4.5 4.62145 4.85558 3.98851 5.48851C3.35558 6.12145 3 6.97989 3 7.875V26.625C3 27.9179 3.51361 29.1579 4.42785 30.0721C5.34209 30.9864 6.58207 31.5 7.875 31.5H22.5ZM5.25 7.875C5.25 7.57663 5.36853 7.29048 5.5795 7.0795C5.79048 6.86853 6.07663 6.75 6.375 6.75H18.375C18.6734 6.75 18.9595 6.86853 19.1705 7.0795C19.3815 7.29048 19.5 7.57663 19.5 7.875V28.521C19.5 28.7715 19.53 29.016 19.59 29.25H7.875C7.17881 29.25 6.51113 28.9734 6.01884 28.4812C5.52656 27.9889 5.25 27.3212 5.25 26.625V7.875ZM21.75 12.744H26.415C26.3592 12.9015 26.3151 13.063 26.283 13.227L23.1945 28.6635C23.1597 28.8416 23.0598 29.0003 22.9143 29.1087C22.7687 29.217 22.588 29.2672 22.4074 29.2494C22.2269 29.2315 22.0594 29.147 21.9378 29.0123C21.8163 28.8776 21.7493 28.7024 21.75 28.521V12.744ZM28.488 13.668C28.5423 13.3888 28.6988 13.1399 28.927 12.9701C29.1551 12.8003 29.4385 12.7218 29.7215 12.7499C30.0045 12.7781 30.2669 12.9109 30.4571 13.1223C30.6473 13.3338 30.7518 13.6086 30.75 13.893V22.875C30.75 22.9745 30.7105 23.0698 30.6402 23.1402C30.5698 23.2105 30.4745 23.25 30.375 23.25H26.5725L28.488 13.668Z" fill='#29335C' />
                                </SelButtonSvg>
                            </SelectionButton>
                            <SelectionButton onClick={() => { updateUrlOverlay(1); setPostType("geopost"); }} isFirst={false} onMouseOver={() => { setSelButton(3) }} onMouseLeave={() => { setSelButton(0) }}>
                                <SelButtonSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M22.5 45.9v-3.75q-6.85-.7-11.4-5.25-4.55-4.55-5.25-11.4H2.1v-3h3.75q.7-6.85 5.25-11.4 4.55-4.55 11.4-5.25V2.1h3v3.75q6.85.7 11.4 5.25 4.55 4.55 5.25 11.4h3.75v3h-3.75q-.7 6.85-5.25 11.4-4.55 4.55-11.4 5.25v3.75Zm1.5-6.7q6.25 0 10.725-4.475T39.2 24q0-6.25-4.475-10.725T24 8.8q-6.25 0-10.725 4.475T8.8 24q0 6.25 4.475 10.725T24 39.2Zm0-7.7q-3.15 0-5.325-2.175Q16.5 27.15 16.5 24q0-3.15 2.175-5.325Q20.85 16.5 24 16.5q3.15 0 5.325 2.175Q31.5 20.85 31.5 24q0 3.15-2.175 5.325Q27.15 31.5 24 31.5Zm0-3q1.9 0 3.2-1.3 1.3-1.3 1.3-3.2 0-1.9-1.3-3.2-1.3-1.3-3.2-1.3-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2 0 1.9 1.3 3.2 1.3 1.3 3.2 1.3Zm0-4.5Z" fill='#29335C' />
                                </SelButtonSvg>
                            </SelectionButton>
                        </SelectionButtonHolder>
                        <SelectionButtonText>{text[selButton]}</SelectionButtonText>
                    </SelectionButtonMainHolder>
                </>

            )
        }
        case 1: {
            return (
                <CreateBattleMainHolder>
                    <CreateBattleHolder>
                        <SwitchTypeButtonHolder>
                            <SwitchTypeButton isSelected={selectedPostType} onClick={() => { setSelectedPostType(true) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                    <PostTypePath isSelected={selectedPostType} d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Zm2.8-4.85h24.45l-7.35-9.8-6.6 8.55-4.65-6.35ZM9 39V9v30Z" />
                                </svg>
                            </SwitchTypeButton>
                            <SwitchTypeButton isSelected={!selectedPostType} onClick={() => { setSelectedPostType(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                    <PostTypePath isSelected={!selectedPostType} d="M15.95 35.5h16.1v-3h-16.1Zm0-8.5h16.1v-3h-16.1ZM11 44q-1.2 0-2.1-.9Q8 42.2 8 41V7q0-1.2.9-2.1Q9.8 4 11 4h18.05L40 14.95V41q0 1.2-.9 2.1-.9.9-2.1.9Zm16.55-27.7V7H11v34h26V16.3ZM11 7v9.3V7v34V7Z" />
                                </svg>
                            </SwitchTypeButton>
                        </SwitchTypeButtonHolder>
                        <TitleContentHolder>

                            {
                                selectedPostType ?
                                    <UploadImageHolder>
                                        <form method="post">
                                            <CustomUpload onChange={(e: any) => {
                                                if (!e.target.files || e.target.files.length === 0) {
                                                    setSelectedFile(undefined)
                                                    return
                                                }

                                                setSelectedFile(e.target.files[0])
                                            }}>
                                                {<div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
                                                    <input type="file" name="file" style={{ display: 'none' }} ref={fileUpload} accept={".png, .jpeg, .jpg, .webp, .heic, .heif, .mp4, .mkv, .mov"} />
                                                    <svg style={{ scale: '200%' }} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                                        <PostTypePath isSelected={true} d="M9 42q-1.25 0-2.125-.875T6 39V9q0-1.25.875-2.125T9 6h20.45v3H9v30h30V18.6h3V39q0 1.25-.875 2.125T39 42Zm26-24.9v-4.05h-4.05v-3H35V6h3v4.05h4.05v3H38v4.05ZM12 33.9h24l-7.2-9.6-6.35 8.35-4.7-6.2ZM9 9v30V9Z" />
                                                    </svg>
                                                    <UploadFileButtonText>{t2("uploadFile")}</UploadFileButtonText>
                                                </div>}
                                                {(selectedFile && preview) &&
                                                (selectedFile.name.match(new RegExp("^(.*\.(mkv|mov|mp4))$", "i")) ? 
                                                 <VideoWrapper>
                                                    <StyledVideo controls={true}>
                                                        <source src={preview} />
                                                    </StyledVideo>
                                                 </VideoWrapper>
                                                 :
                                                 <Image src={preview} objectFit={'contain'} layout={'fill'} />)}
                                            </CustomUpload>
                                        </form>
                                    </UploadImageHolder>
                                    :
                                    <UploadTextHolder><Tiptap getText={(html: string, text: string) => { 
                                        setHtml(html); 
                                        setText(text);
                                    }} /></UploadTextHolder>
                            }
                        </TitleContentHolder>
                        <Button buttonType={"Solid"}
                            handleClick={() => {
                                switch (selectedPostType) {
                                    case true: {
                                        let file = fileUpload.current.files[0];
                                        const formData = new FormData();
                                        formData.append('file', file, file.name)

                                        switch (postType) {
                                            case "post": {
                                                uploadFileFetcher('/account/post/media', formData).then(() => {
                                                    setMessageScr({
                                                        "success": true,
                                                        "messsage": t2("successMessageP")
                                                    })
                                                    setStage(3);
                                                }).catch(() => {
                                                    setMessageScr({
                                                        "success": false,
                                                        "messsage": t2("failMessage")
                                                    })
                                                    setStage(3);
                                                });
                                                return;
                                            }
                                            case "battle": {
                                                uploadFileFetcher('/account/battle/media', formData).then(() => {
                                                    setMessageScr({
                                                        "success": true,
                                                        "messsage": t2("successMessageB")
                                                    })
                                                    setStage(3);
                                                }).catch(() => {
                                                    setMessageScr({
                                                        "success": false,
                                                        "messsage": t2("failMessage")
                                                    })
                                                    setStage(3);
                                                });
                                                return;
                                            }
                                            case "geopost": {
                                                return;
                                            }
                                        }
                                    }
                                    case false: {
                                        switch (postType) {
                                            case "post": {
                                                uploadTextFetcher('/account/post/text', html).then(() => {
                                                    setMessageScr({
                                                        "success": true,
                                                        "messsage": t2("successMessageP")
                                                    });
                                                    setStage(3);
                                                }).catch(() => {
                                                    setMessageScr({
                                                        "success": false,
                                                        "messsage": t2("failMessage")
                                                    })
                                                    setStage(3);
                                                });
                                                return;
                                            }
                                            case "battle": {
                                                uploadTextFetcher('/account/battle/text', html).then(() => {
                                                    setMessageScr({
                                                        "success": true,
                                                        "messsage": t2("successMessageB")
                                                    })
                                                    setStage(3);
                                                }).catch(() => {
                                                    setMessageScr({
                                                        "success": false,
                                                        "messsage": t2("failMessage")
                                                    })
                                                    setStage(3);
                                                });
                                                return;
                                            }
                                            case "geopost": {
                                                return;
                                            }
                                        }
                                    }

                                }
                            }} text={t1("continue")} style={{ width: '38rem' }}
                            disabled={(postType != "battle" && postType != "post") || (selectedPostType ? selectedFile == null : text.length < 50)}
                            title={selectedPostType ? "" : t2("textPostReq")}></Button>
                    </CreateBattleHolder>
                </CreateBattleMainHolder>
            )
        }
        case 3: {
            return (
                <MessageScreen stage={messageScr?.success} text={messageScr?.messsage} continueTxt={t1("continue")} handleClick={() => { router.push('/create'); router.reload(); }}></MessageScreen>
            )
        }
        default: {
            setStage(0);
            return (
                <></>
            )
        }
    }

}

const OverlayHolder = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #29335c50;//${props => props.theme.colors.primary};
    z-index: 1;
`;
const OverlayText = styled.span`
    font-family: 'Roboto';
    font-size: 24px;
    color:  ${props => props.theme.colors.primary};
`;
const Slider = styled.input`
    -webkit-appearance: none;
    appearance: none;
    width: 70%;
    height: 10px;
    background-color: ${props => props.theme.colors.buttonDisabled};
    border-radius: 5px;

    &:hover{
       opacity: 0.95;
    }
    &::-webkit-slider-thumb {
        border: solid 3px ${props => props.theme.colors.primary};
        background-color: white;
    }
    &::-moz-range-thumb {
       border: solid 3px ${props => props.theme.colors.primary};
       background-color: white;
    }
`;
const SliderHolder = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
`
type OverlayProps = {
    close: any,
    stage: number,
    handleClick: any
}
function OverlayWindow({ close, stage, handleClick }: OverlayProps) {
    const [t1] = useTranslation("common");
    const [t2] = useTranslation("create-post");

    switch (stage) {
        case 0: return (
            <OverlayHolder onClick={close}>
                <AuthContainer onClick={(e: any) => {
                    e.stopPropagation();
                    e.cancelBubble = true;
                }} style={{ padding: '7rem', gap: '4rem', zIndex: '2', maxWidth: '50vw' }}>
                    <OverlayText>{t2("battleOverlayInfo")}</OverlayText>
                    <Button buttonType={"Solid"} text={t1("continue")} handleClick={handleClick}></Button>
                </AuthContainer>
            </OverlayHolder>
        )
        case 1: {
            const [sliderValue, setSliderValue] = useState(500);
            return (
                <OverlayHolder onClick={close}>
                    <AuthContainer onClick={(e: any) => {
                        e.stopPropagation();
                        e.cancelBubble = true;
                    }} style={{ padding: '7rem', gap: '4rem', zIndex: '2', maxWidth: '50vw' }}>
                        <SliderHolder>
                            <OverlayText>{t2("geopostOverlayInfo1")}</OverlayText>
                            <OverlayText>{sliderValue}</OverlayText>
                            <Slider type="range" min="100" max="1000" defaultValue={550} step="50" onChange={(e: any) => { setSliderValue(e.target.value) }}></Slider>
                            <OverlayText>{t2("geopostOverlayInfo2")}</OverlayText>
                        </SliderHolder>
                        <Button buttonType={"Solid"} text={t1("continue")} disabled={true} handleClick={() => { }}></Button>
                    </AuthContainer>
                </OverlayHolder>
            )
        }
        default: return <></>
    }

}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'create-post'])),
        },
    };
}

export default Create;