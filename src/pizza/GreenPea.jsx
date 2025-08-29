import { memo } from "react";

function GreenPea({ show }) {
    const randomPeas = Array.from({ length: 30 }, (_, i) => [
        (Math.random() - 0.5) * 2.7,
        0.45,
        (Math.random() - 0.5) * 2.7,
    ]);
    return (

        <group visible={show}>
            {randomPeas.map((pos, i) =>
                <mesh key={`pea-${pos[0]}-${i}`}
                    visible
                    userData={{ type: "greenPea" }}
                    position={pos}
                    rotation={[0, 0, 0]}
                >
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshStandardMaterial color="green" metalness={0.2} roughness={0.4} />
                </mesh>)
            }
        </group>
    );
}

export default memo(GreenPea)