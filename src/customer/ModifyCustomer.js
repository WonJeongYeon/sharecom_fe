import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close, rentalInput} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import CustomModal from "../common/modal/CustomModal";
import CustomModalContainer from "../common/modal/CustomModalContainer";
import CloseBtn from "../common/modal/CloseBtn";
import ModalHeader from "../common/modal/ModalHeader";
import InputArea from "../common/modal/InputArea";
import InputLabel from "../common/modal/InputLabel";
import InputText from "../common/modal/InputText";
import InputDateSelect from "../common/modal/InputDateSelect";
import Years from "../common/Module/Years";
import Months from "../common/Module/Months";
import Days from "../common/Module/Days";
import RoundButton from "../common/modal/RoundButton";


const ModifyCustomer = (props) => {
    const dispatch = useDispatch();

    const parseData = JSON.parse(props.data);

    const [name, setName] = useState(parseData.name);
    const [address, setAddress] = useState(parseData.address);
    const [phone, setPhone] = useState(parseData.phone);
    const [etc, setEtc] = useState(parseData.etc);

    const [birthYear, setBirthYear] = useState(parseData.birth[0]);
    const [birthMonth, setBirthMonth] = useState(parseData.birth[1]);
    const [birthDay, setBirthDay] = useState(parseData.birth[2]);

    const saveCustomer = async () => {
        try {
            const birthDate = birthYear + "-"
                + (birthMonth < 10 ? "0" + birthMonth : birthMonth) + "-"
                + (birthDay < 10 ? "0" + birthDay : birthDay)
            const data = await axios.patch(process.env.REACT_APP_DB_HOST + "/customer/" + parseData.id,  {
                name: name === parseData.name? null : name,
                address: address === parseData.address? null : address,
                phone: phone === parseData.phone? null : phone,
                birth: birthDate,
                etc: etc
            });
            console.log(data.data.response);
            alert("변경되었습니다.")
            dispatch(close());
            document.location.reload();
        } catch (e) {
            alert("고객정보 변경에 실패했습니다.");
        }
    }


    return (
        <CustomModal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <CustomModalContainer width={350} height={600} className={"modal_container"}>

                <div>
                    <ModalHeader>
                        고객 정보 변경
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
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>고객명</InputLabel>
                        <InputText defaultValue={parseData.name} type={"text"} placeholder={"고객명을 입력하세요."}
                                   onInput={(e) => {
                                       setName(e.target.value)
                                   }}/>
                    </InputArea>
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>주소</InputLabel>
                        <InputText defaultValue={parseData.address} type={"text"} placeholder={"주소를 입력하세요."}
                                   onInput={(e) => {
                                       setAddress(e.target.value)
                                   }}/>
                    </InputArea>
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>전화번호</InputLabel>
                        <InputText defaultValue={parseData.phone} type={"text"} placeholder={"전화번호를 입력하세요."}
                                   onInput={(e) => {
                                       setPhone(e.target.value)
                                   }}/>
                    </InputArea>
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>생년월일</InputLabel>
                        <div>
                            <InputDateSelect onChange={(e) => {
                                // console.log(e.target.value)
                                setBirthYear(e.target.value)
                            }}>
                                {Years(1950, 2030).map((item, index) => {
                                    return (
                                        <option selected={birthYear === item} value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                            <span> - </span>
                            <InputDateSelect onChange={(e) => {
                                setBirthMonth(e.target.value)
                            }}>
                                {Months().map((item, index) => {
                                    return (
                                        <option selected={birthMonth === item} value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                            <span> - </span>
                            <InputDateSelect onChange={(e) => {
                                setBirthDay(e.target.value)
                            }}>
                                {Days(birthMonth, birthYear).map((item, index) => {
                                    return (
                                        <option selected={birthDay === item} value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>


                        </div>
                    </InputArea>
                    <InputArea>
                        <InputLabel>참고사항</InputLabel>
                        <InputText defaultValue={parseData.etc} type={"text"} placeholder={"참고사항을 입력하세요."}
                                   onInput={(e) => {
                                       setEtc(e.target.value)
                                   }}/>
                    </InputArea>
                    <div style={{textAlign: 'right', fontSize: '12px'}}>
                        <span style={{color: 'red'}}>* </span><span style={{color: 'grey'}}> 필수 입력사항</span><br/>
                    </div>

                    <RoundButton disabled={name==='' || address==='' || phone === ''} type="button" onClick={() => {
                        saveCustomer()
                    }}>저장하기
                    </RoundButton>
                </div>
            </CustomModalContainer>
        </CustomModal>
    )
}

export default ModifyCustomer;
