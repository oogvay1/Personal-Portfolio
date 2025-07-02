import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import "./Coute.css";

function Number({ mv, number, height }) {
    let y = useTransform(mv, (latest) => {
        let placeValue = latest % 10;
        let offset = (10 + number - placeValue) % 10;
        let memo = offset * height;
        if (offset > 5) {
            memo -= 10 * height;
        }
        return memo;
    });
    return (
        <motion.span className="counter-number" style={{ y }}>
            {number}
        </motion.span>
    );
}

function Digit({ place, value, height, digitStyle }) {
    let valueRoundedToPlace = Math.floor(value / place);
    let animatedValue = useSpring(valueRoundedToPlace, {
        stiffness: 100,
        damping: value > 90 ? 20 : 10, // slow down when value > 90
    });

    useEffect(() => {
        animatedValue.set(valueRoundedToPlace);
    }, [animatedValue, valueRoundedToPlace]);

    return (
        <div className="counter-digit" style={{ height, ...digitStyle }}>
            {Array.from({ length: 10 }, (_, i) => (
                <Number key={i} mv={animatedValue} number={i} height={height} />
            ))}
        </div>
    );
}

export default function Counter({
    fontSize = 400,
    padding = 0,
    places = [100, 10, 1],
    gap = 8,
    borderRadius = 4,
    horizontalPadding = 8,
    textColor = "white",
    fontWeight = "bold",
    containerStyle,
    counterStyle,
    digitStyle,
    gradientHeight = 16,
    gradientFrom = "black",
    gradientTo = "transparent",
    topGradientStyle,
    bottomGradientStyle,
    onComplete, // added onComplete prop
}) {
    const height = fontSize + padding;
    const [value, setValue] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setValue((prev) => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    if (onComplete) onComplete(); // call onComplete when done
                    return prev;
                }
            });
        }, value > 90 ? 50 : 10); // even faster counting, slows down after 90

        return () => clearInterval(interval);
    }, [value, onComplete]);

    const defaultCounterStyle = {
        fontSize,
        gap: gap,
        borderRadius: borderRadius,
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
        color: textColor,
        fontWeight: fontWeight,
    };
    const defaultTopGradientStyle = {
        height: gradientHeight,
        background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
    };
    const defaultBottomGradientStyle = {
        height: gradientHeight,
        background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
    };

    return (
        <div className="count-container">
            <div className="counter-container" style={containerStyle}>
                <div
                    className="counter-counter"
                    style={{ ...defaultCounterStyle, ...counterStyle }}
                >
                    {places.map((place) => (
                        <Digit
                            key={place}
                            place={place}
                            value={value}
                            height={height}
                            digitStyle={digitStyle}
                        />
                    ))}
                </div>
                <div className="gradient-container">
                    <div
                        className="top-gradient"
                        style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}
                    ></div>
                    <div
                        className="bottom-gradient"
                        style={
                            bottomGradientStyle
                                ? bottomGradientStyle
                                : defaultBottomGradientStyle
                        }
                    ></div>
                </div>
            </div>
        </div>
    );
}
