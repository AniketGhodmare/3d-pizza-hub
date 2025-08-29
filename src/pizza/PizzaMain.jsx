import { Environment, Loader, OrbitControls, } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { memo, Suspense } from 'react';
import Pizza from './Pizza';
import Animated_drone_model from './animated_drone_model';
import Colony from './Colony';

// const Animated_drone_model = lazy(() => import("./animated_drone_model"))
// const Colony = lazy(() => import("./Colony"))

const PizzaMain = ({ orderConfirm }) => {

    return (
        <>
            <Canvas camera={{ position: [0, 5, 0], }} style={{ width: '100%', height: '100%' }} >
                {/* <axesHelper size={50} position={[0, 0.5, 0]} /> */}
                <Environment preset='apartment' />

                {/* Lights */}
                <ambientLight intensity={0.75} color={0xffffee} />
                <Suspense fallback={null}
                // fallback={
                //     <Html
                //         occlude transform>
                //         <div style={{ background: 'white', height: "100%", width: "100%", padding: '100px', borderRadius: '5px' }}>
                //             <h1>Hello from HTML!</h1>
                //             <p>This is embedded within the 3D scene.</p>
                //         </div>
                //     </Html>
                // }
                >

                    {orderConfirm && (
                        <group>
                            <Animated_drone_model scale={15} position={[0, -1, -0.3]} />
                            <Colony />
                        </group>
                    )}

                    <Pizza />
                </Suspense>

                <OrbitControls
                    // target={[0, 0, 0]}
                    enablePan={false}
                    enableZoom={orderConfirm}
                    minDistance={orderConfirm ? 1 : 4.5}
                    maxDistance={orderConfirm ? 9 : 4.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 360}
                />
                {/* <Stats /> */}
            </Canvas>
            <Loader />
        </>
    )
}

export default memo(PizzaMain)
// questions
//  color={`hsl(${Math.random() * 20}, 80%, 50%)`} // how it generate random reddish hue
// context api