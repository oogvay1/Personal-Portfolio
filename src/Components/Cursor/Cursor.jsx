import gsap from 'gsap';
import './Cursor.css'
import { useEffect } from 'react';
import { useRef } from 'react';

function Cursor() {

    let cursor = useRef(null);
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
        gsap.set('.cursor', { x, y, xPercent: -50, yPercent: -50 })
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

        return () => {
            window.removeEventListener('mousemove', ManageCursor);
        };
    }, [])

    useEffect(() => {
        const elements = document.querySelectorAll('.menu');

        const scaleUp = () => {
            gsap.to(cursor.current, {
                width: 21,
                height: 21,
                duration: 0.2,
                ease: 'power2.out'
            });
        };

        const scaleDown = () => {
            gsap.to(cursor.current, {
                width: 16,
                height: 16,
                duration: 0.2,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousedown', scaleDown);
        window.addEventListener('mouseup', scaleUp);

        elements.forEach(item => {
            item.addEventListener('mouseleave', scaleUp);
            item.addEventListener('mouseenter', scaleDown);
        });

        return () => {
            window.removeEventListener('mousedown', scaleDown);
            window.removeEventListener('mouseup', scaleUp);
            elements.forEach(item => {
                item.addEventListener('mouseleave', scaleUp);
                item.addEventListener('mouseenter', scaleDown);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursor} className="cursor"></div>
        </>
    );
}

export default Cursor
