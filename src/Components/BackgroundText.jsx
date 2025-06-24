import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BackgroundText({ text }) {

    gsap.registerPlugin(ScrollTrigger);

    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            { scaleY: 3 },  // start big
            {
                scaleY: 1,  // end small
                ease: "power1.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=1000",
                    scrub: true,
                    pin: true,
                    pinSpacing: false
                }
            }
        );
    }, []);

    return (
        <div ref={containerRef} className="circa-text-container">
            <h1 ref={textRef} className="circa-text">{text}</h1>
        </div>
    );
}
