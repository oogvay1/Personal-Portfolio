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
    const mainContent = useRef(null);
    const gradient = useRef(null);

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
    const spanRef = useRef([]);
    const follow = useRef(null);
    const follow2 = useRef(null);

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
            if (xPercent <= -100) {
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

    const setSpanRef = (el, index) => {
        if (el) spanRef.current[index] = el;
    };

    const animate = (name, duartion) => {
        gsap.killTweensOf(name.current)

        gsap.set(name.current, {
            y: -1050,
            height: 640,
            display: "block"
        });

        gsap.to(name.current, {
            y: -7,
            height: 1820,
            duration: duartion,
            ease: CustomEase.create("custom", "M0,0 C0.024,0 0.118,-0.041 0.173,0.137 0.173,0.116 0.179,0.215 0.33,0.256 0.509,0.285 0.473,0.329 0.555,0.382 0.633,0.481 0.657,0.534 0.673,0.699 0.699,0.944 0.828,0.994 0.905,0.995 0.957,0.996 0.998,1.001 1,1.002")
        });
    }

    useEffect(() => {
        const tl = gsap.timeline();

        if (isClick) {

            gsap.to(main.current, {
                height: "100vh",
                duration: 2,
                ease: "power4.inOut"
            });
            gsap.to(mainContent.current, {
                yPercent: 0,
                duration: 2,
                ease: "power4.inOut"
            });

            gsap.to(gradient.current, {
                background: "#00000015",
                opacity: 0,
                duration: 2,
                delay: 1
            });

        } else {
            
            gsap.to(main.current, {
                height: "0vh",
                duration: 2,
                ease: "power4.inOut"
            });
            gsap.to(mainContent.current, {
                yPercent: 10,
                duration: 2,
                ease: "power4.inOut"
            });

            gsap.to(gradient.current, {
                background: "#00000085",
                opacity: 1,
                duration: 1.2
            });

        }

    }, [isClick])

    // useEffect(() => {
    //     if (isClick) {
    //         gsap.killTweensOf(main.current);

    //         gsap.set(main.current, {
    //             y: -1050,
    //             height: 640,
    //             display: "block"
    //         });

    //         gsap.to(main.current, {
    //             y: -7,
    //             height: 1820,
    //             duration: 3,
    //             ease: CustomEase.create("custom", "M0,0 C0.024,0 0.118,-0.021 0.173,0.158 0.173,0.158 0.178,0.285 0.33,0.318 0.512,0.325 0.522,0.319 0.57,0.35 0.673,0.418 0.657,0.534 0.673,0.699 0.699,0.944 0.828,0.994 0.905,0.995 0.957,0.996 0.998,1.001 1,1.002")
    //         });

    //         animate(follow, 2.8);
    //         animate(follow2, 2.4);

    //         spanRef.current.forEach(el => {
    //             gsap.killTweensOf(el);

    //             gsap.to(el, {
    //                 y: 0,
    //                 duration: 1,
    //                 delay: 2,
    //                 ease: CustomEase.create("custom", "M0,0 C0.171,0 0.234,0.071 0.234,0.071 0.375,0.174 0.39,0.113 0.516,0.342 0.595,0.508 0.621,0.865 0.768,0.96 0.837,1.015 0.959,1 1,1")
    //             });
    //         });


    //         timeRef.current.forEach(el => {
    //             gsap.set(el, {
    //                 opacity: 0,
    //                 y: 32
    //             })

    //             gsap.to(el, {
    //                 opacity: 1,
    //                 y: -5,
    //                 duration: 1,
    //                 delay: 2.3,
    //                 ease: "power4.inOut"
    //             });
    //         });

    //     } else {
    //         gsap.killTweensOf(main.current);
    //         gsap.killTweensOf(follow.current);
    //         gsap.killTweensOf(follow2.current);

    //         gsap.to(main.current, {
    //             y: -1050,
    //             height: 500,
    //             duration: 1.7,
    //             delay: 0.5,
    //             ease: "power4.inOut",
    //             onComplete: () => {
    //                 gsap.set(main.current, { display: "none" });
    //             }
    //         });

    //         spanRef.current.forEach(el => {
    //             gsap.killTweensOf(el);

    //             gsap.to(el, {
    //                 y: 122,
    //                 duration: 1,
    //                 ease: CustomEase.create("custom", "M0,0 C0.171,0 0.234,0.071 0.234,0.071 0.375,0.174 0.39,0.113 0.516,0.342 0.595,0.508 0.621,0.865 0.768,0.96 0.837,1.015 0.959,1 1,1")
    //             });
    //         });

    //         gsap.to(follow.current, {
    //             y: -1050,
    //             height: 500,
    //             duration: 1.7,
    //             delay: 0.5,
    //             ease: "power4.inOut",
    //             onComplete: () => {
    //                 gsap.set(follow.current, { display: "none" });
    //             }
    //         });

    //         gsap.to(follow2.current, {
    //             y: -1050,
    //             height: 500,
    //             duration: 1.7,
    //             delay: 0.6,
    //             ease: "power4.inOut",
    //             onComplete: () => {
    //                 gsap.set(follow2.current, { display: "none" });
    //             }
    //         });

    //         timeRef.current.forEach(el => {
    //             gsap.to(el, {
    //                 opacity: 0,
    //                 duration: 1
    //             })
    //         })
    //     }
    // }, [isClick]);

    return (
        <>

            <div ref={main} className="navigation">
                <div ref={gradient} className="gradient"></div>
                <div ref={mainContent} className="navigation-content">
                    <div className="nav-text">

                        <div ref={(el) => setItemRef(el, 0)} className="navigator">
                            <div className='home' />
                            <span ref={(el) => setSpanRef(el, 0)} >HOME</span>
                            <div className="overlay">
                                <h1 ref={firstText}>BACK TO HOME</h1>
                                <h1 ref={secondText} className='slider-text'>BACK TO HOME</h1>
                            </div>
                        </div>

                        <div ref={(el) => setItemRef(el, 1)} className="navigator">
                            <span ref={(el) => setSpanRef(el, 1)}>WORK</span>
                            <div className="overlay">
                                <h1 ref={thirdText}>VIEW MY WORKS</h1>
                                <h1 ref={fourText} className='slider-text'>VIEW MY WORKS</h1>
                            </div>
                        </div>

                        <div ref={(el) => setItemRef(el, 2)} className="navigator">
                            <span ref={(el) => setSpanRef(el, 2)} >CONTACT</span>
                            <div className="overlay">
                                <h1 ref={fifText}>LET'S TALK</h1>
                                <h1 ref={sixText} className='slider-text'>LET'S TALK</h1>
                            </div>
                        </div>

                        <div ref={(el) => setItemRef(el, 3)} className="navigator">
                            <span ref={(el) => setSpanRef(el, 3)}>ABOUT</span>
                            <div className="overlay">
                                <h1 ref={sevenText}>KNOW ABOUT ME</h1>
                                <h1 ref={eightText} className='slider-text'>KNOW ABOUT ME</h1>
                            </div>
                        </div>

                    </div>

                    <div className="time">
                        <div className="time-main">
                            <div className="time-text-container">
                                <div ref={(el) => setTimeRef(el, 0)} className="time-text">
                                    <p className='global-time-p'>&copy; {date}</p>
                                </div>
                            </div>

                            <ul>
                                <div className="time-li-container">
                                    <li ref={(el) => setTimeRef(el, 1)} className='a-navigation'><a href="https://x.com/home" target='_blank'>Twitter</a></li>
                                </div>
                                <div className="time-li-container">
                                    <li ref={(el) => setTimeRef(el, 2)} className='a-navigation'><a href="#">Instragram</a></li>
                                </div>
                                <div className="time-li-container">
                                    <li ref={(el) => setTimeRef(el, 3)} className='a-navigation'><a href="https://www.behance.net/azimbekalibekov1" target='_blank'>Behance</a></li>
                                </div>
                                <div className="time-li-container">
                                    <li ref={(el) => setTimeRef(el, 4)} className='a-navigation'><a href="https://dribbble.com/azimbek-alibekov" target='_blank'>Dribbble</a></li>
                                </div>
                            </ul>

                            <div className="navigation-location">
                                <p ref={(el) => setTimeRef(el, 5)}><a href="https://maps.app.goo.gl/7tJJFpnyab2xQu5w6" target='_blank'>322, Samarkand st., Yangiyol, Uzbekistan</a></p>
                            </div>

                            <div className="time-text-container">
                                <div ref={(el) => setTimeRef(el, 6)} className="time-text">
                                    <p className='global-time-p'><i className="ri-global-line"></i> Uzbekistan {time}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <spline-viewer className="spline" url="https://prod.spline.design/zcV76R-jCGhAadMc/scene.splinecode"></spline-viewer> */}
            </div>
        </>
    );
}

export default Navigation
