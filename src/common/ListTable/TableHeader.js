import styled from "styled-components";

const TableHeader = styled.th`
    //border: 1px solid black;
    padding: 10px 20px;
    width: ${(props) => props.width};
    text-align: left;
    font-size: 15px;
    color: #828282;
    //background-color: #fafafa;

    cursor: pointer;
`;

export default TableHeader;
