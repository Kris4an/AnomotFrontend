import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import React from "react";
import MiniProfilePic from "./MiniProfilePic";
import router from "next/router";
import instance from "../axios_instance";
import { EBattlePost, EComment, ENonSelfUser, EPost } from "./Intefaces";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import useUser from "./useUser";
import { sanitizeHtml } from "../sanitize";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { lowlight } from 'lowlight/lib/core'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import Underline from "@tiptap/extension-underline";
import MiniProfile from "./MiniProfile";

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

const MainHolder = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    @media (max-width: 840px) {
        flex-direction: column;
    }
`;
const shadowFlashGold = keyframes`
    0% {
        box-shadow: inset 0rem 0rem 10rem "#ff12a80", inset -0rem -0rem 10rem "#ff12a80";
    }
    50% {
        box-shadow: inset 3rem 3rem 10rem #F3A712, inset -3rem -6rem 10rem #F3A712;
    }
    100% {
        box-shadow: inset 0rem 0rem 10rem "#ff12a80", inset -0rem -0rem 10rem "#ff12a80";
    }
`;
const shadowFlashRed = keyframes`
    0% {
        box-shadow: inset 0rem 0rem 10rem "#ff12a80", inset -0rem -0rem 10rem "#ff12a80";
    }
    50% {
        box-shadow: inset 3rem 3rem 10rem #F10000, inset -3rem -6rem 10rem #F10000;
    }
    100% {
        box-shadow: inset 0rem 0rem 10rem "#ff12a80", inset -0rem -0rem 10rem "#ff12a80";
    }
`;
const HalfHolder = styled.div<ButtonProps>`
    position: relative;
    height: 100%;
    width: 100%;
    padding-bottom: 4.5rem;
    border-left: 1px solid;
    border-color: ${props => props.isLeft ? 'transparent' : props => props.theme.colors.primary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    animation-duration: 1s;// ${props => props.isReady ? '1s' : '0s'};
    animation-name:  ${props => props.isLeft ? shadowFlashGold : shadowFlashRed}; ;
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1);
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-play-state: ${props => props.isReady ? 'running' : 'paused'};

    @media (max-width: 840px) {
        padding-bottom: 3rem;
    }
`;
interface ButtonProps {
    isLeft: boolean,
    isReady?: boolean
}
const ButtonHolder = styled.div<ButtonProps>`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4.5rem;
    box-shadow: 7px 0px 15px ${props => props.theme.colors.authContainerShadow};
    background-color: ${props => props.theme.colors.secondaryButtonBackground};
    transition: all 0.4s ease-in-out;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding-top: 0.5rem;
    border-radius: ${props => props.isLeft ? '10px 0px 0px 0px;' : '0px 10px 0px 0px;'};

    @media (max-width: 840px) {
        height: 3rem;
        padding: 0px;
        
    }
`;
const BoldText = styled.span`
    font-family: 'Roboto';
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;

    @media (max-width: 840px) {
        font-size: 20px;
    }
`;
const StyledPath = styled.path`
    fill: ${props => props.theme.colors.primary};
`;
const VoteButton = styled.button<ButtonProps>`
    height: 3.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
    transition: all 0.3s ease-in-out;

    &:hover ${BoldText}{
        color: ${props => props.theme.colors.secondary};
    }
    &:hover ${StyledPath}{
        fill: ${props => props.theme.colors.secondary};
    }
    &:active ${BoldText}{
        color: ${props => props.isLeft ? '#F3A712;' : 'red'};
    }
    &:active ${StyledPath}{
        fill: ${props => props.isLeft ? '#F3A712;' : 'red'};
    }
    &:disabled ${BoldText}{
        color: ${props => props.theme.colors.buttonDisabled};
    }
    &:disabled ${StyledPath}{
        fill: ${props => props.theme.colors.buttonDisabled};
    }
`;
const ExpandedHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    height: 100%;
    padding-bottom: 1rem;

    @media (max-width: 840px) {
        padding: 0px;

    }
`;
const ExpandedButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
`;
const SvgButton = styled.button`
    width: 3rem;
    height: 3rem;
    background: ${props => props.theme.colors.secondaryButtonBackground};
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.theme.colors.primary};
    }
    &:hover ${StyledPath} {
        fill: ${props => props.theme.colors.secondaryButtonBackground};
        transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    }
