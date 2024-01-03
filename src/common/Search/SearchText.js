import styled from "styled-components";

const SearchText = styled.input`
  padding: 10px;
  //width: 94%;
  border: 1px solid #d3d2d2;
  border-radius: 3px;
  //margin-bottom: 15px;
  outline: none;
    &:focus{
        border: 1px solid black;
    }
`;

export default SearchText;
