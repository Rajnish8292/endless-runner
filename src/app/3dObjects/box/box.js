import * as THREE from "three";
import Obstacle from "../obstacle/obstacle";

class Box extends Obstacle {
  constructor() {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    super(geometry, material);
    this.position.y = 2.2;
  }

  getBoundingBox() {
    return new THREE.Box3().setFromObject(this);
  }
}
export default Box;
