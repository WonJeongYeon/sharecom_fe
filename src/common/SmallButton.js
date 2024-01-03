import styled from "styled-components";

const SmallButton = styled.button`
    margin-left: 2px;
    //background-color: #ffe9ee;
    border-radius: 30px;
    display: inline-flex;
    align-items: center;
    position: relative;
    padding: 8px 18px 8px 18px;
    margin-right: 6px;
    margin-bottom: 6px;
    border: 1px solid rgba(13, 153, 255, 0);
    cursor: pointer;
    background-color: ${props => props.color};
    &:hover{
        border: 1px solid rgba(0, 0, 255, 0.5);
    }
`;

export default SmallButton;
