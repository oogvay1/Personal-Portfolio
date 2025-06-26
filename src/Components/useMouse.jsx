import { useEffect } from "react";
import { useState } from "react";

function useMouse() {

    const [mousePos, setMousePos] = useState({x: 0, y: 0});

    const updateMouse = (e) => {
        setMousePos({x: e.clientX, y: e.clientY})
    }

    useEffect(() => {
        window.addEventListener('mousemove', updateMouse);

        return () => {
            window.removeEventListener('mousemove', updateMouse);
        }
    }, [])

    return mousePos
}

export default useMouse
