import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close, rentalInput} from "../redux/modalSlice";
import {useEffect, useState} from "react";
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
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [birth, setBirth] = useState(new Date());
    const [etc, setEtc] = useState();



    const saveCustomer = async () => {
        try {
            //dayjs 라이브러리를 씁시다 Format 설정이 가능함 이따구로 안하고
            const dateStr = birth.getFullYear() +
            '-' + ( (birth.getMonth()+1) < 9 ? "0" + (birth.getMonth()+1) : (birth.getMonth()+1) )+
            '-' + ( (birth.getDate()) < 9 ? "0" + (birth.getDate()) : (birth.getDate()) )
            const data = await axios.post(process.env.REACT_APP_DB_HOST + "/customer",  {
                address: address,
                etc: etc,
                name: name,
                phone: phone,
                birth: dateStr
            });
            const id = data.data.response;
            console.log(data.data.response);
            if (!window.confirm("고객정보 등록이 완료되었습니다. PC 대여정보를 입력하시겠습니까?")){
                dispatch(close());
                window.location.reload();
            } else {
                const reduxData = {id: id, name: name};
                dispatch(rentalInput(JSON.stringify(reduxData)));
            }
        } catch {
            alert("고객정보 저장에 실패했습니다. 이름, 전화번호, 주소, 생년월일은 필수 입력값입니다.")
        }
    }


    return (
        <Modal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <ModalContainer className={"modal_container"}>

                <div>
                    <h2>신규 고객 등록</h2>
                    <div>
                        <label>고객명</label>
                        <input type={"text"} placeholder={"고객명"}
                               onInput={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div>
                        <label>주소</label>
                        <input type={"text"} placeholder={"주소"}
                               onInput={(e) => {setAddress(e.target.value)}}/>
                    </div>
                    <div>
                        <label>전화번호</label>
                        <input type={"text"} placeholder={"전화번호"}
                               onInput={(e) => {setPhone(e.target.value)}}/>
                    </div>
                    <div>
                        <label>생년월일</label>
                        <DatePicker
                            showIcon
                            selected={birth}
                            onChange={date => {setBirth(date)}}
                        />
                    </div>
                    <div>
                        <label>비고</label>
                        <input type={"text"} placeholder={"ETC"}
                               onInput={(e) => {setEtc(e.target.value)}}/>
                    </div>

                    <button type="button" onClick={() => {saveCustomer()}}>저장하기</button>
                </div>
            </ModalContainer>
        </Modal>
    )
}

export default AddParts;
