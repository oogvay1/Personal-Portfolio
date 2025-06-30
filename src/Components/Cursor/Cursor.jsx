import './Cursor.css'
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, transform, animate } from 'framer-motion';

export default function Cursor({ sticky, about, hover, }) {

    const [isHovered, setIsHovered] = useState(false);
    const cursor = useRef(null);
    const cursorSize = isHovered ? 60 : 21;

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const scale = {
        x: useMotionValue(1),
        y: useMotionValue(1)
    }

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 }
    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions)
    }

    const rotate = (distance) => {
        const angle = Math.atan2(distance.y, distance.x);
        animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 })
    }

    const manageMouseMove = e => {
        const { clientX, clientY } = e;
        const { left, top, height, width } = sticky && sticky.current.getBoundingClientRect();

        const center = { x: left + width / 2, y: top + height / 2 }

        if (isHovered) {

            const distance = { x: clientX - center.x, y: clientY - center.y }

            rotate(distance)

            const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
            const newScaleX = transform(absDistance, [0, height / .4], [1, 1.3])
            const newScaleY = transform(absDistance, [0, width / .4], [1, 0.8])
            scale.x.set(newScaleX);
            scale.y.set(newScaleY);

            mouse.x.set((center.x - cursorSize / 2) + (distance.x * 0.1));
            mouse.y.set((center.y - cursorSize / 2) + (distance.y * 0.1));
        }
        else {
            mouse.x.set(clientX - cursorSize / 2);
            mouse.y.set(clientY - cursorSize / 2);
        }
    }

    const manageMouseOver = e => {
        setIsHovered(true)
    }

    const manageMouseLeave = e => {
        setIsHovered(false)
        animate(cursor.current, { scaleX: 1, scaleY: 1 }, { duration: 0.1 }, { type: "spring" })
    }

    useEffect(() => {
        sticky && sticky.current.addEventListener("mouseenter", manageMouseOver)
        sticky && sticky.current.addEventListener("mouseleave", manageMouseLeave)
        window.addEventListener("mousemove", manageMouseMove);
        return () => {
            sticky && sticky.current.removeEventListener("mouseenter", manageMouseOver)
            sticky && sticky.current.removeEventListener("mouseleave", manageMouseLeave);
            window.removeEventListener("mousemove", manageMouseMove)
        }
    }, [isHovered])

    const template = ({ rotate, scaleX, scaleY }) => {
        return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`
    }

    const handleEnter = () => {
        animate(cursor.current, { scaleX: 4, scaleY: 4 }, { duration: 0.2 });
    };

    const handleLeave = () => {
        animate(cursor.current, { scaleX: 1, scaleY: 1 }, { duration: 0.2 });
    };

    useEffect(() => {
        if (!about || !about.current) return;

        const el = about.current;

        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);

        return () => {
            el.removeEventListener("mouseenter", handleEnter);
            el.removeEventListener("mouseleave", handleLeave);
        };
    }, []);


    return (
        <div className="cursorContainer">
            <motion.div
                transformTemplate={template}
                style={{
                    left: smoothMouse.x,
                    top: smoothMouse.y,
                    scaleX: scale.x,
                    scaleY: scale.y,
                    opacity: (hover && 0) || 1
                }}
                animate={{
                    width: cursorSize,
                    height: cursorSize
                }}
                className="cursor"
                ref={cursor}>
            </motion.div>
        </div>
    )
}