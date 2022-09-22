import type { NextPage } from 'next'
import styled from 'styled-components'

const LogoSVG = styled.svg`
    width: 108.83px;
    height: 155px;
`;

function Logo(){
    return(
        <div>
            <LogoSVG width="198" height="282" viewBox="0 0 198 282" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 43.5792L8.43988 40.0427C69.3165 14.5335 138.117 15.817 198 43.5792V97.1767V176C198 230.676 153.676 275 99 275C44.3238 275 0 230.676 0 176V97.1767V43.5792Z" fill="#29335C"/>
            <rect x="131" y="101" width="29" height="18" rx="5" fill="#F10000"/>
            <rect x="36" y="101" width="29" height="18" rx="5" fill="#F3A712"/>
            <path d="M18.0001 178C18.0001 178 19.9013 191.591 23.595 197.9C27.2887 204.208 32.7027 209.941 39.5278 214.77C46.3529 219.598 54.4555 223.428 63.3729 226.042C72.2903 228.655 81.848 230 91.5001 230V178H18.0001Z" fill="#F3A712"/>
            <path d="M165 230C165 223.171 163.099 216.409 159.405 210.1C155.711 203.792 150.297 198.059 143.472 193.23C136.647 188.402 128.545 184.572 119.627 181.958C110.71 179.345 101.152 178 91.5 178V230H165Z" fill="#F10000"/>
            </LogoSVG>
        </div>
    )
}

export default Logo;

