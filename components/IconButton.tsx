import styled from "styled-components";

const StyledPath = styled.path`
    fill: ${props => props.theme.colors.primary};
    stroke: ${props => props.theme.colors.primary};
`;
const Button = styled.button`
    background: ${props => props.theme.colors.secondaryButtonBackground};
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px; 
    aspect-ratio: 1;
    height: 3rem;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background ease-in-out 300ms;

    &:hover{
        background: ${props => props.theme.colors.buttonHover};
        color: ${props => props.theme.colors.secondaryButtonBackground};
    }
    &:hover ${StyledPath}{
        fill: ${props => props.theme.colors.secondaryButtonBackground};
        stroke: ${props => props.theme.colors.secondaryButtonBackground};
    }
    &:active {
        background: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondaryButtonBackground};
    }
    &:disabled{
        background: ${props => props.theme.colors.secondaryButtonBackground};
        color: ${props => props.theme.colors.buttonDisabled};
    }
`;
const NotificationText = styled.div`
    position: relative;
    left: 26px;
    top: -44px;
    width: 1.3rem;
    height: 1.3rem; 
    background: #F10000;
    font-stretch: ultra-condensed;
    border-radius: 0.5rem;
    color: #F7F9FA;
    text-align: center;
    vertical-align: top;
    line-height: 16px;
    letter-spacing: -2px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

type Props = {
    icon: string,
    handleClick: any,
    style?: any,
    notis?: number
}
function IconButton({ icon, handleClick, style, notis }: Props) {
    switch (icon) {
        case 'Settings': return (
            <Button onClick={handleClick}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <StyledPath d="M25.2144 16.3439L25.1767 16.6267L25.401 16.8031L28.416 19.1731L28.4221 19.1779L28.4284 19.1825C28.4952 19.2317 28.5353 19.3247 28.4684 19.4511L25.5922 24.4247L25.592 24.4246L25.5861 24.4356C25.533 24.5329 25.4276 24.5747 25.3168 24.5372L21.7414 23.101L21.4752 22.9941L21.2486 23.1699C20.5469 23.7141 19.7762 24.1703 18.9366 24.5118L18.6703 24.6202L18.63 24.9048L18.09 28.7148L18.0899 28.7148L18.0889 28.723C18.0762 28.8242 17.9965 28.9 17.88 28.9H12.12C12.0255 28.9 11.9273 28.841 11.8924 28.6957L11.3551 24.9048L11.3147 24.6202L11.0484 24.5118C10.2113 24.1713 9.45424 23.7154 8.73255 23.1669L8.50678 22.9953L8.24364 23.101L4.67959 24.5326C4.61587 24.55 4.55566 24.5464 4.50943 24.5305C4.4643 24.5149 4.42662 24.4863 4.39895 24.4356L4.39909 24.4355L4.39284 24.4247L1.51785 19.4533C1.49419 19.4066 1.48678 19.3533 1.49691 19.3018C1.50708 19.2501 1.53431 19.2034 1.57416 19.1691L4.61211 16.8046L4.84717 16.6216L4.7982 16.3278C4.72894 15.9122 4.70001 15.4459 4.70001 15C4.70001 14.574 4.75534 14.1093 4.8282 13.6722L4.87717 13.3784L4.64211 13.1954L1.59711 10.8254L1.58712 10.8176L1.57674 10.8104C1.53797 10.7832 1.51881 10.7498 1.51176 10.7114C1.50412 10.6699 1.5099 10.6132 1.54388 10.5535C1.54397 10.5533 1.54405 10.5532 1.54413 10.553L4.4084 5.57431L4.40852 5.57438L4.41395 5.56441C4.46703 5.46711 4.5724 5.42525 4.68326 5.46281L8.25864 6.89895L8.52083 7.00426L8.74631 6.834C9.45512 6.29878 10.2275 5.82817 11.0634 5.48813L11.3297 5.3798L11.3701 5.09514L11.909 1.29246C11.9328 1.16101 12.0213 1.09998 12.12 1.09998L17.88 1.09998L17.8818 1.09998C17.9358 1.09979 17.9882 1.119 18.0293 1.15413C18.0699 1.18876 18.0968 1.2366 18.1055 1.28917L18.645 5.09514L18.6853 5.3798L18.9516 5.48813C19.7887 5.82865 20.5458 6.28458 21.2675 6.83306L21.4932 7.00465L21.7564 6.89895L25.3302 5.46344C25.38 5.4472 25.4339 5.44828 25.4832 5.46663C25.5345 5.48578 25.5774 5.52247 25.6043 5.57022L25.6043 5.57024L25.6072 5.57529L28.4822 10.5466C28.5058 10.5933 28.5132 10.6467 28.5031 10.6982C28.4929 10.7499 28.4657 10.7966 28.4258 10.8309L25.3879 13.1954L25.1528 13.3784L25.2018 13.6722C25.2711 14.0881 25.3 14.5395 25.3 15C25.3 15.4745 25.2713 15.9173 25.2144 16.3439ZM9.10001 15C9.10001 18.2461 11.7539 20.9 15 20.9C18.2461 20.9 20.9 18.2461 20.9 15C20.9 11.7538 18.2461 9.09998 15 9.09998C11.7539 9.09998 9.10001 11.7538 9.10001 15Z" fill="#29335C" stroke="#29335C" />
                </svg>
            </Button>
        )
        case 'Notifications': {
            if(notis==undefined) return(<></>)
            return (
                <div style={style}>
                    <Button onClick={handleClick}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <StyledPath d="M14.3 26.2V27C14.3 29.0463 15.9537 30.7 18 30.7C20.0463 30.7 21.7 29.0463 21.7 27V26.2H25.2C26.7423 26.2 28 24.9423 28 23.4C28 22.2097 27.2509 21.189 26.2 20.785V16.2C26.2 12.6533 23.9356 9.66595 20.8 8.51836V8.1C20.8 6.55771 19.5423 5.3 18 5.3C16.4577 5.3 15.2 6.55771 15.2 8.1V8.51836C12.0644 9.66595 9.8 12.6533 9.8 16.2V20.785C8.74911 21.189 8 22.2097 8 23.4C8 24.9423 9.25772 26.2 10.8 26.2H14.3ZM1 18C1 8.61628 8.61628 1 18 1C27.3837 1 35 8.61628 35 18C35 27.3837 27.3837 35 18 35C8.61628 35 1 27.3837 1 18Z" stroke="#29335C" stroke-width="2" />
                        </svg>
                    </Button>
                    <NotificationText>{notis > 9 ? "9+" : notis}</NotificationText>
                </div>
            )
        }
        case 'Votes': return (
            <Button onClick={handleClick}>
                <svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <StyledPath d="M23 17.5001H21.98L18.98 20.5001H21.845L24.5 23.5001H3.5L6.17 20.5001H9.245L6.245 17.5001H5L0.5 22.0001V28.0001C0.5 29.6501 1.835 31.0001 3.485 31.0001H24.5C25.2956 31.0001 26.0587 30.684 26.6213 30.1214C27.1839 29.5588 27.5 28.7957 27.5 28.0001V22.0001L23 17.5001ZM24.5 28.0001H3.5V26.5001H24.5V28.0001ZM13.01 20.5301C13.595 21.1151 14.54 21.1151 15.125 20.5301L24.665 10.9901C24.8041 10.8513 24.9144 10.6865 24.9897 10.505C25.0649 10.3235 25.1037 10.129 25.1037 9.93256C25.1037 9.73611 25.0649 9.54158 24.9897 9.36012C24.9144 9.17866 24.8041 9.01383 24.665 8.87506L17.24 1.45006C17.1047 1.30846 16.9423 1.19549 16.7624 1.11785C16.5826 1.04021 16.389 0.999483 16.1932 0.998084C15.9973 0.996685 15.8032 1.03464 15.6222 1.10971C15.4413 1.18477 15.2773 1.29541 15.14 1.43506L5.585 10.9901C5.44594 11.1288 5.33562 11.2937 5.26035 11.4751C5.18508 11.6566 5.14633 11.8511 5.14633 12.0476C5.14633 12.244 5.18508 12.4385 5.26035 12.62C5.33562 12.8015 5.44594 12.9663 5.585 13.1051L13.01 20.5301ZM16.19 4.61506L21.5 9.92506L14.075 17.3501L8.765 12.0401L16.19 4.61506Z" fill="#29335C" />
                </svg>
            </Button>
        )
        case 'Comments': return (
            <Button onClick={handleClick}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <StyledPath d="M24.6667 20.8934L23.1067 19.3334H3.33335V3.33341H24.6667V20.8934ZM24.6667 0.666748H3.33335C1.86669 0.666748 0.666687 1.86675 0.666687 3.33341V19.3334C0.666687 20.8001 1.86669 22.0001 3.33335 22.0001H22L27.3334 27.3334V3.33341C27.3334 1.86675 26.1334 0.666748 24.6667 0.666748Z" fill="#29335C" />
                </svg>
            </Button>
        )
    }
    return (<></>)
}

export default IconButton