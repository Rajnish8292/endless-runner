import { resolve } from "styled-jsx/css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const LoadPlane = new Promise((resolve, reject) => {
  const loader = new GLTFLoader();
  loader.load(
    "/model/scene.gltf",
    (gltf) => {
      const plane = gltf.scene;
      plane.scale.set(0.01, 0.01, 0.01);
      resolve(plane);
    },
    undefined,
    (error) => {
      reject(error);
    }
  );
});

export default LoadPlane;
