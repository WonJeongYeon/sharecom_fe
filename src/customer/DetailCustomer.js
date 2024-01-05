import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close, rentalInput} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TableContainer from "../table/TableContainer";
import TableHeader from "../table/TableHeader";
import TableSpan from "../table/TableSpan";
import ConvertLocalDate from "../common/Module/ConvertLocalDate";
import ConvertLocalDateTime from "../common/Module/ConvertLocalDateTime";
import CustomModal from "../common/modal/CustomModal";
import CustomModalContainer from "../common/modal/CustomModalContainer";





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
        <CustomModal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <CustomModalContainer width={700} height={500}>

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
                                    <TableSpan>{ConvertLocalDate(item.startDate)}</TableSpan>
                                    <TableSpan>{ConvertLocalDate(item.endDate)}</TableSpan>
                                    <TableSpan>{ConvertLocalDateTime(item.insertAt)}</TableSpan>
                                </tr>
                            )

                        })
                    }
                    </TableContainer>
                        : <div>대여 기록이 없습니다.</div>
                    }

                    <button type="button" onClick={() => {
                        const reduxData = {id: props.data, name: data.name};
                        dispatch(rentalInput(JSON.stringify(reduxData)));
                        }}>대여정보 추가하기</button>
                </div>
            </CustomModalContainer>
        </CustomModal>
    )
}

export default DetailCustomer;
