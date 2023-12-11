import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

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
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [ location ])
    return (
        <NavList>
            <Link to={"/"} style={{textDecoration: "none"}}>
                {location.pathname === "/" ? <NavItemSelected>부품관리</NavItemSelected> : <NavItem>부품관리</NavItem>}</Link>
            <Link to={"/desktop"} style={{textDecoration: "none"}}>
                {location.pathname === "/desktop" ? <NavItemSelected>PC관리</NavItemSelected>: <NavItem>PC관리</NavItem> }
                </Link>
            <Link to={"/customer"} style={{textDecoration: "none"}}>
                {location.pathname === "/customer" ? <NavItemSelected>고객관리</NavItemSelected>: <NavItem>고객관리</NavItem> }
            </Link>
            <Link to={"/all"} style={{textDecoration: "none"}}>
                {location.pathname === "/all" ? <NavItemSelected>종합관리</NavItemSelected>: <NavItem>종합관리</NavItem> }
            </Link>
        </NavList>
    )

}

export default Nav;
