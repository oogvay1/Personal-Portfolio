import { forwardRef, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import useMouse from '../useMouse';
import './SideText.css';

const SideText = forwardRef((props, ref) => {
    const textRef = useRef(null);
    const splitRef = useRef(null);
    const { x, y } = useMouse();
    const size = props.hover ? 400 : 40;

    useEffect(() => {
        if (splitRef.current) {
            splitRef.current.revert();
        }

        splitRef.current = new SplitType('.tt', {
            types: 'lines',
            lineClass: 'line-child',
        });

        const lines = textRef.current.querySelectorAll('.line-child');

        lines.forEach(el => {
            gsap.set(el, { y: 100, opacity: 0 });
        })

        lines.forEach(el => {
            gsap.to(el, {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 2,
                ease: 'power4.out',
            });
        })
    }, [props.completed]);
    console.log(props.hover)
    return (
        <div className="text-container">
            <div ref={textRef} className="body">
                <p><span className='tt'>Design meets</span> <span className='tt'>motion — where</span> <span className='tt'>code becomes</span> <span className='tt'>character.</span></p>
            </div>
        </div>
    );
})

export default SideText;
