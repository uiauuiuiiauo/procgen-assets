export default function generate(THREE) {
  const root = new THREE.Group();

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8,
  });
  const red_indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xc92525,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xc92525,
    emissiveIntensity: 1.0,
  });

  const base_flangeGeom = new THREE.CylinderGeometry(0.34, 0.37, 0.08, 48);
  const base_flange = new THREE.Mesh(base_flangeGeom, chromeMat);
  base_flange.position.y = 0.04;
  root.add(base_flange);

  const base_rimGeom = new THREE.TorusGeometry(0.325, 0.025, 12, 48);
  const base_rim = new THREE.Mesh(base_rimGeom, chromeMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.085;
  root.add(base_rim);

  const base_gasketGeom = new THREE.TorusGeometry(0.305, 0.008, 8, 48);
  const base_gasket = new THREE.Mesh(base_gasketGeom, darkMat);
  base_gasket.rotation.x = Math.PI / 2;
  base_gasket.position.y = 0.105;
  root.add(base_gasket);

  const main_bodyProfile = [
    new THREE.Vector2(0.00, 0.07),
    new THREE.Vector2(0.28, 0.07),
    new THREE.Vector2(0.29, 0.16),
    new THREE.Vector2(0.29, 0.82),
    new THREE.Vector2(0.30, 1.02),
    new THREE.Vector2(0.34, 1.18),
    new THREE.Vector2(0.40, 1.32),
    new THREE.Vector2(0.43, 1.42),
    new THREE.Vector2(0.41, 1.52),
    new THREE.Vector2(0.35, 1.61),
    new THREE.Vector2(0.27, 1.66),
    new THREE.Vector2(0.00, 1.66),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 48);
  const main_body = new THREE.Mesh(main_bodyGeom, chromeMat);
  root.add(main_body);

  const horizontal_spoutGeom = new THREE.CylinderGeometry(0.24, 0.39, 0.82, 48);
  const horizontal_spout = new THREE.Mesh(horizontal_spoutGeom, chromeMat);
  horizontal_spout.rotation.z = -Math.PI / 2;
  horizontal_spout.position.set(0.65, 1.42, 0);
  root.add(horizontal_spout);

  const spout_end_capProfile = [
    new THREE.Vector2(0.00, -0.24),
    new THREE.Vector2(0.20, -0.24),
    new THREE.Vector2(0.25, -0.18),
    new THREE.Vector2(0.29, -0.06),
    new THREE.Vector2(0.30, 0.08),
    new THREE.Vector2(0.28, 0.18),
    new THREE.Vector2(0.24, 0.25),
    new THREE.Vector2(0.00, 0.25),
  ];
  const spout_end_capGeom = new THREE.LatheGeometry(spout_end_capProfile, 48);
  const spout_end_cap = new THREE.Mesh(spout_end_capGeom, chromeMat);
  spout_end_cap.rotation.z = -Math.PI / 2;
  spout_end_cap.position.set(1.05, 1.42, 0);
  root.add(spout_end_cap);

  const spout_seamGeom = new THREE.TorusGeometry(0.252, 0.012, 8, 48);
  const spout_seam = new THREE.Mesh(spout_seamGeom, darkMat);
  spout_seam.rotation.y = Math.PI / 2;
  spout_seam.position.set(0.91, 1.42, 0);
  root.add(spout_seam);

  const spray_faceGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.018, 48);
  const spray_face = new THREE.Mesh(spray_faceGeom, chromeMat);
  spray_face.rotation.z = -Math.PI / 2;
  spray_face.position.set(1.305, 1.42, 0);
  root.add(spray_face);

  const spray_face_rimGeom = new THREE.TorusGeometry(0.225, 0.012, 8, 48);
  const spray_face_rim = new THREE.Mesh(spray_face_rimGeom, chromeMat);
  spray_face_rim.rotation.y = Math.PI / 2;
  spray_face_rim.position.set(1.318, 1.42, 0);
  root.add(spray_face_rim);

  const spray_nozzleGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.008, 12);
  const spray_nozzles = new THREE.InstancedMesh(spray_nozzleGeom, darkMat, 16);
  const spray_nozzle_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    spray_nozzle_dummy.position.set(
      1.327,
      1.42 + Math.cos(angle) * 0.15,
      Math.sin(angle) * 0.15
    );
    spray_nozzle_dummy.rotation.set(0, 0, -Math.PI / 2);
    spray_nozzle_dummy.scale.set(1, 1, 1);
    spray_nozzle_dummy.updateMatrix();
    spray_nozzles.setMatrixAt(i, spray_nozzle_dummy.matrix);
  }
  spray_nozzles.instanceMatrix.needsUpdate = true;
  root.add(spray_nozzles);

  const spray_centerGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.012, 24);
  const spray_center = new THREE.Mesh(spray_centerGeom, darkMat);
  spray_center.rotation.z = -Math.PI / 2;
  spray_center.position.set(1.329, 1.42, 0);
  root.add(spray_center);

  const spray_center_ringGeom = new THREE.TorusGeometry(0.058, 0.008, 8, 24);
  const spray_center_ring = new THREE.Mesh(spray_center_ringGeom, chromeMat);
  spray_center_ring.rotation.y = Math.PI / 2;
  spray_center_ring.position.set(1.336, 1.42, 0);
  root.add(spray_center_ring);

  const neck_collarGeom = new THREE.CylinderGeometry(0.28, 0.29, 0.10, 48);
  const neck_collar = new THREE.Mesh(neck_collarGeom, chromeMat);
  neck_collar.position.set(0, 1.66, 0);
  root.add(neck_collar);

  const neck_seamGeom = new THREE.TorusGeometry(0.275, 0.009, 8, 48);
  const neck_seam = new THREE.Mesh(neck_seamGeom, darkMat);
  neck_seam.rotation.x = Math.PI / 2;
  neck_seam.position.set(0, 1.615, 0);
  root.add(neck_seam);

  const neck_housingGeom = new THREE.CylinderGeometry(0.235, 0.27, 0.34, 48);
  const neck_housing = new THREE.Mesh(neck_housingGeom, chromeMat);
  neck_housing.position.set(0, 1.82, 0);
  root.add(neck_housing);

  const spout_path = [
    new THREE.Vector3(0, 1.86, -0.05),
    new THREE.Vector3(0, 2.04, -0.03),
    new THREE.Vector3(0, 2.18, 0.12),
    new THREE.Vector3(0, 2.25, 0.42),
    new THREE.Vector3(0, 2.27, 0.82),
    new THREE.Vector3(0, 2.24, 1.22),
    new THREE.Vector3(0, 2.17, 1.50),
    new THREE.Vector3(0, 2.06, 1.68),
    new THREE.Vector3(0, 1.94, 1.74),
  ];
  const spout_curve = new THREE.CatmullRomCurve3(
    spout_path,
    false,
    "centripetal",
    0.5
  );
  const spoutGeom = new THREE.TubeGeometry(spout_curve, 72, 0.17, 20, false);
  const spout = new THREE.Mesh(spoutGeom, chromeMat);
  spout.scale.x = 1.15;
  root.add(spout);

  const indicator_rimGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.018, 24);
  const indicator_rim = new THREE.Mesh(indicator_rimGeom, chromeMat);
  indicator_rim.rotation.x = Math.PI / 2;
  indicator_rim.position.set(0, 1.82, 0.258);
  root.add(indicator_rim);

  const red_indicatorGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.012, 24);
  const red_indicator = new THREE.Mesh(red_indicatorGeom, red_indicatorMat);
  red_indicator.rotation.x = Math.PI / 2;
  red_indicator.position.set(0, 1.82, 0.273);
  root.add(red_indicator);

  const lever_shape = new THREE.Shape();
  lever_shape.moveTo(-0.08, 0.00);
  lever_shape.lineTo(0.09, 0.00);
  lever_shape.lineTo(0.18, 0.54);
  lever_shape.lineTo(0.12, 0.61);
  lever_shape.lineTo(0.04, 0.58);
  lever_shape.closePath();

  const control_leverGeom = new THREE.ExtrudeGeometry(lever_shape, {
    depth: 0.12,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const control_lever = new THREE.Mesh(control_leverGeom, chromeMat);
  control_lever.position.set(0.40, 1.60, -0.06);
  root.add(control_lever);

  const lever_pivotGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.16, 24);
  const lever_pivot = new THREE.Mesh(lever_pivotGeom, chromeMat);
  lever_pivot.rotation.x = Math.PI / 2;
  lever_pivot.position.set(0.47, 1.64, 0);
  root.add(lever_pivot);

  const head_group = new THREE.Group();
  head_group.position.set(0, 1.94, 1.74);
  head_group.rotation.x = -0.25;
  root.add(head_group);

  const aerator_housingGeom = new THREE.CylinderGeometry(
    0.18,
    0.215,
    0.30,
    40
  );
  const aerator_housing = new THREE.Mesh(aerator_housingGeom, chromeMat);
  head_group.add(aerator_housing);

  const aerator_seamGeom = new THREE.TorusGeometry(0.184, 0.009, 8, 40);
  const aerator_seam = new THREE.Mesh(aerator_seamGeom, darkMat);
  aerator_seam.rotation.x = Math.PI / 2;
  aerator_seam.position.y = -0.145;
  head_group.add(aerator_seam);

  const aerator_faceGeom = new THREE.CylinderGeometry(0.178, 0.178, 0.018, 40);
  const aerator_face = new THREE.Mesh(aerator_faceGeom, chromeMat);
  aerator_face.position.y = -0.164;
  head_group.add(aerator_face);

  const aerator_rimGeom = new THREE.TorusGeometry(0.169, 0.011, 8, 40);
  const aerator_rim = new THREE.Mesh(aerator_rimGeom, chromeMat);
  aerator_rim.rotation.x = Math.PI / 2;
  aerator_rim.position.y = -0.177;
  head_group.add(aerator_rim);

  const aerator_nozzleGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 10);
  const aerator_nozzles = new THREE.InstancedMesh(
    aerator_nozzleGeom,
    darkMat,
    17
  );
  const aerator_nozzle_dummy = new THREE.Object3D();

  aerator_nozzle_dummy.position.set(0, -0.181, 0);
  aerator_nozzle_dummy.rotation.set(0, 0, 0);
  aerator_nozzle_dummy.scale.set(1.55, 1, 1.55);
  aerator_nozzle_dummy.updateMatrix();
  aerator_nozzles.setMatrixAt(0, aerator_nozzle_dummy.matrix);

  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    aerator_nozzle_dummy.position.set(
      Math.cos(angle) * 0.112,
      -0.181,
      Math.sin(angle) * 0.112
    );
    aerator_nozzle_dummy.rotation.set(0, 0, 0);
    aerator_nozzle_dummy.scale.set(1, 1, 1);
    aerator_nozzle_dummy.updateMatrix();
    aerator_nozzles.setMatrixAt(i + 1, aerator_nozzle_dummy.matrix);
  }
  aerator_nozzles.instanceMatrix.needsUpdate = true;
  head_group.add(aerator_nozzles);

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