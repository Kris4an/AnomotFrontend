interface EComment{
    text: string  | null,
    commenter: ENonSelfUser | null,
    isEdited: boolean,
    responseCount: number | null,
    likes: number,
    hasUserLiked: boolean,
    lastChangeDate: string,
    id: string
}
interface ENonSelfUser{
    username: string,
    id: string,
    avatarId: string | null
}
interface EBattlePost {
    id: string,
    type: string,
    text: string | null,
    media: EMediaPost | null,
    user: ENonSelfUser
}
interface EMediaPost {
    id: string,
    type: string
}
interface EPost {
    type: string,
    text: string | null,
    media: EMediaPost | null,
    poster: ENonSelfUser | null,
    likes: number | null,
    hasUserLiked: boolean | null,
    creationDate: string,
    id: string
}
interface ESelfBattle {
    selfPost: EPost,
    otherPost: EPost,
    selfVotes: number,
    otherVotes: number,
    isFinished: boolean,
    until: string,
    id: string
}
interface ENotification {
    id: string,
    type: string,
    read: boolean,
    payload: string
}
interface EVotedBattle{
    votedPost: EPost,
    otherPost: EBattlePost,
    votesForVoted: number,
    votesForOther: number,
    isFinished: boolean,
    id: string
}
interface ESimilarPosts {
    media: EMediaPost,
    similarPosts: EPost[],
    appealJwt: string
}
interface ENsfwError {
    id: string,
    type: string,
    appealJwt: string
}
interface EAdminBattle {
    id: string,
    goldPost: EPost,
    redPost: EPost,
    goldVotes: number,
    redVotes: number,
    isFinished: boolean,
    until: string
}
interface EReportTicket{
    reportType: string,
    post: EPost | null,
    battle: EAdminBattle | null,
    user: ENonSelfUser,
    isDecided: boolean,
    decisions: number,
    creationDate: string,
    id: string,
    comment: EComment
}
interface EAdminAppeal {
    id: string,
    appealedBy: ENonSelfUser,
    reason: string,
    objective: string,
    media: EMediaPost,
    similarPosts: EPost[],
    decidedBy: boolean,
    decision: string,
    explanation: string,
    creationDate: string
}

export type {
    EComment,
    ENonSelfUser,
    EBattlePost,
    EPost,
    ESelfBattle,
    ENotification,
    EVotedBattle,
    EMediaPost,
    ESimilarPosts,
    ENsfwError,
    EReportTicket,
    EAdminAppeal
};