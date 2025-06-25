import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 1.7, 5], fov: 75 }}>
      <Scene />
    </Canvas>
  );
}
