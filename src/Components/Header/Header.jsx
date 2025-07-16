import { forwardRef, useEffect, useRef, useState } from 'react';
import './Header.css'
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import SplitType from 'split-type';
import Framer from '../Magnetic/Framer';
import Magnetic from '../Magnetic';

const Header = forwardRef(function Header(props, ref) {

    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null)
    const header = useRef(null);
    let xPercent = 0;
    let direction = 1;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        requestAnimationFrame(animation);

        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: .25,
                onUpdate: (self) => {
                    direction = self.direction * -1;
                },
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
        if (props.isComplete) {
            gsap.set('.logo-h1', {
                y: 20,
                opacity: 0,
            });

            gsap.to('.logo-h1', {
                y: 0,
                opacity: 1,
                ease: "elastic.out(.4, 0.5)",
                duration: 2.1,
                delay: 0.2,
            });

            gsap.set('.header-menu', {
                y: 20,
                opacity: 0,
            });

            gsap.to('.header-menu', {
                y: 0,
                opacity: 1,
                ease: "elastic.out(.4, 0.5)",
                duration: 2.1,
                delay: 0.2,
            });
        }
    }, [props.isComplete]);

    const handleClick = () => {
        props.setClick(prev => !prev);
    };

    console.log(props.isClick)
    return (
        <>
            <header ref={header} className="header">
                <div className="container">
                    <div className="header-inner">
                        <Magnetic>
                            <div className="header-logo">
                                <h1 className='logo-h1'>Alibekov Azimbek</h1>
                            </div>
                        </Magnetic>

                        <div className="header-menu">
                            <Framer>
                                <div data-line={props.isClick ? "true" : "false"} ref={ref} onClick={handleClick} className="menu-lines">
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
