import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Count from '../Count/Count'
import "./Landing.css";

function Landing({ isComplete, setIsComplete }) {

    const AnimEnd = () => {
        const time = setTimeout(() => {
            setIsComplete(true);
        }, 1800);

        return () => {
            clearTimeout(time);
        }
    }

    return (
        <>
            <div className="top-path"></div>

            <AnimatePresence>
                {!isComplete && (
                    <motion.div
                        className="loader"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1 } }}
                    >
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Count
                                from={0}
                                to={101}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                                onEnd={() => AnimEnd()}
                            />
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {isComplete && (
                <motion.div
                    className="main-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                </motion.div>
            )}
        </>
    );
}

export default Landing;
