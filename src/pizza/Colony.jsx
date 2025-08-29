import { useRef, useMemo } from "react";
import ColonyModel from "./ColonyModel";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const Colony = () => {
    const groupRef = useRef();
    const skyline = useTexture("/city_skyline.jpg");

    // ✅ Memoize background sphere + skyline planes
    const background = useMemo(() => (
        <>
            <mesh position={[0, 15, 0]}>
                <sphereGeometry args={[30, 32, 32]} />
                <meshStandardMaterial map={skyline} color="white" side={THREE.BackSide} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.5, 5, 20]}>
                <planeGeometry args={[40, 15]} />
                <meshStandardMaterial map={skyline} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]} position={[-6.5, 5, -20]}>
                <planeGeometry args={[40, 15]} />
                <meshStandardMaterial map={skyline} />
            </mesh>
        </>
    ), [skyline]);

    // ✅ Array of colony positions instead of writing each manually
    const colonyPositions = useMemo(() => [44, 33, 22, 11, 0, -11, -22, -33], []);

    // ✅ Infinite scrolling effect
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.position.z -= 15 * delta;
            if (groupRef.current.position.z <= 15) {
                groupRef.current.position.z = 30; // wrap smoothly
            }
        }
    });

    return (
        <group>
            {background}
            <group ref={groupRef} position={[-4, -3, 30]} rotation={[0, Math.PI / 2, 0]}>
                {colonyPositions.map((x, i) => <ColonyModel key={x + i} scale={0.7} position={[x, 0, 0]} />)}
            </group>
        </group>
    );
};

export default Colony;
