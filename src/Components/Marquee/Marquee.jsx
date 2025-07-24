import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import './Marquee.css';

function Marquee() {
    const arrows = useRef([]);
    const tweenRef = useRef(null);
    const lastScrollY = useRef(window.pageYOffset + 1);

    useEffect(() => {
        gsap.set('.marquee-inner', { xPercent: -50 });

        tweenRef.current = gsap.to('.marquee-part', {
            xPercent: -100,
            repeat: -1,
            ease: 'linear',
            duration: 5,
        });

        const handleScroll = () => {
            const scrollY = window.pageYOffset + 1;
            const scrollingDown = scrollY > lastScrollY.current;

            if (tweenRef.current) {
                tweenRef.current.timeScale(scrollingDown ? 1 : -1);
            }

            arrows.current.forEach((arrow) => {
                if (arrow) {
                    arrow.classList.toggle('active', !scrollingDown);
                }
            });

            lastScrollY.current = scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>

            <div className="marquee-container">
                <div className="marquee">
                    <div className="marquee-inner">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="marquee-part">
                                creative • modern • skilled
                                <div
                                    ref={(el) => (arrows.current[index] = el)}
                                    className="marquee-arrow"
                                >
                                    <i className="ri-arrow-right-long-line"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Marquee;
