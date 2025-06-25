import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import SplitType from "split-type";

export default function BackgroundText({ isComplete, text }) {
    gsap.registerPlugin(SplitText);

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isComplete) {
            const myText = new SplitType('.circa-text');
            gsap.set('.char', {
                y: 200,
                opacity: 0,
            });

            gsap.to('.char', {
                y: 0,
                opacity: 1,
                ease: "elastic.out(.4, 0.5)",
                duration: 2,
                stagger: 0.05,
                delay: 0.2,
            });
        }
    }, [isComplete]);


    return (
        <>
            <div ref={containerRef} className="circa-text-container">
                <h1 ref={textRef} className="circa-text">{text}</h1>
            </div>
        </>
    );
}
