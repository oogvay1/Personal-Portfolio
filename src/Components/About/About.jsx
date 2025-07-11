import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import './About.css'
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger);

function About() {

    const first = useRef(null);
    const second = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        gsap.set([first.current, second.current], { y: 200 })
        gsap.set(first.current, { x: 0 })

        const anim = gsap.to([first.current, second.current], { y: 0, paused: true });
        const anim2 = gsap.to(first.current, { x: 0, duration: 1, delay: .4, ease: CustomEase.create("custom", "M0,0 C0.401,0 0.119,0 0.38,0 0.62,-0.026 0.53,0.664 0.728,0.927 0.784,1 0.916,1 1,1"), paused: true });
        const anim3 = gsap.to(lineRef.current, { width: 250, duration: 1, delay: .4, ease: CustomEase.create("custom", "M0,0 C0.401,0 0.119,0 0.38,0 0.62,-0.026 0.53,0.664 0.728,0.927 0.784,1 0.916,1 1,1"), paused: true });

        ScrollTrigger.create({
            trigger: [first.current, second.current],
            start: "center center",
            onEnter: () => anim.play()
        });

        ScrollTrigger.create({
            trigger: first.current,
            start: "center center",
            onEnter: () => anim2.play()
        });

        ScrollTrigger.create({
            trigger: lineRef.current,
            start: "center center",
            onEnter: () => anim3.play()
        });

        ScrollTrigger.create({
            trigger: lineRef.current,
            start: "top 100%",
            onLeaveBack: () => anim3.pause(0)
        });

        ScrollTrigger.create({
            trigger: first.current,
            start: "top 100%",
            onLeaveBack: () => anim2.pause(0)
        });

        ScrollTrigger.create({
            trigger: [first.current, second.current],
            start: "top 100%",
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
                        <div ref={lineRef} className="about__span_line">
                            <video autoPlay muted loop>
                                <source src='src/assets/ace4939aefe5a2c294d49273022c3503.mp4' type='video/mp4' />
                            </video>
                        </div>
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
