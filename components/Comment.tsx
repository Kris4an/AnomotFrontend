import { useTranslation } from "next-i18next";
import router from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../axios_instance";
import Button from "./Button";
import CommentInput from "./CommentInput";
import { EComment } from "./Intefaces";
import MiniPostHeader from "./MiniPostHeader";
import useUser from "./useUser";


const MainHolder = styled.div`
    max-width: 50rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    border-left: solid 1px ${props => props.theme.colors.primary};
    position: relative;

    @media (max-width: 840px) {
        width: 90vw;
    }
`;
const CommentText = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 150%;
    color: ${props => props.theme.colors.text};
    margin-top: 10px;
`;
const InfoText = styled(CommentText)`
    color: ${props => props.theme.colors.inputPlaceholder};
`;
const InfoHolder = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;
const ButtonsHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    top: 0px;
    right: 5px;
`
const BurgerMenuButton = styled.button`
    background-color: transparent;
    border: none;
    width: min-content;
    height: fit-content;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0px;
    position: relative;
`;
const BurgerMenuHolder = styled.div`
    right: 0px;
    top: 20px;
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
const StyledPath = styled.path`
    fill: ${props => props.theme.colors.primary};
`;
const Likes = styled.span`
    color: ${props => props.theme.colors.primary};
    font-size: 16px;
    line-height: 16px;
    font-family: 'Roboto';
    text-decoration-color: cc;

    &:hover {
        text-decoration: underline;
    }
