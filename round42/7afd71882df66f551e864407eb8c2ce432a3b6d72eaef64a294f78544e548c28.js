export default function generate(THREE) {
  const root = new THREE.Group();

  const glass_sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f7f7,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    thickness: 0.25
  });

  const gold_ringMat = new THREE.MeshStandardMaterial({
    color: 0xd8aa45,
    metalness: 0.6,
    roughness: 0.2
  });

  const gold_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffe2a0,
    metalness: 0.6,
    roughness: 0.2
  });

  const glass_sphereGeom = new THREE.SphereGeometry(0.97, 64, 32);
  const glass_sphere = new THREE.Mesh(glass_sphereGeom, glass_sphereMat);
  glass_sphere.renderOrder = 1;
  root.add(glass_sphere);

  const gold_ringGeom = new THREE.TorusGeometry(0.974, 0.036, 20, 128);
  const gold_ring = new THREE.Mesh(gold_ringGeom, gold_ringMat);
  gold_ring.position.z = 0.018;
  gold_ring.renderOrder = 2;
  root.add(gold_ring);

  const gold_highlightGeom = new THREE.TorusGeometry(0.974, 0.007, 10, 128);
  const gold_highlight = new THREE.Mesh(gold_highlightGeom, gold_highlightMat);
  gold_highlight.position.z = 0.048;
  gold_highlight.renderOrder = 3;
  root.add(gold_highlight);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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
}