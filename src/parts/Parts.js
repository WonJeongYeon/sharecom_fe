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
import InputSelect from "../common/modal/InputSelect";
import SearchSelect from "../common/Search/SearchSelect";
import SearchText from "../common/Search/SearchText";
import RoundButton from "../common/modal/RoundButton";
import SearchRoundButton from "../common/Search/SearchRoundButton";
import SearchArea from "../common/Search/SearchArea";
import AddButton from "../common/Search/AddButton";

const Container = styled.table`

    width: 95%;
    //width: 50px;
    margin-left: 50px;
    table-layout: fixed;
    margin-top: 10px;
    border-top: 1px solid #d3d2d2;
    border-bottom: 1px solid #d3d2d2;
    border-right: 1px solid #d3d2d2;
    border-collapse: collapse
`;

const TableDiv = styled.tr`

    //width: 100%;
    //display: flex;
    //flex-direction: row;
    border-top: 1px solid #d3d2d2;
`;
const TableHeader = styled.th`
    //border: 1px solid black;
    padding: 10px 20px;
    width: ${(props) => props.width};
    text-align: left;
    font-size: 15px;
    color: #828282;
    background-color: #fafafa;

    cursor: pointer;
`;

const TableHeaderEtc = styled.th`
    //border: 1px solid black;
    text-align: left;
    padding: 10px 20px;
    background-color: #fafafa;
    font-size: 15px;
    color: #828282;
    width: 200px;
    border-right: 1px solid #d3d2d2;


    cursor: pointer;
`;

const TableSpan = styled.td`
    //border: 1px solid black;
    padding: 10px 20px;
    font-size: 15px;
    width: auto;
`;

const TableSpanEtc = styled.td`
    //border: 1px solid black;
    padding: 10px 20px;
    font-size: 15px;
    //width: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-right: 1px solid #d3d2d2;
    
`;

const MoreButton = styled.div`
    cursor: pointer;
    width: 16px;
    height: 16px;
`;

const SearchSpan = styled.span`
    //position: absolute;
    top: 35%;
    left: 24px;
    transform: translateY(-50%);
    pointer-events: none;
    display: flex;
    -ms-flex-align: inherit;
    align-items: inherit;
    -ms-flex-pack: inherit;
    justify-content: inherit;
`;

