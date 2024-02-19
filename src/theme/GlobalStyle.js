import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import {theme} from "./theme";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        background: ${({theme}) => theme.bgColor};
        color: ${({theme}) => theme.textColor};
    }
    input, select, textarea {
        background: ${({theme}) => theme.inputColor};
        color: ${({theme}) => theme.textColor};
    }
    select {
        color: ${({theme}) => theme.textColor};
    }
    input:focus, select:focus {
        border: ${({theme}) => theme.inputBorder}
    }
    input:disabled {
        background: ${({theme}) => theme.inputDisabledColor};
    }
    button {
        background: ${({theme}) => theme.buttonColor};
        transition: 0.2s;
        color: ${({theme}) => theme.textColor};
    }
    button:hover {
        background: ${({theme}) => theme.buttonHoverColor}
    }
    svg {
        fill: ${({theme}) => theme.svgFill};
    }
    .nav_selected {
        background: ${({theme}) => theme.bgColor};
        color: ${({theme}) => theme.textColor};
    }
    th {
        background: ${({theme}) => theme.thColor};
    }
    td {
        background: ${({theme}) => theme.tdColor};
    }
    .modal_container {
        background: ${({theme}) => theme.tdColor};
    }
    .nav_list {
        background: ${({theme}) => theme.bgColor};
    }
    .link > span {
        color: ${({theme}) => theme.svgFill};
    }
    .DesktopPartsCard {
        border: ${({theme}) => theme.borderColor};
        background: ${({theme}) => theme.tdColor};
    }
    a {
        color: ${({theme}) => theme.textColor};
    }
`;
