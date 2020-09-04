import React, { useState, useRef, useEffect } from 'react';
import "./Explore.css";
import SearchIcon from "@material-ui/icons/Search";
import { CSSTransition } from 'react-transition-group';

import { gql, useQuery, useLazyQuery } from '@apollo/client';

const GET_USERS = gql`
    query getUsers($name: String!) {
        users(name: $name) {
        name
        avatar
        }
    }
`;

function Explore() {
    const [open, setOpen] = useState(false);
    const [text, setTextToSearch] = useState('');
    const [getUsers, {loading, data, error}] = useLazyQuery(GET_USERS);
    console.log(data)

    useEffect(() => {
        getUsers({
            variables: {
                name: '%%'
            }
        })
    }, [])

    return (
        <div className="explore" >
            <div className="explore__header">
                <div className="explore__input">
                    <SearchIcon className="explore__searchIcon" />
                    <input placeholder="Search Twitter" type="text" onFocus={() => {setOpen(!open)}} onKeyUp={(e) => {
                        getUsers({
                            variables: {
                                name: '%' +e.target.value + '%'
                            }
                        })}}/>
                </div>
            </div>
            <div className="users__dropdown">
            {open && 
                <DropdownMenu user={data && data.users}></DropdownMenu>
            }
            </div>
        </div>
    )
}

function DropdownMenu({user}) {
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
                {props.leftIcon &&
                <img className="icon-button" src={props.leftIcon}/>
                }
                {props.noIcon &&
                <span className="icon-button">{props.noIcon}</span>
                }
                <span className="user__name">{props.children}</span>
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
                    {user && user.length > 0 ?
                    user.map((u) => (
                        <DropdownItem key={user.name} leftIcon={u.avatar}>{u.name}</DropdownItem>
                        ))
                        :
                        <DropdownItem noIcon="❌">No users 🤔</DropdownItem>
                    }

                </div>
            </CSSTransition>
        </div>
    )
}

export default Explore;
