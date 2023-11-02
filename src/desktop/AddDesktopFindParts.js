import {useState} from "react";
import axios from "axios";

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
        <div>
            <div>
                <label htmlFor="lang">{props.type}</label>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)"}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <input type="text" placeholder="부품명" onInput={(e) => {setName(e.target.value)}}/>
                    <input type="text" placeholder="일련번호" onInput={(e) => {setSerial(e.target.value)}}/>
                    <input type="text" placeholder="기타사항" onInput={(e) => {setEtc(e.target.value)}}/>
                    <button type="button" onClick={() => {findData()}}>검색</button>
                </div>
                <select name="languages" size="5" onChange={(e) => {
                    setSelectedParts(JSON.parse(e.target.value));
                    props.setId(JSON.parse(e.target.value).id);
                    console.log(JSON.parse(e.target.value).id);
                }}>
                    {
                        props.data.map((item, index) =>{
                            return(
                                <option value={JSON.stringify(item)}>{item.name}</option>
                            )
                        })
                    }
                </select>
                <div style={{textAlign: "left"}}>
                    부품명 : {selectedParts !== null ? selectedParts.name : ""}<br/>
                    일련번호 : {selectedParts !== null ? selectedParts.serial : ""}<br/>
                    구입일자 : {selectedParts !== null ? selectedParts.buy_at : ""}<br/>
                    기타사항 : {selectedParts !== null ? selectedParts.etc : ""}
                </div>

            </div>

        </div>
    )

}

export default AddDesktopFindParts;
