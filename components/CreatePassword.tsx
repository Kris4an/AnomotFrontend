import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import styled from "styled-components";
import AuthContainer from "./AuthContainer";
import Button from "./Button";
import LoginInput from "./LoginInput";
import PasswordReqs from "./PasswordReqs";
import PasswordStrength from "./PasswordStrength";

const Holder2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;
const Holder3 = styled.div`
  height: 18rem;
  width: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const Holder4 = styled.div`
  height: 18rem;
  width: 21rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;
const ErrorText = styled.span`
  color: red;
  font-family: 'Roboto';
  font-size: 16px;
`;
const Text = styled.p`
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 37px;
    color: ${props => props.theme.colors.text};
    text-align: center;
`;
interface PassReq{
    stage: number,
    message: string
};
type Props = {
    handleButtonPasword: any,
    updatePassword: any
};
function CreatePassword({handleButtonPasword, updatePassword} : Props){
    const [t1] = useTranslation("common");
    const [t2] = useTranslation("create");

    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [passwordsValid, setPasswordsValid] = useState(false);
  
    const [passwordLevel, setPasswordLevel] = useState(0);
    const [passwordMessages, setPasswordMessages] = useState<PassReq[]>([{stage:0, message:t2("passwordRequirement0")},{stage:0, message:t2("passwordRequirement1")},{stage:0, message:t2("passwordRequirement2")},{stage:0, message:t2("passwordRequirement3")}]);
    
    

      const passwordInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const zxcvbnCommonPackage = (await import('@zxcvbn-ts/language-common')).default
        const zxcvbnEnPackage = (await import('@zxcvbn-ts/language-en')).default
    
        setPassword(event.target.value);
        updatePassword(event.target.value);
    
        let validLenght = false;
        let validNums = false;
        let validChars = false;
        
    
        const specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" +
        "\u00a1\u00a2\u00a3\u00a4\u00a5\u00a6\u00a7\u00a8\u00a9\u00aa\u00ab\u00ac\u00ad\u00ae\u00af" +
        "\u00b0\u00b1\u00b2\u00b3\u00b4\u00b5\u00b6\u00b7\u00b8\u00b9\u00ba\u00bb\u00bc\u00bd\u00be\u00bf" +
        "\u00d7\u00f7" +
        "\u2013\u2014\u2015\u2017\u2018\u2019\u201a\u201b\u201c\u201d\u201e\u2020\u2021\u2022\u2026\u2030\u2032\u2033" +
        "\u2039\u203a\u203c\u203e\u2044\u204a" +
        "\u20a0\u20a1\u20a2\u20a3\u20a4\u20a5\u20a6\u20a7\u20a8\u20a9\u20aa\u20ab\u20ac\u20ad\u20ae\u20af" +
        "\u20b0\u20b1\u20b2\u20b3\u20b4\u20b5\u20b6\u20b7\u20b8\u20b9\u20ba\u20bb\u20bc\u20bd\u20be";
    
        if(event.target.value.length < 10) validLenght = false;
        else validLenght = true;
        for(let i = 0; i < event.target.value.length; i++){
          if(validChars && validNums) break;
          if(event.target.value.charAt(i) >= '0' && event.target.value.charAt(i)<='9') validNums = true;
          else if (!validChars){
            for(let j = 0; j < specialChars.length;j++){
              if(event.target.value.charAt(i) == specialChars.charAt(j)){
                validChars = true;
                break;
              }
            }
          }
        }
    
        const options = {
          translations: zxcvbnEnPackage.translations,
          graphs: zxcvbnCommonPackage.adjacencyGraphs,
          dictionary: {
            ...zxcvbnCommonPackage.dictionary,
            ...zxcvbnEnPackage.dictionary,
          },
        }
        
        zxcvbnOptions.setOptions(options);
        const result = zxcvbn(event.target.value);
        setPasswordLevel(result.score);
        
        
        let temp: PassReq[] = [{stage:0, message:t2("passwordRequirement0")},{stage:0, message:t2("passwordRequirement1")},{stage:0, message:t2("passwordRequirement2")},{stage:0, message:t2("passwordRequirement3")}];
        
        const warning: string = result.feedback.warning;
        const suggestions: string[] = result.feedback.suggestions;
        if(warning!="" && warning!=null) temp.push({stage:0, message: warning});
        
        
        if(validLenght) temp[0].stage = 2;
        if(validNums) temp[1].stage = 2;
        if(validChars) temp[2].stage = 2;
        if(result.score > 2) temp[3].stage = 2;
        setPasswordMessages(temp);
    
        for(let i = 0; i < suggestions.length; i++){
          setPasswordMessages(passwordMessages => [...passwordMessages, {stage:1, message: suggestions[i]}] );     
        }
        setPasswordsValid(validChars && validLenght && validNums && (result.score > 2));
        
      }

    return(
        <AuthContainer style={{height: '32rem', gap: '1rem', width: '45rem'}}>
              <Text>{t2("chooseSecurePassword")}</Text>
              <Holder2>
                <Holder3>
                  <LoginInput inputType="Password" handleChange={passwordInput} placeHolder={t1("password")} style={{width: '17rem', height: '3.5rem'}} passwordStyle={{height: '3.5rem'}}></LoginInput>
                  <LoginInput inputType="Password" handleChange={(event: React.ChangeEvent<HTMLInputElement>) => (setPasswordRepeat(event.target.value))} placeHolder={t1("repeatPassword")} style={{width: '17rem', height: '3.5rem'}} passwordStyle={{height: '3.5rem'}}></LoginInput>
                  {(password != passwordRepeat && passwordRepeat!="")? <ErrorText>{t2("passwordDoesntMatch")}</ErrorText>:null}
                </Holder3>
                <Holder4>
                  <PasswordStrength stage = {passwordLevel}></PasswordStrength>
                  <PasswordReqs props = {passwordMessages}></PasswordReqs>
                </Holder4>
                
              </Holder2>
              <Button buttonType='Solid' handleClick={handleButtonPasword} disabled={!(password == passwordRepeat && passwordsValid)} text={t1("continue")} style = {{width: '20rem', fontSize: '20px'}}/>
            </AuthContainer>
    )
}

export default CreatePassword;