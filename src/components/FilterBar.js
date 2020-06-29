import React from 'react';

// this function component has three button for :
// delete, prioritize, unprioritize
const FilterBar = (props) => {

    return (
        // short-circut checking for showing the selectAll checkbox and
        // fro showing the filter bar 

        <div className="filter-bar">
            {props.hasItem && <label className="check-btn">
                <input
                    name="filterCheck"
                    type="checkbox"
                    checked={props.allChecked}
                    onChange={(e) => {
                        props.onClick(e.target.checked);
                    }} title="Select all" />

            </label>
            }
            {props.anyChecked &&
                < div className="filter-btns">
                    <button className="filter-btn-item" onClick={() => props.doFilter("del")}>
                        <img src="/bin.png" title="Remove" alt="Remove"></img>
                    </button>
                    <button className="filter-btn-item" >
                        <img src="/urgenton.png" title="High priority" alt="High priority" onClick={() => props.doFilter("isUrg") } ></img>
                    </button>
                    <button className="filter-btn-item" >
                        <img src="/urgentoff.png" title="Low priority" alt="Low priority" onClick={() => props.doFilter("noUrg")}></img>
                    </button>
                    <button className="filter-btn-item">
                        <img src="/checked.png" title="Done" alt="Done" onClick={() => props.doFilter("done") }></img>
                    </button>
                </div>
            }
             {props.hasItem &&  <div className="sort-btns">
                <button className="sort-btn-item">
                    <img src="/sortup.png" title="Sort from high to low" alt="Sort" onClick={() => props.doFilter("sort")}></img>
                </button>
            </div> }
        </div>
    )
}




export default FilterBar;

