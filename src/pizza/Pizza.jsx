import PizzaModel from './PizzaModel'
import ChiliFlake from './ChiliFlake'
import GreenPea from './GreenPea'
import { useContext, useRef, useState } from 'react';
import { useSpring, a } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import PizzaBox from './PizzaBox';
import DroneHanger from './DroneHanger';
import { PizzaContext } from './CustumizerContext';

const Pizza = () => {
    const { state, dispatch } = useContext(PizzaContext)
    const { addedIngredients, isPacked, confirmOrder, selectedSize, spinTrigger, } = state
    let targetScale = isPacked ? 0.5 : selectedSize.scale
    const [rotationAmount, setRotationAmount] = useState(0);
    const meshRef = useRef();

    // Smoothly animate the scale
    const { scale } = useSpring({ scale: targetScale, config: { tension: 200, friction: 20 } });

    useFrame((state, delta) => {
        if (spinTrigger) {
            const newRotation = rotationAmount + delta * Math.PI * 3; // full rotation per second
            setRotationAmount(newRotation);
            meshRef.current.rotation.y += delta * Math.PI * 2;

            // Check if we've completed a full spin
            if (newRotation >= Math.PI * 1.5) {
                meshRef.current.rotation.y = 0; // reset
                setRotationAmount(0);
                dispatch({ type: "STOP_SPEEN" })
            }
        }
        if (confirmOrder) {
            const t = state.clock.elapsedTime;
            meshRef.current.rotation.z = Math.sin(t * 1) * 0.05;
            meshRef.current.rotation.x = Math.cos(t * 1) * 0.05;
        }
    });


    return (
        <>
            <a.group ref={meshRef} scale={scale} position={[0, 0, -0.2]} >
                <DroneHanger orderConfirm={confirmOrder} />
                <PizzaBox isPacked={isPacked} />
                <PizzaModel rotation={[0, Math.PI, 0]}
                    showood_palate={addedIngredients.includes("wood_palate")}
                    showOlives={addedIngredients.includes("olives")}
                    showOnion={addedIngredients.includes("onion")}
                />
                <ChiliFlake show={addedIngredients.includes("chilli")} />
                <GreenPea show={addedIngredients.includes("peas")} />
            </a.group>
        </>
    )
}

export default Pizza
