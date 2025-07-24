import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Marquee.css';

function Marquee() {
    const arrows = useRef([]);
    const lastScrollY = useRef(window.pageYOffset);
    const marqueeTween = useRef(null);
    const scrollDirection = useRef(1);

    useEffect(() => {
        marqueeTween.current = gsap.to('.marquee-part', {
            xPercent: -100,
            repeat: -1,
            ease: 'none',
            duration: 10,
        });

        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;
            const newDirection = currentScrollY > lastScrollY.current ? 1 : -1;

            if (newDirection !== scrollDirection.current) {
                scrollDirection.current = newDirection;
                marqueeTween.current.timeScale(newDirection);

                arrows.current.forEach(arrow => {
                    if (arrow) arrow.classList.toggle('active', newDirection === -1);
                });
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            marqueeTween.current.kill();
        };
    }, []);

    return (
        <div className="marquee-container">
            <div className="marquee">
                <div className="marquee-inner">
                    {[...Array(6)].map((_, i) => (
                        <div className="marquee-part" key={i}>
                            creative • modern • skilled
                            <div ref={el => arrows.current[i] = el} className="marquee-arrow">
                                <i className="ri-arrow-right-long-line"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Marquee