`;
const StyledSVG = styled.svg`
    position: relative;
    scale: 50%;
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
    comment: EComment
}
function Comment({ comment }: Props) {
    const [t1] = useTranslation("burgerMenu");
    const [showBurgerMenu, setShowBurgerMenu] = useState(false);
    const fetcherDelete = (url: string, id: any) => instance.delete(url, { params: { id: id } });
    const [isDeleted, setIsDeleted] = useState(false);
    const { user: userData, isError: userDataError } = useUser();
    const [selfPost, setSelfPost] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [liked, setLiked] = useState<boolean>();
    const fetcherPost = (url: string, id: any) => instance.post(url, null, { params: { id: id } });
    const [showReports, setShowReports] = useState(false);
    const fetcherReport = (url: string, id: string, reason: string, other: string | undefined) => instance.post(url, {
        "commentId": id,
        "reason": reason,
        "other": other
    })

    useEffect(() => {
        if (comment.commenter == undefined) {
            setSelfPost(false)
            return;
        }

        if (userData !== undefined) setSelfPost(comment.commenter.id == userData.id)
    }, [userData])

    useEffect(() => {
        setLiked(comment.hasUserLiked);
    }, [])

    if (comment === undefined || isDeleted) return (<></>);
    return (
        <MainHolder>
            <ButtonsHolder>
                <BurgerMenuButton onClick={() => { setShowBurgerMenu(!showBurgerMenu); setShowReports(false) }}>
                    <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <StyledPath d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z" />
                    </svg>
                </BurgerMenuButton>
                <BurgerMenuButton style={{ left: '10px' }} onClick={() => {
                    switch (liked) {
                        case true: {
                            fetcherPost('/comment/unlike', comment.id).then(() => { setLiked(false); })
                            break;
                        }
                        case false: {
                            fetcherPost('/comment/like', comment.id).then(() => { setLiked(true); })
                            break;
                        }
                    }
                }}>
                    <Likes>{Number(comment.likes) + (liked ? 1 : 0) - (comment.hasUserLiked ? 1 : 0)}</Likes>
                    <StyledSVG xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                        {
                            liked ?
                                <StyledPath d="m20 34.958-1.958-1.75q-4.334-3.958-7.167-6.833t-4.521-5.146Q4.667 18.958 4 17.104t-.667-3.771q0-3.791 2.563-6.354 2.562-2.562 6.312-2.562 2.334 0 4.334 1.062 2 1.063 3.458 3.021 1.625-2.042 3.583-3.062 1.959-1.021 4.209-1.021 3.75 0 6.312 2.562 2.563 2.563 2.563 6.354 0 1.917-.667 3.771-.667 1.854-2.354 4.125-1.688 2.271-4.521 5.146t-7.167 6.833Z" />
                                :
                                <StyledPath d="m20 34.958-1.958-1.75q-4.334-3.958-7.167-6.833t-4.521-5.146Q4.667 18.958 4 17.104t-.667-3.771q0-3.791 2.563-6.354 2.562-2.562 6.312-2.562 2.334 0 4.334 1.062 2 1.063 3.458 3.021 1.625-2.042 3.583-3.062 1.959-1.021 4.209-1.021 3.75 0 6.312 2.562 2.563 2.563 2.563 6.354 0 1.917-.667 3.771-.667 1.854-2.354 4.125-1.688 2.271-4.521 5.146t-7.167 6.833Zm0-3.666q4.125-3.792 6.812-6.5 2.688-2.709 4.25-4.73 1.563-2.02 2.188-3.604.625-1.583.625-3.125 0-2.666-1.708-4.395-1.709-1.73-4.375-1.73-2.084 0-3.854 1.23-1.771 1.229-2.73 3.395h-2.416q-.959-2.125-2.73-3.375-1.77-1.25-3.854-1.25-2.666 0-4.375 1.73-1.708 1.729-1.708 4.395 0 1.584.625 3.167.625 1.583 2.188 3.625 1.562 2.042 4.25 4.729 2.687 2.688 6.812 6.438Zm0-12.042Z" />
                        }
                    </StyledSVG>
                </BurgerMenuButton>
            </ButtonsHolder>

            {
                showBurgerMenu &&
                <BurgerMenuHolder>
                    {
                        selfPost ?
                            <>
                                <Button buttonType={"Teriatary"} text={t1("delete")} style={{ color: 'red' }} handleClick={function (): void {
                                    if (!isDeleted) fetcherDelete('/comment', comment.id).then(() => { setIsDeleted(true); alert(t1("deleteCommmet")); })
                                }}></Button>
                                <Button buttonType={"Teriatary"} text={t1("edit")} handleClick={function (): void {
                                    setEditMode(true);
                                    setShowBurgerMenu(false);
                                    setShowReports(false);
                                }}></Button>
                            </>
                            :
                            <>
                                <Button buttonType={"Teriatary"} text={t1("report")} handleClick={function (): void {
                                    setShowReports(!showReports);
                                }}></Button>
                                {
                                    userData.roles.includes("ROLE_ADMIN") &&
                                    <>
                                        <Button buttonType={"Teriatary"} text={t1("delete")} style={{ color: 'red' }} handleClick={function (): void {
                                            if (!isDeleted) fetcherDelete('/admin/comment', comment.id).then(() => { setIsDeleted(true); alert(t1("deleteCommmet")); })
                                        }}></Button>
                                    </>

                                }
                                {
                                    showReports &&
                                    <>
                                        <Button buttonType={"Teriatary"} text={t1("spam")} handleClick={function (): void {
                                            fetcherReport('/comment/report', comment.id, Reasons.SPAM, undefined).then(() => {
                                                setShowBurgerMenu(false);
                                                setShowReports(false);
                                                alert(t1("successReport"));
                                            }).catch((e: any) => { })
                                        }}></Button>
                                        <Button buttonType={"Teriatary"} text={t1("terrorism")} handleClick={function (): void {
                                            fetcherReport('/comment/report', comment.id, Reasons.TERRORISM, undefined).then(() => {
                                                setShowBurgerMenu(false);
                                                setShowReports(false);
                                                alert(t1("successReport"));
                                            }).catch((e: any) => { })
                                        }}></Button>
                                        <Button buttonType={"Teriatary"} text={t1("hateSpeech")} handleClick={function (): void {
                                            fetcherReport('/comment/report', comment.id, Reasons.HATE_SPEECH, undefined).then(() => {
                                                setShowBurgerMenu(false);
                                                setShowReports(false);
                                                alert(t1("successReport"));
                                            }).catch((e: any) => { })
                                        }}></Button>
                                        <Button buttonType={"Teriatary"} text={t1("harassment")} handleClick={function (): void {
                                            fetcherReport('/comment/report', comment.id, Reasons.HARASSMENT, undefined).then(() => {
                                                setShowBurgerMenu(false);
                                                setShowReports(false);
                                                alert(t1("successReport"));
                                            }).catch((e: any) => { })
                                        }}></Button>
                                        <Button buttonType={"Teriatary"} text={t1("violence")} handleClick={function (): void {
                                            fetcherReport('/comment/report', comment.id, Reasons.VIOLENCE, undefined).then(() => {
                                                setShowBurgerMenu(false);
                                                setShowReports(false);
                                                alert(t1("successReport"));
                                            }).catch((e: any) => { })
                                        }}></Button>
                                        <Button buttonType={"Teriatary"} text={t1("advertising")} handleClick={function (): void {
                                            fetcherReport('/comment/report', comment.id, Reasons.ADVERTISING, undefined).then(() => {
                                                setShowBurgerMenu(false);
                                                setShowReports(false);
                                                alert(t1("successReport"));
                                            }).catch((e: any) => { })
                                        }}></Button>
                                        <Button buttonType={"Teriatary"} text={t1("nsfwContent")} handleClick={function (): void {
                                            fetcherReport('/comment/report', comment.id, Reasons.NSFW_CONTENT, undefined).then(() => {
                                                setShowBurgerMenu(false);
                                                setShowReports(false);
                                                alert(t1("successReport"));
                                            }).catch((e: any) => { })
                                        }}></Button>
                                        <Button buttonType={"Teriatary"} text={t1("identityReveal")} handleClick={function (): void {
                                            fetcherReport('/comment/report', comment.id, Reasons.IDENTITY_REVEAL, undefined).then(() => {
                                                setShowBurgerMenu(false);
                                                setShowReports(false);
                                                alert(t1("successReport"));
                                            }).catch((e: any) => { })
                                        }}></Button>
                                        <Button buttonType={"Teriatary"} text={t1("other")} handleClick={function (): void {
                                            let other = prompt(t1("enterReason"));
                                            if (other != undefined) {
                                                if (other.length > 1000) other = other.substring(0, 999);
                                                fetcherReport('/comment/report', comment.id, Reasons.SPAM, other).then(() => {
                                                    setShowBurgerMenu(false);
                                                    setShowReports(false);
                                                    alert(t1("successReport"));
                                                }).catch((e: any) => { })
                                            }
                                        }}></Button>
                                    </>
                                }
                            </>

                    }
                    <Button buttonType={"Teriatary"} text={t1("close")} handleClick={function (): void {
                        setShowBurgerMenu(false);
                    }}></Button>
                </BurgerMenuHolder>
            }
            {
                comment.text != null && comment.commenter != null ?
                    <MiniPostHeader name={comment.commenter!.username} date={comment.lastChangeDate!} src={comment.commenter!.avatarId!} id={comment.commenter.id}></MiniPostHeader>
                    :
                    <MiniPostHeader anon={true} name={""} date={comment.lastChangeDate!} src={null} id={""}></MiniPostHeader>
            }
            <InfoHolder>
                {comment.isEdited && <InfoText>{t1("edited")}</InfoText>}
                {comment.text == null && <InfoText>{t1("deleted")}</InfoText>}
            </InfoHolder>
            {editMode ?
                <CommentInput id={comment.id} typeP={"EDIT"} text={comment.text + ""} style={{ marginTop: '0.5rem', border: '1px solid' }} userComment={function (newComment: EComment): void {
                    comment.text = newComment.text;
                    comment.lastChangeDate = newComment.lastChangeDate;
                    setEditMode(false);
                }}></CommentInput>
                :
                <CommentText>{comment.text}</CommentText>
            }
        </MainHolder>
    )
}

export default Comment;