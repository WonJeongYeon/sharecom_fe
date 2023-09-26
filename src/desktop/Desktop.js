import axios from "axios";
import {useEffect, useState} from "react";
import DesktopParts from "./DesktopParts";
import {useDispatch, useSelector} from "react-redux";
import AddDesktop from "./AddDesktop";
import {add} from "../redux/modalSlice";

const Desktop = () => {

    const [serial, setSerial] = useState(null);
    const [usedYn, setUsedYn] = useState(null);

    const [data, setData] = useState([]);
    const [detailData, setDetailData] = useState(null);

    const modal = useSelector((state) => state.modal.value);
    const dispatch = useDispatch();

    const [customInput, setCustomInput] = useState(false);
    const getData = async () => {
        try {
            const data = await axios.get("/desktop", {
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
                const data = await axios.get(`/desktop/${serial}`);
                setDetailData(data.data.response);
            } catch {
                alert("입력하신 본체가 존재하지 않습니다.")
            }
        }
    }
    useEffect(() => {
        getData();
    }, [usedYn])

    return (
        <div style={{marginLeft: "55px"}}>
            {modal==="add" && <AddDesktop/>}
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
                    <button type="button" onClick={() => {dispatch(add())}}>
                        본체 등록
                    </button>
                </div>
            </div>

            <div>
                {detailData !== null &&
                    <div>
                        <div>본체 {detailData.serial}</div>
                        <div>현재 대여 여부 : {detailData.usedYn.toString()}</div>
                        {detailData.usedYn && <div>대여일자 : {detailData.usedAt}</div>}
                        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: "1rem"}}>
                            <DesktopParts type={"CPU"} data={detailData.cpu}/>
                            <DesktopParts type={"GPU"} data={detailData.gpu}/>
                            <DesktopParts type={"메인보드"} data={detailData.mainBoard}/>
                            <DesktopParts type={"RAM"} data={detailData.ram}/>
                            <DesktopParts type={"ssd"} data={detailData.ssd}/>
                            <DesktopParts type={"파워"} data={detailData.power}/>
                            <DesktopParts type={"쿨러"} data={detailData.cooler}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Desktop;
