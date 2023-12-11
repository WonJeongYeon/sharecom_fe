import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TableContainer from "../table/TableContainer";
import TableHeader from "../table/TableHeader";
import TableSpan from "../table/TableSpan";

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

    width: 700px;
    height: 500px;

    padding: 40px;

    text-align: center;

    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
    overflow-y: scroll;
  
`;

const DetailCustomer = (props) => {
    const dispatch = useDispatch();


    const [data, setData] = useState({});
    const [desktopArr, setDesktopArr] = useState([]);

    const convertState = (state) => {
        let value;
        switch (state) {
            case "RENTAL" : value = "대여 완료"; return value;
            case "RESERVATION" : value = "예약"; return value;
            case "RETURN_DELAYED" : value = "반납 지연 완료"; return value;
            case "RETURN_NORMAL" : value = "반납 완료"; return value;
            case "RETURN_ALREADY" : value = "조기 반납 완료"; return value;
            default: value = "확인되지 않은 상태"; return value;
        }
    }

    const convertLocalDate = (date) => {
        return date[0] +
            '-' + ( (date[1]) < 10 ? "0" + (date[1]) : (date[1]) )+
            '-' + ( (date[2]) < 10 ? "0" + (date[2]) : (date[2]) )
    }
    const convertLocalDateTime = (date) => {
        return date[0] +
            '-' + ( (date[1]) < 10 ? "0" + (date[1]) : (date[1]) )+
            '-' + ( (date[2]) < 10 ? "0" + (date[2]) : (date[2]) ) + " " +
            (date[3] < 10? "0" : "") + date[3] + ":" +
            (date[4] < 10? "0" : "") + date[4] + ":" +
            (date[5] < 10? "0" : "") + date[5]
    }
   const getData = async () => {
       try {
           const data = await axios.get(process.env.REACT_APP_DB_HOST + `/customer/${props.data}`);
           setData(data.data.response);
           setDesktopArr(data.data.response.desktop);
       } catch (e) {

       }

   }

    useEffect( () => {
        getData();
    }, [])



    return (
        <Modal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <ModalContainer className={"modal_container"}>

                <div>
                    <h2>고객 상세정보</h2>
                    <div>
                        이름 : {data.name}
                    </div>
                    <div>
                        주소 : {data.address}
                    </div>
                    <div>
                        전화번호 : {data.phone}
                    </div>
                    <div>
                        기타사항 : {data.etc}
                    </div>
                    { desktopArr.length !==0? <TableContainer>
                        <TableHeader>본체번호</TableHeader>
                        <TableHeader>본체 기타사항</TableHeader>
                        <TableHeader>대여 상태</TableHeader>
                        <TableHeader>시작일</TableHeader>
                        <TableHeader>종료일</TableHeader>
                        <TableHeader>처리일시</TableHeader>

                    {
                        desktopArr.map((item, index) => {
                            return (
                                <tr>
                                    <TableSpan>{item.serial}</TableSpan>
                                    <TableSpan>{item.etc}</TableSpan>
                                    <TableSpan>{convertState(item.state)}</TableSpan>
                                    <TableSpan>{convertLocalDate(item.startDate)}</TableSpan>
                                    <TableSpan>{convertLocalDate(item.endDate)}</TableSpan>
                                    <TableSpan>{convertLocalDateTime(item.insertAt)}</TableSpan>
                                </tr>
                            )

                        })
                    }
                    </TableContainer>
                        : <div>대여 기록이 없습니다.</div>
                    }

                    <button type="button" onClick={() => {}}>저장하기</button>
                </div>
            </ModalContainer>
        </Modal>
    )
}

export default DetailCustomer;
