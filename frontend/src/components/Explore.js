import React, { useState } from 'react';
import "./Explore.css";
import SearchIcon from "@material-ui/icons/Search";

function Explore() {
    return (
        <div className="explore" >
            <div className="explore__header">
                <div className="explore__input">
                    <SearchIcon className="explore__searchIcon" />
                    <input placeholder="Search Twitter" type="text" />
                </div>
                <div className="users__dropdown">
                    
                </div>
            </div>
        </div>
    )
}

export default Explore;
