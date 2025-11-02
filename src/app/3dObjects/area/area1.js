import * as THREE from "three";

import {
  ObstacleGroup1,
  ObstacleGroup2,
  ObstacleGroup3,
} from "../obstacleGroup/obstacleGroups";

class Area extends THREE.Group {
  constructor(groups) {
    super();

    const margin = 15;
    const width = 500;
    const height = 100;
    this.groups = groups;
    this.speed = 1;

    const placedPositions = [];

    function overlaps(x, z, group, positions) {
      const totalRadiusX = (group.width + margin * 2) / 2;
      const totalRadiusZ = (group.depth + margin * 2) / 2;
      for (const pos of positions) {
        const dx = pos.x - x;
        const dz = pos.z - z;
        const distX = totalRadiusX + (pos.group.width + margin * 2) / 2;
        const distZ = totalRadiusZ + (pos.group.depth + margin * 2) / 2;
        if (Math.abs(dx) < distX && Math.abs(dz) < distZ) {
          return true; // Overlaps
        }
      }
      return false;
    }

    // Attempt to place groups randomly without overlap
    this.groups.forEach((group) => {
      let tries = 0;
      let x, z;
      do {
        x = (Math.random() - 0.5) * width;
        z = (Math.random() - 0.5) * height;
        tries++;
        if (tries > 100) {
          break;
        }
      } while (overlaps(x, z, group, placedPositions));

      group.position.set(x, group.position.y, z);
      placedPositions.push({ x, z, group });
      this.add(group);
    });
  }
  update() {
    // this.groups.forEach((group) => {
    //   group.update();
    // });
    if (this.speed <= 0) this.speed = 0;
    this.position.z += this.speed;
    if (this.position.z >= 50) {
      this.position.z = -450;
    }
  }
  moveLeft() {
    if (this.speed <= 0) this.speed = 0;
    this.groups.forEach((group) => {
      const xPos = this.position.x + group.position.x;
      group.position.x += this.speed;
      if (xPos > 250) {
        group.position.x = -250;
      } else if (xPos < -250) {
        group.position.x = 250;
      }
    });
  }
  moveRight() {
    if (this.speed <= 0) this.speed = 0;

    this.groups.forEach((group) => {
      const xPos = this.position.x + group.position.x;
      group.position.x -= this.speed;
      if (xPos > 250) {
        group.position.x = -250;
      } else if (xPos < -250) {
        group.position.x = 250;
      }
    });
  }
}

export default Area;
