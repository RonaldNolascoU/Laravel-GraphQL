import React, { useState, useRef, useEffect } from 'react';
import "./Explore.css";
import SearchIcon from "@material-ui/icons/Search";
import { CSSTransition } from 'react-transition-group';
function Explore() {
    const [open, setOpen] = useState(false);
    return (
        <div className="explore" >
            <div className="explore__header">
                <div className="explore__input">
                    <SearchIcon className="explore__searchIcon" />
                    <input placeholder="Search Twitter" type="text" onFocus={() => {setOpen(!open)}}/>
                </div>
            </div>
            <div className="users__dropdown">
            {open && 
                <DropdownMenu></DropdownMenu>
            }
            </div>
        </div>
    )
}

function DropdownMenu() {

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <a className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }
    return (
        <div className="dropdown" style={{ height: menuHeight }} rel={dropdownRef}>
            <CSSTransition
                in={activeMenu === 'main'}
                unmountOnExit
                timeout={500}
                onEnter={calcHeight}
                classNames="menu-primary">
                <div className="menu">
                    <DropdownItem leftIcon="🤔">My Profile</DropdownItem>
                    <DropdownItem leftIcon="🤔">My Profile</DropdownItem>
                    <DropdownItem leftIcon="🤔">My Profile</DropdownItem>
                    <DropdownItem leftIcon="🤔">My Profile</DropdownItem>
                    <DropdownItem leftIcon="🤔">My Profile</DropdownItem>
                    <DropdownItem leftIcon="🤔">My Profile</DropdownItem>
                    <DropdownItem leftIcon="🤔">My Profile</DropdownItem>
                    <DropdownItem leftIcon="🤔">My Profile</DropdownItem>
                    <DropdownItem leftIcon="🤔">My Profile</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Explore;
