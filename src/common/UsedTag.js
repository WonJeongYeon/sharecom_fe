import styled from "styled-components";

const UsedTag = styled.span`
    border-radius: 30px;
    display: inline-flex;
    align-items: center;
    position: relative;
    font-weight: 600;
    padding: 3px 5px 3px 5px;
    border: 1px solid rgba(13, 153, 255, 0);
    font-size: 13px;
    width: 60px;
    justify-content: center;
    background-color: ${props => props.used? "#f5d0cd" : "#d2ebd3"};
`;

export default UsedTag;
