export default function generate(THREE) {
  const root = new THREE.Group();

  const pan_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const rolled_rimMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.3,
  });

  const pan_bodyProfile = [
    new THREE.Vector2(0.000, -0.280),
    new THREE.Vector2(0.720, -0.280),
    new THREE.Vector2(0.775, -0.275),
    new THREE.Vector2(0.805, -0.255),
    new THREE.Vector2(0.820, -0.220),
    new THREE.Vector2(0.842, 0.160),
    new THREE.Vector2(0.850, 0.205),
    new THREE.Vector2(0.855, 0.230),
    new THREE.Vector2(0.835, 0.242),
    new THREE.Vector2(0.805, 0.235),
    new THREE.Vector2(0.795, 0.205),
    new THREE.Vector2(0.785, 0.160),
    new THREE.Vector2(0.755, -0.170),
    new THREE.Vector2(0.740, -0.195),
    new THREE.Vector2(0.700, -0.210),
    new THREE.Vector2(0.000, -0.210),
  ];
  const pan_bodyGeom = new THREE.LatheGeometry(pan_bodyProfile, 96);
  const pan_body = new THREE.Mesh(pan_bodyGeom, pan_bodyMat);
  root.add(pan_body);

  const rolled_rimGeom = new THREE.TorusGeometry(0.855, 0.045, 20, 112);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, rolled_rimMat);
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.247;
  root.add(rolled_rim);

  const inner_transition_ringGeom = new THREE.TorusGeometry(0.724, 0.012, 12, 96);
  const inner_transition_ring = new THREE.Mesh(
    inner_transition_ringGeom,
    rolled_rimMat
  );
  inner_transition_ring.rotation.x = Math.PI / 2;
  inner_transition_ring.position.y = -0.196;
  root.add(inner_transition_ring);

  const bottom_edge_ringGeom = new THREE.TorusGeometry(0.790, 0.016, 12, 96);
  const bottom_edge_ring = new THREE.Mesh(bottom_edge_ringGeom, rolled_rimMat);
  bottom_edge_ring.rotation.x = Math.PI / 2;
  bottom_edge_ring.position.y = -0.266;
  root.add(bottom_edge_ring);

  const side_tabGeom = new THREE.BoxGeometry(0.042, 0.065, 0.080);

  const right_side_tab = new THREE.Mesh(side_tabGeom, pan_bodyMat);
  right_side_tab.position.set(0.872, 0.190, 0);
  root.add(right_side_tab);

  const left_side_tab = new THREE.Mesh(side_tabGeom, pan_bodyMat);
  left_side_tab.position.set(-0.872, 0.190, 0);
  root.add(left_side_tab);

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