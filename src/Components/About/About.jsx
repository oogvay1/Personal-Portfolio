import { useEffect, useRef } from 'react';
import './About.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function About() {

    const main = useRef(null);

    useEffect(() => {
        gsap.to(main.current, {
            scale: 1.29,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: main.current,
                start: "bottom bottom",
                end: "bottom top",
                scrub: true
            },
        })
    }, [])

    return (
        <>
            <div className="about-container">
                <div ref={main} className="about-main">

                </div>
            </div>
        </>
    );
}

export default About
