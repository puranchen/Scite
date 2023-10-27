import {Button} from "react-bootstrap";
import React from "react";
import { iconStyle, buttonStyle} from '../styles/feed_styles'


const CommentButton = ({ onCommentButtonClick, commentCount }) => {
    return (
        <div className='m-3 align-items-center'>
            <Button onClick={onCommentButtonClick} variant="light" style={buttonStyle}>
                <i className="material-icons" style={iconStyle}>forum</i>
            </Button>
            <span className="fw-bold"> {commentCount} </span>
        </div>
    );
}

export default CommentButton