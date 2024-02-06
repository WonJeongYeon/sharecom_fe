import axios from "axios";
import {useEffect, useState} from "react";
import DesktopParts from "./DesktopParts";
import {useDispatch, useSelector} from "react-redux";
import AddDesktop from "./AddDesktop";
import {add, deletedDesktop, inactive} from "../redux/modalSlice";
import ModifyDesktop from "./ModifyDesktop";
import DeleteDesktop from "./DeleteDesktop";
import TableContainer from "../table/TableContainer";
import TableHeader from "../table/TableHeader";
import TableSpan from "../table/TableSpan";
import DeletedDesktop from "./DeletedDesktop";
import ConvertLocalDateTime from "../common/Module/ConvertLocalDateTime";
import SearchSelect from "../common/Search/SearchSelect";
import SearchRoundButton from "../common/Search/SearchRoundButton";
import SearchText from "../common/Search/SearchText";
import UsedTag from "../common/UsedTag";
import styled from "styled-components";
import AddButton from "../common/Search/AddButton";

const Desktop = () => {

    const Header = styled.div`
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 1.37rem;
    `;

    const [serial, setSerial] = useState(null);
    const [usedYn, setUsedYn] = useState(null);

    const [data, setData] = useState([]);
    const [detailData, setDetailData] = useState(null);

    const modal = useSelector((state) => state.modal.value);
    const dispatch = useDispatch();

    const [type, setType] = useState("");

    const [logData, setLogData] = useState([]);

    const [customInput, setCustomInput] = useState(false);
    const getData = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_DB_HOST + "/desktop", {
                params: {
                    serial: serial,
                    usedYn: usedYn
                }
            });
            console.log(data.data.response);
            setData(data.data.response);
        } catch {
            // 오류 발생시 실행
        }
    }

    const getDetailData = async () => {
        if (serial === "" || serial === null) {
            alert("검색할 본체를 선택해주세요.")
        } else {
            try {
                const data = await axios.get(process.env.REACT_APP_DB_HOST + `/desktop/${serial}`);
                setDetailData(data.data.response);
                const getLogData = await axios.get(process.env.REACT_APP_DB_HOST + `/desktop/logs/${serial}`)
                setLogData(getLogData.data.response);
                setCustomHeight('600px');
            } catch {
                alert("입력하신 본체가 존재하지 않습니다.")
            }
        }
    }
    const [customHeight, setCustomHeight] = useState('0px');

    useEffect(() => {
        getData();
    }, [usedYn])


    const convertLogType = (type) => {
        switch (type) {
            case 'PARTS_CHANGED':
                return '부품 변경';
            case 'UPDATE_DESKTOP':
                return '본체정보 변경';
            case 'NEW_DESKTOP':
                return '새 PC 생성'
            default:
                return 'PC 삭제';
        }
    }

    return (
        <div style={{width: '100%', marginLeft: "75px"}}>
            {modal === "add" && <AddDesktop/>}
            {modal === "modify_desktop" &&
                <ModifyDesktop reload={getDetailData} usedYn={detailData === null ? false : detailData.usedYn}
                               id={detailData === null ? 0 : detailData.id} type={type}
                               serial={detailData === null ? "" : detailData.serial}
                               etc={detailData === null ? "" : detailData.etc}
                               parts={JSON.stringify(type === 'CPU' ? detailData.cpu :
                                   type === 'GPU' ? detailData.gpu :
                                       type === 'MAIN_BOARD' ? detailData.mainBoard :
                                           type === 'SSD' ? detailData.ssd :
                                               type === 'RAM' ? detailData.ram :
                                                   type === 'POWER' ? detailData.power :
                                                       detailData.cooler)}
                />}
            {modal === "delete" && <DeleteDesktop data={detailData === null ? null : JSON.stringify(detailData)}/>}
            {modal === "deleted_desktop" && <DeletedDesktop/>}
            <Header>PC 검색</Header>
            <div style={{display: "flex", justifyContent: "space-between"}}>

                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <div>
                        <div>

                            <SearchSelect disabled={customInput} name={"parts"} onChange={(e) => {
                                setSerial(e.target.value)
                            }}>
                                <option value="" selected={true}>PC 목록</option>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <option value={item.serial} key={index}>{item.serial}</option>
                                        )
                                    })
                                }
                            </SearchSelect>
                            <input type="checkbox" onChange={(e) => {
                                if (e.target.checked) {
                                    setUsedYn(false);
                                } else {
                                    setUsedYn(null)
                                }
                            }
                            }
                            />
                            <label>대여 가능한 PC만 보기</label>
                        </div>
                        <div>
                            <SearchText style={{width: '70px'}} type="text" disabled={!customInput} onInput={(e) => {
                                setSerial(e.target.value);
                            }}/>
                            <input type="checkbox" onChange={(e) => {
                                setSerial("");
                                setCustomInput(e.target.checked)
                            }}/>
                            <label>직접 입력</label>
                        </div>
                    </div>
                    <SearchRoundButton type="button" onClick={() => {
                        getDetailData()
                    }}>
                        <svg viewBox="0 0 24 24">
                            <path
                                d="M9.47375 1.89474C13.6597 1.89474 17.0527 5.2878 17.0527 9.47369C17.0527 10.2532 16.9341 11.0197 16.7041 11.7514C16.5471 12.2505 16.0153 12.5279 15.5161 12.371C15.017 12.2141 14.7396 11.6822 14.8966 11.1831C15.069 10.6345 15.158 10.0597 15.158 9.47369C15.158 6.33424 12.6132 3.78948 9.47375 3.78948C6.33428 3.78948 3.78952 6.33424 3.78952 9.47369C3.78952 12.6125 6.33466 15.1579 9.47375 15.1579C11.0057 15.1579 12.4626 14.5505 13.514 13.5044C13.8507 13.1694 14.3761 13.1397 14.7463 13.4147L14.8524 13.5064L21.8282 20.4883C22.198 20.8584 22.1977 21.4583 21.8276 21.8281C21.4911 22.1643 20.9648 22.1946 20.594 21.9193L20.4878 21.8275L14.1361 15.4699L14.0594 15.5312C12.8519 16.4355 11.3781 16.9722 9.8318 17.0443L9.47375 17.0526C5.28818 17.0526 1.89478 13.6589 1.89478 9.47369C1.89478 5.2878 5.28785 1.89474 9.47375 1.89474Z"></path>
                        </svg>
                    </SearchRoundButton>

                </div>
                <div>
                    <AddButton type="button" onClick={() => {
                        dispatch(add())
                    }}>
                        PC 등록
                    </AddButton>
                    <AddButton type="button" onClick={() => {
                        dispatch(deletedDesktop())
                    }}>
                        삭제된 PC 목록
                    </AddButton>
                </div>
            </div>

            <div>

                <div style={{transition: '1s', height: customHeight, overflow: 'hidden'}}>
                    <Header>PC정보</Header>
                    {
                        detailData !== null &&
                        <div>
                            <div>{detailData.serial}<UsedTag
                                style={{marginLeft: '5px', color: detailData.usedYn ? "red" : "green"}}
                                used={detailData.usedYn}>{detailData.usedYn ? "대여 중" : "대여 가능"}</UsedTag></div>
                            {/*<div>현재 대여 여부 : {detailData.usedYn ? "대여 중" : "대여 중이지 않음"}</div>*/}
                            {detailData.usedYn &&
                                <div style={{marginTop: '5px', marginBottom: '5px'}}>대여일자 : {detailData.usedAt}</div>}
                            <div>
                                <SearchRoundButton style={{marginBottom: '5px'}} onClick={() => {
                                    dispatch(inactive())
                                }}>
                                    <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                         strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                                            fillRule="nonzero"/>
                                    </svg>
                                </SearchRoundButton>
                            </div>
                            <div style={{
                                width: '100%',
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gridGap: "1rem"
                            }}>
                                <DesktopParts type={"CPU"} data={detailData.cpu} setType={setType}/>
                                <DesktopParts type={"GPU"} data={detailData.gpu} setType={setType}/>
                                <DesktopParts type={"메인보드"} data={detailData.mainBoard} setType={setType}/>
                                <DesktopParts type={"RAM"} data={detailData.ram} setType={setType}/>
                                <DesktopParts type={"SSD"} data={detailData.ssd} setType={setType}/>
                                <DesktopParts type={"파워"} data={detailData.power} setType={setType}/>
                                <DesktopParts type={"쿨러"} data={detailData.cooler} setType={setType}/>
                            </div>
                        </div>
                    }
                </div>


            </div>
            <div>
                <Header>관리 내역</Header>
                {
                    <TableContainer style={{transition: '0.3s'}}>
                        <TableHeader>관리 종류</TableHeader>
                        <TableHeader>사유</TableHeader>
                        <TableHeader>내용</TableHeader>
                        <TableHeader>처리일시</TableHeader>
                        {
                            logData.map((item, index) => {
                                return (
                                    <tr>
                                        <TableSpan>{convertLogType(item.type)}</TableSpan>
                                        <TableSpan>{item.reason}</TableSpan>
                                        <TableSpan>{item.content}</TableSpan>
                                        <TableSpan>{ConvertLocalDateTime(item.insertAt)}</TableSpan>
                                    </tr>
                                )
                            })
                        }
                    </TableContainer>
                }
            </div>


        </div>
    )
}

export default Desktop;
