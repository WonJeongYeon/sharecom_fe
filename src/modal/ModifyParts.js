import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";
import {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import CloseBtn from "../common/modal/CloseBtn";
import ModalHeader from "../common/modal/ModalHeader";
import InputArea from "../common/modal/InputArea";
import InputLabel from "../common/modal/InputLabel";
import InputSelect from "../common/modal/InputSelect";
import InputText from "../common/modal/InputText";
import InputDateSelect from "../common/modal/InputDateSelect";
import RoundButton from "../common/modal/RoundButton";
import CustomModal from "../common/modal/CustomModal";
import CustomModalContainer from "../common/modal/CustomModalContainer";
import Years from "../common/Module/Years";
import Months from "../common/Module/Months";
import Days from "../common/Module/Days";


const ModifyParts = (props) => {
    const dispatch = useDispatch();

    const parseData = JSON.parse(props.data);

    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [serial, setSerial] = useState(null);
    const [buy_at, setBuyAt] = useState(null);
    const [date, setDate] = useState(new Date());
    const [etc, setEtc] = useState();

    const [buyYear, setBuyYear] = useState(parseData.buy_at[0]);
    const [buyMonth, setBuyMonth] = useState(parseData.buy_at[1]);
    const [buyDay, setBuyDay] = useState(parseData.buy_at[2]);



    const saveParts = async () => {
        try {
            const buyDate = buyYear + "-"
                + (buyMonth < 10 ? "0" + buyMonth : buyMonth) + "-"
                + (buyDay < 10 ? "0" + buyDay : buyDay)
            const data = await axios.patch(process.env.REACT_APP_DB_HOST + "/parts/" + parseData.id,  {
                    type: type,
                    name: name,
                    serial: serial,
                    etc: etc,
                    buyAt: buyDate
            });
            console.log(data.data.response);
            alert("변경되었습니다.")
            dispatch(close());
            document.location.reload();
        } catch {
            console.log("eee");
        }
    }

    // const partsType = {
    //     CPU: "CPU",
    //     메인보드: "MAIN_BOARD",
    //     RAM: "RAM",
    //     GPU: "GPU",
    //     SSD: "SSD",
    //     POWER: "POWER",
    //     COOLER: "COOLER"
    // }


    return (
        <CustomModal className={"modal"}
               // onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}
        >
            <CustomModalContainer width={350} height={600} className={"modal_container"}>

                <div>
                    <ModalHeader>
                        부품 정보 변경
                        <CloseBtn onClick={() => {dispatch(close())}}>
                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                            </svg>
                        </CloseBtn>
                    </ModalHeader>
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>부품종류 선택</InputLabel>
                        <InputSelect title={parseData.used_yn? "사용 중인 부품의 종류는 변경할 수 없습니다." : ""} disabled={parseData.used_yn} name={"parts"} onChange={(e) => {
                            // console.log(parseData);
                            setType(e.target.value)}} >
                            <option value="" >부품종류</option>
                            <option value="CPU" selected={parseData.type === 'CPU'}>CPU</option>
                            <option value="GPU" selected={parseData.type === 'GPU'}>GPU</option>
                            <option value="MAIN_BOARD" selected={parseData.type === 'MAIN_BOARD'}>메인보드</option>
                            <option value="RAM" selected={parseData.type === 'RAM'}>램</option>
                            <option value="SSD" selected={parseData.type === 'SSD'}>SSD</option>
                            <option value="POWER" selected={parseData.type === 'POWER'}>파워</option>
                            <option value="COOLER" selected={parseData.type === 'COOLER'}>쿨러</option>
                        </InputSelect>
                    </InputArea>
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>부품명</InputLabel>
                        <InputText type={"text"} placeholder={"부품명을 입력해주세요. (예시) i7-7700HQ"}
                               defaultValue={parseData.name}
                               onInput={(e) => {setName(e.target.value)}}/>
                    </InputArea>
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>일련번호</InputLabel>
                        <InputText type={"text"} placeholder={"일련번호를 입력해주세요. (예시) M220W39uK229"}
                               defaultValue={parseData.serial}
                               onInput={(e) => {setSerial(e.target.value)}}/>
                    </InputArea>
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>구입일자 </InputLabel>
                        <div>
                            <InputDateSelect onChange={(e) => {
                                // console.log(e.target.value)
                                setBuyYear(e.target.value)
                            }}>
                                {Years(2023, 2030).map((item, index) => {
                                    return (
                                        <option selected={buyYear === item} value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                            <span> - </span>
                            <InputDateSelect onChange={(e) => {
                                setBuyMonth(e.target.value)
                            }}>
                                {Months().map((item, index) => {
                                    return (
                                        <option selected={buyMonth === item} value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                            <span> - </span>
                            <InputDateSelect onChange={(e) => {
                                setBuyDay(e.target.value)
                            }}>
                                {Days(buyMonth, buyYear).map((item, index) => {
                                    return (
                                        <option selected={buyDay === item} value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>


                        </div>
                    </InputArea>
                    <InputArea>
                        <InputLabel>비고</InputLabel>
                        <textarea style={{resize: "none"}} cols="40" rows="7" name="ETC" placeholder={"기타사항을 입력해주세요."} defaultValue={parseData.etc}
                                  onInput={(e) => {setEtc(e.target.value)}}/>
                    </InputArea>
                    <RoundButton type="button" onClick={() => {saveParts()}}>저장하기</RoundButton>
                </div>
            </CustomModalContainer>
        </CustomModal>
    )
}

export default ModifyParts;
