import React, { useEffect, useState } from 'react';


const AbstractToggle = ({showRealAbstract, handleToggle}) => {

    return (
        <div className="d-flex align-items-center">
            <span className={showRealAbstract ? "fw-bold" : ""}>Original</span>
            <div className="form-check form-switch ms-2 mt-1">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={!showRealAbstract}
                    id="abstractSwitch"
                    onChange={handleToggle}
                />
            </div>
            <span className={!showRealAbstract ? "fw-bold" : ""}>SciteAI</span>

        </div>
    );
};

export default AbstractToggle;
