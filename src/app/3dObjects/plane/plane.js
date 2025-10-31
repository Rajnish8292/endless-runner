import * as THREE from "three";
import LoadPlane from "./loadPlane";

class Plane extends THREE.Group {
  constructor() {
    super();
    this.boundingBox = new THREE.Box3();

    // loading plane model
    LoadPlane.then((plane) => {
      this.add(plane);

      // Update transforms AFTER adding to scene
      plane.updateMatrixWorld(true);
      this.updateMatrixWorld(true);

      // Compute bounding box after everything is set up
      const box = new THREE.Box3();

      plane.traverse((child) => {
        if (child.isMesh && child.geometry) {
          // Ensure geometry bounds exist
          child.castShadow = true;
          child.receiveShadow = true;
          if (!child.geometry.boundingBox) {
            child.geometry.computeBoundingBox();
          }
          // Compute mesh bounding box in world space
          const childBox = new THREE.Box3().setFromObject(child);
          box.union(childBox);
        }
      });

      this.boundingBox.copy(box);
    });

    // this.rotation.y = Math.PI / 2;
    this.position.set(0, 1, 0);
  }

  update() {
    // Update plane position based on velocity
    this.rotation.z *= 0.95; // Dampen rotation over time
  }

  rotateRight() {
    this.rotation.z += (-Math.PI / 4 - this.rotation.z) * 0.4 ** 3;
  }
  rotateLeft() {
    this.rotation.z += (Math.PI / 4 - this.rotation.z) * 0.4 ** 3;
  }
  getBoundingBox() {
    // Update matrix before computing bounds
    this.updateMatrixWorld(true);
    return this.boundingBox.clone().applyMatrix4(this.matrixWorld);
  }
}

export default Plane;
