import Obstacle from "../obstacle/obstacle";
import * as THREE from "three";
class Booster extends Obstacle {
  constructor() {
    super();
    this.name = "booster";
    const octahedronGeometry = new THREE.OctahedronGeometry(2, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

    const booster = new THREE.Mesh(octahedronGeometry, material);

    this.add(booster);
    this.position.set(0, 7, 0);

    this.height = 4;
    this.width = 4;
    this.depth = 4;

    this.rotationSpeed = 0.05;
  }

  rotate() {
    this.rotation.y += this.rotationSpeed;
  }
}

export default Booster;
