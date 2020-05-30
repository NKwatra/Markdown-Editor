import React from 'react';
import Bold from './Bold';
import Italic from './Italic';

function UserInput(props) {
    return (
        <div className="input-container">
            <textarea className="text-input" rows={4}/>
            <div className="divider"/>
            <div>
                <div className="option">
                    <Bold fill="#000"/>
                </div>
                <div className="option">
                    <Italic fill="#000" />
                </div>
                <button className="send-button">SEND</button>
            </div>
        </div>
    )
}

export default UserInput;