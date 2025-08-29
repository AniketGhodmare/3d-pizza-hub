const DroneHanger = ({ orderConfirm }) => {

    const IronRod = (props) => {
        return (
            <mesh {...props} >
                <boxGeometry args={[0.07, 1, 0.2]} />
                <meshStandardMaterial color={"black"} roughness={0.1} metalness={0.5} />
            </mesh>
        )
    }
    return (
        <group visible={orderConfirm}>
            <IronRod position={[2.4, 0.5, 0]} />
            <IronRod position={[-2.4, 0.5, 0]} />
            <IronRod position={[0, 0.5, 2.4]} rotation={[0, Math.PI / 2, 0]} />
            <IronRod position={[0, 0.5, -2.4]} rotation={[0, Math.PI / 2, 0]} />
            <IronRod scale={[1, 4.87, 1]} position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]} />
            <IronRod scale={[1, 4.87, 1]} position={[0, 1, 0]} rotation={[Math.PI / 2, Math.PI / 2, 0]} />
            <IronRod
                scale={[3, 2, 1]}
                position={[0, 2, 0]}
            //  rotation={[Math.PI / 2, Math.PI / 2, 0]}
            />


        </group>
    )
}

export default DroneHanger
