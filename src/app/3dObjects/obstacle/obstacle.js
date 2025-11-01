import * as THREE from "three";

class Obstacle extends THREE.Mesh {
  constructor(geometry, material) {
    super(geometry, material);
    this.castShadow = true;
    this.receiveShadow = true;
    this.position.z = -100 + Math.random() * 100;
    this.position.x = -50 + Math.random() * 100;
    this.position.y = 5;
    this.speed = 0.2 + Math.random() * 0.5;

    this.velocityY = 0.25 + Math.random() * 0.3;
    this.gravity = -0.01;
    this.groundY = 2;
    this.bounceFactor = 0.9;

    this.targetX = this.position.x;
    this.targetZ = this.position.z;

    this.smoothFactor = 0.4;
    this.name = `obstacle-${[9, 9, 9, 9]
      .map((e) => Math.round(Math.random() * e))
      .join("")}`;
  }

  update(obstacles) {
    // Reset position if box goes out of the boundary
    if (
      this.position.x >= 50 ||
      this.position.x <= -50 ||
      this.position.z >= 50
    ) {
      // re-name obstacle when it goes out of boundary
      this.name = `obstacle-${[9, 9, 9, 9]
        .map((e) => Math.round(Math.random() * e))
        .join("")}`;

      const { x, z } = this.getNonOverlappingPosition(obstacles);

      this.position.z = z;
      this.position.x = x;
      this.targetX = this.position.x;
      this.targetZ = this.position.z;
      this.position.y = 5;
      this.speed = 0.2 + Math.random() * 0.5;

      this.velocityY = 0.25 + Math.random() * 0.3;
    }
    this.targetZ += this.speed; // Smoothly interpolate toward target positions
    this.position.x +=
      (this.targetX - this.position.x) * this.smoothFactor ** 3;
    this.position.z +=
      (this.targetZ - this.position.z) * this.smoothFactor ** 3;

    this.velocityY += this.gravity;
    this.position.y += this.velocityY;

    if (this.position.y <= this.groundY) {
      this.position.y = this.groundY;
      this.velocityY = -this.velocityY * this.bounceFactor;
    }
  }

  getNonOverlappingPosition(obstacles, minDistance = 5) {
    let x, z;
    let safe = false;

    while (!safe) {
      x = -50 + Math.random() * 100;
      z = -100 + Math.random() * 50;

      safe = true;
      for (let obstacle of obstacles) {
        const dx = obstacle.position.x - x;
        const dz = obstacle.position.z - z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < minDistance) {
          safe = false;
          break;
        }
      }
    }

    return { x, z };
  }

  moveLeft() {
    this.targetX += this.speed;
  }

  moveRight() {
    this.targetX -= this.speed;
  }
}

export default Obstacle;
