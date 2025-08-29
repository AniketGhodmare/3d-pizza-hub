import { useGLTF } from '@react-three/drei';
import { memo } from 'react';

const PizzaModel = ({ showOlives, showOnion, showood_palate, ...props }) => {
    const { nodes, materials } = useGLTF('./3d_models/Pizza_GLTF_.glb');
    return (
        <group {...props} dispose={null}>
            <mesh castShadow receiveShadow geometry={nodes.Base.geometry} material={materials.Pizza} />
            <mesh visible={showOlives} castShadow receiveShadow geometry={nodes.Olives_.geometry} material={materials.Pizza} />
            <mesh visible={showOnion} castShadow receiveShadow geometry={nodes.Toppings.geometry} material={materials.Pizza} />
            <mesh visible={showood_palate} castShadow receiveShadow geometry={nodes.wood_palate.geometry} material={materials.Pizza} />
        </group>
    )
}
useGLTF.preload('./3d_models/Pizza_GLTF_.glb');
export default memo(PizzaModel) 
