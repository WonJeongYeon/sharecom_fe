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

const Desktop = () => {

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
            } catch {
                alert("입력하신 본체가 존재하지 않습니다.")
            }
        }
    }
    useEffect(() => {
        getData();
    }, [usedYn])

    const convertLocalDateTime = (date) => {
        return date[0] +
            '-' + ( (date[1]) < 10 ? "0" + (date[1]) : (date[1]) )+
            '-' + ( (date[2]) < 10 ? "0" + (date[2]) : (date[2]) ) + " " +
            (date[3] < 10? "0" : "") + date[3] + ":" +
            (date[4] < 10? "0" : "") + date[4] + ":" +
            (date[5] < 10? "0" : "") + date[5]
    }

    const convertLogType = (type) => {
        switch (type) {
            case 'PARTS_CHANGED': return '부품 변경';
            case 'UPDATE_DESKTOP': return '본체정보 변경';
            case 'NEW_DESKTOP': return '새 PC 생성'
            default: return 'PC 삭제';
        }
    }

    return (
        <div style={{marginLeft: "55px"}}>
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
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <div>
                        <label>본체 검색</label>
                        <select disabled={customInput} name={"parts"} onChange={(e) => {
                            setSerial(e.target.value)
                        }}>
                            <option value="" selected={true}>본체 목록</option>
                            {
                                data.map((item, index) => {
                                    return (
                                        <option value={item.serial} key={index}>{item.serial}</option>
                                    )
                                })
                            }
                        </select>
                        <input type="checkbox" onChange={(e) => {
                            if (e.target.checked) {
                                setUsedYn(false);
                            } else {
                                setUsedYn(null)
                            }
                        }
                        }
                        />
                        <label>대여 가능한 본체만 보기</label>
                    </div>
                    <div>
                        <input type="text" disabled={!customInput} onInput={(e) => {
                            setSerial(e.target.value);
                        }}/>
                        <input type="checkbox" onChange={(e) => {
                            setSerial("");
                            setCustomInput(e.target.checked)
                        }}/>
                        <label>직접 입력</label>
                    </div>
                    <button type="button" onClick={() => {
                        getDetailData()
                    }}>검색
                    </button>
                </div>
                <div>
                    <button type="button" onClick={() => {
                        dispatch(add())
                    }}>
                        본체 등록
                    </button>
                    <button type="button" onClick={() => {
                        dispatch(deletedDesktop())
                    }}>
                        삭제된 본체 목록
                    </button>
                </div>
            </div>

            <div>
                {detailData !== null &&
                    <div>
                        <div>본체 {detailData.serial}</div>
                        <div>현재 대여 여부 : {detailData.usedYn.toString()}</div>
                        {detailData.usedYn && <div>대여일자 : {detailData.usedAt}</div>}
                        <div>
                            <button onClick={() => {
                                dispatch(inactive())
                            }}>삭제하기
                            </button>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "1rem"}}>
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
            <h3>관리 내역</h3>
            {
                <TableContainer>
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
                                    <TableSpan>{convertLocalDateTime(item.insertAt)}</TableSpan>
                                </tr>
                            )
                        })
                    }
                </TableContainer>
            }
        </div>
    )
}

export default Desktop;
