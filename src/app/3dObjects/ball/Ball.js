import * as THREE from "three";
import Obstacle from "../obstacle/obstacle";

class Ball extends Obstacle {
  constructor() {
    const geometry = new THREE.SphereGeometry(3, 40, 40);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff0000,
    });

    super(geometry, material);
    this.position.y = 2.75;
  }

  getBoundingBox() {
    this.updateWorldMatrix(true, false);
    return new THREE.Box3().setFromObject(this);
  }
}
export default Ball;
