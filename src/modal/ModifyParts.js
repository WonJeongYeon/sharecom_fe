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

const ModifyParts = (props) => {
    const dispatch = useDispatch();

    const parseData = JSON.parse(props.data);

    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [serial, setSerial] = useState(null);
    const [buy_at, setBuyAt] = useState(null);
    const [date, setDate] = useState(new Date());
    const [etc, setEtc] = useState();


    const saveParts = async () => {
        try {
            const data = await axios.patch(process.env.REACT_APP_DB_HOST + "/parts/" + parseData.id,  {
                    type: type,
                    name: name,
                    serial: serial,
                    etc: etc
            });
            console.log(data.data.response);
            alert("변경되었습니다.")
            dispatch(close());
            document.location.reload();
        } catch {
            console.log("eee");
        }
    }

    // const partsType = {
    //     CPU: "CPU",
    //     메인보드: "MAIN_BOARD",
    //     RAM: "RAM",
    //     GPU: "GPU",
    //     SSD: "SSD",
    //     POWER: "POWER",
    //     COOLER: "COOLER"
    // }


    return (
        <Modal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <ModalContainer className={"modal_container"}>

                <div>
                    <h2>부품 정보 변경</h2>
                    <div>
                        <select title={parseData.used_yn? "사용 중인 부품의 종류는 변경할 수 없습니다." : ""} disabled={parseData.used_yn} name={"parts"} onChange={(e) => {
                            console.log(parseData);
                            setType(e.target.value)}} >
                            <option value="" selected={true}>부품종류</option>
                            <option value="CPU">CPU</option>
                            <option value="GPU">GPU</option>
                            <option value="MAIN_BOARD">메인보드</option>
                            <option value="RAM">램</option>
                            <option value="SSD">SSD</option>
                            <option value="POWER">파워</option>
                            <option value="COOLER">쿨러</option>
                        </select>
                    </div>
                    <div>
                        <label>부품명</label>
                        <input type={"text"} placeholder={"부품명"}
                               defaultValue={parseData.name}
                               onInput={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div>
                        <label>일련번호</label>
                        <input type={"text"} placeholder={"일련번호"}
                               defaultValue={parseData.serial}
                               onInput={(e) => {setSerial(e.target.value)}}/>
                    </div>
                    <div>
                        <label>구입일자</label>
                        <span>{parseData.buy_at[0] + "." + parseData.buy_at[1] + "." + parseData.buy_at[2]}</span>

                    </div>
                    <div>
                        <label>비고</label>
                        <textarea style={{resize: "none"}} cols="40" rows="7" name="ETC" placeholder={"ETC"} defaultValue={parseData.etc}
                                  onInput={(e) => {setEtc(e.target.value)}}/>
                    </div>
                    <button type="button" onClick={() => {saveParts()}}>저장하기</button>
                </div>
            </ModalContainer>
        </Modal>
    )
}

export default ModifyParts;
