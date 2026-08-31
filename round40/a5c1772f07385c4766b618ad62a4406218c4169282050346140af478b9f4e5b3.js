export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "carton_lantern";

  const bodyW = 1.0;
  const bodyD = 0.82;
  const bodyBottom = 0.08;
  const bodyTop = 1.18;
  const bodyH = bodyTop - bodyBottom;
  const ridgeY = 1.58;
  const roofRise = ridgeY - bodyTop;
  const roofSlope = Math.sqrt((bodyD * 0.5) ** 2 + roofRise ** 2);
  const roofAngle = Math.atan2(roofRise, bodyD * 0.5);

  const carton_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x063bd7,
    metalness: 0.0,
    roughness: 0.3
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x073fd8,
    metalness: 0.0,
    roughness: 0.3
  });
  const foldMat = new THREE.MeshStandardMaterial({
    color: 0x03289f,
    metalness: 0.0,
    roughness: 0.3
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x20dfff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x20dfff,
    emissiveIntensity: 1.0
  });
  const neonMat = new THREE.MeshStandardMaterial({
    color: 0x5fffff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x5fffff,
    emissiveIntensity: 1.0
  });
  const udderMat = new THREE.MeshStandardMaterial({
    color: 0x8edfff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x8edfff,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });
  const dark_detailMat = new THREE.MeshStandardMaterial({
    color: 0x03208f,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const carton_bodyGeom = new THREE.BoxGeometry(bodyW, bodyH, bodyD);
  const carton_body = new THREE.Mesh(carton_bodyGeom, carton_bodyMat);
  carton_body.name = "carton_body";
  carton_body.position.set(0, bodyBottom + bodyH * 0.5, 0);
  root.add(carton_body);

  const bottom_baseGeom = new THREE.BoxGeometry(bodyW * 0.98, 0.07, bodyD * 0.98);
  const bottom_base = new THREE.Mesh(bottom_baseGeom, foldMat);
  bottom_base.name = "bottom_base";
  bottom_base.position.set(0, 0.055, 0);
  root.add(bottom_base);

  const front_roof_panelGeom = new THREE.BoxGeometry(bodyW, 0.035, roofSlope);
  const front_roof_panel = new THREE.Mesh(front_roof_panelGeom, roofMat);
  front_roof_panel.name = "front_roof_panel";
  front_roof_panel.position.set(0, (bodyTop + ridgeY) * 0.5, bodyD * 0.25);
  front_roof_panel.rotation.x = roofAngle;
  root.add(front_roof_panel);

  const back_roof_panelGeom = front_roof_panelGeom;
  const back_roof_panel = new THREE.Mesh(back_roof_panelGeom, roofMat);
  back_roof_panel.name = "back_roof_panel";
  back_roof_panel.position.set(0, (bodyTop + ridgeY) * 0.5, -bodyD * 0.25);
  back_roof_panel.rotation.x = -roofAngle;
  root.add(back_roof_panel);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-bodyD * 0.5, 0);
  gableShape.lineTo(bodyD * 0.5, 0);
  gableShape.lineTo(0, roofRise);
  gableShape.closePath();

  const gableGeom = new THREE.ExtrudeGeometry(gableShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: false
  });

  const right_gable = new THREE.Mesh(gableGeom, roofMat);
  right_gable.name = "right_gable";
  right_gable.rotation.y = Math.PI * 0.5;
  right_gable.position.set(bodyW * 0.5 - 0.0125, bodyTop, 0);
  root.add(right_gable);

  const left_gable = new THREE.Mesh(gableGeom, roofMat);
  left_gable.name = "left_gable";
  left_gable.rotation.y = -Math.PI * 0.5;
  left_gable.position.set(-bodyW * 0.5 + 0.0125, bodyTop, 0);
  root.add(left_gable);

  const top_sealGeom = new THREE.BoxGeometry(bodyW * 0.98, 0.14, 0.06);
  const top_seal = new THREE.Mesh(top_sealGeom, roofMat);
  top_seal.name = "top_seal";
  top_seal.position.set(0, ridgeY + 0.06, 0);
  root.add(top_seal);

  const top_seal_roundGeom = new THREE.CylinderGeometry(0.03, 0.03, bodyW * 0.98, 12);
  const top_seal_round = new THREE.Mesh(top_seal_roundGeom, roofMat);
  top_seal_round.name = "top_seal_round";
  top_seal_round.rotation.z = Math.PI * 0.5;
  top_seal_round.position.set(0, ridgeY + 0.13, 0);
  root.add(top_seal_round);

  const top_seal_shadowGeom = new THREE.CylinderGeometry(0.009, 0.009, bodyW * 0.9, 8);
  const top_seal_shadow = new THREE.Mesh(top_seal_shadowGeom, foldMat);
  top_seal_shadow.name = "top_seal_shadow";
  top_seal_shadow.rotation.z = Math.PI * 0.5;
  top_seal_shadow.position.set(0, ridgeY - 0.005, 0.031);
  root.add(top_seal_shadow);

  const roof_front_foldGeom = new THREE.CylinderGeometry(0.012, 0.012, bodyW * 0.98, 10);
  const roof_front_fold = new THREE.Mesh(roof_front_foldGeom, foldMat);
  roof_front_fold.name = "roof_front_fold";
  roof_front_fold.rotation.z = Math.PI * 0.5;
  roof_front_fold.position.set(0, bodyTop + 0.008, bodyD * 0.5 + 0.012);
  root.add(roof_front_fold);

  const roof_back_fold = new THREE.Mesh(roof_front_foldGeom, foldMat);
  roof_back_fold.name = "roof_back_fold";
  roof_back_fold.rotation.z = Math.PI * 0.5;
  roof_back_fold.position.set(0, bodyTop + 0.008, -bodyD * 0.5 - 0.012);
  root.add(roof_back_fold);

  const roof_ridge_foldGeom = new THREE.CylinderGeometry(0.014, 0.014, bodyW * 0.98, 10);
  const roof_ridge_fold = new THREE.Mesh(roof_ridge_foldGeom, foldMat);
  roof_ridge_fold.name = "roof_ridge_fold";
  roof_ridge_fold.rotation.z = Math.PI * 0.5;
  roof_ridge_fold.position.set(0, ridgeY + 0.005, 0);
  root.add(roof_ridge_fold);

  const unitRodGeom = new THREE.CylinderGeometry(1, 1, 1, 10);

  function createRod(name, p1, p2, radius, material) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const rod = new THREE.Mesh(unitRodGeom, material);
    rod.name = name;
    rod.position.copy(p1).add(p2).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    rod.scale.set(radius, length, radius);
    return rod;
  }

  const top_frame_front = createRod(
    "top_frame_front",
    new THREE.Vector3(-bodyW * 0.5, bodyTop, bodyD * 0.5),
    new THREE.Vector3(bodyW * 0.5, bodyTop, bodyD * 0.5),
    0.026,
    frameMat
  );
  root.add(top_frame_front);

  const top_frame_back = createRod(
    "top_frame_back",
    new THREE.Vector3(-bodyW * 0.5, bodyTop, -bodyD * 0.5),
    new THREE.Vector3(bodyW * 0.5, bodyTop, -bodyD * 0.5),
    0.026,
    frameMat
  );
  root.add(top_frame_back);

  const top_frame_left = createRod(
    "top_frame_left",
    new THREE.Vector3(-bodyW * 0.5, bodyTop, -bodyD * 0.5),
    new THREE.Vector3(-bodyW * 0.5, bodyTop, bodyD * 0.5),
    0.026,
    frameMat
  );
  root.add(top_frame_left);

  const top_frame_right = createRod(
    "top_frame_right",
    new THREE.Vector3(bodyW * 0.5, bodyTop, -bodyD * 0.5),
    new THREE.Vector3(bodyW * 0.5, bodyTop, bodyD * 0.5),
    0.026,
    frameMat
  );
  root.add(top_frame_right);

  const bottom_frame_front = createRod(
    "bottom_frame_front",
    new THREE.Vector3(-bodyW * 0.5, bodyBottom, bodyD * 0.5),
    new THREE.Vector3(bodyW * 0.5, bodyBottom, bodyD * 0.5),
    0.026,
    frameMat
  );
  root.add(bottom_frame_front);

  const bottom_frame_back = createRod(
    "bottom_frame_back",
    new THREE.Vector3(-bodyW * 0.5, bodyBottom, -bodyD * 0.5),
    new THREE.Vector3(bodyW * 0.5, bodyBottom, -bodyD * 0.5),
    0.026,
    frameMat
  );
  root.add(bottom_frame_back);

  const bottom_frame_left = createRod(
    "bottom_frame_left",
    new THREE.Vector3(-bodyW * 0.5, bodyBottom, -bodyD * 0.5),
    new THREE.Vector3(-bodyW * 0.5, bodyBottom, bodyD * 0.5),
    0.026,
    frameMat
  );
  root.add(bottom_frame_left);

  const bottom_frame_right = createRod(
    "bottom_frame_right",
    new THREE.Vector3(bodyW * 0.5, bodyBottom, -bodyD * 0.5),
    new THREE.Vector3(bodyW * 0.5, bodyBottom, bodyD * 0.5),
    0.026,
    frameMat
  );
  root.add(bottom_frame_right);

  const corner_postsGeom = new THREE.CylinderGeometry(0.022, 0.022, bodyH, 12);
  const corner_posts = new THREE.InstancedMesh(corner_postsGeom, frameMat, 4);
  corner_posts.name = "corner_posts";
  const post_dummy = new THREE.Object3D();
  const post_positions = [
    [-bodyW * 0.5, bodyBottom + bodyH * 0.5, -bodyD * 0.5],
    [bodyW * 0.5, bodyBottom + bodyH * 0.5, -bodyD * 0.5],
    [-bodyW * 0.5, bodyBottom + bodyH * 0.5, bodyD * 0.5],
    [bodyW * 0.5, bodyBottom + bodyH * 0.5, bodyD * 0.5]
  ];
  for (let i = 0; i < post_positions.length; i++) {
    const p = post_positions[i];
    post_dummy.position.set(p[0], p[1], p[2]);
    post_dummy.updateMatrix();
    corner_posts.setMatrixAt(i, post_dummy.matrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  root.add(corner_posts);

  const corner_connectorsGeom = new THREE.SphereGeometry(0.034, 12, 8);
  const corner_connectors = new THREE.InstancedMesh(corner_connectorsGeom, frameMat, 8);
  corner_connectors.name = "corner_connectors";
  const connector_dummy = new THREE.Object3D();
  let connector_index = 0;
  for (const y of [bodyBottom, bodyTop]) {
    for (const x of [-bodyW * 0.5, bodyW * 0.5]) {
      for (const z of [-bodyD * 0.5, bodyD * 0.5]) {
        connector_dummy.position.set(x, y, z);
        connector_dummy.updateMatrix();
        corner_connectors.setMatrixAt(connector_index, connector_dummy.matrix);
        connector_index++;
      }
    }
  }
  corner_connectors.instanceMatrix.needsUpdate = true;
  root.add(corner_connectors);

  function createNeonPath(name, points, radius, closed) {
    const vectors = [];
    for (let i = 0; i < points.length; i++) {
      vectors.push(new THREE.Vector3(points[i][0], points[i][1], 0));
    }
    const curve = new THREE.CatmullRomCurve3(vectors, closed, "centripetal");
    const segments = closed ? Math.max(32, points.length * 5) : Math.max(24, points.length * 4);
    const geometry = new THREE.TubeGeometry(curve, segments, radius, 8, closed);
    const neon = new THREE.Mesh(geometry, neonMat);
    neon.name = name;
    return neon;
  }

  function createFlatDetail(name, geometry, material, x, y, z, sx, sy) {
    const detail = new THREE.Mesh(geometry, material);
    detail.name = name;
    detail.position.set(x, y, z);
    detail.scale.set(sx, sy, 1);
    return detail;
  }

  const cow_head_outline = createNeonPath("cow_head_outline", [
    [-0.34, 0.82], [-0.43, 0.89], [-0.40, 0.98], [-0.30, 0.96],
    [-0.25, 1.06], [-0.18, 1.02], [-0.13, 1.10], [-0.03, 1.08],
    [0.07, 1.00], [0.18, 1.04], [0.29, 0.98], [0.34, 0.89],
    [0.31, 0.79], [0.26, 0.72], [0.22, 0.61], [0.13, 0.55],
    [0.03, 0.53], [-0.08, 0.56], [-0.18, 0.63], [-0.25, 0.73],
    [-0.31, 0.76]
  ], 0.014, true);

  const cow_left_ear_outline = createNeonPath("cow_left_ear_outline", [
    [-0.31, 0.96], [-0.43, 1.04], [-0.49, 0.99],
    [-0.47, 0.91], [-0.38, 0.87]
  ], 0.013, true);

  const cow_right_ear_outline = createNeonPath("cow_right_ear_outline", [
    [0.24, 0.99], [0.38, 1.05], [0.47, 0.98],
    [0.43, 0.89], [0.33, 0.87]
  ], 0.013, true);

  const cow_left_horn_outline = createNeonPath("cow_left_horn_outline", [
    [-0.23, 1.06], [-0.27, 1.18], [-0.22, 1.24],
    [-0.17, 1.17], [-0.14, 1.09]
  ], 0.013, true);

  const cow_right_horn_outline = createNeonPath("cow_right_horn_outline", [
    [0.13, 1.09], [0.18, 1.20], [0.25, 1.24],
    [0.29, 1.16], [0.25, 1.04]
  ], 0.013, true);

  const cow_muzzle_outline = createNeonPath("cow_muzzle_outline", [
    [-0.18, 0.73], [-0.13, 0.80], [-0.02, 0.82],
    [0.12, 0.80], [0.20, 0.73], [0.16, 0.64],
    [0.06, 0.59], [-0.07, 0.60], [-0.16, 0.66]
  ], 0.013, true);

  const cow_left_eye_ringGeom = new THREE.RingGeometry(0.018, 0.033, 18);
  const cow_left_eye_ring = createFlatDetail(
    "cow_left_eye_ring", cow_left_eye_ringGeom, neonMat,
    -0.13, 0.86, 0.026, 1, 1.35
  );

  const cow_right_eye_ringGeom = new THREE.RingGeometry(0.018, 0.033, 18);
  const cow_right_eye_ring = createFlatDetail(
    "cow_right_eye_ring", cow_right_eye_ringGeom, neonMat,
    0.14, 0.86, 0.026, 1, 1.35
  );

  const cow_left_pupilGeom = new THREE.CircleGeometry(0.012, 16);
  const cow_left_pupil = createFlatDetail(
    "cow_left_pupil", cow_left_pupilGeom, dark_detailMat,
    -0.13, 0.86, 0.029, 1, 1.25
  );

  const cow_right_pupilGeom = new THREE.CircleGeometry(0.012, 16);
  const cow_right_pupil = createFlatDetail(
    "cow_right_pupil", cow_right_pupilGeom, dark_detailMat,
    0.14, 0.86, 0.029, 1, 1.25
  );

  const cow_left_nostrilGeom = new THREE.CircleGeometry(0.014, 14);
  const cow_left_nostril = createFlatDetail(
    "cow_left_nostril", cow_left_nostrilGeom, dark_detailMat,
    -0.08, 0.69, 0.03, 0.75, 1.15
  );

  const cow_right_nostrilGeom = new THREE.CircleGeometry(0.014, 14);
  const cow_right_nostril = createFlatDetail(
    "cow_right_nostril", cow_right_nostrilGeom, dark_detailMat,
    0.11, 0.69, 0.03, 0.75, 1.15
  );

  const cow_left_leg_outline = createNeonPath("cow_left_leg_outline", [
    [-0.31, 0.54], [-0.34, 0.36], [-0.34, 0.16],
    [-0.30, 0.12], [-0.24, 0.14], [-0.22, 0.19],
    [-0.25, 0.23], [-0.23, 0.42], [-0.16, 0.56]
  ], 0.014, false);

  const cow_right_leg_outline = createNeonPath("cow_right_leg_outline", [
    [0.12, 0.55], [0.15, 0.43], [0.15, 0.22],
    [0.19, 0.16], [0.26, 0.15], [0.30, 0.20],
    [0.27, 0.24], [0.28, 0.40], [0.23, 0.56]
  ], 0.014, false);

  const cow_tail_outline = createNeonPath("cow_tail_outline", [
    [0.23, 0.57], [0.34, 0.52], [0.39, 0.43],
    [0.38, 0.34], [0.33, 0.31], [0.31, 0.36]
  ], 0.013, false);

  const cow_front_decoration = new THREE.Group();
  cow_front_decoration.name = "cow_front_decoration";
  cow_front_decoration.add(
    cow_head_outline,
    cow_left_ear_outline,
    cow_right_ear_outline,
    cow_left_horn_outline,
    cow_right_horn_outline,
    cow_muzzle_outline,
    cow_left_eye_ring,
    cow_right_eye_ring,
    cow_left_pupil,
    cow_right_pupil,
    cow_left_nostril,
    cow_right_nostril,
    cow_left_leg_outline,
    cow_right_leg_outline,
    cow_tail_outline
  );
  cow_front_decoration.position.set(0.035, 0, bodyD * 0.5 + 0.012);
  cow_front_decoration.scale.setScalar(0.88);
  root.add(cow_front_decoration);

  const cow_side_head_outline = createNeonPath("cow_side_head_outline", [
    [-0.30, 0.83], [-0.37, 0.91], [-0.34, 1.00], [-0.25, 0.97],
    [-0.20, 1.08], [-0.10, 1.08], [-0.02, 1.01], [0.09, 1.04],
    [0.20, 0.98], [0.27, 0.89], [0.25, 0.78], [0.19, 0.68],
    [0.10, 0.59], [-0.02, 0.56], [-0.14, 0.61], [-0.23, 0.72]
  ], 0.013, true);

  const cow_side_left_ear = createNeonPath("cow_side_left_ear", [
    [-0.27, 0.98], [-0.39, 1.03], [-0.43, 0.96],
    [-0.39, 0.88], [-0.31, 0.87]
  ], 0.012, true);

  const cow_side_right_ear = createNeonPath("cow_side_right_ear", [
    [0.18, 0.99], [0.31, 1.03], [0.37, 0.96],
    [0.34, 0.88], [0.25, 0.87]
  ], 0.012, true);

  const cow_side_left_horn = createNeonPath("cow_side_left_horn", [
    [-0.20, 1.07], [-0.23, 1.18], [-0.17, 1.23],
    [-0.12, 1.15], [-0.10, 1.07]
  ], 0.012, true);

  const cow_side_right_horn = createNeonPath("cow_side_right_horn", [
    [0.08, 1.06], [0.13, 1.17], [0.20, 1.20],
    [0.23, 1.12], [0.19, 1.02]
  ], 0.012, true);

  const cow_side_muzzle = createNeonPath("cow_side_muzzle", [
    [-0.17, 0.74], [-0.10, 0.81], [0.02, 0.82],
    [0.15, 0.77], [0.17, 0.68], [0.09, 0.61],
    [-0.04, 0.60], [-0.14, 0.66]
  ], 0.012, true);

  const cow_side_eye_ringGeom = new THREE.RingGeometry(0.017, 0.031, 18);
  const cow_side_eye_ring = createFlatDetail(
    "cow_side_eye_ring", cow_side_eye_ringGeom, neonMat,
    -0.08, 0.87, 0.026, 1, 1.35
  );

  const cow_side_eye_pupilGeom = new THREE.CircleGeometry(0.011, 14);
  const cow_side_eye_pupil = createFlatDetail(
    "cow_side_eye_pupil", cow_side_eye_pupilGeom, dark_detailMat,
    -0.08, 0.87, 0.029, 1, 1.2
  );

  const cow_side_nostrilGeom = new THREE.CircleGeometry(0.013, 14);
  const cow_side_nostril = createFlatDetail(
    "cow_side_nostril", cow_side_nostrilGeom, dark_detailMat,
    0.10, 0.68, 0.03, 0.75, 1.1
  );

  const cow_side_front_leg = createNeonPath("cow_side_front_leg", [
    [-0.20, 0.59], [-0.24, 0.42], [-0.24, 0.19],
    [-0.20, 0.14], [-0.14, 0.16], [-0.12, 0.22],
    [-0.15, 0.27], [-0.13, 0.45], [-0.08, 0.57]
  ], 0.013, false);

  const cow_side_rear_leg = createNeonPath("cow_side_rear_leg", [
    [0.08, 0.58], [0.11, 0.43], [0.11, 0.22],
    [0.15, 0.17], [0.22, 0.17], [0.25, 0.22],
    [0.22, 0.27], [0.22, 0.43], [0.18, 0.60]
  ], 0.013, false);

  const cow_side_udderGeom = new THREE.CircleGeometry(0.065, 20);
  const cow_side_udder = createFlatDetail(
    "cow_side_udder", cow_side_udderGeom, udderMat,
    0.24, 0.53, 0.025, 1.25, 0.85
  );

  const cow_side_tail = createNeonPath("cow_side_tail", [
    [0.20, 0.62], [0.31, 0.57], [0.36, 0.48],
    [0.35, 0.39], [0.30, 0.36], [0.28, 0.41]
  ], 0.012, false);

  const cow_side_decoration = new THREE.Group();
  cow_side_decoration.name = "cow_side_decoration";
  cow_side_decoration.add(
    cow_side_head_outline,
    cow_side_left_ear,
    cow_side_right_ear,
    cow_side_left_horn,
    cow_side_right_horn,
    cow_side_muzzle,
    cow_side_eye_ring,
    cow_side_eye_pupil,
    cow_side_nostril,
    cow_side_front_leg,
    cow_side_rear_leg,
    cow_side_udder,
    cow_side_tail
  );
  cow_side_decoration.position.set(-bodyW * 0.5 - 0.012, 0, 0.015);
  cow_side_decoration.rotation.y = -Math.PI * 0.5;
  cow_side_decoration.scale.setScalar(0.84);
  root.add(cow_side_decoration);

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