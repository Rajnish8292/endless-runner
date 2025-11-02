import * as THREE from "three";

class Ground extends THREE.Mesh {
  constructor() {
    const [colorMap, displacementMap, normalMap, roughnessMap] = [
      "/texture/ground/color.png",
      "/texture/ground/Concrete034_2K-JPG_Displacement.jpg",
      "/texture/ground/Concrete034_2K-JPG_NormalDX.jpg",
      "/texture/ground/Concrete034_2K-JPG_Roughness.jpg",
    ].map((url) => new THREE.TextureLoader().load(url));

    colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
    colorMap.repeat.set(10, 10);

    const geometry = new THREE.PlaneGeometry(500, 500, 50, 50);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
      fog: true,

      map: colorMap,
    });
    super(geometry, material);

    this.colorMap = colorMap;
    this.rotation.x = -Math.PI / 2;
    this.position.y = -1;
    this.position.z = -220;
    this.receiveShadow = true;
    this.castShadow = true;
    this.speed = 0.048;
    this.targetOffsetX = 0;
    this.smoothFactor = 0.4;
  }
  update() {
    if (this.speed <= 0) this.speed = 0;
    this.colorMap.offset.x +=
      (this.targetOffsetX - this.colorMap.offset.x) * this.smoothFactor ** 3;

    this.colorMap.offset.y += this.speed;
  }
  moveLeft() {
    if (this.speed <= 0) this.speed = 0;
    this.targetOffsetX -= this.speed;
  }
  moveRight() {
    if (this.speed <= 0) this.speed = 0;
    this.targetOffsetX += this.speed;
  }
}

export default Ground;
