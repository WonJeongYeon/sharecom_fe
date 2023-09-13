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

    width: 350px;
    height: 500px;

    padding: 40px;

    text-align: center;

    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
    overflow-y: scroll;
  
`;

const AddParts = (props) => {
    const dispatch = useDispatch();
    const [serial, setSerial] = useState(null);
    const [etc, setEtc] = useState();

    const saveParts = async () => {
        try {
            const data = await axios.post("/desktop",  {
                    serial: serial,
                    etc: etc
            });
            console.log(data.data.response);
        } catch {
            console.log("eee");
        }
    }

    return (
        <Modal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <ModalContainer className={"modal_container"}>
                <div>
                    <h2>본체 등록</h2>
                    <div>
                        <label>본체 번호</label>
                        <input type={"text"} placeholder={"본체 번호"}
                               onInput={(e) => {setSerial(e.target.value)}}/>
                    </div>
                    <div>
                        <label>기타 사항</label>
                        <input type={"text"} placeholder={"기타 사항"}
                               onInput={(e) => {setEtc(e.target.value)}}/>
                    </div>
                    <button type="button" onClick={() => {saveParts()}}>저장하기</button>
                </div>
            </ModalContainer>
        </Modal>
    )
}

export default AddParts;
