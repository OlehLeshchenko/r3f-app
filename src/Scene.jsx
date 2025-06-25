import * as THREE from "three";
import { FirstPersonControls } from "@react-three/drei";

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 5, 5]} intensity={1} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      <primitive object={new THREE.GridHelper(100, 100)} />

      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <primitive object={new THREE.AxesHelper(5)} />

      <FirstPersonControls
        movementSpeed={3}
        lookSpeed={0.1}
      />
    </>
  );
}
