export default function generate(THREE) {
  const root = new THREE.Group();
  const device = new THREE.Group();
  root.add(device);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.5,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f2f4,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x70757a,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.32,
  });

  const glass_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.270, 0.000),
    new THREE.Vector2(0.315, 0.018),
    new THREE.Vector2(0.337, 0.055),
    new THREE.Vector2(0.342, 0.135),
    new THREE.Vector2(0.338, 0.310),
    new THREE.Vector2(0.327, 0.500),
    new THREE.Vector2(0.313, 0.620),
    new THREE.Vector2(0.298, 0.655),
    new THREE.Vector2(0.278, 0.655),
    new THREE.Vector2(0.291, 0.615),
    new THREE.Vector2(0.302, 0.495),
    new THREE.Vector2(0.312, 0.305),
    new THREE.Vector2(0.307, 0.130),
    new THREE.Vector2(0.286, 0.075),
    new THREE.Vector2(0.245, 0.058),
    new THREE.Vector2(0.000, 0.058),
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 48);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glassMat);
  glass_body.renderOrder = 2;
  device.add(glass_body);

  const glass_baseGeom = new THREE.CylinderGeometry(0.302, 0.315, 0.055, 48);
  const glass_base = new THREE.Mesh(glass_baseGeom, glassMat);
  glass_base.position.y = 0.042;
  glass_base.renderOrder = 2;
  device.add(glass_base);

  const glass_bottom_rimGeom = new THREE.TorusGeometry(0.305, 0.014, 10, 48);
  const glass_bottom_rim = new THREE.Mesh(glass_bottom_rimGeom, glassMat);
  glass_bottom_rim.rotation.x = Math.PI / 2;
  glass_bottom_rim.position.y = 0.045;
  glass_bottom_rim.renderOrder = 3;
  device.add(glass_bottom_rim);

  const glass_top_rimGeom = new THREE.TorusGeometry(0.292, 0.011, 10, 48);
  const glass_top_rim = new THREE.Mesh(glass_top_rimGeom, glassMat);
  glass_top_rim.rotation.x = Math.PI / 2;
  glass_top_rim.position.y = 0.647;
  glass_top_rim.renderOrder = 3;
  device.add(glass_top_rim);

  const molded_ribsPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.294, 0.585, 0),
    new THREE.Vector3(0.319, 0.520, 0),
    new THREE.Vector3(0.332, 0.360, 0),
    new THREE.Vector3(0.326, 0.180, 0),
    new THREE.Vector3(0.302, 0.095, 0),
  ]);
  const molded_ribsGeom = new THREE.TubeGeometry(
    molded_ribsPath,
    24,
    0.006,
    7,
    false
  );
  const molded_ribs = new THREE.InstancedMesh(molded_ribsGeom, glassMat, 6);
  const ribMatrix = new THREE.Matrix4();
  const ribQuaternion = new THREE.Quaternion();
  const ribPosition = new THREE.Vector3();
  const ribScale = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 6 + i * Math.PI / 3;
    ribQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    ribMatrix.compose(ribPosition, ribQuaternion, ribScale);
    molded_ribs.setMatrixAt(i, ribMatrix);
  }
  molded_ribs.instanceMatrix.needsUpdate = true;
  molded_ribs.renderOrder = 3;
  device.add(molded_ribs);

  const base_grip_ridgesGeom = new THREE.BoxGeometry(0.018, 0.012, 0.034);
  const base_grip_ridges = new THREE.InstancedMesh(
    base_grip_ridgesGeom,
    glassMat,
    28
  );
  const ridgeMatrix = new THREE.Matrix4();
  const ridgeQuaternion = new THREE.Quaternion();
  const ridgePosition = new THREE.Vector3();
  const ridgeScale = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    ridgePosition.set(
      Math.cos(angle) * 0.316,
      0.014,
      Math.sin(angle) * 0.316
    );
    ridgeQuaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI / 2 - angle
    );
    ridgeMatrix.compose(ridgePosition, ridgeQuaternion, ridgeScale);
    base_grip_ridges.setMatrixAt(i, ridgeMatrix);
  }
  base_grip_ridges.instanceMatrix.needsUpdate = true;
  base_grip_ridges.renderOrder = 3;
  device.add(base_grip_ridges);

  const inner_columnProfile = [
    new THREE.Vector2(0.000, 0.105),
    new THREE.Vector2(0.070, 0.105),
    new THREE.Vector2(0.105, 0.120),
    new THREE.Vector2(0.124, 0.155),
    new THREE.Vector2(0.130, 0.220),
    new THREE.Vector2(0.128, 0.430),
    new THREE.Vector2(0.118, 0.510),
    new THREE.Vector2(0.095, 0.555),
    new THREE.Vector2(0.000, 0.565),
  ];
  const inner_columnGeom = new THREE.LatheGeometry(inner_columnProfile, 40);
  const inner_column = new THREE.Mesh(inner_columnGeom, brushedMat);
  device.add(inner_column);

  const inner_column_baseGeom = new THREE.TorusGeometry(0.102, 0.008, 8, 36);
  const inner_column_base = new THREE.Mesh(inner_column_baseGeom, polishedMat);
  inner_column_base.rotation.x = Math.PI / 2;
  inner_column_base.position.y = 0.119;
  device.add(inner_column_base);

  const inner_column_topGeom = new THREE.CylinderGeometry(
    0.102,
    0.112,
    0.055,
    36
  );
  const inner_column_top = new THREE.Mesh(inner_column_topGeom, brushedMat);
  inner_column_top.position.y = 0.565;
  device.add(inner_column_top);

  const inner_brand_marksGeom = new THREE.BoxGeometry(0.015, 0.006, 0.002);
  const inner_brand_marks = new THREE.InstancedMesh(
    inner_brand_marksGeom,
    markingMat,
    9
  );
  const markMatrix = new THREE.Matrix4();
  const markQuaternion = new THREE.Quaternion();
  const markPosition = new THREE.Vector3();
  const markScale = new THREE.Vector3();
  for (let i = 0; i < 9; i++) {
    markPosition.set(-0.064 + i * 0.016, 0.285, 0.132);
    markScale.set(0.65 + (i % 3) * 0.18, 1, 1);
    markMatrix.compose(markPosition, markQuaternion, markScale);
    inner_brand_marks.setMatrixAt(i, markMatrix);
  }
  inner_brand_marks.instanceMatrix.needsUpdate = true;
  device.add(inner_brand_marks);

  const collar_bandGeom = new THREE.CylinderGeometry(
    0.311,
    0.300,
    0.190,
    48
  );
  const collar_band = new THREE.Mesh(collar_bandGeom, silverMat);
  collar_band.position.y = 0.705;
  device.add(collar_band);

  const collar_lower_trimGeom = new THREE.TorusGeometry(
    0.296,
    0.009,
    8,
    48
  );
  const collar_lower_trim = new THREE.Mesh(collar_lower_trimGeom, polishedMat);
  collar_lower_trim.rotation.x = Math.PI / 2;
  collar_lower_trim.position.y = 0.612;
  device.add(collar_lower_trim);

  const collar_upper_trimGeom = new THREE.TorusGeometry(
    0.304,
    0.008,
    8,
    48
  );
  const collar_upper_trim = new THREE.Mesh(collar_upper_trimGeom, polishedMat);
  collar_upper_trim.rotation.x = Math.PI / 2;
  collar_upper_trim.position.y = 0.798;
  device.add(collar_upper_trim);

  const cap_seamGeom = new THREE.TorusGeometry(0.309, 0.0055, 8, 48);
  const cap_seam = new THREE.Mesh(cap_seamGeom, rubberMat);
  cap_seam.rotation.x = Math.PI / 2;
  cap_seam.position.y = 0.806;
  device.add(cap_seam);

  const crown_baseGeom = new THREE.CylinderGeometry(
    0.300,
    0.310,
    0.270,
    48
  );
  const crown_base = new THREE.Mesh(crown_baseGeom, silverMat);
  crown_base.position.y = 0.935;
  device.add(crown_base);

  const crown_teethShape = new THREE.Shape();
  crown_teethShape.moveTo(-0.090, 0.000);
  crown_teethShape.lineTo(-0.090, 0.055);
  crown_teethShape.lineTo(-0.055, 0.115);
  crown_teethShape.lineTo(0.075, 0.240);
  crown_teethShape.lineTo(0.095, 0.220);
  crown_teethShape.lineTo(0.095, 0.000);
  crown_teethShape.closePath();

  const crown_teethGeom = new THREE.ExtrudeGeometry(crown_teethShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  crown_teethGeom.translate(0, 0, -0.0225);

  const toothCount = 8;
  const crown_teeth = new THREE.InstancedMesh(
    crown_teethGeom,
    silverMat,
    toothCount
  );
  const toothMatrix = new THREE.Matrix4();
  const toothQuaternion = new THREE.Quaternion();
  const toothPosition = new THREE.Vector3();
  const toothScale = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < toothCount; i++) {
    const angle = i / toothCount * Math.PI * 2;
    toothPosition.set(
      Math.cos(angle) * 0.287,
      1.000,
      Math.sin(angle) * 0.287
    );
    toothQuaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI / 2 - angle
    );
    toothMatrix.compose(toothPosition, toothQuaternion, toothScale);
    crown_teeth.setMatrixAt(i, toothMatrix);
  }
  crown_teeth.instanceMatrix.needsUpdate = true;
  device.add(crown_teeth);

  const crown_slotsGeom = new THREE.BoxGeometry(0.045, 0.006, 0.105);
  const crown_slots = new THREE.InstancedMesh(
    crown_slotsGeom,
    darkMetalMat,
    toothCount
  );
  const slotMatrix = new THREE.Matrix4();
  const slotQuaternion = new THREE.Quaternion();
  const slotPosition = new THREE.Vector3();
  const slotScale = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < toothCount; i++) {
    const angle = (i + 0.5) / toothCount * Math.PI * 2;
    slotPosition.set(
      Math.cos(angle) * 0.260,
      1.074,
      Math.sin(angle) * 0.260
    );
    slotQuaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI / 2 - angle
    );
    slotMatrix.compose(slotPosition, slotQuaternion, slotScale);
    crown_slots.setMatrixAt(i, slotMatrix);
  }
  crown_slots.instanceMatrix.needsUpdate = true;
  device.add(crown_slots);

  device.rotation.z = 0.30;

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