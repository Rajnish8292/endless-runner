import { resolve } from "styled-jsx/css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const LoadPlane = new Promise((resolve, reject) => {
  const loader = new GLTFLoader();
  loader.load(
    "/model/sopwith.glb",
    (gltf) => {
      const plane = gltf.scene;
      plane.scale.set(0.01, 0.01, 0.01);
      plane.rotateY(Math.PI);
      resolve(plane);
    },
    undefined,
    (error) => {
      reject(error);
    }
  );
});

export default LoadPlane;
