import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {close} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

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

  width: 70%;
  height: 500px;

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
                    for (let i = 0; i<resultArr.length; i++) {
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
        <Modal className={"modal"} onClick={(e) => {
            if (e.target.classList.contains("modal")) dispatch(close())
        }}>
            <ModalContainer className={"modal_container"}>
                <div><h2>대여정보 입력</h2></div>
                <div>
                    <label>고객명</label>
                    <select
                        disabled={id !== 0}
                        // value={id === 0 ? "" : name}
                        onChange={(e) => {
                            setCustomerId(e.target.value);
                        }}>
                        {id === 0 ? <option value={0}>== 선택 ==</option> : <option value={id}>{name}</option>}
                        {data.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        })}
                    </select>
                </div>

                <div>
                    <label>대여 PC 지정</label>
                    {
                        <select multiple={true} name="languages" size="5" onChange={
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
                        </select>
                    }
                </div>
                <div>
                    기간 설정<br/>
                    <label>시작일</label>
                    <select onChange={(e) => {
                        console.log(e.target.value)
                        setStartYear(e.target.value)
                    }}>
                        {years().map((item, index) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}
                    </select>
                    <select onChange={(e) => {
                        setStartMonth(e.target.value)
                    }}>
                        {months().map((item, index) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}
                    </select>
                    <select onChange={(e) => {
                        setStartDay(e.target.value)
                    }}>
                        {days().map((item, index) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}
                    </select>
                    <br/>
                    <label>종료일</label>
                    <select onChange={(e) => {
                        setEndYear(e.target.value)
                    }}>
                        {years().map((item, index) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}
                    </select>
                    <select onChange={(e) => {
                        setEndMonth(e.target.value)
                    }}>
                        {months().map((item, index) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}
                    </select>
                    <select onChange={(e) => {
                        setEndDay(e.target.value)
                    }}>
                        {days().map((item, index) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })}
                    </select>

                </div>
                <div>
                    <label>비고</label>
                    <input type="text" placeholder={"비고"} onInput={(e) => {setEtc(e.target.value)}}/>
                </div>
                <div>
                    <label>이미 실제 대여 처리가 완료되었나요?</label>
                    <input type={"checkbox"} onChange={(e) => {
                        console.log(e.target.checked)
                        setCompleted(e.target.checked)}}/>
                    <br/>
                    <label style={{fontSize:"10px"}}>여러 대의 PC 중 일부만 완료되었을 경우, 대여 처리는 수동으로 진행해 주세요.</label>
                </div>
                <button onClick={saveRentalData}>저장하기</button>
            </ModalContainer>
        </Modal>
    )
}

export default AddParts;
