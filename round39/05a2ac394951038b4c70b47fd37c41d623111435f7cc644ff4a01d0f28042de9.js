export default function generate(THREE) {
  const root = new THREE.Group();

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf3f2ec,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const inner_cavityMat = new THREE.MeshStandardMaterial({
    color: 0xe9e7df,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const rim_accentMat = new THREE.MeshStandardMaterial({
    color: 0xd9c7a7,
    metalness: 0.0,
    roughness: 0.4,
  });

  const foot_accentMat = new THREE.MeshStandardMaterial({
    color: 0xcdbfa5,
    metalness: 0.0,
    roughness: 0.4,
  });

  const cup_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.300, 0.000),
    new THREE.Vector2(0.325, 0.004),
    new THREE.Vector2(0.345, 0.015),
    new THREE.Vector2(0.360, 0.040),
    new THREE.Vector2(0.375, 0.090),
    new THREE.Vector2(0.395, 0.180),
    new THREE.Vector2(0.414, 0.300),
    new THREE.Vector2(0.428, 0.450),
    new THREE.Vector2(0.438, 0.610),
    new THREE.Vector2(0.442, 0.750),
    new THREE.Vector2(0.440, 0.810),
    new THREE.Vector2(0.434, 0.838),
    new THREE.Vector2(0.422, 0.855),
    new THREE.Vector2(0.405, 0.862),
    new THREE.Vector2(0.390, 0.856),
    new THREE.Vector2(0.382, 0.840),
    new THREE.Vector2(0.380, 0.810),
    new THREE.Vector2(0.383, 0.730),
    new THREE.Vector2(0.378, 0.600),
    new THREE.Vector2(0.368, 0.440),
    new THREE.Vector2(0.352, 0.300),
    new THREE.Vector2(0.330, 0.200),
    new THREE.Vector2(0.295, 0.150),
    new THREE.Vector2(0.000, 0.150),
  ];
  const cup_bodyGeom = new THREE.LatheGeometry(cup_bodyProfile, 64);
  const cup_body = new THREE.Mesh(cup_bodyGeom, ceramicMat);
  root.add(cup_body);

  const inner_cavityGeom = new THREE.CircleGeometry(0.300, 48);
  const inner_cavity = new THREE.Mesh(inner_cavityGeom, inner_cavityMat);
  inner_cavity.rotation.x = -Math.PI / 2;
  inner_cavity.position.y = 0.154;
  root.add(inner_cavity);

  const rimGeom = new THREE.TorusGeometry(0.408, 0.025, 16, 64);
  const rim = new THREE.Mesh(rimGeom, ceramicMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.842;
  root.add(rim);

  const rim_accentGeom = new THREE.TorusGeometry(0.431, 0.0045, 8, 64);
  const rim_accent = new THREE.Mesh(rim_accentGeom, rim_accentMat);
  rim_accent.rotation.x = Math.PI / 2;
  rim_accent.position.y = 0.850;
  root.add(rim_accent);

  const handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.405, 0.690, 0),
      new THREE.Vector3(0.470, 0.720, 0),
      new THREE.Vector3(0.570, 0.755, 0),
      new THREE.Vector3(0.670, 0.735, 0),
      new THREE.Vector3(0.750, 0.660, 0),
      new THREE.Vector3(0.790, 0.550, 0),
      new THREE.Vector3(0.780, 0.440, 0),
      new THREE.Vector3(0.720, 0.330, 0),
      new THREE.Vector3(0.630, 0.235, 0),
      new THREE.Vector3(0.520, 0.165, 0),
      new THREE.Vector3(0.405, 0.220, 0),
    ],
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(handlePath, 72, 0.047, 16, false);
  const handle = new THREE.Mesh(handleGeom, ceramicMat);
  handle.scale.z = 0.82;
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.065, 24, 16);

  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, ceramicMat);
  upper_handle_mount.position.set(0.415, 0.690, 0);
  upper_handle_mount.scale.set(1.15, 0.72, 0.78);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, ceramicMat);
  lower_handle_mount.position.set(0.410, 0.220, 0);
  lower_handle_mount.scale.set(1.12, 0.78, 0.78);
  root.add(lower_handle_mount);

  const foot_ringGeom = new THREE.TorusGeometry(0.318, 0.006, 8, 64);
  const foot_ring = new THREE.Mesh(foot_ringGeom, foot_accentMat);
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = 0.006;
  root.add(foot_ring);

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