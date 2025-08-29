import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";


export default function PizzaBox({ isPacked }) {
    const [rotate, setRotate] = useState(false);
    const boardThickness = 0.05
    const boxSize = 4.7
    const lidRef = useRef();
    const pizzaTop = useTexture('/pizzaTop.png')

    const { position } = useSpring({
        position: isPacked ? [0, 0, 0] : [0, 0, -10],
        config: { tension: 170, friction: 26 },
        onRest: () => {
            setRotate(prev => !prev); // trigger rotation after slide
        }
    });

    // Spring for red box rotation
    const { rotation } = useSpring({
        rotation: rotate ? [0, 0, 0] : [-Math.PI, 0, 0], // rotate 180° around x
        config: { duration: 500 }
    });
    return (
        <a.group position={position} visible={isPacked}>
            {/* Base */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[boxSize, boardThickness, boxSize]} />
                <meshStandardMaterial color="white" />
            </mesh>



            {/* Back side */}
            <mesh position={[0, 0.46, -2.35]}>
                <boxGeometry args={[boxSize, 1, boardThickness]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Left side */}
            <mesh position={[-2.35, 0.46, 0]}>
                <boxGeometry args={[boardThickness, 1, boxSize]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Right side */}
            <mesh position={[2.35, 0.46, 0]}>
                <boxGeometry args={[boardThickness, 1, boxSize]} />
                <meshStandardMaterial color="white" />
            </mesh>

            {/* Lid */}
            <a.group position={[0, 0.95, -2.35]} ref={lidRef} rotation={rotation}   >

                {/* Front side */}
                <mesh position={[0, -0.49, 4.65]}>
                    <boxGeometry args={[boxSize, 1, boardThickness]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                <mesh position={[0, 0, 2.31]}>
                    <boxGeometry args={[boxSize, boardThickness, boxSize]} />
                    <meshStandardMaterial map={pizzaTop} />

                </mesh>
            </a.group>
        </a.group >
    );
}
