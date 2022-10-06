import Button from './Button';
import styled from 'styled-components'
import { useEffect } from 'react';

const Holder = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 5rem;
`;
const MaskSVG = styled.svg`
    margin-top: 10rem;
    height: 20rem;
    aspect-ratio: 0.72;

`;
const Message = styled.p`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 44px;
    text-align: center;
    color: ${props => props.theme.colors.secondaryButtonBackground};;

`;
type Props1 = {
  stage: boolean
  text: string
  continueTxt: string
  handleClick: any
}
function MessageScreen({stage, text, continueTxt, handleClick}:Props1){
    useEffect(() => {
        document.body.style.backgroundColor = "#1D2440"
        document.title = "Anomot";
      },[])
    return (
            <Holder>
                <Mask stage = {stage}/>
                <Message>{text}</Message>
                <Button buttonType='Solid' handleClick={handleClick} text = {continueTxt} style = {{width: '24rem'}}></Button>
            </Holder>
    )
  }
type Props2 = {stage: boolean}
function Mask({stage}:Props2){
    switch(stage){
      case true:
        return(
          <div>
              <MaskSVG width="198" height="275" viewBox="0 0 198 275" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 43.5792L8.43988 40.0427C69.3165 14.5335 138.117 15.817 198 43.5792V97.1767V176C198 230.676 153.676 275 99 275C44.3238 275 0 230.676 0 176V97.1767V43.5792Z" fill="#29335C"/>
                  <rect x="136" y="101" width="29" height="18" rx="5" fill="#F3A712"/>
                  <rect x="43" y="100.5" width="29" height="18" rx="5" fill="#F3A712"/>
                  <path d="M26 185C26 198.791 33.7437 212.018 47.5276 221.77C61.3116 231.521 80.0066 237 99.5 237C118.993 237 137.688 231.521 151.472 221.77C165.256 212.018 173 198.791 173 185L99.5 185L26 185Z" fill="#F3A712"/>
              </MaskSVG>
          </div>
        )
      case false:
        return(
          <div>
              <MaskSVG width="198" height="275" viewBox="0 0 198 275" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 43.5792L8.43988 40.0427C69.3165 14.5335 138.117 15.817 198 43.5792V97.1767V176C198 230.676 153.676 275 99 275C44.3238 275 0 230.676 0 176V97.1767V43.5792Z" fill="#29335C"/>
              <rect x="136" y="101" width="29" height="18" rx="5" fill="#F10000"/>
              <rect x="43" y="100.5" width="29" height="18" rx="5" fill="#F10000"/>
              <path d="M172 223C172 209.209 164.256 195.982 150.472 186.23C136.688 176.479 117.993 171 98.5 171C79.0066 171 60.3116 176.479 46.5277 186.23C32.7437 195.982 25 209.209 25 223L98.5 223H172Z" fill="#F10000"/>
              </MaskSVG>
          </div>
        )
    }
    
}

export default MessageScreen;