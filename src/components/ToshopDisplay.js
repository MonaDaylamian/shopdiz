import React from 'react';
import ToshopItem from './ToshopItem';


// Destructuring props and rest parameters
const ToshopDisplay = ({items,...props}) => {

    return (
        < ul className="productList">
            {
                items.map((item) =>

                    <ToshopItem
                        value={item}
                        key={item.id}
                        onClick={(e, control) => props.onClick(e, control, item.id)}
                        onChecked={() => props.onChecked(item.id)}
                        updateInlineText={ (txt) => props.updateInlineText(item.id,txt)}
                    />
                )
            }
        </ul>


    );
}

export default ToshopDisplay;