import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import './nav.css';
import {useEffect, useState} from "react";
import ThemeToggle from "../common/ThemeToggle";
import {useTheme} from "../context/themeProvider";

const NavList = styled.div`
    list-style: none;
    left: 0;
    height: 100%;
    width: 50px;
    position: fixed;
    margin-left: 20px;
    
    //background-color: white;
    background-clip: content-box;
    //padding-top: 50px;
    top: 0;
    bottom: 0;
    //display: flex;
    //flex-direction: column;
`;

const NavItem = styled.div`
    //height: 25%;
    //border: 1px solid black;
    width: 100%;
    text-align: center;
    align-items: center;
    //background-color: gray;
    writing-mode: vertical-lr;
    color: black;
    //padding-left: 50%;
    display: flex;
    justify-content: center;
    text-orientation: upright;
    
    padding-top: 10px;
    padding-bottom: 10px;
    //flex: 1;
`;

const NavItemSelected = styled.div`
    //height: 25%;
    //border: 1px solid white;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    elevation: higher;
    text-align: center;
    align-items: center;
    background-color: white;
    color: white;
    writing-mode: vertical-lr;
    //padding-left: 50%;
    display: flex;
    justify-content: center;
    text-orientation: upright;
    //flex: 1;
`;

const NoDecoratedLink = styled.link`
    text-decoration: none;


`;

