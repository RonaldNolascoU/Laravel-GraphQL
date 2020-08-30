import React from "react";
import NewPost from './NewPost';
import "./TweetBox.css"

function TweetBox() {
    return (
        <div className="tweetBox">
            <NewPost />
        </div>
    )
}

export default TweetBox;