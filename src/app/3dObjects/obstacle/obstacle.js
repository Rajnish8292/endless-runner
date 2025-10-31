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
    }
    this.targetZ += this.speed; // Smoothly interpolate toward target positions
    this.position.x +=
      (this.targetX - this.position.x) * this.smoothFactor ** 3;
    this.position.z +=
      (this.targetZ - this.position.z) * this.smoothFactor ** 3;
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