`;
const slideInFromBottom = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-30%);
    }
    100% {
        opacity: 1;
        transform: translateY(0%);
    }
`;
const PostVoteButtons = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    left: calc(50% - 4rem);
    top: 40vh;
    z-index: 1;
    width: 8rem;
    background-color: ${props => props.theme.colors.secondaryButtonBackground};
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    padding: 1rem;

    animation: 0.5s cubic-bezier(0.215, 0.610, 0.355, 1) 0s 1 ${slideInFromBottom};
`;
const ProfileHolder = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    background-color: transparent;
    border: none;
`;
const ImageHolder = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;
const slideInFromBottomComments = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0%);
    }
`;
const CommentsMainHolder = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.secondaryButtonBackground};
    padding-top: 5px;
    z-index: 3;
    animation: 0.7s cubic-bezier(0.215, 0.610, 0.355, 1) 0s 1 ${slideInFromBottomComments};
`;
const UpperCommentHolder = styled.div`
    padding-left: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    max-height: calc(100vh - 5px - 3.5rem);
    overflow-x: hidden;
`;
const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;
const CommentTitle = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 36px;
    line-height: 42px;
    display: flex;
    align-items: flex-end;
    text-indent: 14px;

    color: ${props => props.theme.colors.inputPlaceholder};
`;
const CommentsHolder = styled.div`
    width: 100%;
    height: 100%;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow-y: scroll;
`;
const StyledVideo = styled.video`
    max-width: 100%;
    max-height: 100%;

    @media (max-width: 840px) {
        max-width: 100vw;
        max-height: calc((100vh - 7rem - 50px)/2);
    }
