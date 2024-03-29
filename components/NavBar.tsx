import Link from "next/link";
import styled from "styled-components";
import useUser from "./useUser";

const Holder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-right: 1px solid ${props => props.theme.colors.primary};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    height: 100vh;
    width: 48px;
    padding: 10px 5px;
    
    @media (max-width: 840px) {
        flex-direction: row;
        width: 100vw;
        height: fit-content;
        border-right: none;
        border-top: 1px solid ${props => props.theme.colors.primary};
        padding: 4px 2px;
    }
`;
const MainHolder = styled.div`
    display: flex;
    width: 100vw;
    max-width: 100%;
    height: 100vh;

    @media (max-width: 840px) {
        flex-direction: column-reverse;
    }
`;
const StyledSVG = styled.svg`
    &:hover{
        cursor: pointer;
    }
`;
interface PathProps {
    isSelected: boolean
}
const StyledPathFill = styled.path<PathProps>`
    fill: ${props => props.isSelected ? props.theme.colors.primary : props.theme.colors.navBarSecondary};
`;
const StyledPathStroke = styled.path<PathProps>`
    stroke: ${props => props.isSelected ? props.theme.colors.primary : props.theme.colors.navBarSecondary};
`;

type Props = {
    stage: number
    children?: any
}
function NavBar({ children, stage }: Props) {
    const { user: userData, isError: userDataError, isValidating: isValidating } = useUser();
    return (
        <MainHolder>
            <Holder>
                <Link href='/battles'>
                    <a>
                        <StyledSVG width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPathStroke isSelected={stage == 0} d="M21.75 26.25L4.5 9V4.5H9L26.25 21.75M19.5 28.5L28.5 19.5M24 24L30 30M28.5 31.5L31.5 28.5M21.75 9.75L27 4.5H31.5V9L26.25 14.25M7.5 21L13.5 27M10.5 25.5L6 30M4.5 28.5L7.5 31.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </StyledSVG>
                    </a>
                </Link>

                <Link href='/feed'>
                    <a>
                        <StyledSVG width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPathFill isSelected={stage == 1} d="M9.792 11.625C9.792 11.9234 9.67347 12.2095 9.46249 12.4205C9.25152 12.6315 8.96537 12.75 8.667 12.75C8.36863 12.75 8.08248 12.6315 7.8715 12.4205C7.66053 12.2095 7.542 11.9234 7.542 11.625C7.542 11.3266 7.66053 11.0405 7.8715 10.8295C8.08248 10.6185 8.36863 10.5 8.667 10.5C8.96537 10.5 9.25152 10.6185 9.46249 10.8295C9.67347 11.0405 9.792 11.3266 9.792 11.625ZM8.6715 22.5C8.37313 22.5 8.08698 22.6185 7.87601 22.8295C7.66503 23.0405 7.5465 23.3266 7.5465 23.625C7.5465 23.9234 7.66503 24.2095 7.87601 24.4205C8.08698 24.6315 8.37313 24.75 8.6715 24.75H16.1715C16.4699 24.75 16.756 24.6315 16.967 24.4205C17.178 24.2095 17.2965 23.9234 17.2965 23.625C17.2965 23.3266 17.178 23.0405 16.967 22.8295C16.756 22.6185 16.4699 22.5 16.1715 22.5H8.6715ZM7.5465 17.625C7.5465 17.3266 7.66503 17.0405 7.87601 16.8295C8.08698 16.6185 8.37313 16.5 8.6715 16.5H16.1715C16.3192 16.5 16.4655 16.5291 16.602 16.5856C16.7385 16.6422 16.8625 16.725 16.967 16.8295C17.0715 16.934 17.1543 17.058 17.2109 17.1945C17.2674 17.331 17.2965 17.4773 17.2965 17.625C17.2965 17.7727 17.2674 17.919 17.2109 18.0555C17.1543 18.192 17.0715 18.316 16.967 18.4205C16.8625 18.525 16.7385 18.6078 16.602 18.6644C16.4655 18.7209 16.3192 18.75 16.1715 18.75H8.6715C8.37313 18.75 8.08698 18.6315 7.87601 18.4205C7.66503 18.2095 7.5465 17.9234 7.5465 17.625ZM22.5 31.5C23.1853 31.4953 23.8481 31.2545 24.3765 30.8181C24.9049 30.3818 25.2668 29.7766 25.401 29.1045L26.121 25.5H30.375C31.0712 25.5 31.7389 25.2234 32.2312 24.7312C32.7234 24.2389 33 23.5712 33 22.875V13.8915C33 12.9949 32.645 12.1347 32.0125 11.4992C31.38 10.8636 30.5216 10.5044 29.625 10.5V10.494H21.75V7.875C21.75 6.97989 21.3944 6.12145 20.7615 5.48851C20.1285 4.85558 19.2701 4.5 18.375 4.5H6.375C5.47989 4.5 4.62145 4.85558 3.98851 5.48851C3.35558 6.12145 3 6.97989 3 7.875V26.625C3 27.9179 3.51361 29.1579 4.42785 30.0721C5.34209 30.9864 6.58207 31.5 7.875 31.5H22.5ZM5.25 7.875C5.25 7.57663 5.36853 7.29048 5.5795 7.0795C5.79048 6.86853 6.07663 6.75 6.375 6.75H18.375C18.6734 6.75 18.9595 6.86853 19.1705 7.0795C19.3815 7.29048 19.5 7.57663 19.5 7.875V28.521C19.5 28.7715 19.53 29.016 19.59 29.25H7.875C7.17881 29.25 6.51113 28.9734 6.01884 28.4812C5.52656 27.9889 5.25 27.3212 5.25 26.625V7.875ZM21.75 12.744H26.415C26.3592 12.9015 26.3151 13.063 26.283 13.227L23.1945 28.6635C23.1597 28.8416 23.0598 29.0003 22.9143 29.1087C22.7687 29.217 22.588 29.2672 22.4074 29.2494C22.2269 29.2315 22.0594 29.147 21.9378 29.0123C21.8163 28.8776 21.7493 28.7024 21.75 28.521V12.744ZM28.488 13.668C28.5423 13.3888 28.6988 13.1399 28.927 12.9701C29.1551 12.8003 29.4385 12.7218 29.7215 12.7499C30.0045 12.7781 30.2669 12.9109 30.4571 13.1223C30.6473 13.3338 30.7518 13.6086 30.75 13.893V22.875C30.75 22.9745 30.7105 23.0698 30.6402 23.1402C30.5698 23.2105 30.4745 23.25 30.375 23.25H26.5725L28.488 13.668Z" />
                        </StyledSVG>
                    </a>
                </Link>

                <Link href='/create?s=0'>
                    <a>
                        <StyledSVG width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPathFill isSelected={stage == 2} d="M24.4688 16.875H19.125V11.5312C19.125 11.3766 18.9984 11.25 18.8438 11.25H17.1562C17.0016 11.25 16.875 11.3766 16.875 11.5312V16.875H11.5312C11.3766 16.875 11.25 17.0016 11.25 17.1562V18.8438C11.25 18.9984 11.3766 19.125 11.5312 19.125H16.875V24.4688C16.875 24.6234 17.0016 24.75 17.1562 24.75H18.8438C18.9984 24.75 19.125 24.6234 19.125 24.4688V19.125H24.4688C24.6234 19.125 24.75 18.9984 24.75 18.8438V17.1562C24.75 17.0016 24.6234 16.875 24.4688 16.875Z" />
                            <StyledPathFill isSelected={stage == 2} d="M18 2.25C9.30234 2.25 2.25 9.30234 2.25 18C2.25 26.6977 9.30234 33.75 18 33.75C26.6977 33.75 33.75 26.6977 33.75 18C33.75 9.30234 26.6977 2.25 18 2.25ZM18 31.0781C10.7789 31.0781 4.92188 25.2211 4.92188 18C4.92188 10.7789 10.7789 4.92188 18 4.92188C25.2211 4.92188 31.0781 10.7789 31.0781 18C31.0781 25.2211 25.2211 31.0781 18 31.0781Z" />
                        </StyledSVG>
                    </a>
                </Link>

                <Link href='/account'>
                    <a>
                        <StyledSVG width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPathStroke isSelected={stage == 3} d="M18 31.5C13.6742 31.5 9.82122 29.4616 7.34996 26.2937L7.63583 26.6381C10.527 30.121 14.5776 31.5 18 31.5ZM18 31.5C22.3258 31.5 26.1788 29.4616 28.6501 26.2937L28.3642 26.6381C25.473 30.121 21.4224 31.5 18 31.5ZM7.86409 24.4999L6.7119 25.4039C5.3137 23.2775 4.5 20.7331 4.5 18C4.5 10.5484 10.5484 4.5 18 4.5C25.4516 4.5 31.5 10.5484 31.5 18C31.5 20.7331 30.6863 23.2775 29.2881 25.4039L28.1359 24.4999C25.2789 22.2583 21.7605 21.0278 18.1317 20.9987C21.7946 20.9284 24.75 17.9294 24.75 14.25C24.75 10.5266 21.7234 7.5 18 7.5C14.2766 7.5 11.25 10.5266 11.25 14.25C11.25 17.9294 14.2054 20.9284 17.8683 20.9987C14.2395 21.0278 10.7211 22.2583 7.86409 24.4999Z" stroke={stage == 3 ? '#29335C' : '#69708D'} strokeWidth="3" />
                        </StyledSVG>
                    </a>
                </Link>

                <Link href='/chat'>
                    <a>
                        <StyledSVG width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPathFill isSelected={stage == 4} d="M30 3H6C4.35 3 3 4.35 3 6V33L9 27H30C31.65 27 33 25.65 33 24V6C33 4.35 31.65 3 30 3ZM30 24H9L6 27V6H30V24Z" />
                        </StyledSVG>
                    </a>
                </Link>

                {!isValidating && userData != undefined &&
                    <>
                        {
                            userData.roles.includes("ROLE_ADMIN") &&
                            <Link href='/admin'>
                                <a>
                                    <StyledSVG xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36">
                                        <StyledPathFill isSelected={stage == 5} d="M680 776q25 0 42.5-17.5T740 716q0-25-17.5-42.5T680 656q-25 0-42.5 17.5T620 716q0 25 17.5 42.5T680 776Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5Zm-200 80q-139-35-229.5-159.5T160 540V296l320-120 320 120v227q-19-8-39-14.5t-41-9.5V352l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310 766 342 802t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480 776q0-83 58.5-141.5T680 576q83 0 141.5 58.5T880 776q0 83-58.5 141.5T680 976ZM480 562Z" />
                                    </StyledSVG>
                                </a>
                            </Link>
                        }
                    </>

                }
            </Holder>
            {children}
        </MainHolder>

    )
}

export default NavBar;