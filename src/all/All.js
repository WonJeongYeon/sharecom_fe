import axios from "axios";
import {useEffect, useState} from "react";
import {rentalInput} from "../redux/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import Rental from "../customer/Rental";
import MoreButton from "../table/MoreButton";
import CustomerDropdown from "../customer/CustomerDropdown";
import AddButton from "../common/Search/AddButton";
import TableContainer from "../common/ListTable/TableContainer";
import TableHeader from "../common/ListTable/TableHeader";
import TableSpan from "../common/ListTable/TableSpan";
import styled from "styled-components";
import UsedTag from "../common/UsedTag";



const All = () => {





    const [data, setData] = useState([]);

    const [dropdown, setDropdown] = useState(0);
    const [desktopId,setDesktopId] = useState(0);
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

    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal.value);

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
        <div style={{marginLeft: "70px", display: "flex", justifyContent: "space-between"}} onClick={(e) => {
            if (!e.target.classList.contains("dropdown")) {
                setDropdown(0);
            }
        }}>


            {modal === "rental_input" && <Rental/>}
            <div>
                <AddButton type="button" onClick={() => {
                    const reduxData = {id: 0, name: ''};
                    dispatch(rentalInput(JSON.stringify(reduxData)));
                }}>대여정보 추가하기</AddButton>
            <TableContainer>
                <TableHeader width={'60px'}>대여여부</TableHeader>
                <TableHeader width={'60px'}>본체번호</TableHeader>
                <TableHeader width={'60px'}>고객명</TableHeader>
                <TableHeader width={'100px'}>시작일</TableHeader>
                <TableHeader width={'100px'}>종료일</TableHeader>
                <TableHeader width={'200px'}>특이사항</TableHeader>
                <TableHeader width={'60px'}>대여 상태</TableHeader>
                <TableHeader width={'13px'}></TableHeader>
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
                        <TableSpan style={{color: 'green'}}><UsedTag>{convertState(item.type)}</UsedTag></TableSpan>
                        <TableSpan><MoreButton  onClick={(e) => {
                            console.log(e.target.className);
                            if (dropdown === item.desktopId) {
                                setDropdown(0);
                            } else {
                                setDesktopId(item.desktopId);
                                setDropdown(item.desktopId)}
                        }}>
                            <svg className="dropdown" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                 strokeMiterlimit="2" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
                            </svg></MoreButton></TableSpan>
                        {dropdown === item.desktopId && <CustomerDropdown/>}
                    </tr>
                )
            })

        }
            </TableContainer>
            </div>
        </div>
    )
}

export default All;
