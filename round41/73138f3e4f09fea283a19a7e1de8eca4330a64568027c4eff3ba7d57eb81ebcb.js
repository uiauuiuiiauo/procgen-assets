export default function generate(THREE) {
  const root = new THREE.Group();
  const rod_group = new THREE.Group();
  rod_group.rotation.y = -0.22;
  root.add(rod_group);

  const length = 3.2;
  const radius = 0.4;
  const faceRadius = 0.372;

  const main_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const end_faceMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const end_rimMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const yellow_wearMat = new THREE.MeshStandardMaterial({
    color: 0xd2a72d,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.58,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const pink_wearMat = new THREE.MeshStandardMaterial({
    color: 0xb77f78,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const oxidationMat = new THREE.MeshStandardMaterial({
    color: 0x66584a,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0xe1e1df,
    metalness: 0.5,
    roughness: 0.25,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const main_bodyProfile = [
    new THREE.Vector2(0.0, -length / 2),
    new THREE.Vector2(0.345, -length / 2),
    new THREE.Vector2(0.378, -length / 2 + 0.018),
    new THREE.Vector2(0.397, -length / 2 + 0.052),
    new THREE.Vector2(radius, -length / 2 + 0.09),
    new THREE.Vector2(radius, length / 2 - 0.09),
    new THREE.Vector2(0.397, length / 2 - 0.052),
    new THREE.Vector2(0.378, length / 2 - 0.018),
    new THREE.Vector2(0.345, length / 2),
    new THREE.Vector2(0.0, length / 2),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 64);
  const main_body = new THREE.Mesh(main_bodyGeom, main_bodyMat);
  main_body.rotation.z = -Math.PI / 2;
  rod_group.add(main_body);

  const front_end_faceGeom = new THREE.CircleGeometry(faceRadius, 64);
  const front_end_face = new THREE.Mesh(front_end_faceGeom, end_faceMat);
  front_end_face.rotation.y = -Math.PI / 2;
  front_end_face.position.x = -length / 2 - 0.002;
  rod_group.add(front_end_face);

  const rear_end_faceGeom = new THREE.CircleGeometry(faceRadius, 64);
  const rear_end_face = new THREE.Mesh(rear_end_faceGeom, end_faceMat);
  rear_end_face.rotation.y = Math.PI / 2;
  rear_end_face.position.x = length / 2 + 0.002;
  rod_group.add(rear_end_face);

  const end_rimGeom = new THREE.TorusGeometry(0.36, 0.027, 12, 64);
  const front_end_rim = new THREE.Mesh(end_rimGeom, end_rimMat);
  front_end_rim.rotation.y = Math.PI / 2;
  front_end_rim.position.x = -length / 2 + 0.004;
  rod_group.add(front_end_rim);

  const rear_end_rim = new THREE.Mesh(end_rimGeom, end_rimMat);
  rear_end_rim.rotation.y = Math.PI / 2;
  rear_end_rim.position.x = length / 2 - 0.004;
  rod_group.add(rear_end_rim);

  const front_yellow_wearGeom = new THREE.RingGeometry(0.205, 0.352, 64);
  const front_yellow_wear = new THREE.Mesh(front_yellow_wearGeom, yellow_wearMat);
  front_yellow_wear.rotation.y = -Math.PI / 2;
  front_yellow_wear.position.x = -length / 2 - 0.006;
  rod_group.add(front_yellow_wear);

  const front_center_wearGeom = new THREE.CircleGeometry(0.175, 48);
  const front_center_wear = new THREE.Mesh(front_center_wearGeom, end_faceMat);
  front_center_wear.rotation.y = -Math.PI / 2;
  front_center_wear.position.x = -length / 2 - 0.008;
  rod_group.add(front_center_wear);

  const front_center_shadowGeom = new THREE.CircleGeometry(0.055, 32);
  const front_center_shadow = new THREE.Mesh(front_center_shadowGeom, oxidationMat);
  front_center_shadow.rotation.y = -Math.PI / 2;
  front_center_shadow.position.x = -length / 2 - 0.01;
  front_center_shadow.scale.set(1.0, 0.72, 1.0);
  rod_group.add(front_center_shadow);

  const front_pink_wearGeom = new THREE.CircleGeometry(0.09, 32);
  const front_pink_wear = new THREE.Mesh(front_pink_wearGeom, pink_wearMat);
  front_pink_wear.rotation.y = -Math.PI / 2;
  front_pink_wear.position.set(-length / 2 - 0.009, -0.13, 0.135);
  front_pink_wear.scale.set(1.35, 0.58, 1);
  rod_group.add(front_pink_wear);

  const rear_yellow_wearGeom = new THREE.RingGeometry(0.235, 0.35, 64);
  const rear_yellow_wear = new THREE.Mesh(rear_yellow_wearGeom, yellow_wearMat);
  rear_yellow_wear.rotation.y = Math.PI / 2;
  rear_yellow_wear.position.x = length / 2 + 0.006;
  rod_group.add(rear_yellow_wear);

  const rear_center_wearGeom = new THREE.CircleGeometry(0.225, 48);
  const rear_center_wear = new THREE.Mesh(rear_center_wearGeom, end_faceMat);
  rear_center_wear.rotation.y = Math.PI / 2;
  rear_center_wear.position.x = length / 2 + 0.008;
  rod_group.add(rear_center_wear);

  const decalNormal = new THREE.Vector3(0, 0, 1);
  const surfacePosition = new THREE.Vector3();
  const surfaceNormal = new THREE.Vector3();
  const surfaceScale = new THREE.Vector3();
  const surfaceQuat = new THREE.Quaternion();
  const rollQuat = new THREE.Quaternion();
  const surfaceMatrix = new THREE.Matrix4();

  function setSurfaceInstance(mesh, index, x, angle, sx, sy, roll, offset) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    surfaceNormal.set(0, c, s);
    surfacePosition.set(x, c * (radius + offset), s * (radius + offset));
    surfaceQuat.setFromUnitVectors(decalNormal, surfaceNormal);
    rollQuat.setFromAxisAngle(decalNormal, roll);
    surfaceQuat.multiply(rollQuat);
    surfaceScale.set(sx, sy, 1);
    surfaceMatrix.compose(surfacePosition, surfaceQuat, surfaceScale);
    mesh.setMatrixAt(index, surfaceMatrix);
  }

  const yellowPatchData = [
    [-1.34, 0.52, 0.13, 0.06, 0.35],
    [-1.08, 1.18, 0.09, 0.045, -0.4],
    [-0.72, 0.31, 0.18, 0.07, 0.18],
    [-0.38, 1.42, 0.11, 0.05, 0.7],
    [-0.04, 0.72, 0.16, 0.065, -0.25],
    [0.31, 1.11, 0.2, 0.075, 0.42],
    [0.67, 0.35, 0.13, 0.05, -0.65],
    [0.98, 1.48, 0.17, 0.06, 0.2],
    [1.29, 0.76, 0.12, 0.055, 0.82],
  ];
  const yellow_wear_patchesGeom = new THREE.CircleGeometry(1, 24);
  const yellow_wear_patches = new THREE.InstancedMesh(
    yellow_wear_patchesGeom,
    yellow_wearMat,
    yellowPatchData.length
  );
  for (let i = 0; i < yellowPatchData.length; i++) {
    const p = yellowPatchData[i];
    setSurfaceInstance(yellow_wear_patches, i, p[0], p[1], p[2], p[3], p[4], 0.004);
  }
  yellow_wear_patches.instanceMatrix.needsUpdate = true;
  rod_group.add(yellow_wear_patches);

  const pinkPatchData = [
    [-1.18, 0.92, 0.11, 0.045, 0.55],
    [-0.58, 1.28, 0.14, 0.05, -0.2],
    [0.12, 0.43, 0.12, 0.045, 0.72],
    [0.56, 1.34, 0.15, 0.052, -0.48],
    [1.12, 0.62, 0.1, 0.04, 0.2],
  ];
  const pink_wear_patchesGeom = new THREE.CircleGeometry(1, 24);
  const pink_wear_patches = new THREE.InstancedMesh(
    pink_wear_patchesGeom,
    pink_wearMat,
    pinkPatchData.length
  );
  for (let i = 0; i < pinkPatchData.length; i++) {
    const p = pinkPatchData[i];
    setSurfaceInstance(pink_wear_patches, i, p[0], p[1], p[2], p[3], p[4], 0.005);
  }
  pink_wear_patches.instanceMatrix.needsUpdate = true;
  rod_group.add(pink_wear_patches);

  const oxidation_specksGeom = new THREE.CircleGeometry(1, 12);
  const oxidation_specks = new THREE.InstancedMesh(
    oxidation_specksGeom,
    oxidationMat,
    18
  );
  for (let i = 0; i < 18; i++) {
    const x = -1.42 + i * (2.84 / 17);
    const angle = 0.24 + ((i * 7) % 17) / 17 * 1.42;
    const size = 0.006 + (i % 4) * 0.0025;
    setSurfaceInstance(
      oxidation_specks,
      i,
      x,
      angle,
      size * (1.0 + (i % 3) * 0.35),
      size,
      i * 0.63,
      0.007
    );
  }
  oxidation_specks.instanceMatrix.needsUpdate = true;
  rod_group.add(oxidation_specks);

  const surface_scratchesGeom = new THREE.PlaneGeometry(1, 1);
  const surface_scratches = new THREE.InstancedMesh(
    surface_scratchesGeom,
    scratchMat,
    12
  );
  for (let i = 0; i < 12; i++) {
    const x = -1.35 + i * (2.7 / 11);
    const angle = 0.18 + ((i * 5) % 11) / 11 * 1.15;
    const scratchLength = 0.07 + (i % 5) * 0.035;
    setSurfaceInstance(
      surface_scratches,
      i,
      x,
      angle,
      scratchLength,
      0.0035,
      (i % 3 - 1) * 0.12,
      0.008
    );
  }
  surface_scratches.instanceMatrix.needsUpdate = true;
  rod_group.add(surface_scratches);

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