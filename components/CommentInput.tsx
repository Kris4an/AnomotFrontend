import { useTranslation } from "next-i18next";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import instance from "../axios_instance";

const MainHolder = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background: ${props => props.theme.colors.secondaryButtonBackground};
    border-color: ${props => props.theme.colors.inputPlaceholder};
    border-top: 1px solid;
    padding: 10px;
    height: 3.5rem;
    z-index: 2;
`;
const StyledInput = styled.input`
    position: relative;
    width: 100%;
    border: none;
    background-color: transparent;
    padding: 10px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
`;
const StyledPath = styled.path`
    fill: ${props => props.theme.colors.primary};
`;
const SvgButton = styled.button`
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: transparent;
`
interface Props {
    id: string,
    typeP: string,
    style?: React.CSSProperties,
    text?: string,
    userComment: (text: string, date: string) => void
}
function CommentInput({ id, userComment, typeP, style, text }: Props) {
    const [t1] = useTranslation("common");
    const fetcher = (url: string, text: any) => instance.post(url, {
        "id": id,
        "text": text
    }).then((res: any) => { }).catch((e: any) => { console.log(e) });
    const inp: any = React.createRef();

    return (
        <MainHolder style={style}>
            <StyledInput type={'text'} placeholder={t1("typeSomething")} maxLength={2000} ref={inp} defaultValue={text} />
            <SvgButton onClick={() => {
                if (inp.current.value != null && inp.current.value != "" && inp.current.value.length <= 2000) {
                    let url: string = "";
                    switch (typeP) {
                        case 'BATTLE': {
                            url = '/battle/comment';
                            break;
                        }
                        case 'COMMENT': {
                            url = "/comment/comment";
                            break;
                        }
                        case 'EDIT': {
                            url = '/comment/edit';
                            break;
                        }
                        case 'POST': {
                            url = '/post/comment';
                            break;
                        }
                    }
                    fetcher(url, inp.current.value).then(() => {
                        userComment(inp.current.value, new Date() + "")
                        inp.current.value = "";
                    })
                };
            }}>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <StyledPath d="M1.4 17.3999L18.85 9.9199C19.0304 9.84306 19.1842 9.71488 19.2923 9.5513C19.4004 9.38773 19.4581 9.19598 19.4581 8.9999C19.4581 8.80383 19.4004 8.61208 19.2923 8.4485C19.1842 8.28493 19.0304 8.15675 18.85 8.0799L1.4 0.599903C1.2489 0.533998 1.08377 0.506746 0.919509 0.520606C0.755246 0.534467 0.597018 0.589003 0.459098 0.679295C0.321179 0.769587 0.207908 0.892795 0.129505 1.0378C0.0511009 1.18281 0.010031 1.34506 0.00999999 1.5099L0 6.1199C0 6.6199 0.37 7.0499 0.87 7.1099L15 8.9999L0.87 10.8799C0.37 10.9499 0 11.3799 0 11.8799L0.00999999 16.4899C0.00999999 17.1999 0.74 17.6899 1.4 17.3999Z" />
                </svg>
            </SvgButton>
        </MainHolder>

    )
}

export default CommentInput;