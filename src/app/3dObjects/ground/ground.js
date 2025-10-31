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
    displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
    roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    colorMap.repeat.set(10, 10);
    displacementMap.repeat.set(10, 10);
    roughnessMap.repeat.set(10, 10);
    normalMap.repeat.set(10, 10);
    const geometry = new THREE.PlaneGeometry(150, 100, 50, 50);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
      fog: true,
      // wireframe: true,
      map: colorMap,
      normalMap: normalMap,
      // displacementMap: displacementMap,
      // roughnessMap: roughnessMap,
      // displacementScale: 0.1,
    });
    super(geometry, material);

    this.colorMap = colorMap;
    this.displacementMap = displacementMap;
    this.roughnessMap = roughnessMap;
    this.normal = normalMap;

    this.rotation.x = -Math.PI / 2;
    this.position.y = -1;
    this.position.z = -30;
    this.receiveShadow = true;
    this.castShadow = true;
    this.speed = 0.048;
    this.targetOffsetX = 0;
    this.smoothFactor = 0.4;
  }
  update() {
    this.colorMap.offset.x +=
      (this.targetOffsetX - this.colorMap.offset.x) * this.smoothFactor ** 3;
    this.roughnessMap.offset.x +=
      (this.targetOffsetX - this.roughnessMap.offset.x) *
      this.smoothFactor ** 3;
    this.normal.offset.x +=
      (this.targetOffsetX - this.normal.offset.x) * this.smoothFactor ** 3;

    this.colorMap.offset.y += this.speed;
    this.roughnessMap.offset.y += this.speed;
    this.normal.offset.y += this.smoothFactor;
  }
  moveLeft() {
    this.targetOffsetX -= this.speed;
  }
  moveRight() {
    this.targetOffsetX += this.speed;
  }
}

export default Ground;
