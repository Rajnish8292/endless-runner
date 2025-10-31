import * as THREE from "three";
import Obstacle from "../obstacle/obstacle";

class Box extends Obstacle {
  constructor() {
    const geometry = new THREE.BoxGeometry(5, 5, 5);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000, // red
      shininess: 50, // optional (default is 30)
      specular: 0x222222, // optional subtle highlight
    });
    super(geometry, material);
    this.position.y = 2.2;
  }

  getBoundingBox() {
    return new THREE.Box3().setFromObject(this);
  }
}
export default Box;
