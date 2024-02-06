import {useState} from "react";
import axios from "axios";
import SearchText from "../common/Search/SearchText";
import SearchRoundButton from "../common/Search/SearchRoundButton";
import AddButton from "../common/Search/AddButton";
import convertLocalDate from "../common/Module/ConvertLocalDate";

const AddDesktopFindParts = (props) => {

    const [name, setName] = useState(null);
    const [serial, setSerial] = useState(null);
    const [etc, setEtc] = useState(null);

    const [selectedParts, setSelectedParts] = useState(null);
    const findData = async () => {
        try {
            const partsData = await axios.get(process.env.REACT_APP_DB_HOST + "/parts", {
                params: {
                    type: props.type,
                    name: name,
                    serial: serial,
                    buy_at: null,
                    etc: etc,
                    usedYn: false
                }
            });
            props.setData(partsData.data.response);
        } catch {

        }
    }

    return (
        <div className={"DesktopPartsCard"} style={{
            padding: '10px',
            borderRadius: '15px',
            border: '3px solid',
            marginTop: '10px',
            marginBottom: '10px'
        }}>
            <div>
                <label htmlFor="lang">{props.type}</label>
            </div>
            <br/>
            <div style={{display: "grid", gridTemplateColumns: 'repeat(4, 1fr)'}}>
                <SearchText type="text" placeholder="부품명" onInput={(e) => {
                    setName(e.target.value)
                }}/>
                <SearchText type="text" placeholder="일련번호" onInput={(e) => {
                    setSerial(e.target.value)
                }}/>
                <SearchText type="text" placeholder="기타사항" onInput={(e) => {
                    setEtc(e.target.value)
                }}/>
                <AddButton type="button" onClick={() => {
                    findData()
                }}>검색</AddButton>
            </div>
            <br/>
            <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: '10px'}}>

                <select name="languages" size="5" onChange={(e) => {
                    setSelectedParts(JSON.parse(e.target.value));
                    props.setId(JSON.parse(e.target.value).id);
                    console.log(JSON.parse(e.target.value).id);
                }}>
                    {
                        props.data.map((item, index) => {
                            return (
                                <option value={JSON.stringify(item)}>{item.name}</option>
                            )
                        })
                    }
                </select>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>부품명</span>
                        <span>{selectedParts !== null ? selectedParts.name : ""}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>일련번호</span>
                        <span>{selectedParts !== null ? selectedParts.serial : ""}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>구입일자</span>
                        <span>{selectedParts !== null ? convertLocalDate(selectedParts.buy_at) : ""}</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>기타사항</span>
                        <span title={selectedParts !== null ? selectedParts.etc : ""} style={{width: '15rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{selectedParts !== null ? selectedParts.etc : ""}</span>
                    </div>
                    {/*부품명 : {selectedParts !== null ? selectedParts.name : ""}<br/>*/}
                    {/*일련번호 : {selectedParts !== null ? selectedParts.serial : ""}<br/>*/}
                    {/*구입일자 : {selectedParts !== null ? selectedParts.buy_at : ""}<br/>*/}
                    {/*기타사항 : {selectedParts !== null ? selectedParts.etc : ""}*/}
                </div>

            </div>

        </div>
    )

}

export default AddDesktopFindParts;
