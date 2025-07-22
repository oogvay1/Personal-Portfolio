import useMousePosition from '../../Hooks/useGetMouse';
import { motion } from 'framer-motion';
import './MyGoal.css'
import { useState } from 'react';

function MyGoal() {

    const { x, y } = useMousePosition();
    const [isHovered, setIsHovered] = useState(false);
    const size = isHovered ? 400 : 40;

    return (
        <>
            <div className="my-goal-cover">

                <motion.div
                    className='mask'
                    animate={{
                        webkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                        webkitMaskSize: `${size}px`
                    }}
                    transition={{ type: "tween", ease: "backOut" }}
                >
                    <p>
                        Detail-driven.
                        I design bold, expressive interfaces&really good shit —
                        if the payment is equally good
                    </p>
                </motion.div>

                <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                    className='main-text-mask'>
                    
                </p>
            </div>
        </>
    );
}

export default MyGoal
