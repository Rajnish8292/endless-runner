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

    this.position.set(0, 5, -10);
    this.planePropeller = null;
    this.propellerRotationSpeed = 0.5;
    this.flaps = null;
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
  moveUp() {
    const targetY = 25;
    this.position.y += (targetY - this.position.y) * 0.4 ** 3;
  }
  moveDown() {
    const targetY = 2;
    this.position.y += (targetY - this.position.y) * 0.4 ** 3;
  }
  rotateUp() {
    const targetRotation = Math.PI / 8;
    this.rotation.x += (targetRotation - this.rotation.x) * 0.4 ** 2;
  }
  rotateDown() {
    const targetRotation = -Math.PI / 8;
    this.rotation.x += (targetRotation - this.rotation.x) * 0.4 ** 2;
  }
  rotateXNormal() {
    const targetRotation = 0;
    this.rotation.x += (targetRotation - this.rotation.x) * 0.4 ** 3;
  }
  rotatePropeller() {
    if (this.propellerRotationSpeed <= 0) this.propellerRotationSpeed = 0;
    if (!this.planePropeller) {
      if (this.children[0]) {
        this.traverse((node) => {
          if (node.name.includes("Plane012_wood001_0")) {
            this.planePropeller = node;
          }
        });
      }
    } else {
      this.planePropeller.rotation.y += this.propellerRotationSpeed;
    }
  }

  checkFlaps() {
    if (!this.flaps) {
      if (this.children[0]) {
        this.traverse((node) => {
          if (node.name.includes("Plane003_back_0")) {
            this.flaps = node;
            return true;
          }
        });
      }
    } else {
      return true;
    }
    return false;
  }
  flapsUp() {
    if (this.checkFlaps() && this.flaps) {
      this.flaps.rotation.x = Math.PI / 8;
    }
  }
  flapsDown() {
    if (this.checkFlaps() && this.flaps) {
      this.flaps.rotation.x = -Math.PI / 8;
    }
  }
  flapsNormal() {
    if (this.checkFlaps() && this.flaps) {
      this.flaps.rotation.x = 0;
    }
  }
  getBoundingBox() {
    // Update matrix before computing bounds
    this.updateMatrixWorld(true);
    // this.updateWorldMatrix(true, true);
    return this.boundingBox.clone().applyMatrix4(this.matrixWorld);
  }
}

export default Plane;
