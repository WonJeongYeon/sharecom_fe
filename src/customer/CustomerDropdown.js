import '../parts/Dropdown.css';
import {useDispatch} from "react-redux";
import {customerDetail, inactive, modifyParts} from "../redux/modalSlice";

const CustomerDropdown = (props) => {

    const dispatch = useDispatch();

    return (
        <div className="user_dropdown">
            <div className="user_dropdownPoint"></div>
            <ul className="user_dropdownUl">

                <li><button className="modifyButton" onClick={(e) => {
                    dispatch(customerDetail())

                }}>상세정보</button></li>
                <hr></hr>
                <li><button className="modifyButton" onClick={(e) => {
                    // dispatch(modifyParts())
                }}>수정</button></li>

            </ul>
            <div className="user_dropdown_logOut deleteButton" style={{color: "red"}} onClick={() => {
                // dispatch(inactive());
            }}>
                삭제
            </div>
        </div>
    )
}

export default CustomerDropdown;
