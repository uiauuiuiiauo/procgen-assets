export default function generate(THREE) {
  const root = new THREE.Group();

  const orange_ballMat = new THREE.MeshStandardMaterial({
    color: 0xff7418,
    metalness: 0.0,
    roughness: 0.3
  });

  const orange_ballGeom = new THREE.SphereGeometry(0.5, 64, 32);
  const orange_ball = new THREE.Mesh(orange_ballGeom, orange_ballMat);
  root.add(orange_ball);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}