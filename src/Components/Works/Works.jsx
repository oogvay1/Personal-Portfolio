import { forwardRef, useEffect, useRef } from 'react';
import CountUp from '../Counte/Couter';
import Screw from '../Screw/Screw';
import { projects } from '../ProjectList/ProjectList';
import './Works.css';
import { motion, useScroll, useTransform } from "framer-motion";

const Works = forwardRef(function Works(props, ref) {

    const main = useRef(null);
    const { scrollYProgress } = useScroll({ target: main })

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"])

    return (
        <>
            <div ref={main} className="works">
                <div className="works-container">

                    <motion.div className="work-imgs-container" style={{ x }} >

                        {projects.map((project, index) => (
                            <div key={index} className="screw-img-container">
                                <div
                                    ref={(el) => {
                                        if (ref?.current) ref.current[index] = el;
                                    }}
                                    className="hover-img-content"
                                >
                                    <Screw src={`src/assets/Project${index + 1}.png`} />
                                    <div className="project-date">
                                        <p>{project.name}</p>
                                        <p>{project.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div >
        </>
    );
});

export default Works
