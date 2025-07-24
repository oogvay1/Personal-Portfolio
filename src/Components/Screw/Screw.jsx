import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Screw.css'

gsap.registerPlugin(ScrollTrigger)

export default function Screw({ src }) {
    const proxy = useRef({ skew: 0 })
    const imgRef = useRef(null)



    return (
        <img
            className="skew-img"
            src={src}
            alt="Skewed"
            ref={imgRef}
        />
    )
}
