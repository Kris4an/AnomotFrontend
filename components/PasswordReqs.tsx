import styled from "styled-components";

const Dot = styled.div<{DotColor: string}>`
  //box-sizing: border-box;
  width: 16px;
  height: 16px;
  background: ${(props) => props.DotColor};
  border-radius: 16px;
  transition: background 0.3s;
`;
const PasswordRequirementsHolder = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  align-items: center;
`;
const RequirementText = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: ${props => props.theme.colors.text};
`;
const Holder = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 21rem;
`;

interface PassReq{
    stage: number,
    message: string
}
type Props = {
    props: PassReq[]
}
function PasswordReqs({props}: Props){
    const colors: string[] = ['#F10000','#F3A712','#3FD918'];
    return(
        <Holder>
            {
                props.map((prop, index) =>
                <PasswordRequirementsHolder key={index}>
                    <div><Dot DotColor={colors[prop.stage]}></Dot></div>
                    <RequirementText>{prop.message}</RequirementText>
                </PasswordRequirementsHolder>
                )
            }
        </Holder>
    )
}

export default PasswordReqs;