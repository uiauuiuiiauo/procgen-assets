export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.0,
    roughness: 0.9,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x070707,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const poreMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });

  function roughenGeometry(geometry, amount) {
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      const wave =
        Math.sin(x * 89 + y * 137 + z * 53) * 0.52 +
        Math.sin(x * 211 - y * 73 + z * 157) * 0.31 +
        Math.sin((x + y - z) * 331) * 0.17;
      const factor = 1 + amount * wave;
      positions.setXYZ(i, x * factor, y * factor, z * factor);
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.42, 0.00),
    new THREE.Vector2(0.58, 0.025),
    new THREE.Vector2(0.72, 0.09),
    new THREE.Vector2(0.83, 0.22),
    new THREE.Vector2(0.89, 0.42),
    new THREE.Vector2(0.92, 0.66),
    new THREE.Vector2(0.92, 0.88),
    new THREE.Vector2(0.89, 1.08),
    new THREE.Vector2(0.83, 1.27),
    new THREE.Vector2(0.75, 1.43),
    new THREE.Vector2(0.66, 1.56),
    new THREE.Vector2(0.58, 1.64),
    new THREE.Vector2(0.55, 1.68),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  roughenGeometry(bodyGeom, 0.012);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.515,
    0.46,
    0.27,
    48,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, interiorMat);
  inner_wall.position.y = 1.575;
  root.add(inner_wall);

  const opening_shadowGeom = new THREE.CircleGeometry(0.46, 48);
  const opening_shadow = new THREE.Mesh(opening_shadowGeom, interiorMat);
  opening_shadow.rotation.x = -Math.PI / 2;
  opening_shadow.position.y = 1.44;
  root.add(opening_shadow);

  const rimGeom = new THREE.TorusGeometry(0.575, 0.068, 16, 64);
  const rim = new THREE.Mesh(rimGeom, bodyMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.705;
  root.add(rim);

  const handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.63, 1.47, -0.10),
      new THREE.Vector3(0.87, 1.69, -0.11),
      new THREE.Vector3(1.17, 1.76, -0.10),
      new THREE.Vector3(1.43, 1.59, -0.08),
      new THREE.Vector3(1.53, 1.30, -0.06),
      new THREE.Vector3(1.47, 1.01, -0.04),
      new THREE.Vector3(1.27, 0.75, -0.03),
      new THREE.Vector3(0.94, 0.57, -0.02),
      new THREE.Vector3(0.75, 0.62, -0.01),
    ],
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handlePath,
    72,
    0.135,
    16,
    false
  );
  roughenGeometry(handleGeom, 0.012);
  const handle = new THREE.Mesh(handleGeom, bodyMat);
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.20, 24, 16);
  roughenGeometry(handle_mountGeom, 0.018);

  const handle_upper_mount = new THREE.Mesh(handle_mountGeom, bodyMat);
  handle_upper_mount.position.set(0.69, 1.45, -0.08);
  handle_upper_mount.scale.set(0.95, 1.10, 0.88);
  root.add(handle_upper_mount);

  const handle_lower_mount = new THREE.Mesh(handle_mountGeom, bodyMat);
  handle_lower_mount.position.set(0.78, 0.64, -0.02);
  handle_lower_mount.scale.set(1.0, 1.12, 0.90);
  root.add(handle_lower_mount);

  function orientAlongY(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );
  }

  const spout_start = new THREE.Vector3(-0.68, 0.92, 0.08);
  const spout_joint = new THREE.Vector3(-1.00, 1.24, 0.15);
  const spout_tip = new THREE.Vector3(-1.35, 1.49, 0.29);

  const spout_lowerLength = spout_start.distanceTo(spout_joint);
  const spout_lowerGeom = new THREE.CylinderGeometry(
    0.235,
    0.345,
    spout_lowerLength,
    32,
    2,
    true
  );
  roughenGeometry(spout_lowerGeom, 0.014);
  const spout_lower = new THREE.Mesh(spout_lowerGeom, bodyMat);
  orientAlongY(spout_lower, spout_start, spout_joint);
  root.add(spout_lower);

  const spout_upperLength = spout_joint.distanceTo(spout_tip);
  const spout_upperGeom = new THREE.CylinderGeometry(
    0.168,
    0.242,
    spout_upperLength,
    32,
    2,
    true
  );
  roughenGeometry(spout_upperGeom, 0.013);
  const spout_upper = new THREE.Mesh(spout_upperGeom, bodyMat);
  orientAlongY(spout_upper, spout_joint, spout_tip);
  root.add(spout_upper);

  const spout_direction = new THREE.Vector3()
    .subVectors(spout_tip, spout_joint)
    .normalize();
  const spout_mouthPosition = spout_tip
    .clone()
    .add(spout_direction.clone().multiplyScalar(0.018));

  const spout_mouthGeom = new THREE.CircleGeometry(0.125, 32);
  const spout_mouth = new THREE.Mesh(spout_mouthGeom, interiorMat);
  spout_mouth.position.copy(spout_mouthPosition);
  spout_mouth.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spout_direction
  );
  root.add(spout_mouth);

  const spout_lipGeom = new THREE.TorusGeometry(0.143, 0.034, 12, 40);
  const spout_lip = new THREE.Mesh(spout_lipGeom, bodyMat);
  spout_lip.position.copy(spout_mouthPosition);
  spout_lip.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spout_direction
  );
  root.add(spout_lip);

  function bodyRadiusAt(y) {
    if (y < 0.22) return 0.58 + (y / 0.22) * 0.25;
    if (y < 0.66) return 0.83 + ((y - 0.22) / 0.44) * 0.09;
    if (y < 0.90) return 0.92;
    if (y < 1.20) return 0.92 - ((y - 0.90) / 0.30) * 0.07;
    if (y < 1.45) return 0.85 - ((y - 1.20) / 0.25) * 0.10;
    return 0.75 - ((y - 1.45) / 0.23) * 0.18;
  }

  const body_poresGeom = new THREE.CircleGeometry(0.012, 8);
  const body_pores = new THREE.InstancedMesh(
    body_poresGeom,
    poreMat,
    48
  );
  const poreMatrix = new THREE.Matrix4();
  const porePosition = new THREE.Vector3();
  const poreNormal = new THREE.Vector3();
  const poreQuaternion = new THREE.Quaternion();
  const poreScale = new THREE.Vector3();

  for (let i = 0; i < 48; i++) {
    const y = 0.16 + (((i * 17) % 47) / 46) * 1.38;
    const angle =
      0.28 + (((i * 13) % 43) / 42) * (Math.PI - 0.56);
    const radius = bodyRadiusAt(y) + 0.006;
    poreNormal.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
    porePosition.set(
      poreNormal.x * radius,
      y,
      poreNormal.z * radius
    );
    poreQuaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      poreNormal
    );
    const size = 0.55 + (i % 7) * 0.11;
    poreScale.set(size, size * (0.65 + (i % 3) * 0.14), 1);
    poreMatrix.compose(porePosition, poreQuaternion, poreScale);
    body_pores.setMatrixAt(i, poreMatrix);
  }
  body_pores.instanceMatrix.needsUpdate = true;
  root.add(body_pores);

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