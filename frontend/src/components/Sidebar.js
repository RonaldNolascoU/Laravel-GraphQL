import React, { useContext, useEffect } from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption.js";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import AuthContext from '../auth-context/AuthContext'
import { gql, useMutation } from '@apollo/client';

const LOGOUT = gql`
mutation logout {
    logout {
        id
    }
}
`;


function Sidebar() {
    const { authenticated, setAuthenticated } = useContext(AuthContext)
    // const { setUser } = useContext(AuthContext)
    const [logout, { data, loading, error }] = useMutation(LOGOUT);

    // use

    return (
        <div className="sidebar">
            <TwitterIcon className="sidebar__twitterIcon" />
            <SidebarOption Icon={HomeIcon} text="Home" route="/home" />
            <SidebarOption Icon={SearchIcon} text="Explore" route="/explore" />
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" route="/notifications" />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" route="/messages" />
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" route="/bookmarks" />
            <SidebarOption Icon={ListAltIcon} text="Lists" route="/lists" />
            <SidebarOption Icon={PermIdentityIcon} text="Profile" route="/profile" />
            <SidebarOption Icon={MoreHorizIcon} text="More" />
            {authenticated  ?
                <Button variant="outlined" className="sidebar__tweet" fullWidth onClick={() => {
                    logout();
                    setAuthenticated(false);
                    // setUser([])
                }}>
                    Logout
                </Button>
                : null
            }

        </div>
    );
}

export default Sidebar;