import * as THREE from "three";
import LoadPlane from "./loadPlane";

class Plane extends THREE.Group {
  constructor() {
    super();
    LoadPlane.then((plane) => {
      this.add(plane);
    });
    this.rotation.y = Math.PI;
    this.velocity = { x: 0, y: 0, z: 0 };
    this.position.set(0, 0.5, 0);
  }

  update() {
    // Update plane position based on velocity
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
    this.rotation.z *= 0.95; // Dampen rotation over time
  }

  rotateRight() {
    this.rotation.z += (Math.PI / 4 - this.rotation.z) * 0.4 ** 3;
  }
  rotateLeft() {
    this.rotation.z += (-Math.PI / 4 - this.rotation.z) * 0.4 ** 3;
  }

  moveLeft() {
    this.velocity.x = 0;
  }
  moveRight() {}
}

export default Plane;
