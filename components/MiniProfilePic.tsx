import styled from "styled-components";
import Image from 'next/image';

const PicHolder = styled.div`
    position: relative;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    width: 48px;
    height: 48px;
`;
const StyledSvg = styled.svg`
    position: absolute;
    top: -2px;
    left: 0px;
`;
interface Props {
    src: string | null,
    title?: string,
    anon: boolean
}
function Content({src, title, anon}: Props){
    switch (anon) {
        case false: return (
            <PicHolder title={title}>
                {
                    src != null ? <Image unoptimized={true} src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + src} layout={'fill'} className={'profilePic'} objectFit={"cover"}></Image>
                    :
                    <StyledSvg width="48" height="48" viewBox="0 0 198 275" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 43.5792L8.43988 40.0427C69.3165 14.5335 138.117 15.817 198 43.5792V97.1767V176C198 230.676 153.676 275 99 275C44.3238 275 0 230.676 0 176V97.1767V43.5792Z" fill="#29335C" />
                        <rect x="136" y="101" width="29" height="18" rx="5" fill="#F3A712" />
                        <rect x="43" y="100.5" width="29" height="18" rx="5" fill="#F3A712" />
                        <path d="M26 185C26 198.791 33.7437 212.018 47.5276 221.77C61.3116 231.521 80.0066 237 99.5 237C118.993 237 137.688 231.521 151.472 221.77C165.256 212.018 173 198.791 173 185L99.5 185L26 185Z" fill="#F3A712" />
                    </StyledSvg>
                }
            </PicHolder>
        )
        case true: return(
            <PicHolder>
                <StyledSvg width="48" height="48" viewBox="0 0 198 282" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 43.5792L8.43988 40.0427C69.3165 14.5335 138.117 15.817 198 43.5792V97.1767V176C198 230.676 153.676 275 99 275C44.3238 275 0 230.676 0 176V97.1767V43.5792Z" fill="#434343" />
                    <rect x="131" y="101" width="29" height="18" rx="5" fill="#9e9e9e" />
                    <rect x="36" y="101" width="29" height="18" rx="5" fill="#6c6c6c" />
                    <path d="M18.0001 178C18.0001 178 19.9013 191.591 23.595 197.9C27.2887 204.208 32.7027 209.941 39.5278 214.77C46.3529 219.598 54.4555 223.428 63.3729 226.042C72.2903 228.655 81.848 230 91.5001 230V178H18.0001Z" fill="#6c6c6c" />
                    <path d="M165 230C165 223.171 163.099 216.409 159.405 210.1C155.711 203.792 150.297 198.059 143.472 193.23C136.647 188.402 128.545 184.572 119.627 181.958C110.71 179.345 101.152 178 91.5 178V230H165Z" fill="#9e9e9e" />
                </StyledSvg>
            </PicHolder>
        )
    }

}

export default Content;