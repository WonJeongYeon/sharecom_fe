import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios, {get} from "axios";
import CloseBtn from "../common/modal/CloseBtn";
import ModalHeader from "../common/modal/ModalHeader";
import InputArea from "../common/modal/InputArea";
import InputLabel from "../common/modal/InputLabel";
import InputSelect from "../common/modal/InputSelect";
import InputText from "../common/modal/InputText";
import InputDateSelect from "../common/modal/InputDateSelect";
import RoundButton from "../common/modal/RoundButton";
import {CircularProgress} from "@mui/material";

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
const ModifyParts = (props) => {
    const dispatch = useDispatch();

    const parseData = JSON.parse(props.data);

    const [data, setData] = useState(null);
    const [list, setList] = useState([]);





    const getData = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + "/parts/" + parseData.id);
            console.log(data.data.response);

            setData(data.data.response);
            setList(data.data.response.rentalData);
        } catch {
            console.log("eee");
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Modal className={"modal"}
               // onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}
        >
            <ModalContainer className={"modal_container"}>

                <div>
                    <ModalHeader>
                        부품 상세정보
                        <CloseBtn onClick={() => {dispatch(close())}}>
                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                            </svg>
                        </CloseBtn>
                    </ModalHeader>
                    {data !== null && //진짜 맘에안들지만 데이터 가져오는동안 에러 방
                        <div>
                        <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                            <span style={{color: 'grey'}}>부품종류</span>
                            <span >{data.type}</span>
                        </div>
                            <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                <span style={{color: 'grey'}}>부품명</span>
                                <span >{data.name}</span>
                            </div>
                            <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                <span style={{color: 'grey'}}>부품번호</span>
                                <span >{data.serial}</span>
                            </div>
                            <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                <span style={{color: 'grey'}}>구입일자</span>
                                <span >{`${data.buy_at[0]}-${data.buy_at[1]}-${data.buy_at[2]}`}</span>
                            </div>
                            <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                <span style={{color: 'grey'}}>본체 부착 여부</span>
                                <span >{data.used_yn? "YES" : "NO"}</span>
                            </div>
                            <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                <span style={{color: 'grey'}}>기타사항</span>
                                <span >{data.etc === null ? '(미입력)' : data.etc}</span>
                            </div>

                            {data.used_yn && <div>
                                <br/>
                                부품 사용 정보
                                <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                    <span style={{color: 'grey'}}>본체 번호</span>
                                    <span >{list[0].serial}</span>
                                </div>
                                {list[0].used_yn && <div>
                                <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                    <span style={{color: 'grey'}}>대여 고객명</span>
                                    <span >{list[0].name}</span>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                    <span style={{color: 'grey'}}>대여 시작일</span>
                                    <span >{convertTimestamp(list[0].start_date)}</span>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                    <span style={{color: 'grey'}}>대여 종료일</span>
                                    <span >{convertTimestamp(list[0].end_date)}</span>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                    <span style={{color: 'grey'}}>대여 참고사항</span>
                                    <span >{list[0].etc}</span>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                    <span style={{color: 'grey'}}>대여 상태</span>
                                    <span >{convertState(list[0].type)}</span>
                                </div>
                                </div>
                                }
                            </div>}
                    </div>
                    }
                    {data === null && <CircularProgress style={{marginTop: '180px'}} color="inherit" />}
                </div>
            </ModalContainer>
        </Modal>
    )
}

export default ModifyParts;
