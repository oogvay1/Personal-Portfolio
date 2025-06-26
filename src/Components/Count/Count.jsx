import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Count.css";

export default function Count({ target = 100, duration = 3, complete }) {
    const digitRefs = useRef([]);

    useEffect(() => {
        const obj = { value: 0 };

        gsap.to(obj, {
            value: target,
            duration,
            ease: "power1.out",
            onUpdate: () => {
                const numberStr = Math.floor(obj.value).toString().padStart(3, "0");

                numberStr.split("").forEach((digit, index) => {
                    const el = digitRefs.current[index];
                    if (el) {
                        gsap.to(el, {
                            y: `-${parseInt(digit) * 60}px`,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
            },
            onComplete: () => {
                const time = setTimeout(() => {
                    complete(true);
                }, 800)

                return () => {
                    clearTimeout(time)
                }
            }
        });
    }, [target, duration]);

    return (
        <div className="counter-box">
            {[0, 1, 2].map((_, i) => (
                <div className="digit-mask" key={i}>
                    <div
                        className="digit-strip"
                        ref={(el) => (digitRefs.current[i] = el)}
                    >
                        {[...Array(10)].map((_, n) => (
                            <div className="digit" key={n}>{n}</div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
