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
import CloseBtn from "../common/modal/CloseBtn";
import ModalHeader from "../common/modal/ModalHeader";
import AddButton from "../common/Search/AddButton";


const DetailCustomer = (props) => {
    const dispatch = useDispatch();


    const [data, setData] = useState({});
    const [desktopArr, setDesktopArr] = useState([]);

    const convertState = (state) => {
        let value;
        switch (state) {
            case "RENTAL" :
                value = "대여 완료";
                return value;
            case "RESERVATION" :
                value = "예약";
                return value;
            case "RETURN_DELAYED" :
                value = "반납 지연 완료";
                return value;
            case "RETURN_NORMAL" :
                value = "반납 완료";
                return value;
            case "RETURN_ALREADY" :
                value = "조기 반납 완료";
                return value;
            default:
                value = "확인되지 않은 상태";
                return value;
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

    const naverMapsUri = (address) => {
        let arr = address.split(' ');
        let uri = 'https://map.naver.com/p/search/';
        for (let i = 0; i<arr.length; i++) {
            uri += arr[i];
            uri += '%20';
        }
        return uri;
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <CustomModal className={"modal"} onClick={(e) => {
            if (e.target.classList.contains("modal")) dispatch(close())
        }}>
            <CustomModalContainer width={700} height={500} className={"modal_container"}>

                <div>
                    <ModalHeader>
                        고객 상세정보
                        <CloseBtn onClick={() => {
                            dispatch(close())
                        }}>
                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                            </svg>
                        </CloseBtn>
                    </ModalHeader>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span style={{width: '24px', marginRight: '10px'}}><svg width="24" height="24"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd">
                            <path
                                d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-4 13v1h-4v-1h4zm-6.002 1h-10.997l-.001-.914c-.004-1.05-.007-2.136 1.711-2.533.789-.182 1.753-.404 1.892-.709.048-.108-.04-.301-.098-.407-1.103-2.036-1.305-3.838-.567-5.078.514-.863 1.448-1.359 2.562-1.359 1.105 0 2.033.488 2.545 1.339.737 1.224.542 3.033-.548 5.095-.057.106-.144.301-.095.41.14.305 1.118.531 1.83.696 1.779.41 1.773 1.503 1.767 2.56l-.001.9zm-9.998-1h8.999c.003-1.014-.055-1.27-.936-1.473-1.171-.27-2.226-.514-2.57-1.267-.174-.381-.134-.816.119-1.294.921-1.739 1.125-3.199.576-4.111-.332-.551-.931-.855-1.688-.855-.764 0-1.369.31-1.703.871-.542.91-.328 2.401.587 4.09.259.476.303.912.13 1.295-.342.757-1.387.997-2.493 1.252-.966.222-1.022.478-1.021 1.492zm18-3v1h-6v-1h6zm0-3v1h-6v-1h6zm0-3v1h-6v-1h6z"/>
                        </svg></span>
                        {data.name}
                    </div>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span style={{width: '24px', marginRight: '10px'}}><svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24">
                            <path
                                d="M17.5 2c.276 0 .5.224.5.5v19c0 .276-.224.5-.5.5h-11c-.276 0-.5-.224-.5-.5v-19c0-.276.224-.5.5-.5h11zm2.5 0c0-1.104-.896-2-2-2h-12c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-20zm-9.5 1h3c.276 0 .5.224.5.501 0 .275-.224.499-.5.499h-3c-.275 0-.5-.224-.5-.499 0-.277.225-.501.5-.501zm1.5 18c-.553 0-1-.448-1-1s.447-1 1-1c.552 0 .999.448.999 1s-.447 1-.999 1zm5-3h-10v-13h10v13z"/>
                        </svg></span>
                        {data.phone}
                    </div>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span style={{width: '24px', marginRight: '10px'}}><svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24">
                            <path
                                d="M7 11c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5zm5-8v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981z"/>
                        </svg></span>
                        <span>{data.etc}</span>
                    </div>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                       <span style={{width: '24px', marginRight: '10px'}}><svg xmlns="http://www.w3.org/2000/svg"
                                                                               width="24" height="24"
                                                                               viewBox="0 0 24 24">
                            <path
                                d="M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z"/>
                       </svg></span>
                        {data.address}
                        {data.address !== undefined &&
                            <a href={naverMapsUri(data.address)} target="_blank" style={{marginLeft: '10px'}}>
                                네이버 지도로 보기</a>}
                    </div>
                    {desktopArr.length !== 0 ? <TableContainer>
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

                    <AddButton type="button" onClick={() => {
                        const reduxData = {id: props.data, name: data.name};
                        dispatch(rentalInput(JSON.stringify(reduxData)));
                    }}>대여정보 추가하기
                    </AddButton>
                </div>
            </CustomModalContainer>
        </CustomModal>
    )
}

export default DetailCustomer;
