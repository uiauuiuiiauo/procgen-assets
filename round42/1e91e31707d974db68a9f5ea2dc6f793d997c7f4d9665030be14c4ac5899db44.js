export default function generate(THREE) {
  const root = new THREE.Group();

  const main_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x087fc8,
    metalness: 0.6,
    roughness: 0.2,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x075a96,
    metalness: 0.6,
    roughness: 0.2,
  });
  const inner_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const cavityMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const main_bodyProfile = [
    new THREE.Vector2(0.430, -1.300),
    new THREE.Vector2(0.470, -1.290),
    new THREE.Vector2(0.500, -1.250),
    new THREE.Vector2(0.515, -1.180),
    new THREE.Vector2(0.515, -1.100),
    new THREE.Vector2(0.505, -1.030),
    new THREE.Vector2(0.490, -0.980),
    new THREE.Vector2(0.490, 0.980),
    new THREE.Vector2(0.505, 1.030),
    new THREE.Vector2(0.515, 1.100),
    new THREE.Vector2(0.515, 1.180),
    new THREE.Vector2(0.500, 1.250),
    new THREE.Vector2(0.470, 1.290),
    new THREE.Vector2(0.430, 1.300),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 64);
  const main_body = new THREE.Mesh(main_bodyGeom, main_bodyMat);
  main_body.rotation.z = -Math.PI / 2;
  root.add(main_body);

  const body_grooveGeom = new THREE.TorusGeometry(0.493, 0.006, 8, 64);

  const left_body_groove = new THREE.Mesh(body_grooveGeom, grooveMat);
  left_body_groove.rotation.y = Math.PI / 2;
  left_body_groove.position.x = -1.015;
  root.add(left_body_groove);

  const right_body_groove = new THREE.Mesh(body_grooveGeom, grooveMat);
  right_body_groove.rotation.y = Math.PI / 2;
  right_body_groove.position.x = 1.015;
  root.add(right_body_groove);

  const end_lipGeom = new THREE.TorusGeometry(0.455, 0.045, 16, 64);

  const left_end_lip = new THREE.Mesh(end_lipGeom, main_bodyMat);
  left_end_lip.rotation.y = Math.PI / 2;
  left_end_lip.position.x = -1.300;
  root.add(left_end_lip);

  const right_end_lip = new THREE.Mesh(end_lipGeom, main_bodyMat);
  right_end_lip.rotation.y = Math.PI / 2;
  right_end_lip.position.x = 1.300;
  root.add(right_end_lip);

  const inner_sleeveGeom = new THREE.CylinderGeometry(
    0.302,
    0.302,
    0.42,
    48,
    1,
    true
  );
  const inner_sleeve = new THREE.Mesh(inner_sleeveGeom, inner_metalMat);
  inner_sleeve.rotation.z = -Math.PI / 2;
  inner_sleeve.position.x = -1.105;
  root.add(inner_sleeve);

  const cavity_backGeom = new THREE.CircleGeometry(0.300, 48);
  const cavity_back = new THREE.Mesh(cavity_backGeom, cavityMat);
  cavity_back.rotation.y = -Math.PI / 2;
  cavity_back.position.x = -0.895;
  root.add(cavity_back);

  const inner_rimGeom = new THREE.TorusGeometry(0.311, 0.012, 10, 48);
  const inner_rim = new THREE.Mesh(inner_rimGeom, silverMat);
  inner_rim.rotation.y = Math.PI / 2;
  inner_rim.position.x = -1.307;
  root.add(inner_rim);

  const thread_ringGeom = new THREE.TorusGeometry(0.286, 0.006, 6, 48);
  const thread_rings = new THREE.InstancedMesh(
    thread_ringGeom,
    silverMat,
    3
  );
  const thread_rotation = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Math.PI / 2
  );
  const thread_scale = new THREE.Vector3(1, 1, 1);
  const thread_positions = [-1.185, -1.095, -1.005];

  for (let i = 0; i < thread_positions.length; i++) {
    const thread_matrix = new THREE.Matrix4();
    thread_matrix.compose(
      new THREE.Vector3(thread_positions[i], 0, 0),
      thread_rotation,
      thread_scale
    );
    thread_rings.setMatrixAt(i, thread_matrix);
  }
  thread_rings.instanceMatrix.needsUpdate = true;
  root.add(thread_rings);

  const right_end_faceGeom = new THREE.RingGeometry(0.300, 0.430, 64);
  const right_end_face = new THREE.Mesh(right_end_faceGeom, main_bodyMat);
  right_end_face.rotation.y = Math.PI / 2;
  right_end_face.position.x = 1.302;
  root.add(right_end_face);

  const right_end_capGeom = new THREE.CircleGeometry(0.299, 48);
  const right_end_cap = new THREE.Mesh(right_end_capGeom, cavityMat);
  right_end_cap.rotation.y = Math.PI / 2;
  right_end_cap.position.x = 1.304;
  root.add(right_end_cap);

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