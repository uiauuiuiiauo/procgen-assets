export default function generate(THREE) {
  const root = new THREE.Group();

  const puck_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x075bd8,
    metalness: 0.0,
    roughness: 0.3,
  });

  const puck_profile = [
    new THREE.Vector2(0.00, -0.22),
    new THREE.Vector2(0.78, -0.22),
    new THREE.Vector2(0.88, -0.20),
    new THREE.Vector2(0.95, -0.15),
    new THREE.Vector2(0.99, -0.08),
    new THREE.Vector2(1.00,  0.00),
    new THREE.Vector2(0.99,  0.08),
    new THREE.Vector2(0.96,  0.14),
    new THREE.Vector2(0.90,  0.19),
    new THREE.Vector2(0.82,  0.22),
    new THREE.Vector2(0.00,  0.22),
  ];

  const puck_bodyGeom = new THREE.LatheGeometry(puck_profile, 64);
  const puck_body = new THREE.Mesh(puck_bodyGeom, puck_bodyMat);
  puck_body.rotation.x = Math.PI / 2;
  root.add(puck_body);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}