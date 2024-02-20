import {useEffect, useRef, useState} from "react";
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
import TableContainer from "../common/ListTable/TableContainer";
import TableHeader from "../common/ListTable/TableHeader";
import TableSpan from "../common/ListTable/TableSpan";
import UsedTag from "../common/UsedTag";
import SearchText from "../common/Search/SearchText";
import SearchRoundButton from "../common/Search/SearchRoundButton";
import AddButton from "../common/Search/AddButton";
import DeleteParts from "../modal/DeleteParts";
import ModifyCustomer from "./ModifyCustomer";




const TableDiv = styled.tr`

  //display: flex;
  //flex-direction: row;
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
    const [modifyCustomer, setModifyCustomer] = useState("{}")

    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal.value);

    const moreButtonRef = useRef();

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
        <div style={{marginLeft: '70px'}} onClick={(e) => {
            if (!e.target.classList.contains("dropdown")) {
                setDropdown(0);
            }
        }}>
            {modal === "add" && <AddCustomer/>}
            {modal === "rental_input" && <Rental/>}
            {modal === "customer_detail" && <DetailCustomer data={detailCustomerId}/>}
            {modal === "modify_customer" && <ModifyCustomer data={modifyCustomer}/>}
            <div style={{margin: '10px'}}>
                고객 검색
            </div>
            <div style={{margin: '10px', display: "flex"}}>

                <SearchText type={"text"} placeholder={"이름"}
                       onInput={(e) => {
                           setName(e.target.value)
                       }}/>
                <SearchText type={"text"} placeholder={"주소"}
                       onInput={(e) => {
                           setAddress(e.target.value)
                       }}/>
                <SearchText type={"text"} placeholder={"전화번호"}
                       onInput={(e) => {
                           setPhone(e.target.value)
                       }}/>
                <SearchText type={"text"} placeholder={"기타사항"}
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
                <AddButton onClick={(e) => {
                    dispatch(add());
                }}>고객 추가
                </AddButton>
            </div>

            <TableContainer>

                {/*<TableDiv>*/}
                <TableHeader width={'70px'}>고객명</TableHeader>
                <TableHeader>주소</TableHeader>
                <TableHeader width={'110px'}>전화번호</TableHeader>
                <TableHeader width={'90px'}>생년월일</TableHeader>
                <TableHeader>기타사항</TableHeader>
                <TableHeader width={'70px'}>대여여부</TableHeader>
                <TableHeader ref={moreButtonRef} width={'13px'}></TableHeader>
                {/*</TableDiv>*/}
                {
                    data.map((item, index) => {
                        return (
                            <tr>

                                <TableSpan>{item.name}</TableSpan>
                                <TableSpan>{item.address}</TableSpan>
                                <TableSpan>{item.phone}</TableSpan>
                                <TableSpan>{item.birth[0] + "." + item.birth[1] + "." + item.birth[2]}</TableSpan>
                                <TableSpan>{item.etc}</TableSpan>
                                <TableSpan style={{color: item.rentalState? "red" : "blue"}}>
                                    <UsedTag state={item.rentalState.toString()}>{item.rentalState ? "대여 중" : "-"}</UsedTag>
                                </TableSpan>
                                <TableSpan>

                                    <MoreButton  onClick={(e) => {
                                        console.log(e.target.className);
                                        if (dropdown === item.id) {
                                            setDropdown(0);
                                        } else {
                                            setDetailCustomerId(item.id);
                                            setDropdown(item.id)}
                                        setModifyCustomer(JSON.stringify(item));
                                    }}>
                                        {dropdown === item.id &&
                                            <CustomerDropdown point={moreButtonRef.current.getBoundingClientRect().left}/>}
                                        <svg className="dropdown" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                             strokeMiterlimit="2" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
                                        </svg>

                                    </MoreButton>

                                </TableSpan>
                                {/*{dropdown === item.id && <CustomerDropdown point={moreButtonRef.current.getBoundingClientRect().left}/>}*/}
                            </tr>
                        );
                    })
                }
            </TableContainer>

        </div>
    )
}

export default Customer;
