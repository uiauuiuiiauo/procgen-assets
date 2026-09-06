export default function generate(THREE) {
  const root = new THREE.Group();

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const pan_profile = [
    new THREE.Vector2(0.00, 0.000),
    new THREE.Vector2(0.88, 0.000),
    new THREE.Vector2(0.98, 0.008),
    new THREE.Vector2(1.05, 0.030),
    new THREE.Vector2(1.10, 0.075),
    new THREE.Vector2(1.14, 0.145),
    new THREE.Vector2(1.18, 0.250),
    new THREE.Vector2(1.22, 0.370),
    new THREE.Vector2(1.27, 0.490),
    new THREE.Vector2(1.30, 0.550),
    new THREE.Vector2(1.33, 0.580),
    new THREE.Vector2(1.36, 0.560),
    new THREE.Vector2(1.33, 0.510),
    new THREE.Vector2(1.28, 0.410),
    new THREE.Vector2(1.23, 0.280),
    new THREE.Vector2(1.18, 0.140),
    new THREE.Vector2(1.12, 0.040),
    new THREE.Vector2(1.04, -0.030),
    new THREE.Vector2(0.94, -0.070),
    new THREE.Vector2(0.00, -0.070),
  ];

  const pan_bodyGeom = new THREE.LatheGeometry(pan_profile, 96);
  const pan_body = new THREE.Mesh(pan_bodyGeom, brushed_metalMat);
  root.add(pan_body);

  const interior_floorGeom = new THREE.CircleGeometry(0.965, 96);
  const interior_floor = new THREE.Mesh(interior_floorGeom, silverMat);
  interior_floor.rotation.x = -Math.PI / 2;
  interior_floor.position.y = 0.006;
  root.add(interior_floor);

  const inner_transitionGeom = new THREE.TorusGeometry(0.985, 0.018, 10, 96);
  const inner_transition = new THREE.Mesh(inner_transitionGeom, silverMat);
  inner_transition.rotation.x = Math.PI / 2;
  inner_transition.position.y = 0.022;
  root.add(inner_transition);

  const rolled_rimGeom = new THREE.TorusGeometry(1.325, 0.045, 14, 112);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, silverMat);
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.568;
  root.add(rolled_rim);

  const inner_rim_highlightGeom = new THREE.TorusGeometry(1.286, 0.012, 8, 96);
  const inner_rim_highlight = new THREE.Mesh(inner_rim_highlightGeom, silverMat);
  inner_rim_highlight.rotation.x = Math.PI / 2;
  inner_rim_highlight.position.y = 0.515;
  root.add(inner_rim_highlight);

  fitToUnitCube(root);
  return root;

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
}