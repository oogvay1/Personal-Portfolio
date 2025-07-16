import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Screw.css'

gsap.registerPlugin(ScrollTrigger)

export default function Screw({ src }) {
    const proxy = useRef({ skew: 0 })
    const imgRef = useRef(null)

    useEffect(() => {
        const skewSetter = gsap.quickSetter(imgRef.current, 'skewY', 'deg')
        const clamp = gsap.utils.clamp(-10, 10)

        ScrollTrigger.create({
            onUpdate: (self) => {
                const skew = clamp(self.getVelocity() / -400);

                if (Math.abs(skew) > Math.abs(proxy.current.skew)) {
                    proxy.current.skew = skew
                    gsap.to(proxy.current, {
                        skew: 0,
                        duration: 0.4,
                        ease: 'power3.out',
                        overwrite: true,
                        onUpdate: () => skewSetter(proxy.current.skew),
                    })
                }
            }
        })
    }, [])

    return (
        <img
            className="skew-img"
            src={src}
            alt="Skewed"
            ref={imgRef}
        />
    )
}
