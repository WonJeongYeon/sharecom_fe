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
import ConvertBackgroundStateColor from "../common/Module/ConvertBackgroundStateColor";
import convertStateColor from "../common/Module/ConvertStateColor";


const RentalStateBtn = styled.button`
    width: 100px;
    height: 100px;
    background-color: ${(props) => ConvertBackgroundStateColor(props.state)};
    //background-color: ${(props) => props.color};
    border: ${(props) => props.disabled? "4px solid "+convertStateColor(props.state) : null};
    color: black;
    &:hover{
        background-color: ${(props) => ConvertBackgroundStateColor(props.state)};
        opacity: 0.5;
    }
    &:disabled{
        opacity: 1;
        color: gray;
    }
`;

const ManageRental = (props) => {
    const dispatch = useDispatch();

    const parseData = JSON.parse(props.data);

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
                        대여정보 관리
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

                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <RentalStateBtn disabled={parseData.type==="RESERVATION"} state={'RESERVATION'}>예약 중</RentalStateBtn>
                        <span style={{width: '100px'}}>
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
                        </svg>
                            </span>
                        <RentalStateBtn disabled={parseData.type==="RENTAL"} state={"RENTAL"}>대여 완료</RentalStateBtn>
                        <span style={{width: '100px'}}>
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
                        </svg>
                            </span>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <RentalStateBtn state={"RETURN_ALREADY"}>조기 반납</RentalStateBtn>
                            <RentalStateBtn state={"RETURN_NORMAL"}>반납 완료</RentalStateBtn>
                            <RentalStateBtn state={"RETURN_DELAYED"}>반납 지연</RentalStateBtn>
                        </div>
                    </div>





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

export default ManageRental;