`;
const VideoHolder = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
`;
const StyledSvg = styled.svg`
    @media (max-width: 840px) {
        scale: 70%;
    }
`;
const BurgerMenuButton = styled.button`
    background-color: transparent;
    border: none;
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 1.5rem;
    right: 5px;
    cursor: pointer;
`;
const ButgerMenuHolder = styled.div`
    right: 0px;
    bottom: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    width: 20rem;
    background: ${props => props.theme.colors.textInverted};
    border: 1px solid ${props => props.theme.colors.primary};
    box-shadow: 0px -10px 10px ${props => props.theme.colors.authContainerShadow};
    border-radius: 10px;
    z-index: 2;
`;
enum Reasons {
    NSFW_CONTENT = "NSFW_CONTENT",
    ADVERTISING = "ADVERTISING",
    VIOLENCE = "VIOLENCE",
    HARASSMENT = "HARASSMENT",
    HATE_SPEECH = "HATE_SPEECH",
    TERRORISM = "TERRORISM",
    SPAM = "SPAM",
    IDENTITY_REVEAL = "IDENTITY_REVEAL"
}
interface Props {
    goldPost: EBattlePost | EPost,
    redPost: EBattlePost | EPost,
    jwt: string,
    id: string,
    selfBattle: boolean,
    selfVotes?: number,
    otherVotes?: number,
    disableVote?: boolean,
    nextBattle: () => void
}
function Battle({ goldPost, redPost, jwt, id, selfBattle, selfVotes, otherVotes, disableVote, nextBattle }: Props) {
    const { user: userData, isError: userDataError, isValidating: isValidating } = useUser();
    const [t2] = useTranslation("battle");
    const [isGold, setIsGold] = useState(0);
    const [showComments, setShowComments] = useState(false);
    //only for new user comments
    const [userComments, setUserComments] = useState<EComment[]>();
    const [votedUser, setVotedUser] = useState<ENonSelfUser>({
        "id": '',
        "username": '',
        "avatarId": ''
    });
    const fetcherVote = (forId: string) => instance.post('/vote', {
        "jwt": jwt,
        "forId": forId
    })
    const fetcher = (url: any, page: number) => instance.get(url, { params: { page: page, id: id } })
    const [comments, setComments] = useState<any>();
    const [page, setPage] = useState(0);
    const [showBurgerMenuG, setShowBurgerMenuG] = useState(false);
    const [showBurgerMenuR, setShowBurgerMenuR] = useState(false);

    const editorGold = useEditor({
        extensions: [
            StarterKit, Underline, Subscript, Superscript, CodeBlockLowlight.configure({
                lowlight,
            })
        ],
        content: "",
    })
    const editorRed = useEditor({
        extensions: [
            StarterKit, Underline, Subscript, Superscript, CodeBlockLowlight.configure({
                lowlight,
            })
        ],
        content: "",
    })
    useEffect(() => {
        if (goldPost.type == "TEXT" && goldPost.text != null && editorGold != null) {
            editorGold.commands.setContent(sanitizeHtml(goldPost?.text));
        }
    }, [editorGold])
    useEffect(() => {
        if (redPost.type == "TEXT" && redPost.text != null && editorRed != null) {
            editorRed.commands.setContent(sanitizeHtml(redPost?.text));
        }
    }, [editorRed])

    return (
        <MainHolder>
            {
                (showComments && votedUser)
                &&
                <CommentsMainHolder>
                    <UpperCommentHolder>
                        <CommentHeader>
                            <SvgButton style={{ width: '4rem', height: '4rem' }} onClick={() => { setShowComments(false) }}>
                                <svg style={{ transform: 'rotate(90deg)' }} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                                    <StyledPath d="M24 40 8 24l2.1-2.1 12.4 12.4V8h3v26.3l12.4-12.4L40 24Z" />
                                </svg>
                            </SvgButton>
                            <CommentTitle>{t2("comments")}</CommentTitle>
                        </CommentHeader>
                        <CommentsHolder onScroll={(e: any) => {
                            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
                            if (bottom && comments !== undefined) {
                                if (comments.length % 10 != 0) return;
                                fetcher('/battle/comment', page + 1).then((res: any) => {
                                    let arr = [];
                                    arr = comments;
                                    arr = arr.concat(res.data);
                                    setComments(arr);
                                    setPage(page + 1);
                                });
                            }
                        }}>
                            {
                                userComments != null && userComments !== undefined &&
                                userComments.map((comment: EComment, key: number) =>
                                    <Comment comment={comment} key={key}></Comment>
                                )
                            }
                            {
                                comments != null && comments !== undefined &&
                                comments.map((comment: EComment) =>
                                    <Comment comment={comment} key={comment?.id}></Comment>
                                )
                            }
                        </CommentsHolder>
                    </UpperCommentHolder>
                    <CommentInput id={id} userComment={function (comment: EComment): void {
                        let arr = [];
                        arr.push(comment);
                        if (userComments != null && userComments !== undefined) {
                            arr = arr.concat(userComments);
                        }
                        setUserComments(arr);
                    }} typeP={"BATTLE"} />
                </CommentsMainHolder>
            }
            {
                isGold != 0 && <PostVoteButtons>
                    <SvgButton onClick={() => {
                        setShowComments(true);
                        if (comments == null || comments == undefined) fetcher('/battle/comment', page).then((res: any) => { setComments(res.data); }).catch((e) => e.error);
                    }}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPath d="m 6,3 h 24 c 1.65,0 3,1.35 3,3 V 33 L 27,27 H 6 C 4.35,27 3,25.65 3,24 V 6 C 3,4.35 4.35,3 6,3 Z m 0,21 h 21 l 3,3 V 6 H 6 Z" />
                        </svg>
                    </SvgButton>
                    <SvgButton style={{ width: '7rem', height: '7rem' }} onClick={nextBattle}>
                        <svg style={{ scale: '170%' }} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                            <StyledPath d="M24 40 8 24l2.1-2.1 12.4 12.4V8h3v26.3l12.4-12.4L40 24Z" />
                        </svg>
                    </SvgButton>
                    <ProfileHolder title={votedUser.username} onClick={() => {
                        router.push({
                            pathname: '/user/[username]',
                            query: { username: votedUser.username, id: votedUser.id },
                        });
                    }}>
                        <MiniProfilePic src={votedUser.avatarId} title={votedUser.username} anon={false}></MiniProfilePic>
                        <BoldText>{votedUser.username}</BoldText>
                    </ProfileHolder>
                </PostVoteButtons>
            }
            {
                selfBattle &&
                <SvgButton style={{ position: 'absolute', width: '12rem', bottom: '3.5rem', left: 'calc(50% - 6rem)', zIndex: '2' }} onClick={() => {
                    setShowComments(true);
                    if (comments == null || comments == undefined) fetcher('/battle/comment', page).then((res: any) => { setComments(res.data); }).catch((e) => e.error);
                }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <StyledPath d="m 6,3 h 24 c 1.65,0 3,1.35 3,3 V 33 L 27,27 H 6 C 4.35,27 3,25.65 3,24 V 6 C 3,4.35 4.35,3 6,3 Z m 0,21 h 21 l 3,3 V 6 H 6 Z" />
                    </svg>
                </SvgButton>
            }
            <HalfHolder isLeft={true} isReady={isGold == 1}>
                {
                    goldPost.type == "MEDIA" ?
                        goldPost.media?.type == "IMAGE" ?
                            <ImageHolder>
                                <Image unoptimized={true} src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + goldPost.media?.id} objectFit={'contain'} alt={'gold image'} layout='fill'></Image>
                            </ImageHolder>
                            :
                            <VideoHolder>
                                <StyledVideo controls={true}>
                                    <source src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + goldPost?.media?.id} />
                                </StyledVideo>
                            </VideoHolder>
                        :
                        // <div dangerouslySetInnerHTML={{__html: textHTML}} />
                        <EditorContent editor={editorGold} readOnly={true} />
                }
                <ButtonHolder isLeft={true}>
                    <ExpandedHolder>
                        <VoteButton isLeft={true} onClick={() => { fetcherVote(goldPost.id).then((res: any) => { setVotedUser(res.data.votedPost.poster); setIsGold(1) }).catch((e) => { }) }} disabled={isGold != 0 || selfBattle || disableVote}>
                            <StyledSvg width="49" height="54" viewBox="0 0 49 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M40.5 29.3369H38.6867L33.3533 34.6702H38.4467L43.1667 40.0036H5.83333L10.58 34.6702H16.0467L10.7133 29.3369H8.5L0.5 37.3369V48.0036C0.5 50.9369 2.87333 53.3369 5.80667 53.3369H43.1667C44.5812 53.3369 45.9377 52.775 46.9379 51.7748C47.9381 50.7746 48.5 49.4181 48.5 48.0036V37.3369L40.5 29.3369ZM43.1667 48.0036H5.83333V45.3369H43.1667V48.0036ZM22.74 34.7236C23.78 35.7636 25.46 35.7636 26.5 34.7236L43.46 17.7636C43.7072 17.5169 43.9033 17.2238 44.0372 16.9012C44.171 16.5786 44.2399 16.2328 44.2399 15.8836C44.2399 15.5343 44.171 15.1885 44.0372 14.8659C43.9033 14.5433 43.7072 14.2503 43.46 14.0036L30.26 0.803579C30.0194 0.55185 29.7307 0.351014 29.411 0.212986C29.0913 0.0749589 28.7472 0.00255349 28.399 6.63299e-05C28.0508 -0.00242083 27.7056 0.065061 27.384 0.198508C27.0624 0.331954 26.7708 0.528646 26.5267 0.776912L9.54 17.7636C9.29279 18.0103 9.09666 18.3033 8.96285 18.6259C8.82903 18.9485 8.76015 19.2943 8.76015 19.6436C8.76015 19.9928 8.82903 20.3386 8.96285 20.6612C9.09666 20.9838 9.29279 21.2769 9.54 21.5236L22.74 34.7236ZM28.3933 6.43025L37.8333 15.8702L24.6333 29.0702L15.1933 19.6302L28.3933 6.43025Z" />
                            </StyledSvg>
                            <BoldText>{selfBattle ? t2("votes") + " " + selfVotes : t2("vote")}</BoldText>
                        </VoteButton>
                    </ExpandedHolder>
                    {
                        showBurgerMenuG && <ReportMenu hasVoted={isGold != 0} isValidating={isValidating} userData={userData} reportedId={goldPost.id} close={() => { setShowBurgerMenuG(false); }} id={id} poster={"user" in goldPost ? goldPost.user : goldPost.poster}></ReportMenu>
                    }
                    <BurgerMenuButton onClick={() => { setShowBurgerMenuG(!showBurgerMenuG); }}>
                        <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPath d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" />
                        </svg>
                    </BurgerMenuButton>
                </ButtonHolder>
            </HalfHolder>
            <HalfHolder isLeft={false} isReady={isGold == 2}>
                {
                    redPost.type == "MEDIA" ?
                        redPost.media?.type == "IMAGE" ?
                            <ImageHolder>
                                <Image unoptimized={true} src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + redPost.media?.id} objectFit={'contain'} alt={'red image'} layout='fill'></Image>
                            </ImageHolder>
                            :
                            <VideoHolder>
                                <StyledVideo controls={true}>
                                    <source src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + redPost?.media?.id} />
                                </StyledVideo>
                            </VideoHolder>
                        :
                        // <div dangerouslySetInnerHTML={{__html: textHTML}} />
                        <EditorContent editor={editorRed} readOnly={true} />
                }
                <ButtonHolder isLeft={false}>
                    <ExpandedHolder>
                        <VoteButton isLeft={false} onClick={() => { fetcherVote(redPost.id).then((res: any) => { setVotedUser(res.data.votedPost.poster); setIsGold(2); }).catch((e) => { }) }} disabled={isGold != 0 || selfBattle || disableVote}>
                            <StyledSvg width="49" height="54" viewBox="0 0 49 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <StyledPath d="M40.5 29.3369H38.6867L33.3533 34.6702H38.4467L43.1667 40.0036H5.83333L10.58 34.6702H16.0467L10.7133 29.3369H8.5L0.5 37.3369V48.0036C0.5 50.9369 2.87333 53.3369 5.80667 53.3369H43.1667C44.5812 53.3369 45.9377 52.775 46.9379 51.7748C47.9381 50.7746 48.5 49.4181 48.5 48.0036V37.3369L40.5 29.3369ZM43.1667 48.0036H5.83333V45.3369H43.1667V48.0036ZM22.74 34.7236C23.78 35.7636 25.46 35.7636 26.5 34.7236L43.46 17.7636C43.7072 17.5169 43.9033 17.2238 44.0372 16.9012C44.171 16.5786 44.2399 16.2328 44.2399 15.8836C44.2399 15.5343 44.171 15.1885 44.0372 14.8659C43.9033 14.5433 43.7072 14.2503 43.46 14.0036L30.26 0.803579C30.0194 0.55185 29.7307 0.351014 29.411 0.212986C29.0913 0.0749589 28.7472 0.00255349 28.399 6.63299e-05C28.0508 -0.00242083 27.7056 0.065061 27.384 0.198508C27.0624 0.331954 26.7708 0.528646 26.5267 0.776912L9.54 17.7636C9.29279 18.0103 9.09666 18.3033 8.96285 18.6259C8.82903 18.9485 8.76015 19.2943 8.76015 19.6436C8.76015 19.9928 8.82903 20.3386 8.96285 20.6612C9.09666 20.9838 9.29279 21.2769 9.54 21.5236L22.74 34.7236ZM28.3933 6.43025L37.8333 15.8702L24.6333 29.0702L15.1933 19.6302L28.3933 6.43025Z" />
                            </StyledSvg>
                            <BoldText>{selfBattle ? t2("votes") + " " + otherVotes : t2("vote")}</BoldText>
                        </VoteButton>
                    </ExpandedHolder>
                    {
                        showBurgerMenuR && <ReportMenu hasVoted={isGold != 0} isValidating={isValidating} userData={userData} reportedId={redPost.id} close={() => { setShowBurgerMenuR(false); }} id={id} poster={"user" in redPost ? redPost.user : redPost.poster}></ReportMenu>
                    }
                    <BurgerMenuButton onClick={() => { setShowBurgerMenuR(!showBurgerMenuR); }}>
                        <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPath d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" />
                        </svg>
                    </BurgerMenuButton>
                </ButtonHolder>
            </HalfHolder>
        </MainHolder>
    );
}
interface ReportMenuProps {
    reportedId: string,
    id: string,
    close: () => void,
    poster: ENonSelfUser | undefined | null,
    userData: any,
    isValidating: boolean,
    hasVoted: boolean
}
function ReportMenu({ reportedId, id, close, poster, userData, isValidating, hasVoted }: ReportMenuProps) {
    const [showReports, setShowReports] = useState(false);
    const [t3] = useTranslation("burgerMenu");
    const [t2] = useTranslation("battle");
    const fetcherDelete = (url: string, id: string) => instance.delete(url, { params: { id: id } });

    return (
        <ButgerMenuHolder>
            {poster != undefined && poster != null && <MiniProfile src={poster.avatarId} name={poster.username} handleClick={() => {
                router.push({
                    pathname: '/user/[username]',
                    query: { username: poster.username, id: poster.id },
                })
            }} anon={false}></MiniProfile>}
            <ExpandedButton onClick={() => { 
                if(!hasVoted) {
                    alert(t2("voteReport"));
                    return;
                }
                setShowReports(!showReports); 
                }}>{t2("report")}</ExpandedButton>
            {!isValidating &&
                <>{
                    userData.roles.includes("ROLE_ADMIN") &&
                    <ExpandedButton style={{ color: 'red' }} onClick={() => { fetcherDelete('/admin/post', id).then(() => { alert(t3("deledPost")) }) }}>{t3("delete")}</ExpandedButton>
                }</>
            }
            {showReports &&
                <>
                    <ExpandedButton onClick={() => {
                        instance.post('/battle/report', {
                            "reason": Reasons.NSFW_CONTENT,
                            "postId": reportedId,
                            "battleId": id,
                            other: undefined
                        }).then(() => {
                            close();
                            alert(t3("successReport"));
                        }).catch((e) => { console.log(id); console.log(e) })
                    }}>{t3("nsfwContent")}</ExpandedButton>
                    <ExpandedButton onClick={() => {
                        instance.post('/battle/report', {
                            "reason": Reasons.ADVERTISING,
                            "postId": reportedId,
                            "battleId": id,
                            other: undefined
                        }).then(() => {
                            close();;
                            alert(t3("successReport"));
                        })
                    }}>{t3("advertising")}</ExpandedButton>
                    <ExpandedButton onClick={() => {
                        instance.post('/battle/report', {
                            "reason": Reasons.VIOLENCE,
                            "postId": reportedId,
                            "battleId": id,
                            other: undefined
                        }).then(() => {
                            close();
                            alert(t3("successReport"));
                        })
                    }}>{t3("violence")}</ExpandedButton>
                    <ExpandedButton onClick={() => {
                        instance.post('/battle/report', {
                            "reason": Reasons.HARASSMENT,
                            "postId": reportedId,
                            "battleId": id,
                            other: undefined
                        }).then(() => {
                            close();
                            alert(t3("successReport"));
                        })
                    }}>{t3("harassment")}</ExpandedButton>
                    <ExpandedButton onClick={() => {
                        instance.post('/battle/report', {
                            "reason": Reasons.HATE_SPEECH,
                            "postId": reportedId,
                            "battleId": id,
                            other: undefined
                        }).then(() => {
                            close();
                            alert(t3("successReport"));
                        })
                    }}>{t3("hateSpeech")}</ExpandedButton>
                    <ExpandedButton onClick={() => {
                        instance.post('/battle/report', {
                            "reason": Reasons.TERRORISM,
                            "postId": reportedId,
                            "battleId": id,
                            other: undefined
                        }).then(() => {
                            close();
                            alert(t3("successReport"));
                        })
                    }}>{t3("terrorism")}</ExpandedButton>
                    <ExpandedButton onClick={() => {
                        instance.post('/battle/report', {
                            "reason": Reasons.SPAM,
                            "postId": reportedId,
                            "battleId": id,
                            other: undefined
                        }).then(() => {
                            close();
                            alert(t3("successReport"));
                        })
                    }}>{t3("spam")}</ExpandedButton>
                    <ExpandedButton onClick={() => {
                        instance.post('/battle/report', {
                            "reason": Reasons.IDENTITY_REVEAL,
                            "postId": reportedId,
                            "battleId": id,
                            other: undefined
                        }).then(() => {
                            close();
                            alert(t3("successReport"));
                        })
                    }}>{t3("identityReveal")}</ExpandedButton>
                    <ExpandedButton onClick={() => {
                        let other = prompt(t3("enterReason"))
                        if (other != undefined) instance.post('/battle/report', {
                            "reason": Reasons.SPAM,
                            "postId": reportedId,
                            "battleId": id,
                            other: other
                        }).then(() => {
                            close();
                            alert(t3("successReport"));
                        })
                    }}>{t3("other")}</ExpandedButton>
                </>
            }
            <ExpandedButton onClick={() => {
                close();
            }}>{t3("close")}</ExpandedButton>
        </ButgerMenuHolder>
    )
}




export default Battle;