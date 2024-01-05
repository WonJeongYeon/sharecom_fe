import styled from "styled-components";
import {useDispatch} from "react-redux";
import {close} from "../redux/modalSlice";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import TableContainer from "../table/TableContainer";
import TableHeader from "../table/TableHeader";
import TableSpan from "../table/TableSpan";
import MoreButton from "../table/MoreButton";
import ModalHeader from "../common/modal/ModalHeader";
import CloseBtn from "../common/modal/CloseBtn";
import PartsTypeChanger from "../parts/PartsTypeChanger";
import ConvertLocalDate from "../common/Module/ConvertLocalDate";
import CustomModal from "../common/modal/CustomModal";
import CustomModalContainer from "../common/modal/CustomModalContainer";



const DeletedParts = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const [partsId, setPartsId] = useState(0);


    const getData = async () => {

        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + "/parts/deleted");
            // console.log(data.data.response);
            setData(data.data.response);
        } catch {
            alert("문제가 발생했습니다. 다시 시도해 주세요.")
        }
    }

    const restoreParts = async (partsId) => {

        if(!window.confirm("정말로 복구하시겠습니까?")) {

        } else {
            try {
                const data = await axios.patch(process.env.REACT_APP_DB_HOST + `/parts/restore/${partsId}`);
                console.log(data.data.response);
                if (data.data.response === "성공") {
                    alert("복구되었습니다.")
                    dispatch(close());
                    window.location.reload();
                } else {
                    alert("복구에 실패했습니다. 다시 시도해 주세요.")
                }

            } catch {
                alert("문제가 발생했습니다. 다시 시도해 주세요.")
            }
        }

    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <CustomModal className={"modal"} onClick={(e) => {
            if (e.target.classList.contains("modal")) dispatch(close())
        }}>
            <CustomModalContainer width={700} height={500} className={"modal_container"}>
                <div>
                    <ModalHeader>
                        삭제된 부품 관리
                        <CloseBtn onClick={() => {dispatch(close())}}>
                            <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                            </svg>
                        </CloseBtn>
                    </ModalHeader>
                    <TableContainer>
                        <TableHeader>부품종류</TableHeader>
                        <TableHeader>부품명</TableHeader>
                        <TableHeader>일련번호</TableHeader>
                        <TableHeader>구입일자</TableHeader>

                        <TableHeader></TableHeader>

                        {
                            data.map((item, index) => {
                                return (
                                    <>
                                        <tr>
                                            <TableSpan>{PartsTypeChanger(item.type)}</TableSpan>
                                            <TableSpan>{item.name}</TableSpan>
                                            <TableSpan>{item.serial}</TableSpan>
                                            <TableSpan>{ConvertLocalDate(item.buy_at)}</TableSpan>

                                            <TableSpan>
                                                <button onClick={() => {
                                                    setPartsId(item.id)
                                                }}>상세보기
                                                </button>
                                            </TableSpan>

                                        </tr>
                                        {partsId === item.id &&
                                            <tr>

                                                <td colSpan={5}>

                                                        <div>
                                                            {item.etc}
                                                            <br/>
                                                            <button onClick={() =>{restoreParts(item.id)}}>
                                                                복구하기
                                                            </button>

                                                        </div>

                                                </td>
                                            </tr>
                                        }
                                    </>

                                )
                            })
                        }

                    </TableContainer>

                </div>


            </CustomModalContainer>
        </CustomModal>
    )
}

export default DeletedParts;
