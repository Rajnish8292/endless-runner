import * as THREE from "three";

class Ground extends THREE.Mesh {
  constructor() {
    const [colorMap, displacementMap, normalMap, roughnessMap] = [
      "/texture/ground/Concrete034_2K-JPG_Color.jpg",
      "/texture/ground/Concrete034_2K-JPG_Displacement.jpg",
      "/texture/ground/Concrete034_2K-JPG_NormalDX.jpg",
      "/texture/ground/Concrete034_2K-JPG_Roughness.jpg",
    ].map((url) => new THREE.TextureLoader().load(url));

    const geometry = new THREE.PlaneGeometry(150, 100, 50, 50);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      fog: true,
      map: colorMap,
      normalMap: normalMap,
      displacementMap: displacementMap,
      roughnessMap: roughnessMap,
      //   displacementScale: 2,
    });
    super(geometry, material);

    this.rotation.x = -Math.PI / 2;
    this.position.y = -1;
    this.receiveShadow = true;
    this.castShadow = true;
  }
}

export default Ground;
