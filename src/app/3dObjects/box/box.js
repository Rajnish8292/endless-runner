import * as THREE from "three";
import Obstacle from "../obstacle/obstacle";

class Box extends Obstacle {
  constructor() {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    super(geometry, material);
    this.position.y = 2.2;
  }
}
export default Box;
