import * as THREE from "three";

class Box extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    super(geometry, material);
    this.castShadow = true;
    this.receiveShadow = true;
  }
}

export default Box;
