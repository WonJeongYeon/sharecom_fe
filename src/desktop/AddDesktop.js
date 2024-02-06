import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AddDesktopFindParts from "./AddDesktopFindParts";
import SearchText from "../common/Search/SearchText";
import SearchRoundButton from "../common/Search/SearchRoundButton";
import AddButton from "../common/Search/AddButton";

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

    width: 70%;
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

    const [cpuData, setCpuData] = useState([]);
    const [gpuData, setGpuData] = useState([]);
    const [boardData, setBoardData] = useState([]);
    const [ssdData, setSsdData] = useState([]);
    const [ramData, setRamData] = useState([]);
    const [powerData, setPowerData] = useState([]);
    const [coolerData, setCoolerData] = useState([]);

    const [cpuId, setCpuId] = useState();
    const [gpuId, setGpuId] = useState();
    const [boardId, setBoardId] = useState();
    const [ssdId, setSsdId] = useState();
    const [ramId, setRamId] = useState();
    const [powerId, setPowerId] = useState();
    const [coolerId, setCoolerId] = useState();

    const saveParts = async () => {

        try {
            const data = await axios.post(process.env.REACT_APP_DB_HOST + "/desktop",  {
                    serial: serial,
                    etc: etc,
                    cpuId: cpuId,
                    gpuId: gpuId,
                    boardId: boardId,
                    ssdId: ssdId,
                    ramId: ramId,
                    powerId: powerId,
                    coolerId: coolerId
            });
            console.log(data.data.response);
            if (data.data.response === "성공") {
                dispatch(close());
            } else if (data.data.response === "이미 존재하는 본체 고유번호입니다.") {
                alert(data.data.response);
            } else {
                alert("오류가 발생했습니다. 다시 시도해 주세요.");
            }
        } catch {
            console.log("eee");
        }
    }

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
            switch (type) {
                case "CPU":setCpuData(partsData.data.response); break;
                case "GPU":setGpuData(partsData.data.response); break;
                case "MAIN_BOARD":setBoardData(partsData.data.response); break;
                case "SSD":setSsdData(partsData.data.response); break;
                case "RAM":setRamData(partsData.data.response); break;
                case "POWER":setPowerData(partsData.data.response); break;
                case "COOLER":setCoolerData(partsData.data.response); break;
                default: alert("Unknown type: " + type);
            }

        } catch {

        }


    }
    useEffect(() => {
        findParts("CPU");
        findParts("GPU");
        findParts("MAIN_BOARD");
        findParts("SSD");
        findParts("RAM");
        findParts("COOLER");
        findParts("POWER");
    }, [])

    return (
        <Modal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <ModalContainer className={"modal_container"}>
                <div>
                    <h2>본체 등록</h2>
                    <br/>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                    <div>
                        <span style={{color: 'red'}}>* </span><label>본체 번호 </label>
                        <SearchText type={"text"} placeholder={"본체 번호"}
                               onInput={(e) => {setSerial(e.target.value)}}/>
                    </div>
                    <div>
                        <label>기타 사항 </label>
                        <SearchText type={"text"} placeholder={"기타 사항"}
                               onInput={(e) => {setEtc(e.target.value)}}/>
                    </div>
                    </div>

                </div>


                <AddDesktopFindParts data={cpuData} type={"CPU"} setData={setCpuData} setId={setCpuId}/>
                <AddDesktopFindParts data={gpuData} type={"GPU"} setData={setGpuData} setId={setGpuId}/>
                <AddDesktopFindParts data={boardData} type={"MAIN_BOARD"} setData={setBoardData} setId={setBoardId}/>
                <AddDesktopFindParts data={ssdData} type={"SSD"} setData={setSsdData} setId={setSsdId}/>
                <AddDesktopFindParts data={ramData} type={"RAM"} setData={setRamData} setId={setRamId}/>
                <AddDesktopFindParts data={powerData} type={"POWER"} setData={setPowerData} setId={setPowerId}/>
                <AddDesktopFindParts data={coolerData} type={"COOLER"} setData={setCoolerData} setId={setCoolerId}/>


                <AddButton type="button" onClick={() => {saveParts()}}>저장하기</AddButton>
            </ModalContainer>
        </Modal>
    )
}

export default AddParts;
