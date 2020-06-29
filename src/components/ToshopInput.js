import React from 'react';

// input onEnter and button onClick and onEnter add the new value
// the default value for priority is true
// if it changes, the callback function in parent component will change the state there
// tab works for accessing contorls in correct order

const ToshopInput = (props) => {

    return (
        <div className="input-bar">

            <input className="input-txt"
                placeholder="Let's buy ..."
                type="text"
                value={props.inputValue}
                ref={props.inputRef}
                onChange={props.inputChanged}
                onKeyPress={(e) => { if (e.key === 'Enter') props.inputKeyPressed() }}
            />
            <label className="input-chkbox" >
                <input
                    name="urgentCheck"
                    type="checkbox"
                    checked={props.urgentChk}
                    onChange={(e) => {
                        props.urgentClicked(e.target.checked);                       
                    }}
                    onKeyPress={(e) => { if (e.key === 'Enter') props.inputKeyPressed() }}
                     />
                Urgent
            </label>
            <button className="input-btn" onClick={() => props.onClick()}>+</button>
        </div>
    );
};

export default ToshopInput;