const UsedTag = styled.span`
    border-radius: 30px;
    display: inline-flex;
    align-items: center;
    position: relative;
    font-weight: 600;
    padding: 3px 5px 3px 5px;
    border: 1px solid rgba(13, 153, 255, 0);
    font-size: 13px;
    width: 60px;
    justify-content: center;
    background-color: ${props => props.used? "#f5d0cd" : "#d2ebd3"};
    //210 235 211 
    //245 208 205
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
    const etcRef = useRef();
    const typeRef = useRef();
    const nameRef = useRef();
    const serialRef = useRef();

    const partsTypeChanger = (type) => {
        switch (type) {
            case 'MAIN_BOARD' :
                return '메인보드';
            case 'POWER' :
                return '파워';
            case 'COOLER' :
                return '쿨러';
            default:
                return type;
        }
    }
    const convertLocalDate = (date) => {
        return date[0] +
            '-' + ( (date[1]) < 10 ? "0" + (date[1]) : (date[1]) )+
            '-' + ( (date[2]) < 10 ? "0" + (date[2]) : (date[2]) )
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

    function toSearchResultPage(e) {
        if (e.keyCode === 13) {
            getData();
        }
    }
    useEffect(() => {
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
            {modal === "detail_parts" && <DetailParts data={modifyParts} />}
            {modal === "modify_parts" && <ModifyParts data={modifyParts}/>}
            {modal === "delete" && <DeleteParts data={modifyParts}/>}
            <div style={{width: "95%", marginLeft: "50px", display: "flex", justifyContent: "space-between"}}>
                <SearchArea>
                    <SearchSelect ref={typeRef} name={"parts"} onChange={(e) => {
                        console.log(e.target.value);
                        setType(e.target.value)
                    }}>
                        <option value="" selected={type === null}>부품종류</option>
                        <option value="CPU">CPU</option>
                        <option value="GPU">GPU</option>
                        <option value="MAIN_BOARD">메인보드</option>
                        <option value="RAM">램</option>
                        <option value="SSD">SSD</option>
                        <option value="POWER">파워</option>
                        <option value="COOLER">쿨러</option>
                    </SearchSelect>
                    <SearchText ref={nameRef} type={"text"} placeholder={"부품명"} onKeyUp={toSearchResultPage}
                                onInput={(e) => {
                                    setName(e.target.value)
                                }}/>
                    <SearchText ref={serialRef} type={"text"} placeholder={"일련번호"} onKeyUp={toSearchResultPage}
                                onInput={(e) => {
                                    setSerial(e.target.value)
                                }}/>
                    <SearchText ref={etcRef} type={"text"} placeholder={"기타사항"} onKeyUp={toSearchResultPage}
                                onInput={(e) => {
                                    setEtc(e.target.value)
                                }}/>

                    <SearchRoundButton type={"button"} onClick={() => {
                        getData();
                    }}>
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M9.47375 1.89474C13.6597 1.89474 17.0527 5.2878 17.0527 9.47369C17.0527 10.2532 16.9341 11.0197 16.7041 11.7514C16.5471 12.2505 16.0153 12.5279 15.5161 12.371C15.017 12.2141 14.7396 11.6822 14.8966 11.1831C15.069 10.6345 15.158 10.0597 15.158 9.47369C15.158 6.33424 12.6132 3.78948 9.47375 3.78948C6.33428 3.78948 3.78952 6.33424 3.78952 9.47369C3.78952 12.6125 6.33466 15.1579 9.47375 15.1579C11.0057 15.1579 12.4626 14.5505 13.514 13.5044C13.8507 13.1694 14.3761 13.1397 14.7463 13.4147L14.8524 13.5064L21.8282 20.4883C22.198 20.8584 22.1977 21.4583 21.8276 21.8281C21.4911 22.1643 20.9648 22.1946 20.594 21.9193L20.4878 21.8275L14.1361 15.4699L14.0594 15.5312C12.8519 16.4355 11.3781 16.9722 9.8318 17.0443L9.47375 17.0526C5.28818 17.0526 1.89478 13.6589 1.89478 9.47369C1.89478 5.2878 5.28785 1.89474 9.47375 1.89474Z"></path>
                        </svg>

                    </SearchRoundButton>
                    <SearchRoundButton type={"button"} onClick={() => {
                        setType(null);
                        setName(null);
                        setSerial(null);
                        setEtc(null);
                        etcRef.current.value = null;
                        nameRef.current.value = null;
                        serialRef.current.value = null;
                        typeRef.current.value = "";

                        getData();
                    }}>
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m3.508 6.726c1.765-2.836 4.911-4.726 8.495-4.726 5.518 0 9.997 4.48 9.997 9.997 0 5.519-4.479 9.999-9.997 9.999-5.245 0-9.553-4.048-9.966-9.188-.024-.302.189-.811.749-.811.391 0 .715.3.747.69.351 4.369 4.012 7.809 8.47 7.809 4.69 0 8.497-3.808 8.497-8.499 0-4.689-3.807-8.497-8.497-8.497-3.037 0-5.704 1.597-7.206 3.995l1.991.005c.414 0 .75.336.75.75s-.336.75-.75.75h-4.033c-.414 0-.75-.336-.75-.75v-4.049c0-.414.336-.75.75-.75s.75.335.75.75z"
                                fill-rule="nonzero"/>
                        </svg>

                    </SearchRoundButton>
                </SearchArea>
                <AddButton onClick={() => {
                    dispatch(add())
                }}>부품 추가
                </AddButton>
            </div>
            {/*<div style={{height: "20px"}}>*/}
            {/*</div>*/}
            <Container style={{marginLeft: "50px"}}>

                {/*<TableDiv>*/}
                <TableHeader width={"70px"} onClick={() => {
                    sortParts('type');
                }}>부품종류{order === 'type' && <span style={{color: "blue"}}>↓</span>}
                    {order === 'type_desc' && <span style={{color: "red"}}>↑</span>}
                </TableHeader>
                <TableHeader onClick={() => {
                    sortParts('name');
                }}>부품명{order === 'name' && <span style={{color: "blue"}}>↓</span>}
                    {order === 'name_desc' && <span style={{color: "red"}}>↑</span>}</TableHeader>
                <TableHeader width={"150px"} onClick={() => {
                    sortParts('serial')
                }}>일련번호{order === 'serial' && <span style={{color: "blue"}}>↓</span>}
                    {order === 'serial_desc' && <span style={{color: "red"}}>↑</span>}</TableHeader>
                <TableHeader width={"90px"} onClick={() => {
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
                <TableHeader width={"70px"} onClick={() => {
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
                <TableHeaderEtc>기타사항</TableHeaderEtc>
                <TableHeader width={"13px"} ref={moreButtonRef}></TableHeader>
                {/*</TableDiv>*/}
                {
                    data.map((item, index) => {
                        return (
                            <TableDiv>

                                <TableSpan>{partsTypeChanger(item.type)}</TableSpan>
                                <TableSpan>{item.name}</TableSpan>
                                <TableSpan>{item.serial}</TableSpan>
                                <TableSpan>{convertLocalDate(item.buy_at)}</TableSpan>
                                <TableSpan align={"center"}
                                    style={{color: item.used_yn ? "red" : "green"}}>
                                    <UsedTag used={item.used_yn}>{item.used_yn ? "사용 중" : "사용 가능"}</UsedTag>
                                </TableSpan>
                                <TableSpanEtc>{item.etc}</TableSpanEtc>
                                <TableSpan>

                                    <MoreButton onClick={(e) => {
                                        console.log(e.target.className);
                                        if (dropdown === item.id) {
                                            setDropdown(0);
                                        } else {
                                            setModifyParts(JSON.stringify(item));
                                            setDropdown(item.id)
                                        }
                                        console.log(e.target.getBoundingClientRect())
                                        console.log(moreButtonRef.current.getBoundingClientRect());
                                    }}>
                                        {dropdown === item.id &&
                                            <Dropdown point={moreButtonRef.current.getBoundingClientRect().left}/>}
                                        <svg className="dropdown" clipRule="evenodd" fillRule="evenodd"
                                             strokeLinejoin="round"
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
