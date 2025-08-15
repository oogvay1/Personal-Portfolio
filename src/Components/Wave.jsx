import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const WaveMaterial = shaderMaterial(
    { iTime: 0, iResolution: new THREE.Vector2() },
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    `
    uniform float iTime;
    uniform vec2 iResolution;
    varying vec2 vUv;

    float rand(float n) { return fract(sin(n) * 43758.5453123); }

    void main() {
        vec2 uv = vUv;

        float totalWaves = 0.8;
        uv.x += 0.2 / totalWaves;
        float x = uv.x * totalWaves * 2.0 * 3.14159265359;
        float waveIndex = floor(uv.x * totalWaves);

        float seed = waveIndex;
        float phase = rand(seed * 7.0) * 6.28318530718;
        float wobbleFreq = mix(0.25, 0.65, rand(seed * 5.0));
        float wobble = sin(iTime * wobbleFreq + phase) * 0.02;
        float baseAmp = (waveIndex == 0.0) ? 0.15 : 0.07;
        float ampPulse = 0.03 * sin(iTime * (1.0 + rand(seed * 3.0)) + phase);
        float amplitude = baseAmp + ampPulse + wobble;
        float wave = sin(x + sin(iTime * 0.3 + seed * 1.7)) * amplitude;

        uv.y += wave - 0.35;

        // Main wave color (light gray)
        vec3 mainColor = vec3(0.9529, 0.9529, 0.9529); // #F3F3F3
        vec3 edgeColor = vec3(1.0); // white edges

        // Calculate distance from center for horizontal blur/edge fade
        float dist = abs(uv.x - 0.5);
        float edgeFactor = smoothstep(0.0, 0.1, dist); // adjust 0.1 for edge thickness

        vec3 waveColor = mix(edgeColor, mainColor, edgeFactor);

        // Bottom transparency
        float alpha = smoothstep(0.0, 0.15, uv.y); // fade bottom
        gl_FragColor = vec4(waveColor, alpha);
    }
    `
);

extend({ WaveMaterial });

export default function Wave() {
    const ref = useRef();
    useFrame(({ clock, size }) => {
        if (ref.current) {
            ref.current.iTime = clock.getElapsedTime();
            ref.current.iResolution.set(size.width, size.height);
        }
    });

    return (
        <mesh scale={[7.6, 5, 1]}>
            <planeGeometry args={[2, 2]} />
            <waveMaterial ref={ref} transparent />
        </mesh>
    );
}
