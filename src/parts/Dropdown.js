import './Dropdown.css';
import {useDispatch} from "react-redux";
import {inactive, modifyParts} from "../redux/modalSlice";

const Dropdown = (props) => {

    const dispatch = useDispatch();

    return (
        <div className="user_dropdown">
            <div className="user_dropdownPoint"></div>
            <ul className="user_dropdownUl">

                <li><a href="https://www.naver.com">상세정보</a></li>
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
        </div>
    )
}

export default Dropdown;
