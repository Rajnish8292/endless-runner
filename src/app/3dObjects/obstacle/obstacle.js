import * as THREE from "three";

class Obstacle extends THREE.Mesh {
  constructor(geometry, material) {
    super(geometry, material);
    this.castShadow = true;
    this.receiveShadow = true;
    this.position.z = -100 + Math.random() * 100;
    this.position.x = -50 + Math.random() * 100;

    this.speed = 0.5; // Target positions for smooth movement

    this.targetX = this.position.x;
    this.targetZ = this.position.z;

    this.smoothFactor = 0.4;
    this.name = null;
  }

  update() {
    // Reset position if box goes out of the boundary
    if (
      this.position.x >= 50 ||
      this.position.x <= -50 ||
      this.position.z >= 50
    ) {
      this.position.z = -100 + Math.random() * 40;
      this.position.x = -50 + Math.random() * 100;
      this.targetX = this.position.x;
      this.targetZ = this.position.z;
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
