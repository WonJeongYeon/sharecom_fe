import {useEffect, useState} from "react";
import styled from "styled-components";
import Dropdown from "../parts/Dropdown";
import axios from "axios";
import {add} from "../redux/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import AddParts from "../modal/AddParts";
import AddCustomer from "./AddCustomer";
import Rental from "./Rental";
import CustomerDropdown from "./CustomerDropdown";
import ModifyParts from "../modal/ModifyParts";
import DetailCustomer from "./DetailCustomer";


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

const MoreButton = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
`;
const Customer = () => {

    const [data, setData] = useState([]);


    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [etc, setEtc] = useState(null);

    const [dropdown, setDropdown] = useState(0);

    const [detailCustomerId, setDetailCustomerId] = useState(0);

    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal.value);

    const getData = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + "/customer", {
                params: {
                    name: name,
                    phone: phone,
                    address: address,
                    etc: etc
                }
            });
            console.log(data);
            console.log(data.data.response);
            setData(data.data.response);
            return data.data.response;
        } catch (e) {
            // 오류 발생시 실행
            console.log(e);
        }
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
            {modal === "add" && <AddCustomer/>}
            {modal === "rental_input" && <Rental/>}
            {modal === "customer_detail" && <DetailCustomer data={detailCustomerId}/>}
            <div style={{marginLeft: "60px", display: "flex", justifyContent: "space-between"}}>
            고객 검색
                <input type={"text"} placeholder={"이름"}
                       onInput={(e) => {
                           setName(e.target.value)
                       }}/>
                <input type={"text"} placeholder={"주소"}
                       onInput={(e) => {
                           setAddress(e.target.value)
                       }}/>
                <input type={"text"} placeholder={"전화번호"}
                       onInput={(e) => {
                           setPhone(e.target.value)
                       }}/>
                <input type={"text"} placeholder={"기타사항"}
                       onInput={(e) => {
                           setEtc(e.target.value)
                       }}/>
                <button type={"button"} onClick={() => {
                    getData();
                }}>검색
                </button>
                <button onClick={(e) => {
                    dispatch(add());
                }}>고객 추가</button>
            </div>

            <Container style={{marginLeft: "50px"}}>

                {/*<TableDiv>*/}
                <TableHeader>고객명</TableHeader>
                <TableHeader>주소</TableHeader>
                <TableHeader>전화번호</TableHeader>
                <TableHeader>생년월일</TableHeader>
                <TableHeader>기타사항</TableHeader>
                <TableHeader>대여여부</TableHeader>
                <TableHeader></TableHeader>
                {/*</TableDiv>*/}
                {
                    data.map((item, index) => {
                        return (
                            <TableDiv>

                                <TableSpan>{item.name}</TableSpan>
                                <TableSpan>{item.address}</TableSpan>
                                <TableSpan>{item.phone}</TableSpan>
                                <TableSpan>{item.birth[0] + "." + item.birth[1] + "." + item.birth[2]}</TableSpan>
                                <TableSpan>{item.etc}</TableSpan>
                                <TableSpan style={{color: item.rentalState? "red" : "blue"}}>{item.rentalState ? "대여 중" : "-"}</TableSpan>
                                <TableSpan>

                                    <MoreButton  onClick={(e) => {
                                        console.log(e.target.className);
                                        if (dropdown === item.id) {
                                            setDropdown(0);
                                        } else {
                                            setDetailCustomerId(item.id);
                                            setDropdown(item.id)}
                                    }}>
                                        <svg className="dropdown" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                             strokeMiterlimit="2" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
                                        </svg>

                                    </MoreButton>

                                </TableSpan>
                                {dropdown === item.id && <CustomerDropdown/>}
                            </TableDiv>
                        );
                    })
                }
            </Container>

        </div>
    )
}

export default Customer;
