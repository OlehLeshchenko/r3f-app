import { useRapier, RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Player() {
  const { camera } = useThree();
  const rigidBody = useRef();
  const yawRef = useRef();
  const pitchRef = useRef();

  const keys = useRef({});
  const isMouseDown = useRef(false);
  const speed = 5;

  useEffect(() => {
    const onKeyDown = (e) => (keys.current[e.key.toLowerCase()] = true);
    const onKeyUp = (e) => (keys.current[e.key.toLowerCase()] = false);
    const onMouseDown = () => (isMouseDown.current = true);
    const onMouseUp = () => (isMouseDown.current = false);
    const onMouseMove = (e) => {
      if (!isMouseDown.current) return;
      yawRef.current.rotation.y -= e.movementX * 0.002;
      pitchRef.current.rotation.x -= e.movementY * 0.002;
      pitchRef.current.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, pitchRef.current.rotation.x)
      );
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useFrame((_, delta) => {
    const rb = rigidBody.current;
    if (!rb || !yawRef.current) return;

    const direction = new THREE.Vector3();
    if (keys.current["w"]) direction.z -= 1;
    if (keys.current["s"]) direction.z += 1;
    if (keys.current["a"]) direction.x -= 1;
    if (keys.current["d"]) direction.x += 1;

    if (direction.length() === 0) {
      rb.setLinvel({ x: 0, y: rb.linvel().y, z: 0 }, true);
      return;
    }

    direction
      .normalize()
      .applyEuler(yawRef.current.rotation)
      .multiplyScalar(speed);

    rb.setLinvel({ x: direction.x, y: rb.linvel().y, z: direction.z }, true);
  });

  return (
    <RigidBody
      ref={rigidBody}
      colliders={false}
      mass={1}
      enabledRotations={[false, false, false]}
      position={[0, 1.1, 5]}
    >
      <CapsuleCollider args={[0.35, 0.7]} />

      <group ref={yawRef} position={[0, 0.7, 0]}>
        <group ref={pitchRef}>
          <primitive object={camera} />
        </group>
      </group>
    </RigidBody>
  );
}
