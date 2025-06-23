import { forwardRef, useEffect, useRef } from 'react';
import './Header.css'
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import Framer from '../Magnetic/Framer';
import Magnetic from '../Magnetic';
import { Timeline } from 'gsap/gsap-core';

const Header = forwardRef(function Header(props, ref) {

    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null)
    let xPercent = 0;
    let direction = 1;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        requestAnimationFrame(animation);

        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: .25,
                onUpdate: e => direction = e.direction * -1
            },
            x: "-.001px"
        })
    }, [])

    const animation = () => {
        if (xPercent <= -100) {
            xPercent = 0;
        }

        if (xPercent > 0) {
            xPercent = -100
        }

        gsap.set(firstText.current, { xPercent: xPercent });
        gsap.set(secondText.current, { xPercent: xPercent });
        xPercent += 0.6 * direction;
        requestAnimationFrame(animation);
    }

    useEffect(() => {
        SplitText.create('.header-logo-h1:nth-child(1)', { type: 'chars' })
        SplitText.create('.header-logo-h1:nth-child(2)', { type: 'chars' })

        const tl = gsap.timeline();

        tl.to(originalSplit.chars, {
            duration: 
        })
    })

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header-inner">
                        <Magnetic>
                            <div className="header-logo">
                                <h1 className='header-logo-h1'>Alibekov Azimbek</h1>
                                <h1 className='header-logo-h1'>Alibekov Azimbek</h1>
                            </div>
                        </Magnetic>

                        <div className="header-menu">
                            <Framer>
                                <div ref={ref} className="menu-lines">
                                    <div className="bounds"></div>
                                </div>
                            </Framer>

                            <div ref={slider} className="menu-text">
                                <pre ref={firstText}>main menu • </pre>
                                <p ref={secondText}>main menu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
})

export default Header
