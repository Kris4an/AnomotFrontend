interface EComment{
    text: string  | null,
    commenter: NonSelfUser | null,
    isEdited: boolean,
    responseCount: number | null,
    likes: number,
    hasUserLiked: boolean,
    lastChangeDate: string,
    id: string
}
interface NonSelfUser{
    username: string,
    id: string,
    avatarId: string
} 

export default EComment;