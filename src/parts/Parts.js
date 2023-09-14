import styled from "styled-components";
import parts from "./parts.json";
import {useEffect, useState} from "react";
import axios, {get} from "axios";
import AddParts from "../modal/AddParts";
import {useDispatch, useSelector} from "react-redux";
import {open} from "../redux/modalSlice";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

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

`;

const TableSpan = styled.td`
  border: 1px solid black;
  padding: 10px 20px;
  width: auto;

`;

const Parts = (props) => {

    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [serial, setSerial] = useState(null);
    const [buy_at, setBuyAt] = useState(null);
    const [etc, setEtc] = useState(null);

    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);

    // const [modal, setModal] = useState(false);
    const modal = useSelector((state) => state.modal.value);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            const data = await axios.get("/parts", {params: {
                    type: type,
                    name: name,
                    serial: serial,
                    buy_at: buy_at,
                    etc: etc,
                    usedYn: null
                }
            });
            console.log(data.data.response);
            setData(data.data.response);
        } catch {
            // 오류 발생시 실행
        }
    }
    useEffect( () => {
         getData();
    }, [])
    return (
        <div>
            {modal && <AddParts/>}
            <div style={{marginLeft: "50px", display: "flex", justifyContent:"space-between"}}>
                <div>
                <select name={"parts"} onChange={(e) => {setType(e.target.value)}} >
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
                       onInput={(e) => {setName(e.target.value)}}/>
                <input type={"text"} placeholder={"일련번호"}
                       onInput={(e) => {setSerial(e.target.value)}}/>
                <input type={"text"} placeholder={"구입일자"}
                       onInput={(e) => {setBuyAt(e.target.value)}}/>
                <input type={"text"} placeholder={"기타사항"}
                       onInput={(e) => {setEtc(e.target.value)}}/>

                <button type={"button"} onClick={() => {getData();}}>검색</button>
                </div>
                <button onClick={() => {dispatch(open())}}>부품 추가</button>
            </div>
            <div style={{height: "50px"}}>


            </div>
            <Container style={{marginLeft: "50px"}}>

                {/*<TableDiv>*/}
                    <TableHeader>부품종류</TableHeader>
                    <TableHeader>부품명</TableHeader>
                    <TableHeader>일련번호</TableHeader>
                    <TableHeader>구입일자</TableHeader>
                    <TableHeader>사용여부</TableHeader>
                    <TableHeader>기타사항</TableHeader>
                {/*</TableDiv>*/}
                {
                    data.map((item, index) => {
                        return (
                            <TableDiv>
                                <TableSpan>{item.type}</TableSpan>
                                <TableSpan>{item.name}</TableSpan>
                                <TableSpan>{item.serial}</TableSpan>
                                <TableSpan>{item.buy_at}</TableSpan>
                                <TableSpan>{item.used_yn? "Y" : "N"}</TableSpan>
                                <TableSpan>{item.etc}</TableSpan>
                            </TableDiv>
                        );
                    })
                }
            </Container>
        </div>
    )
}

export default Parts
