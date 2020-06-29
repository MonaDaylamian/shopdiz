import React, { useState, useEffect, useRef } from "react";
import useKeyPress from "../hooks/useKeyPress.js";
import useClickOutside from "../hooks/useClickOutside.js";
import DOMPurify from "dompurify";



const InlineEdit = (props) => {



  //const parameters = [...props];
  const enter = useKeyPress("Enter");
  const escape = useKeyPress("Escape");
  const inputRef = useRef(null);
  const wrapperRef= useRef(null);

  const [isInputActive, setInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.value);

  useClickOutside(wrapperRef, () => {
    if (isInputActive) {
      props.setInlineValue(inputValue);
      setInputActive(false);
    }
  });

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }

  }, [isInputActive]);

 useEffect(() => {
    if (isInputActive) {
     // inputRef.current.focus();
      if (enter) {
        props.setInlineValue(inputValue);
        setInputActive(false);
      }
      else if (escape) {
        setInputValue(props.value);
        setInputActive(false);
      }
    }
  },[props,isInputActive,inputValue,escape,enter]
  );

    /* const downHandler = (event) => {
      if (event.key === "Escape")
      {
        setInputValue(props.value);
        setInputActive(false);
      }
      else if (event.key === "Enter")
      {
        props.setInlineValue(inputValue);
        setInputActive(false);
      }
    }*/
  

  return (
    <span ref={wrapperRef} className="inline-input-parent" >

      <span
        className={`inline-span--${
          !isInputActive ? "active" : "hidden"
          }`}
        onClick={() => setInputActive(true)}
      >
        {inputValue}
      </span>
      <input
        className={`inline-input--${
          isInputActive ? "active" : "hidden"}`}
        ref={inputRef} value={inputValue}
        onChange={e =>
          setInputValue(DOMPurify.sanitize(e.target.value))
        }
      //   onKeyDown={e => downHandler(e)}

      />

    </span>
  )
}

export default InlineEdit;