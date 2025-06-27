import { useEffect } from 'react';
import './Navigation.css'
import { useState } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';

function Navigation() {

    let [time, setTime] = useState(new Date().toLocaleTimeString());
    let [date, setDate] = useState(new Date().getFullYear());

    useEffect(() => {

        const inter = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            setDate(new Date().getFullYear())
        }, 100)

        return () => clearInterval(inter)
    }, []);

    const itemsRef = useRef([]);

    useEffect(() => {
        itemsRef.current.forEach(item => {
            const overlay = item.querySelector(".overlay");
            let lastY = 0;

            const handleMouseEnter = (e) => {
                const bounds = item.getBoundingClientRect();
                const mouseY = e.clientY - bounds.top;
                const fromTop = mouseY < bounds.height / 2;

                gsap.set(overlay, {
                    top: fromTop ? "-100%" : "100%",
                });

                gsap.to(overlay, {
                    top: "0%",
                    duration: .2,
                    ease: [.48, .15, .25, .96],
                });

                item.querySelector("span").style.color = "black";
                lastY = fromTop ? "top" : "bottom";
            };

            const handleMouseLeave = (e) => {
                const bounds = item.getBoundingClientRect();
                const mouseY = e.clientY - bounds.top;
                const toTop = mouseY < bounds.height / 2;

                let exitDirection;

                if (lastY === "top" && toTop) exitDirection = "-100%";
                else if (lastY === "top" && !toTop) exitDirection = "100%";
                else if (lastY === "bottom" && toTop) exitDirection = "-100%";
                else exitDirection = "100%"; 

                gsap.to(overlay, {
                    top: exitDirection,
                    duration: .2,
                    ease: [.48, .15, .25, .96],
                });

                item.querySelector("span").style.color = "white";
            };

            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);

            // Cleanup
            return () => {
                item.removeEventListener("mouseenter", handleMouseEnter);
                item.removeEventListener("mouseleave", handleMouseLeave);
            };
        });
    }, []);

    const works = ["HOME", "ABOUT", "CONTACT", "WORKS"];


    return (
        <>
            <div className="navigation">
                <div className="nav-text">
                    {works.map((work, i) => (
                        <h1
                            className="navigator"
                            key={i}
                            ref={(el) => (itemsRef.current[i] = el)}
                        >
                            <span>{work}</span>
                            <div className="overlay"></div>
                        </h1>
                    ))}
                </div>


                <div className="nav-line"></div>

                <div className="time">
                    <p>&copy; {date}</p>
                    <p>Uzbekistan {time}</p>
                </div>

                {/* <spline-viewer className="spline" url="https://prod.spline.design/zcV76R-jCGhAadMc/scene.splinecode"></spline-viewer> */}
            </div>
        </>
    );
}

export default Navigation
