export default function generate(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    thickness: 0.12,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });

  const edge_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x707878,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    thickness: 0.2,
    transparent: true,
    opacity: 0.58,
    depthWrite: false,
  });

  const bottle_profile = [
    new THREE.Vector2(0.00, 0.04),
    new THREE.Vector2(0.82, 0.04),
    new THREE.Vector2(0.96, 0.06),
    new THREE.Vector2(1.03, 0.10),
    new THREE.Vector2(1.07, 0.18),
    new THREE.Vector2(1.11, 0.34),
    new THREE.Vector2(1.15, 0.58),
    new THREE.Vector2(1.17, 0.82),
    new THREE.Vector2(1.17, 1.02),
    new THREE.Vector2(1.15, 1.24),
    new THREE.Vector2(1.10, 1.50),
    new THREE.Vector2(1.03, 1.75),
    new THREE.Vector2(0.94, 2.02),
    new THREE.Vector2(0.84, 2.28),
    new THREE.Vector2(0.73, 2.53),
    new THREE.Vector2(0.62, 2.77),
    new THREE.Vector2(0.52, 3.00),
    new THREE.Vector2(0.44, 3.20),
    new THREE.Vector2(0.39, 3.38),
    new THREE.Vector2(0.36, 3.55),
    new THREE.Vector2(0.35, 3.72),
    new THREE.Vector2(0.35, 3.90),
    new THREE.Vector2(0.43, 3.92),
    new THREE.Vector2(0.50, 3.97),
    new THREE.Vector2(0.52, 4.03),
    new THREE.Vector2(0.50, 4.09),
    new THREE.Vector2(0.44, 4.13),
    new THREE.Vector2(0.35, 4.14),
    new THREE.Vector2(0.31, 4.12),
    new THREE.Vector2(0.29, 4.08),
    new THREE.Vector2(0.30, 4.02),
    new THREE.Vector2(0.33, 3.96),
    new THREE.Vector2(0.31, 3.90),
    new THREE.Vector2(0.31, 3.72),
    new THREE.Vector2(0.32, 3.55),
    new THREE.Vector2(0.35, 3.38),
    new THREE.Vector2(0.40, 3.20),
    new THREE.Vector2(0.48, 3.00),
    new THREE.Vector2(0.58, 2.76),
    new THREE.Vector2(0.69, 2.52),
    new THREE.Vector2(0.80, 2.27),
    new THREE.Vector2(0.90, 2.01),
    new THREE.Vector2(0.98, 1.74),
    new THREE.Vector2(1.05, 1.49),
    new THREE.Vector2(1.10, 1.23),
    new THREE.Vector2(1.12, 1.02),
    new THREE.Vector2(1.12, 0.82),
    new THREE.Vector2(1.10, 0.60),
    new THREE.Vector2(1.06, 0.37),
    new THREE.Vector2(1.02, 0.22),
    new THREE.Vector2(0.98, 0.16),
    new THREE.Vector2(0.90, 0.13),
    new THREE.Vector2(0.78, 0.13),
    new THREE.Vector2(0.00, 0.13),
  ];

  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_profile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, glassMat);
  root.add(bottle_body);

  const rolled_lipGeom = new THREE.TorusGeometry(0.43, 0.09, 16, 64);
  const rolled_lip = new THREE.Mesh(rolled_lipGeom, edge_glassMat);
  rolled_lip.rotation.x = Math.PI / 2;
  rolled_lip.position.y = 4.035;
  root.add(rolled_lip);

  const neck_collarGeom = new THREE.TorusGeometry(0.365, 0.025, 10, 64);
  const neck_collar = new THREE.Mesh(neck_collarGeom, edge_glassMat);
  neck_collar.rotation.x = Math.PI / 2;
  neck_collar.position.y = 3.905;
  root.add(neck_collar);

  const mouth_rimGeom = new THREE.RingGeometry(0.295, 0.355, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, edge_glassMat);
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 4.132;
  root.add(mouth_rim);

  const base_ringGeom = new THREE.TorusGeometry(0.94, 0.055, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, edge_glassMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.105;
  root.add(base_ring);

  const inner_base_ringGeom = new THREE.TorusGeometry(0.72, 0.025, 10, 64);
  const inner_base_ring = new THREE.Mesh(inner_base_ringGeom, edge_glassMat);
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = 0.145;
  root.add(inner_base_ring);

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

  fitToUnitCube(THREE, root);
  return root;
}