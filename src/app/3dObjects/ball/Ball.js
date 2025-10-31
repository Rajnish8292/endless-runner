import * as THREE from "three";
import Obstacle from "../obstacle/obstacle";

class Ball extends Obstacle {
  constructor() {
    const colorMap = new THREE.TextureLoader().load(
      "/texture/ground/color.png"
    );
    const geometry = new THREE.OctahedronGeometry(3, 3);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      //   map: colorMap,
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
