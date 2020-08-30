import React from "react";
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

function Sidebar() {
    return (
        <div className="sidebar">
                <TwitterIcon className="sidebar__twitterIcon" />
                <SidebarOption Icon={HomeIcon} text="Home" route = "/home" />
                <SidebarOption Icon={SearchIcon} text="Explore" route ="/explore"/>
                <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" route ="/notifications"/>
                <SidebarOption Icon={MailOutlineIcon} text="Messages" route ="/messages"/>
                <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" route ="/bookmarks"/>
                <SidebarOption Icon={ListAltIcon} text="Lists" route ="/lists"/>
                <SidebarOption Icon={PermIdentityIcon} text="Profile" route ="/profile"/>              
                <SidebarOption Icon={MoreHorizIcon} text="More"/>
                <Button variant="outlined" className="sidebar__tweet" fullWidth>
                    Tweet
                </Button>
        </div>
    );
}

export default Sidebar;