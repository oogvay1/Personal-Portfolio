import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import './About.css'

gsap.registerPlugin(ScrollTrigger);

function About() {

    const first = useRef(null);
    const second = useRef(null);

    useEffect(() => {
        gsap.set([first.current, second.current], { y: 200 })

        const anim = gsap.to([first.current, second.current], { y: 0, paused: true });

        ScrollTrigger.create({
            trigger: [first.current, second.current],
            start: "center center",
            onEnter: () => anim.play()
        })

        ScrollTrigger.create({
            trigger: [first.current, second.current],
            start: "top bottom",
            onLeaveBack: () => anim.pause(0)
        });

    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="about__container">
                <div>
                    <h1 className='about__span'>
                        <span ref={first}>Simple Ideas</span>
                    </h1>
                    <h1 className='about__span'>
                        <span ref={second}>Bold Results</span>
                    </h1>
                </div>
            </div>
        </>
    );
}

export default About
