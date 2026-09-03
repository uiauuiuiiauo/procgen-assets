export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0752b6,
    metalness: 0.0,
    roughness: 0.4,
  });

  const inner_neckMat = new THREE.MeshStandardMaterial({
    color: 0x032965,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const foot_ringMat = new THREE.MeshStandardMaterial({
    color: 0xe8dfc8,
    metalness: 0.0,
    roughness: 0.4,
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, 0.035),
    new THREE.Vector2(0.240, 0.035),
    new THREE.Vector2(0.280, 0.045),
    new THREE.Vector2(0.310, 0.070),
    new THREE.Vector2(0.345, 0.110),
    new THREE.Vector2(0.380, 0.170),
    new THREE.Vector2(0.410, 0.250),
    new THREE.Vector2(0.430, 0.340),
    new THREE.Vector2(0.440, 0.440),
    new THREE.Vector2(0.438, 0.530),
    new THREE.Vector2(0.425, 0.610),
    new THREE.Vector2(0.400, 0.690),
    new THREE.Vector2(0.360, 0.760),
    new THREE.Vector2(0.310, 0.820),
    new THREE.Vector2(0.250, 0.870),
    new THREE.Vector2(0.190, 0.920),
    new THREE.Vector2(0.150, 0.980),
    new THREE.Vector2(0.128, 1.060),
    new THREE.Vector2(0.118, 1.160),
    new THREE.Vector2(0.113, 1.300),
    new THREE.Vector2(0.112, 1.450),
    new THREE.Vector2(0.114, 1.580),
    new THREE.Vector2(0.120, 1.680),
    new THREE.Vector2(0.137, 1.730),
    new THREE.Vector2(0.150, 1.760),
  ];

  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const foot_ringGeom = new THREE.CylinderGeometry(
    0.282,
    0.292,
    0.032,
    64
  );
  const foot_ring = new THREE.Mesh(foot_ringGeom, foot_ringMat);
  foot_ring.position.y = 0.016;
  root.add(foot_ring);

  const inner_neckGeom = new THREE.CylinderGeometry(
    0.105,
    0.098,
    0.090,
    48,
    1,
    true
  );
  const inner_neck = new THREE.Mesh(inner_neckGeom, inner_neckMat);
  inner_neck.position.y = 1.715;
  root.add(inner_neck);

  const mouth_cavityGeom = new THREE.CircleGeometry(0.098, 48);
  const mouth_cavity = new THREE.Mesh(mouth_cavityGeom, inner_neckMat);
  mouth_cavity.rotation.x = -Math.PI / 2;
  mouth_cavity.position.y = 1.670;
  root.add(mouth_cavity);

  const rimGeom = new THREE.TorusGeometry(0.130, 0.025, 16, 64);
  const rim = new THREE.Mesh(rimGeom, bodyMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.760;
  root.add(rim);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}