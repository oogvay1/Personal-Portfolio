import useMousePosition from '../../Hooks/useGetMouse';
import { motion } from 'framer-motion';
import './MyGoal.css'
import { useState } from 'react';

function MyGoal() {

    const { x, y } = useMousePosition();
    const [isHovered, setIsHovered] = useState(false);
    const size = isHovered ? 400 : 0;

    return (
        <>
            <div className="my-goal">
                <motion.div
                    className='mask'
                    animate={{
                        webkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                        webkitMaskSize: `${size}px`
                    }}
                    transition={{ type: "tween", ease: "backOut", duration: .5 }}
                >
                    <p>
                        I build full-stack websites from scratch for agencies and individuals — if the effort matches the reward.
                    </p>
                </motion.div>

                <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                    className='main-text-mask'>
                    Ꝅreative in frꙨnt-en₫ and back-en₫, ֎ usﭐng ͼutting-edꞡe teⴛ bꭎilt ꚍo l₳st ⇀ nꙨt to bɘ Ꞅewrꬸtten.
                </p>
            </div>
        </>
    );
}

export default MyGoal
