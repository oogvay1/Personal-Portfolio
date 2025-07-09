import { useEffect, useRef } from 'react';
import './About.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function About() {

    const main = useRef(null);
    const text = useRef(null);
    const textContainer = useRef(null);

    useEffect(() => {
        gsap.to(main.current, {
            width: 1928,
            height: 1100,
            y: -50,
            borderRadius: 20,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: main.current,
                start: "200px center",
                end: "1100px top",
                scrub: true
            },
        });

        gsap.set(text.current, {
            y: 200
        })

        gsap.to(text.current, {
            y: 0,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: text.current,
                start: "200px center",
                end: "1000px top",
                scrub: true
            }
        });;

        gsap.to(textContainer.current, {
            height: 250,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: textContainer.current,
                start: "200px center",
                end: "1000px top",
                scrub: true
            }
        });
    }, [])

    return (
        <>
            <div className="sticky-container">

                <div ref={main} className="about-main">
                    <div ref={textContainer} className="text_container">
                        <h1 ref={text} >DEVELOPER</h1>
                    </div>
                </div>

            </div>
        </>
    );
}

export default About
