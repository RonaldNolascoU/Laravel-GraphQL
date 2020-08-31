import React, { useState, useEffect } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import "./FilterSelect.css";
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import useComponentVisible from "../hooks/hideDropdownOnClick";

const FilterSelect = (props) => {
    const [isOpen, setDropdownStatus] = useState(false);
    useEffect(() => {
        document.addEventListener('click', () => {
            setDropdownStatus(false);
        })
        return () => {
            
        };
    }, []);
    return (
        <React.Fragment>
            {isOpen ?
            <div className="filter__wrapper">
                <div className="filter__tweets" >
                    <div className="filter__option" onClick={() => {props.onSelectedOption('all')}}>
                        <SyncAltIcon />
                        <div className="filter__option--body">
                            <span>See Latest Tweets Instead</span>
                        </div>
                    </div>

                    <div className="filter__option" onClick={() => {props.onSelectedOption('mine')}}> 
                        <AccountCircleIcon />
                        <div className="filter__option--body">
                            <span>See My Tweets</span>
                        </div>
                    </div>
                </div>
            </div>
                :
                <FilterListIcon className="filter__icon"
                    tabIndex="0"
                    onBlur={() => setDropdownStatus(false)}
                    onFocus={() => setDropdownStatus(true)}
                />
            }
        </React.Fragment>
    )
}

export default FilterSelect;