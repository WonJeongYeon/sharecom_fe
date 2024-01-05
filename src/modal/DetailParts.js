import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close, modifyParts} from "../redux/modalSlice";
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
import SmallButton from "../common/SmallButton";
import CustomModal from "../common/modal/CustomModal";
import CustomModalContainer from "../common/modal/CustomModalContainer";


const DetailLabelSpan = styled.span`
    color: grey;
    width: 100px;
    text-align: left;
`;

const DetailContentSpan = styled.span`
    text-align: right;
    width: 250px;
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
        <CustomModal className={"modal"}
               // onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}
        >
            <CustomModalContainer width={350} height={500} className={"modal_container"}>

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
                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <DetailLabelSpan>부품종류</DetailLabelSpan>
                                <DetailContentSpan>{data.type}</DetailContentSpan>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <DetailLabelSpan>부품명</DetailLabelSpan>
                                <DetailContentSpan>{data.name}</DetailContentSpan>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <DetailLabelSpan>부품번호</DetailLabelSpan>
                                <DetailContentSpan>{data.serial}</DetailContentSpan>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <DetailLabelSpan>구입일자</DetailLabelSpan>
                                <DetailContentSpan>{`${data.buy_at[0]}-${data.buy_at[1]}-${data.buy_at[2]}`}</DetailContentSpan>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <DetailLabelSpan>본체 부착 여부</DetailLabelSpan>
                                <DetailContentSpan>{data.used_yn ? "YES" : "NO"}</DetailContentSpan>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                <DetailLabelSpan>기타사항</DetailLabelSpan>
                                <DetailContentSpan>{data.etc === null ? '(미입력)' : data.etc}</DetailContentSpan>

                            </div>
                            <div style={{borderBottom: "1px solid #d3d2d2", paddingBottom: "15px", marginTop: "15px"}}>
                                <SmallButton color={"#d4d2ff"} onClick={() => {
                                    dispatch(modifyParts());
                                }}>수정하기</SmallButton>
                            </div>


                            {data.used_yn && <div>
                                <br/>
                                부품 사용 정보
                                <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <span style={{color: 'grey'}}>본체 번호</span>
                                    <span>{list[0].serial}</span>
                                </div>
                                {list[0].used_yn && <div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <span style={{color: 'grey'}}>대여 고객명</span>
                                        <span>{list[0].name}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <span style={{color: 'grey'}}>대여 시작일</span>
                                        <span>{convertTimestamp(list[0].start_date)}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <span style={{color: 'grey'}}>대여 종료일</span>
                                        <span>{convertTimestamp(list[0].end_date)}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <span style={{color: 'grey'}}>대여 참고사항</span>
                                        <span>{list[0].etc}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <span style={{color: 'grey'}}>대여 상태</span>
                                        <span>{convertState(list[0].type)}</span>
                                    </div>
                                </div>
                                }
                            </div>}
                        </div>
                    }
                    {data === null && <CircularProgress style={{marginTop: '180px'}} color="inherit" />}
                </div>
            </CustomModalContainer>
        </CustomModal>
    )
}

export default ModifyParts;
