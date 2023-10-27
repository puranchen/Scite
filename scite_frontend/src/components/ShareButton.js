import {Button} from "react-bootstrap";
import React from "react";
import { iconStyle, buttonStyle} from '../styles/feed_styles'


const ShareButton = () => {
    return (
        <div className='m-3 align-items-center'>
            <Button variant="light" style={buttonStyle}>
                <i className="material-icons" style={iconStyle}>ios_share</i>
            </Button>
            <span className="fw-bold"> 0 </span>
        </div>
    );
}

export default ShareButton