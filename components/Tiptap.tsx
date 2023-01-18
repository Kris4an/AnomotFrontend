import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import styled from 'styled-components'
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { lowlight } from 'lowlight/lib/core'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { useCallback } from 'react';
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder';
import { useTranslation } from 'next-i18next';

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

const Holder = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  //overflow-y: scroll;

  & >div {
    height: 100%;
  }
`;
const MenuHolder = styled.div`
  width: 100%;
  max-height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-top: 1px solid ${props => props.theme.colors.secondary};
  //border-bottom: 1px solid ${props => props.theme.colors.secondary};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

interface ButtonProps{
  isActive?: boolean
}
const StyledSvg = styled.svg`
  height: 100%;
`;
const StyledPath = styled.path<ButtonProps>`
  fill: ${props => props.isActive? props => props.theme.colors.textInverted: props => props.theme.colors.primary};
  transition: all 300ms linear;
`;
const Button = styled.button<ButtonProps>`
  height: 36px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: ${props => props.isActive? props => props.theme.colors.primary: 'transparent'};
  aspect-ratio: 1;
  border-radius: 5px;

  transition: all 400ms ease-in-out;

  &:hover{
    background-color: ${props => props.isActive? props => props.theme.colors.buttonHover: props => props.theme.colors.switchButtonHover };
  }
  &:disabled ${StyledPath}{
    fill: ${props => props.theme.colors.buttonDisabled};
  }
`;


