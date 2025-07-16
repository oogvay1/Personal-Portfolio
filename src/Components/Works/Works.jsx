import { useEffect } from 'react';
import CountUp from '../Counte/Couter';
import Counter from '../Countes/Coutes';
import Screw from '../Screw/Screw';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css'

function Works() {

    useEffect(() => {
        ScrollTrigger.create({
            trigger: '#trigger',
            start: '20% center',
            onEnter: () => {
                gsap.to('body', { backgroundColor: 'black', color: 'white', duration: 0.5 });
            },
            onLeaveBack: () => {
                gsap.to('body', { backgroundColor: '#F3F3F3', color: 'black', duration: 0.5 });
            }
        });
    }, []);

    return (
        <>
            <div id='trigger' className="works-container">
                <div className="works-content">

                    <div className="works-title">
                        <h1>WORKS</h1>
                        <CountUp
                            from={0}
                            to={6}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text"
                        />
                    </div>

                    <div className="works-imgs">
                        <div className="work-container">
                            <div className="screw-img-container">
                                <Screw src="src/assets/Project1.png" />
                            </div>
                            <div className="screw-img-container">
                                <Screw src="src/assets/Project2.png" />
                            </div>
                            <div className="screw-img-container">
                                <Screw src="src/assets/Project3.png" />
                            </div>
                            <div className="screw-img-container">
                                <Screw src="src/assets/Project4.png" />
                            </div>
                            <div className="screw-img-container">
                                <Screw src="src/assets/Project5.png" />
                            </div>
                            <div className="screw-img-container">
                                <Screw src="src/assets/Project7.png" />
                            </div>
                            <div className="screw-img-container">
                                <Screw src="src/assets/Project8.png" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Works
