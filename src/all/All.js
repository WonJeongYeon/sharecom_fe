import axios from "axios";
import {useEffect, useState} from "react";
import TableContainer from "../table/TableContainer";
import TableHeader from "../table/TableHeader";
import TableSpan from "../table/TableSpan";

const All = () => {

    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + `/all`);
            setData(data.data.response);
        } catch (e) {

        }

    }
    useEffect( () => {
        getData();
    }, [])

    const convertTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return timestamp !== null? date.toLocaleDateString('ko-KR') : '-';
    }
    const convertState = (state) => {
        let value;
        switch (state) {
            case "RENTAL" : value = "대여 완료"; return value;
            case "RESERVATION" : value = "예약 중"; return value;
            case "RETURN_DELAYED" : value = "반납 지연 완료"; return value;
            case "RETURN_NORMAL" : value = "반납 완료"; return value;
            case "RETURN_ALREADY" : value = "조기 반납 완료"; return value;
            case null : value = "대여 가능"; return value;
            default: value = "확인되지 않은 상태"; return value;
        }
    }
    return (
        <div style={{marginLeft: "50px", display: "flex", justifyContent: "space-between"}}>
            <TableContainer>
                <TableHeader>대여여부</TableHeader>
                <TableHeader>본체번호</TableHeader>
                <TableHeader>고객명</TableHeader>
                <TableHeader>시작일</TableHeader>
                <TableHeader>종료일</TableHeader>
                <TableHeader>특이사항</TableHeader>
                <TableHeader>대여 상태</TableHeader>
            {

            data.map((item, index) => {
                return (
                    <tr>
                        <TableSpan>{item.used_yn? "대여" : "미대여"}</TableSpan>
                        <TableSpan>{item.serial}</TableSpan>
                        <TableSpan>{item.name}</TableSpan>
                        <TableSpan>{convertTimestamp(item.start_date)}</TableSpan>
                        <TableSpan>{convertTimestamp(item.end_date)}</TableSpan>
                        <TableSpan>{item.etc}</TableSpan>
                        <TableSpan>{convertState(item.type)}</TableSpan>
                    </tr>
                )
            })

        }
            </TableContainer>
        </div>
    )
}

export default All;