const MenuBar = ({editor}: any) => {
  if(!editor){
    return null;
  }

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  return(
    <MenuHolder>
      <Button onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} disabled={!editor.can().chain().focus().toggleBold().run()}>
        <StyledSvg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('bold')} d="M12.9 10.185C14.355 9.18 15.375 7.53 15.375 6C15.375 2.61 12.75 0 9.375 0H1.5C0.675 0 0 0.675 0 1.5V19.5C0 20.325 0.675 21 1.5 21H10.17C13.275 21 16.11 18.465 16.125 15.345C16.14 13.05 14.85 11.085 12.9 10.185ZM4.5 3.75H9C10.245 3.75 11.25 4.755 11.25 6C11.25 7.245 10.245 8.25 9 8.25H4.5V3.75ZM9.75 17.25H4.5V12.75H9.75C10.995 12.75 12 13.755 12 15C12 16.245 10.995 17.25 9.75 17.25Z" />
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} disabled={!editor.can().chain().focus().toggleItalic().run()}>
        <StyledSvg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('italic')} d="M6.5 2.25C6.5 3.495 7.505 4.5 8.75 4.5H9.815L4.685 16.5H2.75C1.505 16.5 0.5 17.505 0.5 18.75C0.5 19.995 1.505 21 2.75 21H10.25C11.495 21 12.5 19.995 12.5 18.75C12.5 17.505 11.495 16.5 10.25 16.5H9.185L14.315 4.5H16.25C17.495 4.5 18.5 3.495 18.5 2.25C18.5 1.005 17.495 0 16.25 0H8.75C7.505 0 6.5 1.005 6.5 2.25Z"/>
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} disabled={!editor.can().chain().focus().toggleUnderline().run()}>
        <StyledSvg width="21" height="28" viewBox="0 0 21 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('underline')} d="M11.685 21.425C16.23 20.84 19.5 16.76 19.5 12.185V2.375C19.5 1.87772 19.3025 1.40081 18.9508 1.04917C18.5992 0.697544 18.1223 0.5 17.625 0.5C17.1277 0.5 16.6508 0.697544 16.2992 1.04917C15.9475 1.40081 15.75 1.87772 15.75 2.375V12.35C15.75 14.855 14.055 17.135 11.595 17.63C10.83 17.7948 10.0378 17.7863 9.2766 17.605C8.51536 17.4236 7.80439 17.0742 7.19586 16.5822C6.58734 16.0902 6.09671 15.4681 5.75999 14.7617C5.42328 14.0554 5.24901 13.2825 5.25 12.5V2.375C5.25 1.87772 5.05246 1.40081 4.70083 1.04917C4.34919 0.697544 3.87228 0.5 3.375 0.5C2.87772 0.5 2.40081 0.697544 2.04917 1.04917C1.69754 1.40081 1.5 1.87772 1.5 2.375V12.5C1.5 17.855 6.195 22.13 11.685 21.425ZM0 26C0 26.825 0.675 27.5 1.5 27.5H19.5C20.325 27.5 21 26.825 21 26C21 25.175 20.325 24.5 19.5 24.5H1.5C0.675 24.5 0 25.175 0 26Z" />
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} disabled={!editor.can().chain().focus().toggleStrike().run()}>
        <StyledSvg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('strike')} d="M17.385 7.28C17.385 6.815 17.31 6.395 17.16 6.005C17.025 5.6 16.8 5.27 16.5 4.985C16.2 4.7 15.825 4.49 15.375 4.325C14.925 4.175 14.385 4.085 13.785 4.085C13.2 4.085 12.675 4.145 12.24 4.28C11.805 4.415 11.445 4.595 11.16 4.82C10.875 5.06 10.65 5.33 10.5 5.645C10.35 5.96 10.275 6.29 10.275 6.635C10.275 7.355 10.65 7.955 11.385 8.45C11.955 8.825 12.54 9.17 13.5 9.5H6.585C6.51 9.38 6.42 9.245 6.36 9.125C5.97 8.405 5.775 7.58 5.775 6.62C5.775 5.705 5.97 4.88 6.375 4.115C6.765 3.365 7.32 2.72 8.04 2.18C8.81515 1.62658 9.67689 1.20585 10.59 0.935C11.58 0.65 12.675 0.5 13.86 0.5C15.075 0.5 16.17 0.665 17.175 1.01C18.165 1.34 19.02 1.82 19.71 2.42C20.415 3.02 20.955 3.74 21.33 4.565C21.705 5.39 21.9 6.29 21.9 7.28H17.385ZM25.5 11H1.5C0.675 11 0 11.675 0 12.5C0 13.325 0.675 14 1.5 14H14.43C14.7 14.105 15.03 14.21 15.255 14.3C15.81 14.555 16.245 14.81 16.56 15.065C16.875 15.32 17.085 15.605 17.205 15.92C17.31 16.22 17.37 16.565 17.37 16.955C17.37 17.3 17.295 17.63 17.16 17.945C17.025 18.245 16.815 18.515 16.53 18.74C16.245 18.965 15.9 19.13 15.465 19.265C15.03 19.385 14.52 19.46 13.95 19.46C13.305 19.46 12.705 19.4 12.18 19.265C11.655 19.13 11.19 18.92 10.815 18.635C10.44 18.35 10.14 17.975 9.93 17.51C9.72 17.045 9.555 16.37 9.555 15.695H5.1C5.1 16.52 5.22 17.39 5.46 18.065C5.7 18.74 6.015 19.34 6.435 19.88C6.855 20.405 7.335 20.87 7.905 21.26C8.46 21.65 9.075 21.98 9.735 22.235C10.395 22.49 11.085 22.685 11.805 22.82C12.525 22.94 13.245 23.015 13.965 23.015C15.165 23.015 16.26 22.88 17.235 22.595C18.21 22.31 19.05 21.92 19.74 21.41C20.43 20.9 20.97 20.255 21.345 19.505C21.72 18.755 21.915 17.9 21.915 16.94C21.915 16.04 21.765 15.23 21.45 14.525C21.375 14.36 21.285 14.18 21.195 14.03H25.5C26.325 14.03 27 13.355 27 12.53V12.5C27 11.675 26.325 11 25.5 11Z" />
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
        <StyledSvg width="31" height="12" viewBox="0 0 31 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath d="M16.25 0C12.275 0 8.675 1.485 5.9 3.9L3.065 1.065C2.12 0.12 0.5 0.78 0.5 2.115V10.5C0.5 11.325 1.175 12 2 12H10.385C11.72 12 12.395 10.38 11.45 9.435L8.585 6.57C10.67 4.83 13.325 3.75 16.265 3.75C21.005 3.75 25.1 6.51 27.05 10.5C27.455 11.34 28.415 11.76 29.3 11.46C30.365 11.115 30.905 9.9 30.425 8.88C27.845 3.63 22.475 0 16.25 0Z" />
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
        <StyledSvg width="31" height="12" viewBox="0 0 31 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath d="M25.1001 3.9C22.3251 1.485 18.7251 0 14.7501 0C8.51006 0 3.14006 3.63 0.590059 8.895C0.110059 9.9 0.650059 11.1 1.71506 11.46C2.60006 11.76 3.56006 11.34 3.96506 10.5C5.91506 6.51 10.0101 3.75 14.7501 3.75C17.6751 3.75 20.3451 4.83 22.4301 6.57L19.5651 9.435C18.6201 10.38 19.2801 12 20.6151 12H29.0001C29.8251 12 30.5001 11.325 30.5001 10.5V2.115C30.5001 0.78 28.8801 0.105 27.9351 1.05L25.1001 3.9Z" />
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive('superscript')} disabled={!editor.can().chain().focus().toggleSuperscript().run()}>
        <StyledSvg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('superscript')} d="M6.26495 13.095L1.44995 5.58C1.33275 5.39484 1.25316 5.1884 1.21574 4.97248C1.17831 4.75656 1.18379 4.53538 1.23184 4.32157C1.27989 4.10777 1.36959 3.90552 1.49581 3.72638C1.62202 3.54723 1.78229 3.3947 1.96745 3.2775C2.15262 3.1603 2.35905 3.08071 2.57498 3.04329C2.7909 3.00586 3.01207 3.01133 3.22588 3.05939C3.43969 3.10744 3.64194 3.19714 3.82108 3.32335C4.00022 3.44957 4.15275 3.60984 4.26995 3.795L8.40995 10.485H8.58995L12.7 3.81C13 3.3 13.54 3 14.125 3C15.445 3 16.255 4.47 15.535 5.58L10.69 13.08L16.015 21.405C16.75 22.53 15.94 24 14.62 24C14.05 24 13.51 23.7 13.195 23.22L8.58995 15.885H8.40995L3.80495 23.22C3.48995 23.7 2.96495 24 2.37995 24C1.05995 24 0.249953 22.545 0.969953 21.42L6.26495 13.095ZM25 6.75C25 6.33 24.67 6 24.25 6H20.5V4.5H23.5C24.325 4.5 25 3.825 25 3V1.5C25 0.675 24.325 0 23.5 0H19.75C19.33 0 19 0.33 19 0.75C19 1.17 19.33 1.5 19.75 1.5H23.5V3H20.5C19.675 3 19 3.675 19 4.5V6C19 6.825 19.675 7.5 20.5 7.5H24.25C24.67 7.5 25 7.17 25 6.75Z" />
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive('subscript')} disabled={!editor.can().chain().focus().toggleSubscript().run()}>
        <StyledSvg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('subscript')} d="M6.27995 10.095L1.44995 2.58C1.33275 2.39484 1.25316 2.1884 1.21574 1.97248C1.17831 1.75656 1.18379 1.53538 1.23184 1.32157C1.27989 1.10777 1.36959 0.905517 1.49581 0.726375C1.62202 0.547233 1.78229 0.394705 1.96745 0.2775C2.15262 0.160295 2.35905 0.0807091 2.57498 0.0432851C2.7909 0.00586118 3.01207 0.0113319 3.22588 0.0593863C3.43969 0.107441 3.64194 0.197137 3.82108 0.323354C4.00022 0.44957 4.15275 0.609836 4.26995 0.795L8.40995 7.485H8.58995L12.7 0.81C13.015 0.3 13.555 0 14.14 0C15.46 0 16.27 1.47 15.55 2.58L10.705 10.08L16.03 18.405C16.75 19.53 15.94 21 14.62 21C14.05 21 13.51 20.7 13.195 20.22L8.58995 12.885H8.40995L3.80495 20.22C3.50495 20.7 2.96495 21 2.37995 21C1.05995 21 0.249953 19.545 0.969953 18.42L6.27995 10.095ZM25 23.25C25 22.83 24.67 22.5 24.25 22.5H20.5V21H23.5C24.325 21 25 20.325 25 19.5V18C25 17.175 24.325 16.5 23.5 16.5H19.75C19.33 16.5 19 16.83 19 17.25C19 17.67 19.33 18 19.75 18H23.5V19.5H20.5C19.675 19.5 19 20.175 19 21V22.5C19 23.325 19.675 24 20.5 24H24.25C24.67 24 25 23.67 25 23.25Z" />
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} disabled={!editor.can().chain().focus().toggleBlockquote().run()}>
        <StyledSvg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('blockquote')} d="M5.255 15.5C6.02 15.5 6.725 15.065 7.055 14.39L9.185 10.13C9.395 9.71 9.5 9.26 9.5 8.795V2C9.5 1.175 8.825 0.5 8 0.5H2C1.175 0.5 0.5 1.175 0.5 2V8C0.5 8.825 1.175 9.5 2 9.5H5L3.455 12.59C2.78 13.925 3.755 15.5 5.255 15.5ZM20.255 15.5C21.02 15.5 21.725 15.065 22.055 14.39L24.185 10.13C24.395 9.71 24.5 9.26 24.5 8.795V2C24.5 1.175 23.825 0.5 23 0.5H17C16.175 0.5 15.5 1.175 15.5 2V8C15.5 8.825 16.175 9.5 17 9.5H20L18.455 12.59C17.78 13.925 18.755 15.5 20.255 15.5Z" fill="#29335C"/>
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} disabled={!editor.can().chain().focus().toggleCode().run()}>
        <StyledSvg width="29" height="18" viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('code')} d="M9.54989 14.85L3.69989 8.99999L9.54989 3.14999C9.68885 3.0127 9.79917 2.8492 9.87447 2.66896C9.94977 2.48872 9.98855 2.29533 9.98855 2.09999C9.98855 1.90465 9.94977 1.71126 9.87447 1.53101C9.79917 1.35077 9.68885 1.18727 9.54989 1.04999C9.4126 0.911028 9.2491 0.800701 9.06886 0.725401C8.88862 0.650102 8.69522 0.611328 8.49989 0.611328C8.30455 0.611328 8.11116 0.650102 7.93091 0.725401C7.75067 0.800701 7.58717 0.911028 7.44989 1.04999L0.564887 7.93499C0.425831 8.07376 0.31551 8.23859 0.240238 8.42005C0.164966 8.60151 0.126221 8.79604 0.126221 8.99249C0.126221 9.18894 0.164966 9.38346 0.240238 9.56492C0.31551 9.74638 0.425831 9.91122 0.564887 10.05L7.44989 16.95C8.03489 17.535 8.96489 17.535 9.54989 16.95C9.68885 16.8127 9.79917 16.6492 9.87447 16.469C9.94977 16.2887 9.98855 16.0953 9.98855 15.9C9.98855 15.7047 9.94977 15.5113 9.87447 15.331C9.79917 15.1508 9.68885 14.9873 9.54989 14.85ZM19.4499 14.85L25.2999 8.99999L19.4499 3.14999C19.3109 3.0127 19.2006 2.8492 19.1253 2.66896C19.05 2.48872 19.0112 2.29533 19.0112 2.09999C19.0112 1.90465 19.05 1.71126 19.1253 1.53101C19.2006 1.35077 19.3109 1.18727 19.4499 1.04999C19.5872 0.911028 19.7507 0.800701 19.9309 0.725401C20.1112 0.650102 20.3046 0.611328 20.4999 0.611328C20.6952 0.611328 20.8886 0.650102 21.0689 0.725401C21.2491 0.800701 21.4126 0.911028 21.5499 1.04999L28.4349 7.93499C29.0199 8.51999 29.0199 9.46499 28.4349 10.05L21.5499 16.95C21.4126 17.0889 21.2491 17.1993 21.0689 17.2746C20.8886 17.3499 20.6952 17.3886 20.4999 17.3886C20.3046 17.3886 20.1112 17.3499 19.9309 17.2746C19.7507 17.1993 19.5872 17.0889 19.4499 16.95C19.3109 16.8127 19.2006 16.6492 19.1253 16.469C19.05 16.2887 19.0112 16.0953 19.0112 15.9C19.0112 15.7047 19.05 15.5113 19.1253 15.331C19.2006 15.1508 19.3109 14.9873 19.4499 14.85Z" fill="#29335C" />
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} disabled={!editor.can().chain().focus().toggleCodeBlock().run()}>
        <StyledSvg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('codeBlock')} d="M24 0.5H3C1.35 0.5 0 1.85 0 3.5V24.5C0 26.15 1.35 27.5 3 27.5H24C25.65 27.5 27 26.15 27 24.5V3.5C27 1.85 25.65 0.5 24 0.5ZM12 8H9V11C9 12.65 7.65 14 6 14C7.65 14 9 15.35 9 17V20H12V23H9C7.35 23 6 21.65 6 20V18.5C6 16.85 4.65 15.5 3 15.5V12.5C4.65 12.5 6 11.15 6 9.5V8C6 6.35 7.35 5 9 5H12V8ZM24 15.5C22.35 15.5 21 16.85 21 18.5V20C21 21.65 19.65 23 18 23H15V20H18V17C18 15.35 19.35 14 21 14C19.35 14 18 12.65 18 11V8H15V5H18C19.65 5 21 6.35 21 8V9.5C21 11.15 22.35 12.5 24 12.5V15.5Z" fill="#29335C"/>
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} disabled={!editor.can().chain().focus().toggleBulletList().run()}>
        <StyledSvg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('bulletList')} d="M2.5 9.75C1.255 9.75 0.25 10.755 0.25 12C0.25 13.245 1.255 14.25 2.5 14.25C3.745 14.25 4.75 13.245 4.75 12C4.75 10.755 3.745 9.75 2.5 9.75ZM2.5 0.75C1.255 0.75 0.25 1.755 0.25 3C0.25 4.245 1.255 5.25 2.5 5.25C3.745 5.25 4.75 4.245 4.75 3C4.75 1.755 3.745 0.75 2.5 0.75ZM2.5 18.75C1.255 18.75 0.25 19.77 0.25 21C0.25 22.23 1.27 23.25 2.5 23.25C3.73 23.25 4.75 22.23 4.75 21C4.75 19.77 3.745 18.75 2.5 18.75ZM8.5 22.5H26.5C27.325 22.5 28 21.825 28 21C28 20.175 27.325 19.5 26.5 19.5H8.5C7.675 19.5 7 20.175 7 21C7 21.825 7.675 22.5 8.5 22.5ZM8.5 13.5H26.5C27.325 13.5 28 12.825 28 12C28 11.175 27.325 10.5 26.5 10.5H8.5C7.675 10.5 7 11.175 7 12C7 12.825 7.675 13.5 8.5 13.5ZM7 3C7 3.825 7.675 4.5 8.5 4.5H26.5C27.325 4.5 28 3.825 28 3C28 2.175 27.325 1.5 26.5 1.5H8.5C7.675 1.5 7 2.175 7 3Z" fill="#29335C" />
        </StyledSvg>
      </Button>

      <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} disabled={!editor.can().chain().focus().toggleOrderedList().run()}>
        <StyledSvg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('orderedList')} d="M9.5 4.5H27.5C28.325 4.5 29 3.825 29 3C29 2.175 28.325 1.5 27.5 1.5H9.5C8.675 1.5 8 2.175 8 3C8 3.825 8.675 4.5 9.5 4.5ZM27.5 19.5H9.5C8.675 19.5 8 20.175 8 21C8 21.825 8.675 22.5 9.5 22.5H27.5C28.325 22.5 29 21.825 29 21C29 20.175 28.325 19.5 27.5 19.5ZM27.5 10.5H9.5C8.675 10.5 8 11.175 8 12C8 12.825 8.675 13.5 9.5 13.5H27.5C28.325 13.5 29 12.825 29 12C29 11.175 28.325 10.5 27.5 10.5ZM4.25 18H1.25C0.83 18 0.5 18.33 0.5 18.75C0.5 19.17 0.83 19.5 1.25 19.5H3.5V20.25H2.75C2.33 20.25 2 20.58 2 21C2 21.42 2.33 21.75 2.75 21.75H3.5V22.5H1.25C0.83 22.5 0.5 22.83 0.5 23.25C0.5 23.67 0.83 24 1.25 24H4.25C4.67 24 5 23.67 5 23.25V18.75C5 18.33 4.67 18 4.25 18ZM1.25 1.5H2V5.25C2 5.67 2.33 6 2.75 6C3.17 6 3.5 5.67 3.5 5.25V0.75C3.5 0.33 3.17 0 2.75 0H1.25C0.83 0 0.5 0.33 0.5 0.75C0.5 1.17 0.83 1.5 1.25 1.5ZM4.25 9H1.25C0.83 9 0.5 9.33 0.5 9.75C0.5 10.17 0.83 10.5 1.25 10.5H3.2L0.68 13.44C0.564338 13.5732 0.50045 13.7436 0.5 13.92V14.25C0.5 14.67 0.83 15 1.25 15H4.25C4.67 15 5 14.67 5 14.25C5 13.83 4.67 13.5 4.25 13.5H2.3L4.82 10.56C4.93566 10.4268 4.99955 10.2564 5 10.08V9.75C5 9.33 4.67 9 4.25 9Z" fill="#29335C" />
        </StyledSvg>
      </Button>

      <Button onClick={addImage} disabled={false}>
        <StyledSvg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath d="M27 24.5V3.5C27 1.85 25.65 0.5 24 0.5H3C1.35 0.5 0 1.85 0 3.5V24.5C0 26.15 1.35 27.5 3 27.5H24C25.65 27.5 27 26.15 27 24.5ZM8.85 16.97L12 20.765L16.65 14.78C16.95 14.39 17.55 14.39 17.85 14.795L23.115 21.815C23.1986 21.9264 23.2495 22.0589 23.262 22.1976C23.2745 22.3364 23.2481 22.4758 23.1858 22.6004C23.1235 22.725 23.0278 22.8298 22.9093 22.903C22.7908 22.9762 22.6543 23.015 22.515 23.015H4.53C3.9 23.015 3.555 22.295 3.945 21.8L7.68 17C7.965 16.61 8.535 16.595 8.85 16.97Z" fill="#29335C" />
        </StyledSvg>
      </Button>

      <Button onClick={editor.isActive('link')? () => editor.chain().focus().unsetLink().run(): setLink} isActive={editor.isActive('link')} disabled={!editor.can().chain().focus().toggleLink().run()}>
        <StyledSvg width="31" height="16" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <StyledPath isActive={editor.isActive('link')} d="M3.43994 7.07C3.85994 4.865 5.92994 3.35 8.17994 3.35H12.5749C13.3549 3.35 13.9999 2.705 13.9999 1.925C13.9999 1.145 13.3549 0.5 12.5749 0.5H8.32994C4.41494 0.5 0.919939 3.365 0.544939 7.265C0.441232 8.30634 0.55682 9.35786 0.884255 10.3518C1.21169 11.3458 1.74371 12.2601 2.44604 13.0359C3.14837 13.8117 4.00543 14.4318 4.962 14.8562C5.91857 15.2806 6.95344 15.4999 7.99994 15.5H12.5749C13.3549 15.5 13.9999 14.855 13.9999 14.075C13.9999 13.295 13.3549 12.65 12.5749 12.65H7.99994C7.31095 12.6479 6.63098 12.4932 6.0089 12.197C5.38681 11.9008 4.83806 11.4705 4.40208 10.937C3.96609 10.4035 3.6537 9.77999 3.48734 9.11138C3.32098 8.44277 3.30479 7.74561 3.43994 7.07ZM10.9999 9.5H19.9999C20.8249 9.5 21.4999 8.825 21.4999 8C21.4999 7.175 20.8249 6.5 19.9999 6.5H10.9999C10.1749 6.5 9.49994 7.175 9.49994 8C9.49994 8.825 10.1749 9.5 10.9999 9.5ZM22.6699 0.5H18.4249C17.6449 0.5 16.9999 1.145 16.9999 1.925C16.9999 2.705 17.6449 3.35 18.4249 3.35H22.8199C25.0699 3.35 27.1399 4.865 27.5599 7.07C27.6951 7.74561 27.6789 8.44277 27.5125 9.11138C27.3462 9.77999 27.0338 10.4035 26.5978 10.937C26.1618 11.4705 25.6131 11.9008 24.991 12.197C24.3689 12.4932 23.6889 12.6479 22.9999 12.65H18.4249C17.6449 12.65 16.9999 13.295 16.9999 14.075C16.9999 14.855 17.6449 15.5 18.4249 15.5H22.9999C27.3799 15.5 30.8899 11.735 30.4699 7.265C30.0949 3.365 26.5849 0.5 22.6699 0.5Z" fill="#29335C" />
        </StyledSvg>
      </Button>
    </MenuHolder>
  )   
}

const Tiptap = () => {
  const [t1] = useTranslation("create-post");
  const editor = useEditor({
    extensions: [
      StarterKit, Underline, Subscript, Superscript, CodeBlockLowlight.configure({
        lowlight,
      }), Image, Link.configure({
        //openOnClick: false,
      }), Placeholder.configure({
        placeholder: 'zdasti'
      })
    ],
    content: '<div spellcheck="false"></div>',
  })

  return (
    <Holder>
        <EditorContent editor={editor} />
        <MenuBar editor={editor} />
    </Holder>
  )
}

export default Tiptap;  