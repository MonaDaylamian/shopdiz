import React, { useState } from 'react';
import InlineEdit from './InlineEdit';

const ToshopItem = (props) => {

    const product = props.value;
    const [inlineEditText,setinlineEditText] = useState(product.name);

    const Checkbox = (props) => {
        return (
            <label className="check-btn" >
                <input

                    name="checkItem"
                    type="checkbox"
                    checked={props.checked}
                    onChange={(e) => props.onChecked(e)} />
            </label>
        )

    }

    const inlineTextUpdated = (txt)=>{
        setinlineEditText( txt );
        props.updateInlineText(txt);
    }

    if (product.name.length > 0)
        return (
            <li
            className={`${product.checked ? "active" :
            product.priority ? "high" :  "normal"}-list ${product.done ? "done-list" : ""} list-item`}

            >
                <Checkbox onChecked={() => props.onChecked()} checked={product.checked} />          
                <InlineEdit value = {inlineEditText} setInlineValue={(txt)=> inlineTextUpdated(txt)} />
                <button className="remove-btn">
                 <img src="/delete.png" title="Remove" alt="Remove" onClick={(e) => props.onClick(e, 'remove')}></img>
             </button>
            </li>
        );
    else return null;
}



export default ToshopItem;