import { useEffect } from 'react';
import './Navigation.css'
import { useState } from 'react';
import { useRef } from 'react';
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
import Magnetic from '../Magnetic';
import { delay, motion } from 'framer-motion';
import { CustomEase } from "gsap/CustomEase";

function Navigation({ isClick }) {

    let [time, setTime] = useState(new Date().toLocaleTimeString());
    let [date, setDate] = useState(new Date().getFullYear());

    useEffect(() => {

        const inter = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            setDate(new Date().getFullYear())
        }, 100)

        return () => clearInterval(inter)
    }, []);

    const itemsRef = useRef([]);
    const main = useRef(null);

    useEffect(() => {
        itemsRef.current.forEach(item => {
            const overlay = item.querySelectorAll(".overlay");
            let lastY = 0;

            const handleMouseEnter = (e) => {
                const bounds = item.getBoundingClientRect();
                const mouseY = e.clientY - bounds.top;
                const fromTop = mouseY < bounds.height / 2;

                gsap.set(overlay, {
                    top: fromTop ? "-100%" : "100%",
                });

                gsap.to(overlay, {
                    top: "0%",
                    duration: .2,
                    ease: [.48, .15, .25, .96],
                });

                item.querySelector("span").style.color = "black";
                lastY = fromTop ? "top" : "bottom";
            };

            const handleMouseLeave = (e) => {
                const bounds = item.getBoundingClientRect();
                const mouseY = e.clientY - bounds.top;
                const toTop = mouseY < bounds.height / 2;

                let exitDirection;

                if (lastY === "top" && toTop) exitDirection = "-100%";
                else if (lastY === "top" && !toTop) exitDirection = "100%";
                else if (lastY === "bottom" && toTop) exitDirection = "-100%";
                else exitDirection = "100%";

                gsap.to(overlay, {
                    top: exitDirection,
                    duration: .2,
                    ease: [.48, .15, .25, .96],
                });

                item.querySelector("span").style.color = "white";
            };

            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                item.removeEventListener("mouseenter", handleMouseEnter);
                item.removeEventListener("mouseleave", handleMouseLeave);
            };
        });
    }, []);

    const firstText = useRef(null);
    const secondText = useRef(null);
    const thirdText = useRef(null);
    const fourText = useRef(null);
    const fifText = useRef(null);
    const sixText = useRef(null);
    const sevenText = useRef(null);
    const eightText = useRef(null);

    const timeRef = useRef([]);

    useEffect(() => {
        let xPercent = 0;
        let direction = -1;

        const animate = () => {
            xPercent += 0.4 * direction;
            if (xPercent <= -133.4) {
                xPercent = 0
            }

            gsap.set(firstText.current, { xPercent: xPercent });
            gsap.set(secondText.current, { xPercent: xPercent });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, []);


    useEffect(() => {
        let xPercent = 0;
        let direction = -1;

        const animate = () => {
            xPercent += 0.4 * direction;
            if (xPercent <= -126.7) {
                xPercent = 0
            }

            gsap.set(thirdText.current, { xPercent: xPercent });
            gsap.set(fourText.current, { xPercent: xPercent });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, []);


    useEffect(() => {
        let xPercent = 0;
        let direction = -1;

        const animate = () => {
            xPercent += 0.6 * direction;
            if (xPercent <= -166) {
                xPercent = 0
            }

            gsap.set(fifText.current, { xPercent: xPercent });
            gsap.set(sixText.current, { xPercent: xPercent });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, []);


    useEffect(() => {
        let xPercent = 0;
        let direction = -1;

        const animate = () => {
            xPercent += 0.4 * direction;
            if (xPercent <= -124.1) {
                xPercent = 0
            }

            gsap.set(sevenText.current, { xPercent: xPercent });
            gsap.set(eightText.current, { xPercent: xPercent });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, []);

    const setItemRef = (el, index) => {
        if (el) itemsRef.current[index] = el;
    };

    const setTimeRef = (el, index) => {
        if (el) timeRef.current[index] = el;
    };

    useEffect(() => {
        if (isClick) {
            gsap.killTweensOf(main.current);

            gsap.set(main.current, {
                y: -920,
                height: 620,
                display: "block"
            });

            gsap.to(main.current, {
                y: -7,
                height: 1700,
                duration: 3,
                ease: CustomEase.create("custom", "M0,0 C0.024,0 0.118,-0.021 0.173,0.158 0.173,0.158 0.18,0.277 0.33,0.318 0.509,0.347 0.473,0.329 0.555,0.382 0.633,0.481 0.657,0.534 0.673,0.699 0.699,0.944 0.828,0.994 0.905,0.995 0.957,0.996 0.998,1.001 1,1.002")
            });

            itemsRef.current.forEach(el => {
                gsap.killTweensOf(el);

                gsap.set(el, {
                    opacity: 0,
                });

                gsap.to(el, {
                    opacity: 1,
                    duration: 2,
                    delay: 2,
                    ease: [0.76, 0, 0.24, 1]
                });
            });

        } else {
            gsap.killTweensOf(main.current);

            gsap.to(main.current, {
                y: 1080,
                duration: 1.5,
                delay: 0.5,
                ease: "power4.inOut",
                onComplete: () => {
                    gsap.set(main.current, { display: "none" });
                }
            });

            itemsRef.current.forEach(el => {
                gsap.killTweensOf(el);
                gsap.to(el, {
                    opacity: 0,
                    duration: 1,
                    ease: [0.76, 0, 0.24, 1]
                });
            });
        }
    }, [isClick]);


    return (
        <>
            <div ref={main} className="navigation">
                <div className="nav-text">
                    <motion.div ref={(el) => setItemRef(el, 0)} className="navigator">
                        <div className='home' />
                        <span>HOME</span>
                        <div className="overlay">
                            <h1 ref={firstText}>BACK TO HOME</h1>
                            <h1 ref={secondText} className='slider-text'>BACK TO HOME</h1>
                        </div>
                    </motion.div>

                    <motion.div ref={(el) => setItemRef(el, 1)} className="navigator">
                        <span>WORK</span>
                        <div className="overlay">
                            <h1 ref={thirdText}>VIEW MY WORKS</h1>
                            <h1 ref={fourText} className='slider-text'>VIEW MY WORKS</h1>
                        </div>
                    </motion.div>

                    <motion.div ref={(el) => setItemRef(el, 2)} className="navigator">
                        <span>CONTACT</span>
                        <div className="overlay">
                            <h1 ref={fifText}>LET'S TALK</h1>
                            <h1 ref={sixText} className='slider-text'>LET'S TALK</h1>
                        </div>
                    </motion.div>

                    <motion.div ref={(el) => setItemRef(el, 3)} className="navigator">
                        <span>ABOUT</span>
                        <div className="overlay">
                            <h1 ref={sevenText}>KNOW ABOUT ME</h1>
                            <h1 ref={eightText} className='slider-text'>KNOW ABOUT ME</h1>
                        </div>
                    </motion.div>

                </div>

                <div className="time">
                    <div className="time-main">
                        <Magnetic>
                            <p ref={(el) => setTimeRef(el, 0)}>&copy; Azimbek {date}</p>
                        </Magnetic>
                        <Magnetic>
                            <p ref={(el) => setTimeRef(el, 1)}><i className="ri-global-line"></i> Uzbekistan {time}</p>
                        </Magnetic>
                    </div>
                </div>

                {/* <spline-viewer className="spline" url="https://prod.spline.design/zcV76R-jCGhAadMc/scene.splinecode"></spline-viewer> */}
            </div>
        </>
    );
}

export default Navigation