const Nav = (props) => {
    const [ThemeMode, toggleTheme] = useTheme();
    const location = useLocation();
    const [hover, setHover] = useState('');
    useEffect(() => {
        console.log(location.pathname);
    }, [location])
    return (
        <div style={{position: 'fixed', height: '100%', width: '70px', backgroundColor: 'gray', border: '1px solid gray'}}>
        <NavList className={"nav_list"}>
            <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
                DarkMode
            </ThemeToggle>
            <Link to={"/"} style={{textDecoration: "none"}}>
                {location.pathname === "/" ? <NavItemSelected className={"nav_selected"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                        <path
                            d="M16.25 6c.414 0 .75.336.75.75v9.5c0 .414-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75v-9.5c0-.414.336-.75.75-.75h9.5zm2.75 0c0-1.104-.896-2-2-2h-11c-1.104 0-2 .896-2 2v11c0 1.104.896 2 2 2h11c1.104 0 2-.896 2-2v-11zm-11 14v3h-1v-3h1zm4 0v3h-1v-3h1zm2 0v3h-1v-3h1zm-4 0v3h-1v-3h1zm6 0v3h-1v-3h1zm-8-20v3h-1v-3h1zm4 0v3h-1v-3h1zm2 0v3h-1v-3h1zm-4 0v3h-1v-3h1zm6 0v3h-1v-3h1zm4 15h3v1h-3v-1zm0-4h3v1h-3v-1zm0-2h3v1h-3v-1zm0 4h3v1h-3v-1zm0-6h3v1h-3v-1zm-20 8h3v1h-3v-1zm0-4h3v1h-3v-1zm0-2h3v1h-3v-1zm0 4h3v1h-3v-1zm0-6h3v1h-3v-1z"/>
                    </svg>
                    <br/>

                    <span style={{marginTop: '10px'}}>부품관리</span>
                </NavItemSelected> : <NavItem className={"link"}>
                    <svg className={"icon"} xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                         viewBox="0 0 24 24" fill={"white"}>
                        <path
                            d="M16.25 6c.414 0 .75.336.75.75v9.5c0 .414-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75v-9.5c0-.414.336-.75.75-.75h9.5zm2.75 0c0-1.104-.896-2-2-2h-11c-1.104 0-2 .896-2 2v11c0 1.104.896 2 2 2h11c1.104 0 2-.896 2-2v-11zm-11 14v3h-1v-3h1zm4 0v3h-1v-3h1zm2 0v3h-1v-3h1zm-4 0v3h-1v-3h1zm6 0v3h-1v-3h1zm-8-20v3h-1v-3h1zm4 0v3h-1v-3h1zm2 0v3h-1v-3h1zm-4 0v3h-1v-3h1zm6 0v3h-1v-3h1zm4 15h3v1h-3v-1zm0-4h3v1h-3v-1zm0-2h3v1h-3v-1zm0 4h3v1h-3v-1zm0-6h3v1h-3v-1zm-20 8h3v1h-3v-1zm0-4h3v1h-3v-1zm0-2h3v1h-3v-1zm0 4h3v1h-3v-1zm0-6h3v1h-3v-1z"/>
                    </svg>
                    <br/>

                    <span className={"sub"} style={{ marginTop: '10px'}}>부품관리</span>
                </NavItem>}</Link>
            <Link to={"/desktop"} style={{textDecoration: "none"}}>
                {location.pathname === "/desktop" ? <NavItemSelected className={"nav_selected"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                        <path
                            d="M2 0v15h20v-15h-20zm18 13h-16v-11h16v11zm-6 3l1.599 2h-7.198l1.599-2h4zm-12 3v5h20v-5h-20zm9.5 3.1c-.332 0-.6-.269-.6-.6s.269-.6.6-.6.6.269.6.6-.268.6-.6.6zm8.5-.1h-6v-1h6v1z"/>
                    </svg>
                    <br/>

                    <span style={{marginTop: '10px'}}>PC관리</span>
                </NavItemSelected> : <NavItem className={"link"}>
                    <svg className={"icon"} xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                         viewBox="0 0 24 24" fill={"white"}>
                        <path
                            d="M2 0v15h20v-15h-20zm18 13h-16v-11h16v11zm-6 3l1.599 2h-7.198l1.599-2h4zm-12 3v5h20v-5h-20zm9.5 3.1c-.332 0-.6-.269-.6-.6s.269-.6.6-.6.6.269.6.6-.268.6-.6.6zm8.5-.1h-6v-1h6v1z"/>
                    </svg>
                    <br/>

                    <span className={"sub"} style={{ marginTop: '10px'}}>PC관리</span>
                </NavItem>}
            </Link>
            <Link to={"/customer"} style={{textDecoration: "none"}}>
                {location.pathname === "/customer" ? <NavItemSelected className={"nav_selected"}>
                    <svg width="36" height="36" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
                         viewBox="0 0 24 24"
                         clipRule="evenodd">
                        <path
                            d="M24 24h-24v-24h24v24zm-2-22h-20v20h20v-20zm-4.118 14.064c-2.293-.529-4.427-.993-3.394-2.945 3.146-5.942.834-9.119-2.488-9.119-3.388 0-5.643 3.299-2.488 9.119 1.064 1.963-1.15 2.427-3.394 2.945-2.048.473-2.124 1.49-2.118 3.269l.004.667h15.993l.003-.646c.007-1.792-.062-2.815-2.118-3.29z"/>
                    </svg>
                    <br/>

                    <span style={{marginTop: '10px'}}>고객관리</span>
                </NavItemSelected> : <NavItem className={"link"} onMouseOver={(e) => {
                    setHover('customer');
                }}
                onMouseLeave={() => {setHover('')}}>
                    <svg className={"icon"} width="36" height="36" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" fill={"white"}
                         viewBox="0 0 24 24"
                         clipRule="evenodd">
                        <path
                            d="M24 24h-24v-24h24v24zm-2-22h-20v20h20v-20zm-4.118 14.064c-2.293-.529-4.427-.993-3.394-2.945 3.146-5.942.834-9.119-2.488-9.119-3.388 0-5.643 3.299-2.488 9.119 1.064 1.963-1.15 2.427-3.394 2.945-2.048.473-2.124 1.49-2.118 3.269l.004.667h15.993l.003-.646c.007-1.792-.062-2.815-2.118-3.29z"/>
                    </svg>
                    <br/>

                        <span className={"sub"} style={{marginTop: '10px'}}>고객관리</span>

                </NavItem>}
            </Link>
            <Link to={"/all"} style={{textDecoration: "none"}}>
            {location.pathname === "/all" ? <NavItemSelected className={"nav_selected"}>
                    <svg  clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="36"
                         height="36"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-15.5.5h14v14h-14zm2.749 7.806 2.924 2.504c.142.127.321.19.498.19.203 0 .405-.082.553-.243l4.953-5.508c.131-.144.196-.324.196-.503 0-.41-.331-.746-.748-.746-.204 0-.405.082-.554.243l-4.453 4.962-2.371-2.011c-.144-.128-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.556z"
                            fillRule="nonzero"/>
                    </svg>
                    <br/>

                    <span style={{marginTop: '10px'}}>종합관리</span>
                </NavItemSelected> : <NavItem className={"link"}>
                <svg className={"icon"} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" fill={"white"}
                     width="36" height="36"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-15.5.5h14v14h-14zm2.749 7.806 2.924 2.504c.142.127.321.19.498.19.203 0 .405-.082.553-.243l4.953-5.508c.131-.144.196-.324.196-.503 0-.41-.331-.746-.748-.746-.204 0-.405.082-.554.243l-4.453 4.962-2.371-2.011c-.144-.128-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.556z"
                        fillRule="nonzero"/>
                </svg>
                <br/>

                <span className={"sub"} style={{ marginTop: '10px'}}>종합관리</span>
            </NavItem>}
            </Link>
        </NavList>
        </div>
    )

}

export default Nav;
