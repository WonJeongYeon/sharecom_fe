import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import CustomModal from "../common/modal/CustomModal";
import CustomModalContainer from "../common/modal/CustomModalContainer";

const DeleteCustomer = (props) => {
    const dispatch = useDispatch();

    const parseData = JSON.parse(props.data);


    const deleteCustomer = async () => {
        try {
            const data = await axios.delete(process.env.REACT_APP_DB_HOST + "/customer/" + parseData.id);
            console.log(data.data.response);
            alert("삭제되었습니다.")
            dispatch(close());
            document.location.reload();
        } catch {
            console.log("eee");
        }
    }


    return (
        <CustomModal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <CustomModalContainer width={340} height={190} radius={50} className={"modal_container"}>

                {
                    parseData.rentalState? <div>
                            <div style={{height: "150px", display:"flex", justifyContent: "center", alignItems: "center"}}><h3>PC를 대여 중인 고객 정보는 삭제할 수 없습니다.</h3></div>
                    <hr></hr>
                        <div style={{width: "100%", height: "55px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center"}}
                        onClick={(e) => {dispatch(close())}}>확인</div>
                    </div>
                        : <div>
                            <div style={{height: "150px", display:"flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                                <p style={{fontWeight: '600', fontSize:'24px', marginBottom: '30px'}}>정말로 삭제하시겠습니까?</p>
                            <p>고객 정보를 삭제하더라도 본 고객의 대여 기록은 삭제되지 않습니다.<br/>또한 삭제된 고객 정보는 언제든지 복구할 수 있습니다.</p></div>
                            <hr></hr>
                        <div style={{width: "100%", height:"55px", display: "flex", flexDirection: "row"}}>
                            <span style={{width: "50%", height: "100%", cursor: "pointer", borderRight: "1px solid black", color: "red",
                                display: "flex", justifyContent: "center", alignItems: "center"}}
                                 onClick={(e) => {deleteCustomer()}}>예</span>
                            <span style={{width: "50%", height: "100%", cursor: "pointer", color: "blue",
                                display: "flex", justifyContent: "center", alignItems: "center"}}
                                 onClick={(e) => {dispatch(close())}}>아니오</span>
                        </div>
                        </div>
                }
            </CustomModalContainer>
        </CustomModal>
    )
}

export default DeleteCustomer;
