import type { NextPage } from 'next'
import styled from 'styled-components'

const ContainerStyle = styled.div`
    aspect-ratio: 0.85;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 3.5rem;
    gap: 1rem;
    background: ${props => props.theme.colors.authContainerBackground};
    box-shadow: 4px 4px 10px ${props => props.theme.colors.authContainerShadow};;
    border-radius: 10px;
`;

export default ContainerStyle;