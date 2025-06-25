import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function Count({
    to,
    from = 0,
    direction = "up",
    delay = 0,
    duration = 2,
    className = "",
    startWhen = true,
    separator = "",
    onStart,
    onEnd,
}) {
    const ref = useRef(null);
    const motionValue = useMotionValue(direction === "down" ? to : from);
    const [hide, setHide] = useState(false);

    const damping = 20 + 40 * (1 / duration);
    const stiffness = 100 * (1 / duration);

    const springValue = useSpring(motionValue, {
        damping,
        stiffness,
    });

    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        if (ref.current) {
            ref.current.textContent = String(direction === "down" ? to : from);
        }
    }, [from, to, direction]);

    useEffect(() => {
        if (isInView && startWhen) {
            if (typeof onStart === "function") {
                onStart();
            }

            const timeoutId = setTimeout(() => {
                motionValue.set(direction === "down" ? from : to);
            }, delay * 1000);

            const durationTimeoutId = setTimeout(() => {
                if (typeof onEnd === "function") {
                    onEnd();
                }
            }, delay * 1000 + duration * 1000);

            return () => {
                clearTimeout(timeoutId);
                clearTimeout(durationTimeoutId);
            };
        }
    }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current && !hide) {
                const intValue = Math.round(latest);

                if (intValue >= to) {
                    setHide(true);
                    return;
                }

                const options = {
                    useGrouping: !!separator,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                };

                const formattedNumber = Intl.NumberFormat("en-US", options).format(
                    intValue
                );

                const padded = formattedNumber.padStart(3, '0'); // ✅ Adds 0s

                ref.current.textContent = separator
                    ? padded.replace(/,/g, separator)
                    : padded;
            }
        });

        return () => unsubscribe();
    }, [springValue, separator, hide, to]);

    if (hide) return null;

    return <span ref={ref} className={className} />;
}
