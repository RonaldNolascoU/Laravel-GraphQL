import React from "react";
import "./SidebarOption.css";
import { NavLink } from "react-router-dom";

function SidebarOption({ active, text, Icon, route }) {
    return (
        <div className={`sidebarOption`}>
            <React.Fragment>
                {route ?
                    <NavLink to={`${route}`} activeClassName="active">
                        <Icon />
                        <h2>{text}</h2>
                    </NavLink>
                    :
                    <React.Fragment>
                        <Icon />
                        <h2>{text}</h2>
                    </React.Fragment>
                }
            </React.Fragment>

        </div>
    );
}

export default SidebarOption;