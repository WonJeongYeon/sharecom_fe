import './Dropdown.css';
import {useDispatch} from "react-redux";
import {detailParts, inactive, modifyParts} from "../redux/modalSlice";
import styled from "styled-components";

const DropdownArea = styled.div`
  position: absolute;
  /*top: 5%;*/
  width: 192px;
  /*right: 110px;*/
  left: ${(props) => props.left + window.scrollX - 192 + 16}px;
  /*right: 5%;*/
  margin-top: 30px;

  display: block;
  /*border: 1px solid black;*/
  background-color: white;
  /*-webkit-transform: translate(50%,8px);*/
  transform: translate(50%,8px);
  box-shadow: 0 10px 10px 0 rgba(0,0,0,0.4);
  border: 1px solid #d3d2d2;
  border-radius: 10px;
`;

const Dropdown = (props) => {

    const dispatch = useDispatch();

    return (
        <DropdownArea left={props.point}
            // className="user_dropdown"
        >
            <div className="user_dropdownPoint"></div>
            <ul className="user_dropdownUl">

                <li><button className="modifyButton" onClick={(e) => {
                    dispatch(detailParts())
                }}>상세정보</button></li>
                <hr></hr>
                <li><button className="modifyButton" onClick={(e) => {
                    dispatch(modifyParts())
                }}>수정</button></li>

            </ul>
            <div className="user_dropdown_logOut deleteButton" style={{color: "red"}} onClick={() => {
                dispatch(inactive());
            }}>
                삭제
            </div>
        </DropdownArea>
    )
}

export default Dropdown;
