import styled from "styled-components";
import cpuBanner from "../values/cpu_banner.png";
import {useDispatch, useSelector} from "react-redux";
import ModifyDesktop from "./ModifyDesktop";
import {modifyDesktop} from "../redux/modalSlice";

const TypeBanner = styled.div`
  //height: 100%;
  width: 100%;
  height: 30%;
  max-height: 160px;
  padding-bottom: 15px;
  background-size: cover;
  background-position: 50%;
  //border-radius: 4px;
  position: relative;
  display: flex;
  justify-content: right;
`;

const ModifyButton = styled.div`


  position: absolute;
  margin-top: 5px;
  margin-right: 5px;
`;
const DesktopParts = (props) => {

    const dispatch = useDispatch();
    const typeChanger = (type) => {
        switch (type) {
            case "메인보드": return "MAIN_BOARD";
            case "파워": return "POWER";
            case "쿨러" : return "COOLER";
            default : return type;
        }
    }

    return (
        <div style={{border: "1px solid #D7D7AF", height: "200px"}}>
            <TypeBanner
                // style={{backgroundImage: `url(${cpuBanner})`}}
            >

                <ModifyButton onClick={() => {props.setType(typeChanger(props.type));
                    dispatch(modifyDesktop());
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M5.496 1.261l3.77 3.771c.409 1.889-2.33 4.66-4.242 4.242l-3.77-3.771c-.172.585-.254 1.189-.254 1.793 0 1.602.603 3.202 1.826 4.426 1.351 1.351 3.164 1.957 4.931 1.821.933-.072 1.852.269 2.514.931l7.621 7.611c.577.578 1.337.915 2.096.915 1.661 0 3.047-1.411 3.012-3.077-.016-.737-.352-1.47-.914-2.033l-7.621-7.612c-.662-.661-1.002-1.581-.931-2.514.137-1.767-.471-3.58-1.82-4.93-1.225-1.224-2.825-1.834-4.427-1.834-.603 0-1.207.09-1.791.261zm15.459 18.692c0 .553-.447 1-1 1-.553 0-1-.448-1-1s.447-1 1-1 1 .447 1 1z"/>
                    </svg>
                </ModifyButton>
                <div style={{height: "100%", width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
                {props.type}
                </div>

            </TypeBanner>
            <div>{props.data.name}</div>
            <div>{props.data.serial}</div>
            <div>{props.data.etc}</div>

        </div>
    )
}

export default DesktopParts;
