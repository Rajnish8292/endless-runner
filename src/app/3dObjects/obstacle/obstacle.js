import * as THREE from "three";

class Obstacle extends THREE.Mesh {
  constructor(geometry, material) {
    super(geometry, material);
    this.castShadow = true;
    this.receiveShadow = true;
    this.position.set(0, 0, -60);

    this.speed = 0.5; // Target positions for smooth movement

    this.targetX = this.position.x;
    this.targetZ = this.position.z;

    this.smoothFactor = 0.4; // Adjust for smoothing (smaller = smoother)
  }

  update() {
    // Reset position if obstacle passes z=10
    if (this.position.z >= 10) {
      this.targetZ = -60; // Reset target position
    }
    this.targetZ += this.speed; // Smoothly interpolate toward target positions

    this.position.x +=
      (this.targetX - this.position.x) * this.smoothFactor ** 3;
    this.position.z +=
      (this.targetZ - this.position.z) * this.smoothFactor ** 3;
  }

  moveLeft() {
    this.targetX += this.speed;
  }

  moveRight() {
    this.targetX -= this.speed;
  }
}

export default Obstacle;
