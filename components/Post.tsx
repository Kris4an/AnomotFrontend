import styled from "styled-components";
import MiniPostHeader from "./MiniPostHeader";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import instance from "../axios_instance";
import { sanitizeHtml } from "../sanitize";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { lowlight } from 'lowlight/lib/core'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import Underline from "@tiptap/extension-underline";
import { EPost, ENonSelfUser } from "./Intefaces";
import router from "next/router";

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

const MainHolder = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
interface TextProps {
    fontSize: string,
    fontWeight: string,
    isExpandable?: boolean,
    isExpanded?: boolean
}
const SVGButton = styled.button`
    width: 100%;
    min-height: 2.5rem;
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 10px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 300ms ease-out;

    &:hover{
        background-color: ${props => props.theme.colors.switchButtonHover};
    }
`;
const StyledSVG = styled.svg`
    height: 2.2rem;
    position: relative;
`;
const StyledPath1 = styled.path`
    fill: ${props => props.theme.colors.primary};
`;
const StyledPath2 = styled.path`
    fill: ${props => props.theme.colors.primary};
`;
const ImageHolder = styled.div`
    position: relative;
    width: 100%;
    height: 30rem;
    max-height: 50rem;
`;
const ButtonHolder = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
`;
const Likes = styled.span`
    color: ${props => props.theme.colors.primary};
    font-size: 30px;
    line-height: 32px;
    font-family: 'Roboto';
    text-decoration-color: ${props => props.theme.colors.primary};

    &:hover {
        text-decoration: underline;
    }
`;
const StyledVideo = styled.video`
    max-width: 100%;
    max-height: 100%;
`;
const VideoHolder = styled.div`
    position: relative;
    width: 100%;
    height: fit-content;
`;

interface Props {
    post: EPost,
    disableComments?: boolean
}
function Content({post, disableComments}:Props){
    const fetcherPost = (url: string, id: any) => instance.post(url, null, { params: { id: id } });
    const [liked, setLiked] = useState(post.hasUserLiked);

    const editor = useEditor({
        extensions: [
          StarterKit, Underline, Subscript, Superscript, CodeBlockLowlight.configure({
            lowlight,
          })
        ],
        content: "",
      })
    useEffect(() => {
        if(post.type == "TEXT" && post.text != null && editor != null){
            editor.commands.setContent(sanitizeHtml(post?.text))
        }
        editor?.setEditable(false)
    },[editor])
    
    return (
        <MainHolder>
            <MiniPostHeader name={post?.poster?.username + ""} date={post.creationDate} src={post.poster?.avatarId != undefined ? post.poster?.avatarId : null} id={post.id}></MiniPostHeader>
            {
                post.type == "MEDIA"?
                        post.media?.type=="IMAGE"?
                            <ImageHolder>
                                <Image src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + post?.media?.id} objectFit={"contain"} layout={"fill"}></Image>
                            </ImageHolder>
                            :
                            <VideoHolder>
                               <StyledVideo controls={true}>
                                <source src={process.env.NEXT_PUBLIC_SERVERURL + "/media/" + post?.media?.id} />
                                </StyledVideo> 
                            </VideoHolder> 
                :
                // <div dangerouslySetInnerHTML={{__html: textHTML}} />
                <EditorContent editor={editor} readOnly={true}/>
            }
            
            <ButtonHolder>
                <SVGButton onClick={() => {
                    switch (liked) {
                        case true: {
                            fetcherPost('/unlike', post.id).then(() => { setLiked(false); })
                            break;
                        }
                        case false: {
                            fetcherPost('/like', post.id).then(() => { setLiked(true); })
                            break;
                        }
                    }
                }}>
                    <Likes>{Number(post.likes) + (liked ? 1 : 0) - (post.hasUserLiked? 1:0)}</Likes>
                    <StyledSVG xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                        {
                            liked ?
                                <StyledPath2 d="m20 34.958-1.958-1.75q-4.334-3.958-7.167-6.833t-4.521-5.146Q4.667 18.958 4 17.104t-.667-3.771q0-3.791 2.563-6.354 2.562-2.562 6.312-2.562 2.334 0 4.334 1.062 2 1.063 3.458 3.021 1.625-2.042 3.583-3.062 1.959-1.021 4.209-1.021 3.75 0 6.312 2.562 2.563 2.563 2.563 6.354 0 1.917-.667 3.771-.667 1.854-2.354 4.125-1.688 2.271-4.521 5.146t-7.167 6.833Z" />
                                :
                                <StyledPath2 d="m20 34.958-1.958-1.75q-4.334-3.958-7.167-6.833t-4.521-5.146Q4.667 18.958 4 17.104t-.667-3.771q0-3.791 2.563-6.354 2.562-2.562 6.312-2.562 2.334 0 4.334 1.062 2 1.063 3.458 3.021 1.625-2.042 3.583-3.062 1.959-1.021 4.209-1.021 3.75 0 6.312 2.562 2.563 2.563 2.563 6.354 0 1.917-.667 3.771-.667 1.854-2.354 4.125-1.688 2.271-4.521 5.146t-7.167 6.833Zm0-3.666q4.125-3.792 6.812-6.5 2.688-2.709 4.25-4.73 1.563-2.02 2.188-3.604.625-1.583.625-3.125 0-2.666-1.708-4.395-1.709-1.73-4.375-1.73-2.084 0-3.854 1.23-1.771 1.229-2.73 3.395h-2.416q-.959-2.125-2.73-3.375-1.77-1.25-3.854-1.25-2.666 0-4.375 1.73-1.708 1.729-1.708 4.395 0 1.584.625 3.167.625 1.583 2.188 3.625 1.562 2.042 4.25 4.729 2.687 2.688 6.812 6.438Zm0-12.042Z" />
                        }
                    </StyledSVG>
                </SVGButton>
                <SVGButton onClick={() => {
                    router.push({
                        pathname: '/post/[id]',
                        query: { id: post.id},
                    });
                }} disabled={disableComments}>
                    <StyledSVG width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <StyledPath1 d="m 6,3 h 24 c 1.65,0 3,1.35 3,3 V 33 L 27,27 H 6 C 4.35,27 3,25.65 3,24 V 6 C 3,4.35 4.35,3 6,3 Z m 0,21 h 21 l 3,3 V 6 H 6 Z" />
                    </StyledSVG>
                </SVGButton>
            </ButtonHolder>
        </MainHolder>
    )
}
export default Content;