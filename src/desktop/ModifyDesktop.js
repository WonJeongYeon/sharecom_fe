import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AddDesktopFindParts from "./AddDesktopFindParts";

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

    width: 50%;
    height: 500px;

    padding: 40px;

    text-align: center;

    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
    overflow-y: scroll;
  
`;

const ModifyDesktop = (props) => {
    const dispatch = useDispatch();
    const [serial, setSerial] = useState(null);
    const [etc, setEtc] = useState();

    const [data, setData] = useState([]);
    const [id, setId] = useState(0);

    const [reason, setReason] = useState(null);


    const findParts = async (type) => {
        try {
            const partsData = await axios.get(process.env.REACT_APP_DB_HOST + "/parts", {
                params: {
                    type: type,
                    name: null,
                    serial: null,
                    buy_at: null,
                    etc: null,
                    usedYn: false
                }
            });
            setData(partsData.data.response);

        } catch {

        }


    }

    const saveModifyDesktop = async () => {
        try {
            await axios.patch(process.env.REACT_APP_DB_HOST + "/desktop/" + props.id, {
                reason: (props.usedYn? "(AS)" : "") + reason,
                etc: null,
                partsType: [props.type],
                partsArr : [id],
                oldPartsArr : [JSON.parse(props.parts).id]
            })
            alert("변경 완료");
            dispatch(close());
            props.reload();
        } catch (e) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    }
    useEffect(() => {
        findParts(props.type);
    }, [])

    return (
        <Modal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <ModalContainer className={"modal_container"}>
                <div>
                    <h2>본체 부품 변경 - {props.type}</h2>
                    <div>
                        <label>아이디 </label>
                        {props.id}
                    </div>
                    <div>
                        <label>본체 번호 </label>
                        {props.serial}
                    </div>
                    <div>
                        <label>기타 사항 </label>
                        {props.etc}
                    </div>

                    <div>
                        <h4>현재 부품</h4>
                        <p>{JSON.parse(props.parts).name}<br></br>
                        {JSON.parse(props.parts).serial}<br></br>
                        {JSON.parse(props.parts).etc}<br></br></p>
                    </div>
                </div>


                <AddDesktopFindParts data={data} type={props.type} setData={setData} setId={setId}/>


                <label>변경 사유</label>
                <input type="text" onInput={(e) => {setReason(e.target.value)}}/>
                <button type="button" onClick={() => {if (id !== 0 )saveModifyDesktop()}}>저장하기</button>
            </ModalContainer>
        </Modal>
    )
}

export default ModifyDesktop;
