import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Player() {
  const body = useRef();
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(() => {
    const velocity = { x: 0, z: 0 };
    if (keys.current["w"]) velocity.z -= 1;
    if (keys.current["s"]) velocity.z += 1;
    if (keys.current["a"]) velocity.x -= 1;
    if (keys.current["d"]) velocity.x += 1;

    const impulse = new THREE.Vector3(velocity.x, 0, velocity.z)
      .normalize()
      .multiplyScalar(0.1);

    if (body.current) {
      // const rot = body.current.rotation(); 
      body.current.applyImpulse(impulse, true);
    }
  });

  return (
    <RigidBody
      colliders="capsule"
      position={[0, 1, 0]}
      mass={1}
      ref={body}
    >
      <mesh>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </RigidBody>
  );
}
