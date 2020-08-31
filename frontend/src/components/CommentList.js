import { Comment } from 'semantic-ui-react'
import React from 'react';
import moment from 'moment';

const parseDate = (date) => {
    return moment(date).fromNow();
}

const CommentList = (props) => {
    return props.comments.map((comment) => (
        <Comment key={comment.id}>
            <Comment.Avatar src={comment.post.author.avatar} />
            <Comment.Content>
                <Comment.Author as='a'>{comment.post.author.name}</Comment.Author>
                <Comment.Metadata>
                    <div>{parseDate(comment.created_at)}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.reply}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    ))
}



export default CommentList;