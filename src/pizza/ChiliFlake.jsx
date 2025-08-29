import { memo } from "react";

const ChiliFlake = ({ show }) => {
    const randomFlake = Array.from({ length: 150 }, (_, i) => [
        (Math.random() - 0.5) * 2.7,
        0.45,
        (Math.random() - 0.5) * 2.7,
    ]);
    return (

        <group visible={show}>
            {randomFlake.map((pos, i) =>
                <mesh key={`pea-${pos[0]}-${i}`}
                    position={pos}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI,
                    ]}
                    scale={[0.05, 0.01, 0.05]} // flat + small
                >
                    <sphereGeometry args={[1, 6, 6]} /> {/* Low poly for irregular shape */}
                    <meshStandardMaterial
                        color={`hsl(${Math.random() * 20}, 80%, 50%)`} // random reddish hue
                        roughness={0.8}
                        metalness={0.2}
                    />
                </mesh>)
            }
        </group>
    )
}

export default memo(ChiliFlake) 
