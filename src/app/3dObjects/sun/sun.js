import * as THREE from "three";

class Sun extends THREE.Group {
  constructor() {
    super();
    const sunGeometry = new THREE.SphereGeometry(50, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff88,
      fog: false,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    const glowGeometry = new THREE.SphereGeometry(55, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide,
      fog: false,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.add(directionalLight);

    this.add(sun);
    this.add(glow);
    this.position.set(0, 500, -1000);
    this.sunsetSpeed = 0.5;
  }
  update() {
    this.position.y = Math.max(-50, this.position.y - this.sunsetSpeed);
  }
}
export default Sun;
