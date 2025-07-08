import { useEffect, useRef } from 'react';
import './About.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function About() {

    const main = useRef(null);

    useEffect(() => {
        gsap.to(main.current, {
            scale: 2,
            borderRadius: 15,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: main.current,
                start: "top bottom",
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
