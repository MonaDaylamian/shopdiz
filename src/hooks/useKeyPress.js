import { useState, useEffect } from 'react';

const useKeyPress = (targetKey) =>{

    const [keyPressed,setKeyPressed] = useState(false);

    const onKeyDownHandler = ({key}) => {
        if (targetKey === key)
        setKeyPressed(true);
    }

    const onKeyUpHandler = ({key}) => {
        if (targetKey === key)
        setKeyPressed(false);
    }

        useEffect(()=> {
            window.addEventListener("keydown",onKeyDownHandler);
            window.addEventListener("keyup",onKeyUpHandler);
            return ()=> {
            window.removeEventListener("keydown",onKeyDownHandler);
            window.removeEventListener("keyup",onKeyUpHandler)
        };// eslint-disable-next-line
        }, []);

    return keyPressed;
}

export default useKeyPress;