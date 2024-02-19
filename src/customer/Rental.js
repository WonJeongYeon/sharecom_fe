import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {close} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import CloseBtn from "../common/modal/CloseBtn";
import ModalHeader from "../common/modal/ModalHeader";
import CustomModal from "../common/modal/CustomModal";
import CustomModalContainer from "../common/modal/CustomModalContainer";
import InputArea from "../common/modal/InputArea";
import InputLabel from "../common/modal/InputLabel";
import InputSelect from "../common/modal/InputSelect";
import SearchSelect from "../common/Search/SearchSelect";
import InputDateSelect from "../common/modal/InputDateSelect";
import InputText from "../common/modal/InputText";
import AddButton from "../common/Search/AddButton";


const AddParts = (props) => {
    const dispatch = useDispatch();

    const id = useSelector((state) => state.modal.id);
    const name = useSelector((state) => state.modal.name);

    const [pcArr, setPcArr] = useState([]);

    const [customerId, setCustomerId] = useState(0);

    const [pcData, setPcData] = useState([]);

    const [startYear, setStartYear] = useState(2023);
    const [startMonth, setStartMonth] = useState(1);
    const [startDay, setStartDay] = useState(1);

    const [endYear, setEndYear] = useState(2023);
    const [endMonth, setEndMonth] = useState(1);
    const [endDay, setEndDay] = useState(1);

    const [etc, setEtc] = useState("");

    const [completed, setCompleted] = useState(false);

    const getPcData = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + "/desktop", {
                params: {
                    serial: null,
                    usedYn: false
                }
            });
            console.log(data.data.response);
            setPcData(data.data.response);
        } catch {
            // 오류 발생시 실행
        }
    }

    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + "/customer", {});
            console.log(data);
            console.log(data.data.response);
            setData(data.data.response);
            return data.data.response;
        } catch (e) {
            // 오류 발생시 실행
            console.log(e);
        }
    }
    useEffect(() => {
        getData();
        getPcData();
    }, [])

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

    const saveRentalData = async () => {

        let complete = true;
        let resultArr = [];
        const startDate = startYear + "-"
            + (startMonth < 10 ? "0" + startMonth : startMonth) + "-"
            + (startDay < 10 ? "0" + startDay : startDay)
        const endDate = endYear + "-"
            + (endMonth < 10 ? "0" + endMonth : endMonth) + "-"
            + (endDay < 10 ? "0" + endDay : endDay)
        if (!window.confirm(`총 ${pcArr.length}대의 PC를 선택하셨습니다. 계속하시겠습니까?`)) {

        } else {
            try {
                const data = await axios.post(process.env.REACT_APP_DB_HOST + "/rental", {
                    customerId: customerId === 0 ? id : customerId,
                    startDate: startDate,
                    endDate: endDate,
                    etc: etc,
                    pcArr: pcArr
                });
                resultArr = data.data.response;
                if (complete && completed) {
                    //대여 로그 API 호출
                    for (let i = 0; i < resultArr.length; i++) {
                        const update = await axios.post(process.env.REACT_APP_DB_HOST + "/rental/update", {
                            type: "RENTAL",
                            rentalId: resultArr[i]
                        })
                        console.log(update.data.response);
                    }

                }
                dispatch(close());
                window.location.reload();
            } catch (e) {
                complete = false;
                alert("저장에 실패했습니다. 입력하지 않은 부분이 있는지 확인해보세요.");
            }

        }

    }

    return (
        <CustomModal className={"modal"} onClick={(e) => {
            if (e.target.classList.contains("modal")) dispatch(close())
        }}>
            <CustomModalContainer width={400} height={500} className={"modal_container"}>
                <ModalHeader>
                    대여정보 입력
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
                    <InputLabel>고객명</InputLabel>
                    <InputSelect
                        disabled={id !== 0}
                        // value={id === 0 ? "" : name}
                        onChange={(e) => {
                            setCustomerId(e.target.value);
                        }}>
                        {id === 0 ? <option value={0}>== 선택 ==</option> : <option value={id}>{name}</option>}
                        {data.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        })}
                    </InputSelect>
                </InputArea>

                <InputArea>
                    <InputLabel>대여 PC 지정</InputLabel>
                    {
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <InputSelect style={{width:'60%'}} multiple={true} name="languages" size="5" onChange={
                                (e) => {
                                    let selected = e.target.selectedOptions
                                    console.log(selected)
                                    let arr = [];
                                    if (selected.length == 1) {
                                        arr.push(e.target.selectedOptions[0].value)
                                        setPcArr(arr);
                                        return;
                                    }
                                    for (let i = 0; i < selected.length; i++) {
                                        arr.push(selected[i].value)
                                    }
                                    setPcArr(arr);
                                }
                            }>
                                {
                                    pcData.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>{item.serial}</option>
                                        )
                                    })
                                }
                            </InputSelect>
                            <div style={{marginLeft: '10px', textAlign: 'left'}}>

                                {pcData.filter(pc => pcArr.includes(pc.id.toString())).map((item, index) => {
                                    return (
                                        <span>{item.serial} - {item.etc === '' ? '(기타사항 없음)' : item.etc}<br/></span>
                                    )
                                })

                                }
                            </div>
                        </div>
                    }
                </InputArea>
                <div>
                    기간 설정<br/>
                    <InputArea>
                    <InputLabel>시작일</InputLabel>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <InputDateSelect style={{marginBottom: '0'}} onChange={(e) => {
                                console.log(e.target.value)
                                setStartYear(e.target.value)
                            }}>
                                {years().map((item, index) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                            <span style={{margin: '0 5px'}}> - </span>
                            <InputDateSelect style={{marginBottom: '0'}} onChange={(e) => {
                                setStartMonth(e.target.value)
                            }}>
                                {months().map((item, index) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                            <span style={{margin: '0 5px'}}> - </span>
                            <InputDateSelect style={{marginBottom: '0'}} onChange={(e) => {
                                setStartDay(e.target.value)
                            }}>
                                {days().map((item, index) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                        </div>
                    </InputArea>
                    <br/>
                    <div>~</div>
                    <InputArea>
                    <InputLabel style={{textAlign: 'right'}}>종료일</InputLabel>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'right'}}>
                            <InputDateSelect style={{marginBottom: '0'}} onChange={(e) => {
                                setEndYear(e.target.value)
                            }}>
                                {years().map((item, index) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                            <span style={{margin: '0 5px'}}> - </span>
                            <InputDateSelect style={{marginBottom: '0'}} onChange={(e) => {
                                setEndMonth(e.target.value)
                            }}>
                                {months().map((item, index) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                            <span style={{margin: '0 5px'}}> - </span>
                            <InputDateSelect style={{marginBottom: '0'}} onChange={(e) => {
                                setEndDay(e.target.value)
                            }}>
                                {days().map((item, index) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </InputDateSelect>
                        </div>
                    </InputArea>

                </div>
                <InputArea>
                    <InputLabel>비고</InputLabel>
                    <InputText type="text" placeholder={"비고"} onInput={(e) => {
                        setEtc(e.target.value)
                    }}/>
                </InputArea>
                <div style={{marginBottom: '15px'}}>
                    <label>이미 실제 대여 처리가 완료되었나요?</label>
                    <input type={"checkbox"} onChange={(e) => {
                        console.log(e.target.checked)
                        setCompleted(e.target.checked)
                    }}/>
                    <br/>
                    <label style={{fontSize: "10px"}}>여러 대의 PC 중 일부만 완료되었을 경우, 대여 처리는 수동으로 진행해 주세요.</label>
                </div>
                <AddButton onClick={saveRentalData}>저장하기</AddButton>
            </CustomModalContainer>
        </CustomModal>
    )
}

export default AddParts;
