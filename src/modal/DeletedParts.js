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

    const convertLocalDate = (date) => {
        return date[0] +
            '-' + ((date[1]) < 10 ? "0" + (date[1]) : (date[1])) +
            '-' + ((date[2]) < 10 ? "0" + (date[2]) : (date[2]))
    }
    return (
        <Modal className={"modal"} onClick={(e) => {
            if (e.target.classList.contains("modal")) dispatch(close())
        }}>
            <ModalContainer className={"modal_container"}>
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
                                            <TableSpan>{convertLocalDate(item.buy_at)}</TableSpan>

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


            </ModalContainer>
        </Modal>
    )
}

export default DeletedParts;
