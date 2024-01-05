import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import AddDesktopFindParts from "./AddDesktopFindParts";
import TableContainer from "../table/TableContainer";
import TableHeader from "../table/TableHeader";
import TableSpan from "../table/TableSpan";
import MoreButton from "../table/MoreButton";

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
    const [data, setData] = useState([]);
    const [detailData, setDetailData] = useState(null);

    const [desktopId, setDesktopId] = useState(0);
    const [restoreAvailable, setRestoreAvailable] = useState(false);


    const getData = async () => {

        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + "/desktop/deleted");
            setData(data.data.response);
        } catch {
            alert("문제가 발생했습니다. 다시 시도해 주세요.")
        }
    }

    const getDetailData = async (serial) => {

        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + `/desktop/${serial}`);
            // console.log(data.data.response);
            let detail = data.data.response;
            setDetailData(data.data.response);
            setRestoreAvailable(detail.cpu.usedYn === false
                && detail.gpu.usedYn === false
                && detail.mainBoard.usedYn === false
                && detail.cooler.usedYn === false
                && detail.power.usedYn === false
                && detail.ssd.usedYn === false
                && detail.ram.usedYn === false);


        } catch {
            // console.log("eee");
        }
    }

    const restoreDekstop = async (desktopId) => {

        if(!window.confirm("정말로 복구하시겠습니까?")) {

        } else {
            try {
                const data = await axios.patch(process.env.REACT_APP_DB_HOST + `/desktop/restore/${desktopId}`);
                console.log(data.data.response);
                alert("복구되었습니다.")
                dispatch(close());
                window.location.reload();
            } catch {
                // console.log("eee");
            }
        }

    }


    useEffect(() => {
        getData();
    }, [])

    const convertLocalDateTime = (date) => {
        return date[0] +
            '-' + ((date[1]) < 10 ? "0" + (date[1]) : (date[1])) +
            '-' + ((date[2]) < 10 ? "0" + (date[2]) : (date[2])) + " " +
            (date[3] < 10 ? "0" : "") + date[3] + ":" +
            (date[4] < 10 ? "0" : "") + date[4] + ":" +
            (date[5] < 10 ? "0" : "") + date[5]
    }
    return (
        <Modal className={"modal"} onClick={(e) => {
            if (e.target.classList.contains("modal")) dispatch(close())
        }}>
            <ModalContainer className={"modal_container"}>
                <div>
                    <h2>삭제된 본체 조회</h2>
                    <TableContainer>
                        <TableHeader>본체번호</TableHeader>
                        <TableHeader>삭제일시</TableHeader>

                        {
                            data.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <TableSpan>{item.serial}</TableSpan>
                                            <TableSpan>{convertLocalDateTime(item.deletedAt)}</TableSpan>
                                            <TableSpan>
                                                <button onClick={() => {
                                                    setDetailData(null);
                                                    setDesktopId(item.id)
                                                    getDetailData(item.serial)
                                                }}>상세보기
                                                </button>
                                            </TableSpan>

                                        </tr>
                                        {desktopId === item.id &&
                                            <tr>

                                                <td colSpan={3}>
                                                    {detailData !== null &&
                                                        <div>
                                                            복구 가능 여부 : <span style={{color: restoreAvailable? 'blue' : 'red'}}>{restoreAvailable? '가능' : '불가'}</span><br/>
                                                            <span style={{color: detailData.cpu.usedYn? 'red' : 'blue'}}>CPU : {detailData.cpu.name}</span><br/>
                                                            <span style={{color: detailData.gpu.usedYn? 'red' : 'blue'}}>GPU : {detailData.gpu.name}</span><br/>
                                                            <span style={{color: detailData.mainBoard.usedYn? 'red' : 'blue'}}>메인보드 : {detailData.mainBoard.name}</span><br/>
                                                            <span style={{color: detailData.cooler.usedYn? 'red' : 'blue'}}>쿨러 : {detailData.cooler.name}</span><br/>
                                                            <span style={{color: detailData.power.usedYn? 'red' : 'blue'}}>파워 : {detailData.power.name}</span><br/>
                                                            <span style={{color: detailData.ssd.usedYn? 'red' : 'blue'}}>SSD : {detailData.ssd.name}</span><br/>
                                                            <span style={{color: detailData.ram.usedYn? 'red' : 'blue'}}>RAM : {detailData.ram.name}</span><br/>
                                                            <button disabled={!restoreAvailable} onClick={(e) => {
                                                                restoreDekstop(item.id);
                                                            }}>{restoreAvailable? '복구하기' : '복구불가'}</button>

                                                        </div>}

                                                </td>
                                            </tr>
                                        }
                                    </>

                                )
                            })
                        }

                    </TableContainer>

                </div>


            </ModalContainer>
        </Modal>
    )
}

export default AddParts;
