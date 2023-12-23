import styled from "styled-components";

const RoundButton = styled.button`

  width: 100%;
  height: 50px;
  min-height: 50px;
  border-radius: 25px;
  border: none;
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #3366ff;
  margin-top: 30px;
  color: white;
  &:disabled {
    color: #CCCCCC;
    background-color: #f2f4f7;
    cursor: default;
  }
`;

export default RoundButton;
