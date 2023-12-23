import styled from "styled-components";
import parts from "./parts.json";
import {useEffect, useRef, useState} from "react";
import axios, {get} from "axios";
import AddParts from "../modal/AddParts";
import {useDispatch, useSelector} from "react-redux";
import {add} from "../redux/modalSlice";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Dropdown from "./Dropdown";
import ModifyParts from "../modal/ModifyParts";
import DeleteParts from "../modal/DeleteParts";
import DetailParts from "../modal/DetailParts";

const Container = styled.table`

  width: 100%;
  margin-left: 50px;
`;

const TableDiv = styled.tr`

  //display: flex;
  //flex-direction: row;
`;
const TableHeader = styled.th`
  border: 1px solid black;
  padding: 10px 20px;
  width: auto;

  cursor: pointer;
`;

const TableSpan = styled.td`
  border: 1px solid black;
  padding: 10px 20px;
  width: auto;

`;

const MoreButton = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
`;
const Parts = (props) => {

    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [serial, setSerial] = useState(null);
    const [buy_at, setBuyAt] = useState(null);
    const [etc, setEtc] = useState(null);

    const [date, setDate] = useState(new Date());
    let [data, setData] = useState([]);
    const [order, setOrder] = useState('');

    const [modifyParts, setModifyParts] = useState("{}");

    const modal = useSelector((state) => state.modal.value);
    const dispatch = useDispatch();

    const [dropdown, setDropdown] = useState(0);

    const moreButtonRef = useRef();

    const partsTypeChanger = (type) => {
        switch (type) {
            case 'MAIN_BOARD' : return '메인보드';
            case 'POWER' : return '파워';
            case 'COOLER' : return '쿨러';
            default: return type;
        }
    }

    const getData = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + "/parts", {
                params: {
                    type: type,
                    name: name,
                    serial: serial,
                    buy_at: buy_at,
                    etc: etc,
                    usedYn: null
                }
            });
            console.log(data);
            console.log(data.data.response);
            let arr = data.data.response;
            // arr.sort((a, b) => a.type.localeCompare(b.type))
            setData(arr);
            return data.data.response;
        } catch (e) {
            // 오류 발생시 실행
            console.log(e);
        }
    }
    const sortParts = (type) => {
            let arr = data;
            if (order === type) {
                arr.sort((a, b) =>
                        b[type].localeCompare(a[type])
                );
                setOrder(`${type}_desc`);
            } else {
                arr.sort((a, b) => a[type].localeCompare(b[type]))
                setOrder(type);
            }
            setData([...arr]);

    }
    useEffect( () => {
        // async function fetchData() {
        //     setData(await getData());
        // }
        // fetchData();
        getData();
    }, [])
    return (
        <div onClick={(e) => {
                if (!e.target.classList.contains("dropdown")) {
                    setDropdown(0);
                }

        }}>
            {modal === "add" && <AddParts/>}
            {modal === "detail_parts" && <DetailParts data={modifyParts}/>}
            {modal === "modify_parts" && <ModifyParts data={modifyParts}/>}
            {modal === "delete" && <DeleteParts data={modifyParts}/>}
            <div style={{marginLeft: "50px", display: "flex", justifyContent: "space-between"}}>
                <div>
                    <select name={"parts"} onChange={(e) => {
                        setType(e.target.value)
                    }}>
                        <option value="" selected={true}>부품종류</option>
                        <option value="CPU">CPU</option>
                        <option value="GPU">GPU</option>
                        <option value="MAIN_BOARD">메인보드</option>
                        <option value="RAM">램</option>
                        <option value="SSD">SSD</option>
                        <option value="POWER">파워</option>
                        <option value="COOLER">쿨러</option>
                    </select>
                    <DatePicker
                        // showIcon
                        selected={date}
                        onChange={date => setDate(date)}

                    />
                    <input type={"text"} placeholder={"부품명"}
                           onInput={(e) => {
                               setName(e.target.value)
                           }}/>
                    <input type={"text"} placeholder={"일련번호"}
                           onInput={(e) => {
                               setSerial(e.target.value)
                           }}/>
                    <input type={"text"} placeholder={"구입일자"}
                           onInput={(e) => {
                               setBuyAt(e.target.value)
                           }}/>
                    <input type={"text"} placeholder={"기타사항"}
                           onInput={(e) => {
                               setEtc(e.target.value)
                           }}/>

                    <button type={"button"} onClick={() => {
                        getData();
                    }}>검색
                    </button>
                </div>
                <button onClick={() => {
                    dispatch(add())
                }}>부품 추가
                </button>
            </div>
            <div style={{height: "50px"}}>


            </div>
            <Container style={{marginLeft: "50px"}}>

                {/*<TableDiv>*/}
                <TableHeader onClick={() => {
                    sortParts('type');
                }}>부품종류{order === 'type' && <span style={{color: "blue"}}>↓</span>}
                    {order === 'type_desc' && <span style={{color: "red"}}>↑</span>}
                </TableHeader>
                <TableHeader onClick={() => {
                    sortParts('name');
                }}>부품명{order === 'name' && <span style={{color: "blue"}}>↓</span>}
                    {order === 'name_desc' && <span style={{color: "red"}}>↑</span>}</TableHeader>
                <TableHeader onClick={() => {
                    sortParts('serial')
                }}>일련번호{order === 'serial' && <span style={{color: "blue"}}>↓</span>}
                    {order === 'serial_desc' && <span style={{color: "red"}}>↑</span>}</TableHeader>
                <TableHeader onClick={() => {
                    let arr = data;
                    if (order === 'buyAt') {
                        arr.sort((a, b) =>
                            new Date(b.buy_at) - new Date(a.buy_at)
                        );
                        setOrder(`buyAt_desc`);
                    } else {
                        arr.sort((a, b) => new Date(a.buy_at) - new Date(b.buy_at))
                        setOrder('buyAt');
                    }
                    setData([...arr]);
                }}>구입일자{order === 'buyAt' && <span style={{color: "blue"}}>↓</span>}
                    {order === 'buyAt_desc' && <span style={{color: "red"}}>↑</span>}</TableHeader>
                <TableHeader onClick={() => {
                    let arr = data;
                    if (order === 'usedYn') {
                        arr.sort((a, b) =>
                            b.used_yn - a.used_yn
                        );
                        setOrder(`usedYn_desc`);
                    } else {
                        arr.sort((a, b) => a.used_yn - b.used_yn);
                        setOrder('usedYn');
                    }
                    setData([...arr]);
                }}>사용여부{order === 'usedYn' && <span style={{color: "blue"}}>↓</span>}
                    {order === 'usedYn_desc' && <span style={{color: "red"}}>↑</span>}</TableHeader>
                <TableHeader>기타사항</TableHeader>
                <TableHeader ref={moreButtonRef}></TableHeader>
                {/*</TableDiv>*/}
                {
                    data.map((item, index) => {
                        return (
                            <TableDiv>

                                <TableSpan>{partsTypeChanger(item.type)}</TableSpan>
                                <TableSpan>{item.name}</TableSpan>
                                <TableSpan>{item.serial}</TableSpan>
                                <TableSpan>{item.buy_at[0] + "." + item.buy_at[1] + "." + item.buy_at[2]}</TableSpan>
                                <TableSpan style={{color: item.used_yn? "red" : "blue"}}>{item.used_yn ? "사용 중" : "사용 가능"}</TableSpan>
                                <TableSpan>{item.etc}</TableSpan>
                                <TableSpan>

                                    <MoreButton  onClick={(e) => {
                                        console.log(e.target.className);
                                        if (dropdown === item.id) {
                                            setDropdown(0);
                                        } else {
                                            setModifyParts(JSON.stringify(item));
                                            setDropdown(item.id)}
                                        console.log(e.target.getBoundingClientRect())
                                        console.log(moreButtonRef.current.getBoundingClientRect());
                                    }}>
                                        {dropdown === item.id && <Dropdown point={moreButtonRef.current.getBoundingClientRect().left}/>}
                                        <svg className="dropdown" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                             strokeMiterlimit="2" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
                                        </svg>


                                    </MoreButton>

                                </TableSpan>

                            </TableDiv>
                        );
                    })
                }
            </Container>
        </div>
    )
}

export default Parts
