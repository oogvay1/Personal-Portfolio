import { forwardRef, useEffect, useRef } from 'react';
import CountUp from '../Counte/Couter';
import Counter from '../Countes/Coutes';
import Screw from '../Screw/Screw';
import gsap from 'gsap';
import { projects } from '../ProjectList/ProjectList';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css'

const Works = forwardRef(function Works(props, ref) {

    useEffect(() => {
        ScrollTrigger.create({
            trigger: '#trigger',
            start: '10% center',
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
                                <div ref={(el) => ref.current[0] = el} className="hover-img-content">
                                    <Screw src="src/assets/Project1.png" />
                                    <div className="project-date">
                                        <p>{projects[0].name}</p>
                                        <p>{projects[0].date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="screw-l">
                                <div ref={(el) => ref.current[1] = el} className="hover-img-content">
                                    <Screw src="src/assets/Project3.png" />
                                    <div className="project-date">
                                        <p>{projects[3].name}</p>
                                        <p>{projects[3].date}</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: "100px" }} className="screw-img-container">
                                <div ref={(el) => ref.current[2] = el} className="hover-img-content">
                                    <Screw src="src/assets/Project2.png" />
                                    <div className="project-date">
                                        <p>{projects[2].name}</p>
                                        <p>{projects[2].date}</p>
                                    </div>
                                </div>
                            </div>

                            {/* {projects.map((el, index) => (
                                <div key={index} className={(el.isL && 'screw-img-container') || 'screw-l'}>
                                    <Screw src={el.src} />

                                    <div className="project-date">
                                        <p>{el.name}</p>
                                        <p>{el.date}</p>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                        <div className="work-container">
                            <div className="screw-img-container">
                                <div ref={(el) => ref.current[3] = el} className="hover-img-content">
                                    <Screw src="src/assets/Project4.png" />
                                    <div className="project-date">
                                        <p>{projects[4].name}</p>
                                        <p>{projects[4].date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="screw-l">
                                <div ref={(el) => ref.current[4] = el} className="hover-img-content">
                                    <Screw src="src/assets/Project7.png" />
                                    <div className="project-date">
                                        <p>{projects[6].name}</p>
                                        <p>{projects[6].date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="screw-img-container">
                                <div ref={(el) => ref.current[5] = el} className="hover-img-content">
                                    <Screw src="src/assets/Project5.png" />
                                    <div className="project-date">
                                        <p>{projects[5].name}</p>
                                        <p>{projects[5].date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
)

export default Works
