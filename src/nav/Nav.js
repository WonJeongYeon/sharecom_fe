import styled from "styled-components";
import {Link} from "react-router-dom";
import {useState} from "react";

const NavList = styled.div`
  list-style: none;
  left: 0;
  height: auto;
  width: 50px;
  position: fixed;
  top: 0;
  bottom: 0;
`;

const NavItem = styled.div`
  height: 25%;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  align-items: center;
  background-color: gray;
  writing-mode: vertical-lr;
  color: black;
  //padding-left: 50%;
  display: flex;
  justify-content: center;
  text-orientation: upright;
`;

const NavItemSelected = styled.div`
  height: 25%;
  border: 1px solid white;
  width: 100%;
  elevation: higher;
  text-align: center;
  align-items: center;
  background-color: gray;
  color: white;
  writing-mode: vertical-lr;
  //padding-left: 50%;
  display: flex;
  justify-content: center;
  text-orientation: upright;

`;

const NoDecoratedLink = styled.link`
  text-decoration: none;


`;

const Nav = (props) => {
    const [menu, setMenu] = useState("parts");
    return (
        <NavList>
            <Link to={"/"} style={{textDecoration: "none"}} onClick={() => {setMenu("parts")}}>
                {menu === "parts" ? <NavItemSelected>부품관리</NavItemSelected> : <NavItem>부품관리</NavItem>}</Link>
            <Link to={"/desktop"} style={{textDecoration: "none"}} onClick={() => {setMenu("desktop")}}>
                {menu === "desktop" ? <NavItemSelected>PC관리</NavItemSelected>: <NavItem>PC관리</NavItem> }
                </Link>
            <NavItem>고객관리</NavItem>
            <NavItem>종합관리</NavItem>
        </NavList>
    )

}

export default Nav;
