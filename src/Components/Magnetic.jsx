import gsap from "gsap";
import React, { useEffect, useRef } from "react";

export default function Magnetic({ children }) {

    let ref = useRef(null);

    useEffect(() => {
        const xTo = gsap.quickTo(ref.current, "x", { duration: 1.7, ease: "elastic.out(1, 0.3)" })
        const yTo = gsap.quickTo(ref.current, "y", { duration: 1.7, ease: "elastic.out(1, 0.3)" })

        const mouseMove = (e) => {

            const { clientX, clientY } = e;

            const { width, height, left, top } = ref.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x);
            yTo(y)
        }

        const mouseLeave = (e) => {
            xTo(0);
            yTo(0)
        }

        ref.current.addEventListener('mousemove', mouseMove)
        ref.current.addEventListener('mouseleave', mouseLeave)

        return () => {
            ref.current.removeEventListener('mousemove', mouseMove)
            ref.current.removeEventListener('mouseleave', mouseLeave)
        }
    }, [])

    return (
        React.cloneElement(children, { ref })
    );
}