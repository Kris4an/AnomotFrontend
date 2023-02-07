import { useTranslation } from "next-i18next";
import styled from "styled-components";
import EComment from "./EComment";
import MiniPostHeader from "./MiniPostHeader";


const MainHolder = styled.div`
    width: 35rem;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    border-left: solid 1px ${props => props.theme.colors.primary};
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

interface Props {
    comment: EComment
}
function Comment({comment}:Props){
    const [t1] = useTranslation("common");
    return(
        <MainHolder>
            {   
                comment.text!=null && comment.commenter!=null? 
                <MiniPostHeader name={comment.commenter!.username} date={comment.lastChangeDate!} src={comment.commenter!.avatarId!}></MiniPostHeader>
                :
                <MiniPostHeader anon={true} name={""} date={comment.lastChangeDate!} src={null}></MiniPostHeader>
            }
            <InfoHolder>
                {comment.isEdited && <InfoText>{t1("edited")}</InfoText>}
                {comment.text == null && <InfoText>{t1("deleted")}</InfoText>}
            </InfoHolder>
            <CommentText>{comment.text}</CommentText>
        </MainHolder>
    )
}

export default Comment;