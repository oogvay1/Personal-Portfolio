import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/all';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import './About.css'
import SplitType from 'split-type';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText);

function About() {

    const first = useRef(null);
    const second = useRef(null);
    const lineRef = useRef(null);

    const paragraf = useRef(null);

    const aboutFirst = useRef(null);
    const aboutSecond = useRef(null);

    const aboutText = useRef(null);
    const aboutBtn = useRef(null);

    useEffect(() => {
        gsap.set([first.current, second.current], { y: 200 })
        gsap.set(first.current, { x: 0 })

        const anim = gsap.to([first.current, second.current], { y: 0, paused: true });
        const anim2 = gsap.to(first.current, { x: 0, duration: 1, delay: .4, ease: CustomEase.create("custom", "M0,0 C0.401,0 0.119,0 0.38,0 0.62,-0.026 0.53,0.664 0.728,0.927 0.784,1 0.916,1 1,1"), paused: true });
        const anim3 = gsap.to(lineRef.current, { width: 250, duration: 1, delay: .4, ease: CustomEase.create("custom", "M0,0 C0.401,0 0.119,0 0.38,0 0.62,-0.026 0.53,0.664 0.728,0.927 0.784,1 0.916,1 1,1"), paused: true });

        ScrollTrigger.create({
            trigger: [first.current, second.current],
            start: "top center",
            onEnter: () => anim.play()
        });

        ScrollTrigger.create({
            trigger: first.current,
            start: "top center",
            onEnter: () => anim2.play()
        });

        ScrollTrigger.create({
            trigger: first.current,
            start: "top center",
            onEnter: () => anim3.play()
        });

        ScrollTrigger.create({
            trigger: first.current,
            start: "top 120%",
            onLeaveBack: () => anim2.pause(0)
        });

        ScrollTrigger.create({
            trigger: [first.current, second.current],
            start: "top 120%",
            onLeaveBack: () => anim.pause(0)
        });

        ScrollTrigger.create({
            trigger: first.current,
            start: "top 120%",
            onLeaveBack: () => anim3.pause(0)
        });
    }, []);

    useEffect(() => {
        let mySplit = new SplitText(aboutText.current, { type: "lines" });
        let lines = mySplit.lines;

        lines.forEach((line) => {
            const wrapper = document.createElement("div");
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set(lines, { y: "100%" });

        const anim = gsap.to(lines, {
            y: "0%",
            duration: 1.2,
            ease: "power4.inOut",
            stagger: 0.01,
        });

        ScrollTrigger.create({
            trigger: first.current,
            start: "top bottom",
            onEnter: () => anim.play()
        });

        ScrollTrigger.create({
            trigger: first.current,
            start: "top 120%",
            onLeaveBack: () => anim.pause(0)
        });

        return () => mySplit.revert();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const contact1 = useRef(null);
    const contact2 = useRef(null);

    useEffect(() => {
        const split = new SplitType(contact1.current, {
            types: "chars",
            charClass: "char-about-text",
        });

        const chars = split.chars;
        chars.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("char-about-wrapper");
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });


        const split2 = new SplitType(contact2.current, {
            types: "chars",
            charClass: "char-about-text2",
        });

        const chars2 = split2.chars;
        chars2.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("char-about-wrapper2");
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set(".char-about-wrapper", {
            y: 124
        });

        gsap.set(".char-about-wrapper2", {
            y: -95
        });

        const anim = () => {
            gsap.to('.char-about-wrapper', { y: -7, duration: .4, ease: "power4.inOut", stagger: .02 });
            gsap.to('.char-about-wrapper2', { y: -240, duration: .4, ease: "power4.inOut", stagger: .02 })
        }

        const anim2 = () => {
            gsap.to('.char-about-wrapper', { y: 0, duration: .4, ease: "power4.inOut", stagger: .02 });
            gsap.to('.char-about-wrapper2', { y: 0, duration: .4, ease: "power4.inOut", stagger: .02 });
        }

        aboutBtn.current.addEventListener("mouseenter", () => anim());
        aboutBtn.current.addEventListener("mouseleave", () => anim2());

        return () => {
            aboutBtn.current.removeEventListener("mouseenter", () => anim());
            aboutBtn.current.removeEventListener("mouseleave", () => anim2());
        }
    }, [])

    return (
        <>
            <div className="about-main-container">
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
                <div className="about-me-text">
                    <button ref={aboutBtn} className='about-button'>
                        <div className="button-text-container">
                            <h1 className='contact1' ref={contact1}>CONTACT ME</h1>
                            <h1 className='contact2' ref={contact2}>CONTACT ME</h1>
                        </div>
                    </button>
                    <p ref={aboutText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At optio unde voluptatibus ex. Consequuntur adipisci similique perspiciatis? Cupiditate mollitia expedita error magnam illo accusantium nemo consequatur blanditiis, quaerat ex, quia asperiores enim cumque officiis, explicabo qui fuga iure modi laudantium!</p>
                </div>
            </div>
        </>
    );
}

export default About
