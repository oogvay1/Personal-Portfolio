import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function BackgroundText({ text }) {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {


        gsap.set(textRef.current, {
            scaleY: 3,
            opacity: 1
        })

        gsap.to(
            textRef.current,
            {
                y: 40,
                opacity: 1,
                scaleY: 1,
                duration: 4,
                ease: "elastic.inOut(.1, 0.2)",
            }
        );
    }, []);

    return (
        <>
            <div ref={containerRef} className="circa-text-container">
                <h1 ref={textRef} className="circa-text">{text}</h1>
            </div>
        </>
    );
}
