import gsap from 'gsap';
import './Cursor.css'
import { useEffect } from 'react';
import { useRef } from 'react';

function Cursor() {

    let mouse = useRef({
        x: 0,
        y: 0
    })

    let delayMouse = useRef({
        x: 0,
        y: 0
    })

    const ManageCursor = (e) => {
        const { clientX, clientY } = e;
        mouse.current = {
            x: clientX,
            y: clientY
        }
    }

    const lerp = (x, y, a) => x * (1 - a) + y * a;

    const moveCursor = (x, y) => {
        gsap.set('.cursor', { x, y, xPercent: -50, yPercent: -50, ease: "power4.inOut" })
    }

    const animate = () => {
        const { x, y } = delayMouse.current;

        delayMouse.current = {
            x: lerp(x, mouse.current.x, 0.15),
            y: lerp(y, mouse.current.y, 0.15)
        }
        
        moveCursor(delayMouse.current.x, delayMouse.current.y)
        window.requestAnimationFrame(animate)
    }

    useEffect(() => {
        animate();
        window.addEventListener('mousemove', ManageCursor)
        return () => window.removeEventListener('mousemove', ManageCursor)
    }, [])

    return (
        <>
            <div className="cursor"></div>
        </>
    );
}

export default Cursor
