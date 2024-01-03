import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";
import {useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ModalHeader from "../common/modal/ModalHeader";
import CloseBtn from "../common/modal/CloseBtn";
import InputLabel from "../common/modal/InputLabel";
import InputText from "../common/modal/InputText";
import InputArea from "../common/modal/InputArea";
import InputSelect from "../common/modal/InputSelect";
import InputDateSelect from "../common/modal/InputDateSelect";
import RoundButton from "../common/modal/RoundButton";

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
    height: 600px;

    padding: 40px;

    text-align: center;

    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
    overflow-y: scroll;
  
`;

const AddParts = (props) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [serial, setSerial] = useState(null);
    const [etc, setEtc] = useState('');

    const [buyYear, setBuyYear] = useState(2023);
    const [buyMonth, setBuyMonth] = useState(1);
    const [buyDay, setBuyDay] = useState(1);

    const [direct, setDirect] = useState(false);
    const [preset, setPreset] = useState(null);

    const years = () => {
        let arr = [];
        for (let i = 2023; i < 2030; i++) {
            arr.push(i);
        }
        return arr;
    }

    const months = () => {
        let arr = [];
        for (let i = 1; i < 13; i++) {
            arr.push(i);
        }
        return arr;
    }

    const days = () => {
        let arr = [];
        for (let i = 1; i < 32; i++) {
            arr.push(i);
        }
        return arr;
    }

    const saveParts = async () => {
        try {
            //dayjs 라이브러리를 씁시다 Format 설정이 가능함 이따구로 안하고
            // const dateStr = date.getFullYear() +
            // '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
            // '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) )
            const buyDate = buyYear + "-"
                + (buyMonth < 10 ? "0" + buyMonth : buyMonth) + "-"
                + (buyDay < 10 ? "0" + buyDay : buyDay)
            const data = await axios.post(process.env.REACT_APP_DB_HOST + "/parts",  {
                    type: type,
                    name: direct? name : preset,
                    serial: serial,
                    buyAt: buyDate,
                    etc: etc
            });
            console.log(data.data.response);
            dispatch(close());
            window.location.reload();
        } catch (e) {
            alert('저장에 실패했습니다. 관리자에게 문의 바랍니다.');
            console.log(e);
        }
    }

    return (
        <Modal className={"modal"} onClick={(e) => {if (e.target.classList.contains("modal")) dispatch(close())}}>
            <ModalContainer className={"modal_container"}>

                <div>
                    <ModalHeader>
                        부품 추가
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
                        <InputSelect name={"parts"} onChange={(e) => {setType(e.target.value)}} >
                            <option value="" selected={true}>부품종류</option>
                            <option value="CPU">CPU</option>
                            <option value="GPU">GPU</option>
                            <option value="MAIN_BOARD">메인보드</option>
                            <option value="RAM">램</option>
                            <option value="SSD">SSD</option>
                            <option value="POWER">파워</option>
                            <option value="COOLER">쿨러</option>
                        </InputSelect>
                    </InputArea>
                    <InputArea>
                        <InputLabel ><span style={{color: 'red'}}>* </span>부품명</InputLabel>
                        <div style={{textAlign: 'right'}}>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                            <InputText disabled={!direct} type={"text"} value={direct? null : preset==='선택하세요.'? null : preset} placeholder={"부품명을 입력해주세요."}
                                       onInput={(e) => {setName(e.target.value)}}/>
                            <InputSelect disabled={direct} onChange={(e) => {
                                setPreset(e.target.value);
                            }}>
                                <option value={null}>선택하세요.</option>
                                {(type==="CPU" || type===null) && <option value="인텔 코어i3-12세대 12100F">인텔 코어i3-12세대 12100F</option>}
                                {(type==="RAM" || type===null) && <option value="삼성전자 DDR4-3200 16GB">삼성전자 DDR4-3200 16GB</option>}
                                {(type==="SSD" || type===null) && <option value="SK하이닉스 Gold P31 M.2 NVMe">SK하이닉스 Gold P31 M.2 NVMe</option>}
                                {(type==="GPU" || type===null) && <option value="이엠텍지포스 GTX1660SUPER MIRACLE II D6 6GB">이엠텍지포스 GTX1660SUPER MIRACLE II D6 6GB</option>}
                                {(type==="MAIN_BOARD" || type===null) && <option value="ASUS PRIME H610M-K D4">ASUS PRIME H610M-K D4</option>}
                                {(type==="POWER" || type===null) && <option value="마이크로닉스 Classic II 풀체인지 500W 80PLUS">마이크로닉스 Classic II 풀체인지 500W 80PLUS</option>}
                            </InputSelect>
                        </div>
                        <span><label>직접 입력</label>
                        <input type="checkbox" onChange={(e) => {
                            setDirect(e.target.checked)
                            setName('');
                        }}/></span>
                        </div>

                    </InputArea>
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>일련번호</InputLabel>
                        <InputText type={"text"} placeholder={"일련번호를 입력해주세요. (예시) M220W39uK229"}
                               onInput={(e) => {setSerial(e.target.value)}}/>
                    </InputArea>
                    <InputArea>
                        <InputLabel><span style={{color: 'red'}}>* </span>구입일자 </InputLabel>
                        {/*<DatePicker*/}
                        {/*    showIcon*/}
                        {/*    selected={date}*/}
                        {/*    onChange={date => {setDate(date)}}*/}
                        {/*/>*/}
                        <div>
                        <InputDateSelect onChange={(e) => {
                            // console.log(e.target.value)
                            setBuyYear(e.target.value)
                        }}>
                            {years().map((item, index) => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })}
                        </InputDateSelect>
                            <span> - </span>
                        <InputDateSelect onChange={(e) => {
                            setBuyMonth(e.target.value)
                        }}>
                            {months().map((item, index) => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })}
                        </InputDateSelect>
                            <span> - </span>
                        <InputDateSelect onChange={(e) => {
                            setBuyDay(e.target.value)
                        }}>
                            {days().map((item, index) => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })}
                        </InputDateSelect>


                        </div>
                    </InputArea>
                    <InputArea>
                        <InputLabel>비고</InputLabel>
                        <InputText type={"text"} placeholder={"기타사항을 입력해주세요."}
                               onInput={(e) => {setEtc(e.target.value)}}/>
                    </InputArea>

                    <div style={{textAlign: 'right', fontSize: '12px'}}>
                    <span style={{color: 'red'}}>* </span><span style={{color: 'grey'}}> 필수 입력사항</span><br/>
                    </div>
                    <RoundButton disabled={type === null || (direct? (name === null || name === '') : (preset === null || preset === '선택하세요.' || preset === '')) || serial === null} type="button" onClick={() => {saveParts()}}>저장하기</RoundButton>
                </div>
            </ModalContainer>
        </Modal>
    )
}

export default AddParts;
