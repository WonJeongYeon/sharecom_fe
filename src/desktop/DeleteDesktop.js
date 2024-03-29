import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";
import {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    /*display: none;*/

    z-index: 15;
    background-color: rgba(0, 0, 0, 0.4);
    
  

`;

const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    

    width: 380px;
    height: 230px;

    text-align: center;

    background-color: rgb(255, 255, 255);
    border-radius: 30px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
    overflow-y: scroll;
  
`;

const DeleteDesktop = (props) => {
    const dispatch = useDispatch();

    const parseData = JSON.parse(props.data);
    console.log(props.data);


    const deleteDesktop = async () => {
        try {
            const data = await axios.delete(process.env.REACT_APP_DB_HOST + "/desktop/" + parseData.id);
            console.log(data.data.response);
            alert("삭제되었습니다.")
            dispatch(close());
            document.location.reload();
        } catch {
            console.log("eee");
        }
    }



    return (
        <Modal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <ModalContainer className={"modal_container"}>

                {
                    parseData.usedYn? <div>
                            <div style={{height: "150px", display:"flex", justifyContent: "center", alignItems: "center"}}><h2>대여 중인 제품은 삭제할 수 없습니다.</h2></div>
                    <hr></hr>
                        <div style={{width: "100%", height: "55px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center"}}
                        onClick={(e) => {dispatch(close())}}>확인</div>
                    </div>
                        : <div>
                            <div style={{padding: "0 20px", height: "150px", display:"flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}><h2>정말로 삭제하시겠습니까?</h2>
                            <p>삭제된 제품은 언제든지 복구할 수 있지만, 제품에 사용된 부품이 다른 제품에 사용될 경우 부분 복구만 가능합니다.</p></div>
                            <hr></hr>
                        <div style={{width: "100%", height:"55px", display: "flex", flexDirection: "row"}}>
                            <span style={{width: "50%", height: "100%", cursor: "pointer", borderRight: "1px solid black", color: "red",
                                display: "flex", justifyContent: "center", alignItems: "center"}}
                                 onClick={(e) => {deleteDesktop()}}>예</span>
                            <span style={{width: "50%", height: "100%", cursor: "pointer", color: "blue",
                                display: "flex", justifyContent: "center", alignItems: "center"}}
                                 onClick={(e) => {dispatch(close())}}>아니오</span>
                        </div>
                        </div>
                }
            </ModalContainer>
        </Modal>
    )
}

export default DeleteDesktop;
