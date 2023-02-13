import { useTranslation } from "next-i18next";
import styled from "styled-components";
import Button from "./Button";
import Image from "next/image";

const Holder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
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
    position: relative;
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
interface ContainerProps {
    typeP: boolean
}
const FollowersContainer = styled.button<ContainerProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background-color: transparent;
    border: none;
    cursor: ${props => props.typeP ? 'pointer' : 'default'};
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
const ButtonHolder = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
type Props = {
    type: boolean,
    handleClick1: any,
    handleClick2?: any,
    handleClickFollowers?: any,
    handleClickFollowing?: any,
    followingCount: any,
    followersCount: any,
    username: string,
    src: string | null | undefined,
    followed?: boolean
}
const StyledSvg = styled.svg`
    position: absolute;
    top: 0px;
    left: 4px;
`;


function ProfilePic({ type, handleClick1, handleClick2, handleClickFollowing, handleClickFollowers, followingCount, followersCount, username, src, followed }: Props) {
    const [t2] = useTranslation("account");
    switch (type) {
        case true: {
            return (
                <Holder>
                    <Holder2>
                        <Pic>
                            {src != undefined && src != null && src != "null" ?
                                <Image src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + src} height={128} width={128} objectFit={'cover'} className={'profilePicBig'}></Image>
                                :
                                <StyledSvg width="120" height="120" viewBox="0 0 198 275" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 43.5792L8.43988 40.0427C69.3165 14.5335 138.117 15.817 198 43.5792V97.1767V176C198 230.676 153.676 275 99 275C44.3238 275 0 230.676 0 176V97.1767V43.5792Z" fill="#29335C" />
                                    <rect x="136" y="101" width="29" height="18" rx="5" fill="#F3A712" />
                                    <rect x="43" y="100.5" width="29" height="18" rx="5" fill="#F3A712" />
                                    <path d="M26 185C26 198.791 33.7437 212.018 47.5276 221.77C61.3116 231.521 80.0066 237 99.5 237C118.993 237 137.688 231.521 151.472 221.77C165.256 212.018 173 198.791 173 185L99.5 185L26 185Z" fill="#F3A712" />
                                </StyledSvg>
                            }
                        </Pic>
                        <Info>
                            <UserNameText>{username}</UserNameText>
                            <FollowersMainContainer>
                                <FollowersContainer typeP={true} onClick={handleClickFollowing}>
                                    <FollowerNumberText>{followingCount}</FollowerNumberText>
                                    <FollowerText>{t2("following")}</FollowerText>
                                </FollowersContainer>
                                <FollowersContainer typeP={true} onClick={handleClickFollowers}>
                                    <FollowerNumberText>{followersCount}</FollowerNumberText>
                                    <FollowerText>{t2("followers")}</FollowerText>
                                </FollowersContainer>
                            </FollowersMainContainer>
                        </Info>
                    </Holder2>
                    <ButtonHolder>
                        <Button buttonType={"Solid"} text={t2("customizeProfile")} style={{ width: '30rem' }} handleClick={handleClick1}></Button>
                        <Button buttonType={"Secondary"} text={t2("generateCode")} style={{ width: '20rem' }} handleClick={handleClick2}></Button>
                    </ButtonHolder>

                </Holder>
            )
        }
        case false: {
            return (
                <Holder style={{ width: 'auto' }}>
                    <Holder2>
                        <Pic>
                            {src != undefined && src != null && src != "null" ?
                                <Image src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + src} height={128} width={128} objectFit={'cover'} className={'profilePicBig'}></Image>
                                :
                                <StyledSvg width="120" height="120" viewBox="0 0 198 275" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 43.5792L8.43988 40.0427C69.3165 14.5335 138.117 15.817 198 43.5792V97.1767V176C198 230.676 153.676 275 99 275C44.3238 275 0 230.676 0 176V97.1767V43.5792Z" fill="#29335C" />
                                    <rect x="136" y="101" width="29" height="18" rx="5" fill="#F3A712" />
                                    <rect x="43" y="100.5" width="29" height="18" rx="5" fill="#F3A712" />
                                    <path d="M26 185C26 198.791 33.7437 212.018 47.5276 221.77C61.3116 231.521 80.0066 237 99.5 237C118.993 237 137.688 231.521 151.472 221.77C165.256 212.018 173 198.791 173 185L99.5 185L26 185Z" fill="#F3A712" />
                                </StyledSvg>
                            }
                        </Pic>
                        <Info>
                            <UserNameText>{username}</UserNameText>
                            <FollowersMainContainer>
                                <FollowersContainer typeP={false} onClick={handleClickFollowing}>
                                    <FollowerNumberText>{followingCount}</FollowerNumberText>
                                    <FollowerText>{t2("following")}</FollowerText>
                                </FollowersContainer>
                                <FollowersContainer typeP={false} onClick={handleClickFollowers}>
                                    <FollowerNumberText>{followersCount}</FollowerNumberText>
                                    <FollowerText>{t2("followers")}</FollowerText>
                                </FollowersContainer>
                            </FollowersMainContainer>
                        </Info>
                    </Holder2>
                    <ButtonHolder>
                        <Button buttonType={followed ? "Secondary" : "Solid"} text={followed ? t2("unfollow") : t2("follow")} style={{ width: '30rem' }} handleClick={handleClick1}></Button>
                        {/* <Button buttonType={"Secondary"} text={t2("message")} style={{ width: '20rem' }} handleClick={handleClick2}></Button> */}
                    </ButtonHolder>

                </Holder>
            )
        }

    }

}



export default ProfilePic;