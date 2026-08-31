export default function generate(THREE) {
  const root = new THREE.Group();

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb88a32,
    metalness: 0.55,
    roughness: 0.38,
  });
  const brightBrassMat = new THREE.MeshStandardMaterial({
    color: 0xd0a348,
    metalness: 0.5,
    roughness: 0.3,
  });
  const agedBrassMat = new THREE.MeshStandardMaterial({
    color: 0x8f6725,
    metalness: 0.5,
    roughness: 0.5,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xd8d7c9,
    metalness: 0.0,
    roughness: 0.8,
  });
  const darkDialMat = new THREE.MeshStandardMaterial({
    color: 0x686d6c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const scaleMat = new THREE.MeshStandardMaterial({
    color: 0xe6e4d5,
    metalness: 0.0,
    roughness: 0.8,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x292a27,
    metalness: 0.0,
    roughness: 0.8,
  });
  const redMarkingMat = new THREE.MeshStandardMaterial({
    color: 0x9c352d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(0, -1.64);
  bodyShape.bezierCurveTo(0.24, -1.65, 0.42, -1.52, 0.52, -1.30);
  bodyShape.bezierCurveTo(0.66, -1.00, 0.72, -0.62, 0.68, -0.30);
  bodyShape.bezierCurveTo(0.65, 0.02, 0.52, 0.28, 0.30, 0.42);
  bodyShape.bezierCurveTo(0.23, 0.47, 0.21, 0.54, 0.20, 0.63);
  bodyShape.lineTo(-0.20, 0.63);
  bodyShape.bezierCurveTo(-0.21, 0.54, -0.23, 0.47, -0.30, 0.42);
  bodyShape.bezierCurveTo(-0.52, 0.28, -0.65, 0.02, -0.68, -0.30);
  bodyShape.bezierCurveTo(-0.72, -0.62, -0.66, -1.00, -0.52, -1.30);
  bodyShape.bezierCurveTo(-0.42, -1.52, -0.24, -1.65, 0, -1.64);
  bodyShape.closePath();

  const body_caseGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.48,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.055,
    bevelSegments: 4,
  });
  const body_case = new THREE.Mesh(body_caseGeom, brassMat);
  body_case.position.z = -0.24;
  root.add(body_case);

  const neckProfile = [
    new THREE.Vector2(0, 0.28),
    new THREE.Vector2(0.31, 0.28),
    new THREE.Vector2(0.29, 0.40),
    new THREE.Vector2(0.23, 0.55),
    new THREE.Vector2(0.20, 0.75),
    new THREE.Vector2(0.19, 0.94),
    new THREE.Vector2(0.23, 1.08),
    new THREE.Vector2(0.30, 1.15),
    new THREE.Vector2(0.31, 1.20),
    new THREE.Vector2(0, 1.20),
  ];
  const neckGeom = new THREE.LatheGeometry(neckProfile, 48);
  const neck = new THREE.Mesh(neckGeom, brassMat);
  root.add(neck);

  const upper_housingGeom = new THREE.SphereGeometry(1, 48, 28);
  const upper_housing = new THREE.Mesh(upper_housingGeom, brassMat);
  upper_housing.position.set(0, 1.63, 0);
  upper_housing.scale.set(0.64, 0.72, 0.34);
  root.add(upper_housing);

  const lower_footGeom = new THREE.SphereGeometry(1, 32, 18);
  const lower_foot = new THREE.Mesh(lower_footGeom, brightBrassMat);
  lower_foot.position.set(0, -1.61, 0);
  lower_foot.scale.set(0.28, 0.12, 0.25);
  root.add(lower_foot);

  const bottom_seamGeom = new THREE.TorusGeometry(0.205, 0.012, 8, 40);
  const bottom_seam = new THREE.Mesh(bottom_seamGeom, agedBrassMat);
  bottom_seam.rotation.x = Math.PI / 2;
  bottom_seam.position.y = -1.54;
  root.add(bottom_seam);

  const neck_collarGeom = new THREE.TorusGeometry(0.27, 0.035, 10, 48);
  const neck_collar = new THREE.Mesh(neck_collarGeom, brightBrassMat);
  neck_collar.rotation.x = Math.PI / 2;
  neck_collar.position.y = 1.08;
  root.add(neck_collar);

  const upper_dial_faceGeom = new THREE.CircleGeometry(0.465, 64);
  const upper_dial_face = new THREE.Mesh(upper_dial_faceGeom, dialMat);
  upper_dial_face.position.set(0, 1.63, 0.347);
  root.add(upper_dial_face);

  const upper_bezelGeom = new THREE.TorusGeometry(0.50, 0.055, 14, 64);
  const upper_bezel = new THREE.Mesh(upper_bezelGeom, brightBrassMat);
  upper_bezel.position.set(0, 1.63, 0.365);
  root.add(upper_bezel);

  const upper_inner_ringGeom = new THREE.TorusGeometry(0.458, 0.012, 8, 64);
  const upper_inner_ring = new THREE.Mesh(upper_inner_ringGeom, silverMat);
  upper_inner_ring.position.set(0, 1.63, 0.369);
  root.add(upper_inner_ring);

  const upper_minor_tickGeom = new THREE.BoxGeometry(0.008, 0.035, 0.006);
  const upper_minor_ticks = new THREE.InstancedMesh(
    upper_minor_tickGeom,
    markingMat,
    48
  );
  const upperTickDummy = new THREE.Object3D();
  for (let i = 0; i < 48; i++) {
    const angle = (i / 48) * Math.PI * 2;
    const radius = 0.410;
    upperTickDummy.position.set(
      Math.sin(angle) * radius,
      1.63 + Math.cos(angle) * radius,
      0.357
    );
    upperTickDummy.rotation.set(0, 0, -angle);
    upperTickDummy.scale.set(1, 1, 1);
    upperTickDummy.updateMatrix();
    upper_minor_ticks.setMatrixAt(i, upperTickDummy.matrix);
  }
  upper_minor_ticks.instanceMatrix.needsUpdate = true;
  root.add(upper_minor_ticks);

  const upper_major_tickGeom = new THREE.BoxGeometry(0.013, 0.065, 0.008);
  const upper_major_ticks = new THREE.InstancedMesh(
    upper_major_tickGeom,
    markingMat,
    12
  );
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 0.395;
    upperTickDummy.position.set(
      Math.sin(angle) * radius,
      1.63 + Math.cos(angle) * radius,
      0.359
    );
    upperTickDummy.rotation.set(0, 0, -angle);
    upperTickDummy.scale.set(1, 1, 1);
    upperTickDummy.updateMatrix();
    upper_major_ticks.setMatrixAt(i, upperTickDummy.matrix);
  }
  upper_major_ticks.instanceMatrix.needsUpdate = true;
  root.add(upper_major_ticks);

  const upper_dial_numberGeom = new THREE.CircleGeometry(0.018, 10);
  const upper_dial_numbers = new THREE.InstancedMesh(
    upper_dial_numberGeom,
    markingMat,
    10
  );
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const radius = 0.292;
    upperTickDummy.position.set(
      Math.sin(angle) * radius,
      1.63 + Math.cos(angle) * radius,
      0.359
    );
    upperTickDummy.rotation.set(0, 0, 0);
    upperTickDummy.scale.set(0.7, 1, 1);
    upperTickDummy.updateMatrix();
    upper_dial_numbers.setMatrixAt(i, upperTickDummy.matrix);
  }
  upper_dial_numbers.instanceMatrix.needsUpdate = true;
  root.add(upper_dial_numbers);

  const upper_subdialGeom = new THREE.CircleGeometry(0.092, 32);
  const upper_subdial = new THREE.Mesh(upper_subdialGeom, scaleMat);
  upper_subdial.position.set(-0.02, 1.48, 0.361);
  root.add(upper_subdial);

  const upper_subdial_ringGeom = new THREE.TorusGeometry(0.087, 0.008, 8, 32);
  const upper_subdial_ring = new THREE.Mesh(upper_subdial_ringGeom, markingMat);
  upper_subdial_ring.position.set(-0.02, 1.48, 0.364);
  root.add(upper_subdial_ring);

  const upper_subdial_handGeom = new THREE.BoxGeometry(0.010, 0.070, 0.006);
  const upper_subdial_hand = new THREE.Mesh(upper_subdial_handGeom, markingMat);
  upper_subdial_hand.position.set(-0.02, 1.515, 0.368);
  upper_subdial_hand.rotation.z = -0.22;
  root.add(upper_subdial_hand);

  const upper_subdial_hubGeom = new THREE.CylinderGeometry(
    0.020,
    0.020,
    0.012,
    16
  );
  const upper_subdial_hub = new THREE.Mesh(upper_subdial_hubGeom, agedBrassMat);
  upper_subdial_hub.rotation.x = Math.PI / 2;
  upper_subdial_hub.position.set(-0.02, 1.48, 0.37);
  root.add(upper_subdial_hub);

  const upper_main_hand_pivot = new THREE.Group();
  upper_main_hand_pivot.position.set(0, 1.63, 0.371);
  upper_main_hand_pivot.rotation.z = -0.16;
  root.add(upper_main_hand_pivot);

  const upper_main_handGeom = new THREE.BoxGeometry(0.018, 0.34, 0.008);
  const upper_main_hand = new THREE.Mesh(upper_main_handGeom, markingMat);
  upper_main_hand.position.y = 0.17;
  upper_main_hand_pivot.add(upper_main_hand);

  const upper_main_counterweightGeom = new THREE.BoxGeometry(
    0.026,
    0.10,
    0.009
  );
  const upper_main_counterweight = new THREE.Mesh(
    upper_main_counterweightGeom,
    markingMat
  );
  upper_main_counterweight.position.y = -0.05;
  upper_main_hand_pivot.add(upper_main_counterweight);

  const upper_red_hand_pivot = new THREE.Group();
  upper_red_hand_pivot.position.set(0, 1.63, 0.374);
  upper_red_hand_pivot.rotation.z = 2.25;
  root.add(upper_red_hand_pivot);

  const upper_red_handGeom = new THREE.BoxGeometry(0.010, 0.31, 0.006);
  const upper_red_hand = new THREE.Mesh(upper_red_handGeom, redMarkingMat);
  upper_red_hand.position.y = 0.155;
  upper_red_hand_pivot.add(upper_red_hand);

  const upper_center_hubGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.018,
    24
  );
  const upper_center_hub = new THREE.Mesh(upper_center_hubGeom, agedBrassMat);
  upper_center_hub.rotation.x = Math.PI / 2;
  upper_center_hub.position.set(0, 1.63, 0.38);
  root.add(upper_center_hub);

  const upper_center_capGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    0.021,
    20
  );
  const upper_center_cap = new THREE.Mesh(upper_center_capGeom, silverMat);
  upper_center_cap.rotation.x = Math.PI / 2;
  upper_center_cap.position.set(0, 1.63, 0.386);
  root.add(upper_center_cap);

  const upper_dial_glassGeom = new THREE.CircleGeometry(0.452, 64);
  const upper_dial_glass = new THREE.Mesh(upper_dial_glassGeom, glassMat);
  upper_dial_glass.position.set(0, 1.63, 0.391);
  root.add(upper_dial_glass);

  const vent_holeGeom = new THREE.CircleGeometry(0.034, 18);
  const vent_holes = new THREE.InstancedMesh(vent_holeGeom, markingMat, 2);
  const ventDummy = new THREE.Object3D();
  const ventPositions = [
    [0.31, 1.22, 0.276],
    [0.39, 1.16, 0.242],
  ];
  for (let i = 0; i < ventPositions.length; i++) {
    const p = ventPositions[i];
    ventDummy.position.set(p[0], p[1], p[2]);
    ventDummy.rotation.set(0, 0, -0.25);
    ventDummy.scale.set(1, 0.52, 1);
    ventDummy.updateMatrix();
    vent_holes.setMatrixAt(i, ventDummy.matrix);
  }
  vent_holes.instanceMatrix.needsUpdate = true;
  root.add(vent_holes);

  const lower_dial_faceGeom = new THREE.CircleGeometry(0.505, 64);
  const lower_dial_face = new THREE.Mesh(lower_dial_faceGeom, darkDialMat);
  lower_dial_face.position.set(-0.04, -0.62, 0.347);
  root.add(lower_dial_face);

  const lower_bezelGeom = new THREE.TorusGeometry(0.535, 0.045, 12, 64);
  const lower_bezel = new THREE.Mesh(lower_bezelGeom, agedBrassMat);
  lower_bezel.position.set(-0.04, -0.62, 0.365);
  root.add(lower_bezel);

  const lower_inner_ringGeom = new THREE.TorusGeometry(0.493, 0.012, 8, 64);
  const lower_inner_ring = new THREE.Mesh(lower_inner_ringGeom, silverMat);
  lower_inner_ring.position.set(-0.04, -0.62, 0.369);
  root.add(lower_inner_ring);

  const lower_minor_tickGeom = new THREE.BoxGeometry(0.008, 0.038, 0.006);
  const lower_minor_ticks = new THREE.InstancedMesh(
    lower_minor_tickGeom,
    scaleMat,
    50
  );
  const lowerTickDummy = new THREE.Object3D();
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 2;
    const radius = 0.445;
    lowerTickDummy.position.set(
      -0.04 + Math.sin(angle) * radius,
      -0.62 + Math.cos(angle) * radius,
      0.357
    );
    lowerTickDummy.rotation.set(0, 0, -angle);
    lowerTickDummy.scale.set(1, 1, 1);
    lowerTickDummy.updateMatrix();
    lower_minor_ticks.setMatrixAt(i, lowerTickDummy.matrix);
  }
  lower_minor_ticks.instanceMatrix.needsUpdate = true;
  root.add(lower_minor_ticks);

  const lower_major_tickGeom = new THREE.BoxGeometry(0.013, 0.068, 0.008);
  const lower_major_ticks = new THREE.InstancedMesh(
    lower_major_tickGeom,
    scaleMat,
    10
  );
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const radius = 0.430;
    lowerTickDummy.position.set(
      -0.04 + Math.sin(angle) * radius,
      -0.62 + Math.cos(angle) * radius,
      0.359
    );
    lowerTickDummy.rotation.set(0, 0, -angle);
    lowerTickDummy.scale.set(1, 1, 1);
    lowerTickDummy.updateMatrix();
    lower_major_ticks.setMatrixAt(i, lowerTickDummy.matrix);
  }
  lower_major_ticks.instanceMatrix.needsUpdate = true;
  root.add(lower_major_ticks);

  const lower_dial_numberGeom = new THREE.CircleGeometry(0.019, 10);
  const lower_dial_numbers = new THREE.InstancedMesh(
    lower_dial_numberGeom,
    scaleMat,
    10
  );
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const radius = 0.340;
    lowerTickDummy.position.set(
      -0.04 + Math.sin(angle) * radius,
      -0.62 + Math.cos(angle) * radius,
      0.359
    );
    lowerTickDummy.rotation.set(0, 0, 0);
    lowerTickDummy.scale.set(0.72, 1, 1);
    lowerTickDummy.updateMatrix();
    lower_dial_numbers.setMatrixAt(i, lowerTickDummy.matrix);
  }
  lower_dial_numbers.instanceMatrix.needsUpdate = true;
  root.add(lower_dial_numbers);

  const lower_main_hand_pivot = new THREE.Group();
  lower_main_hand_pivot.position.set(-0.04, -0.62, 0.371);
  lower_main_hand_pivot.rotation.z = 0.42;
  root.add(lower_main_hand_pivot);

  const lower_main_handGeom = new THREE.BoxGeometry(0.018, 0.39, 0.008);
  const lower_main_hand = new THREE.Mesh(lower_main_handGeom, silverMat);
  lower_main_hand.position.y = 0.195;
  lower_main_hand_pivot.add(lower_main_hand);

  const lower_main_counterweightGeom = new THREE.BoxGeometry(
    0.030,
    0.12,
    0.009
  );
  const lower_main_counterweight = new THREE.Mesh(
    lower_main_counterweightGeom,
    silverMat
  );
  lower_main_counterweight.position.y = -0.06;
  lower_main_hand_pivot.add(lower_main_counterweight);

  const lower_red_hand_pivot = new THREE.Group();
  lower_red_hand_pivot.position.set(-0.04, -0.62, 0.374);
  lower_red_hand_pivot.rotation.z = Math.PI;
  root.add(lower_red_hand_pivot);

  const lower_red_handGeom = new THREE.BoxGeometry(0.010, 0.43, 0.006);
  const lower_red_hand = new THREE.Mesh(lower_red_handGeom, redMarkingMat);
  lower_red_hand.position.y = 0.215;
  lower_red_hand_pivot.add(lower_red_hand);

  const lower_center_hubGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.018,
    24
  );
  const lower_center_hub = new THREE.Mesh(lower_center_hubGeom, agedBrassMat);
  lower_center_hub.rotation.x = Math.PI / 2;
  lower_center_hub.position.set(-0.04, -0.62, 0.38);
  root.add(lower_center_hub);

  const lower_center_capGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.022,
    20
  );
  const lower_center_cap = new THREE.Mesh(lower_center_capGeom, brightBrassMat);
  lower_center_cap.rotation.x = Math.PI / 2;
  lower_center_cap.position.set(-0.04, -0.62, 0.387);
  root.add(lower_center_cap);

  const lower_dial_glassGeom = new THREE.CircleGeometry(0.497, 64);
  const lower_dial_glass = new THREE.Mesh(lower_dial_glassGeom, glassMat);
  lower_dial_glass.position.set(-0.04, -0.62, 0.391);
  root.add(lower_dial_glass);

  const side_dial_backplateGeom = new THREE.CylinderGeometry(
    0.52,
    0.52,
    0.07,
    64
  );
  const side_dial_backplate = new THREE.Mesh(
    side_dial_backplateGeom,
    agedBrassMat
  );
  side_dial_backplate.rotation.z = Math.PI / 2;
  side_dial_backplate.position.set(0.65, -0.55, -0.01);
  root.add(side_dial_backplate);

  const side_dial_faceGeom = new THREE.CircleGeometry(0.435, 64);
  const side_dial_face = new THREE.Mesh(side_dial_faceGeom, dialMat);
  side_dial_face.rotation.y = Math.PI / 2;
  side_dial_face.position.set(0.692, -0.55, -0.01);
  root.add(side_dial_face);

  const side_dial_scale_ringGeom = new THREE.TorusGeometry(
    0.432,
    0.010,
    8,
    64
  );
  const side_dial_scale_ring = new THREE.Mesh(
    side_dial_scale_ringGeom,
    silverMat
  );
  side_dial_scale_ring.rotation.y = Math.PI / 2;
  side_dial_scale_ring.position.set(0.704, -0.55, -0.01);
  root.add(side_dial_scale_ring);

  const side_dial_inner_ringGeom = new THREE.TorusGeometry(
    0.392,
    0.006,
    8,
    64
  );
  const side_dial_inner_ring = new THREE.Mesh(
    side_dial_inner_ringGeom,
    markingMat
  );
  side_dial_inner_ring.rotation.y = Math.PI / 2;
  side_dial_inner_ring.position.set(0.706, -0.55, -0.01);
  root.add(side_dial_inner_ring);

  const side_dial_tickGeom = new THREE.BoxGeometry(0.008, 0.035, 0.009);
  const side_dial_ticks = new THREE.InstancedMesh(
    side_dial_tickGeom,
    markingMat,
    40
  );
  const sideTickDummy = new THREE.Object3D();
  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2;
    const radius = 0.370;
    sideTickDummy.position.set(
      0.708,
      -0.55 + Math.cos(angle) * radius,
      -0.01 + Math.sin(angle) * radius
    );
    sideTickDummy.rotation.set(angle, 0, 0);
    sideTickDummy.scale.set(1, 1, 1);
    sideTickDummy.updateMatrix();
    side_dial_ticks.setMatrixAt(i, sideTickDummy.matrix);
  }
  side_dial_ticks.instanceMatrix.needsUpdate = true;
  root.add(side_dial_ticks);

  const side_dial_numberGeom = new THREE.CircleGeometry(0.023, 10);
  const side_dial_numbers = new THREE.InstancedMesh(
    side_dial_numberGeom,
    markingMat,
    8
  );
  const sideNumberDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 0.286;
    sideNumberDummy.position.set(
      0.711,
      -0.55 + Math.cos(angle) * radius,
      -0.01 + Math.sin(angle) * radius
    );
    sideNumberDummy.rotation.set(angle, 0, 0);
    sideNumberDummy.scale.set(1, 0.68, 1);
    sideNumberDummy.updateMatrix();
    side_dial_numbers.setMatrixAt(i, sideNumberDummy.matrix);
  }
  side_dial_numbers.instanceMatrix.needsUpdate = true;
  root.add(side_dial_numbers);

  const side_dial_knob_baseGeom = new THREE.CylinderGeometry(
    0.105,
    0.105,
    0.075,
    28
  );
  const side_dial_knob_base = new THREE.Mesh(
    side_dial_knob_baseGeom,
    agedBrassMat
  );
  side_dial_knob_base.rotation.z = Math.PI / 2;
  side_dial_knob_base.position.set(0.735, -0.55, -0.01);
  root.add(side_dial_knob_base);

  const side_dial_knobGeom = new THREE.CylinderGeometry(
    0.074,
    0.090,
    0.16,
    24
  );
  const side_dial_knob = new THREE.Mesh(side_dial_knobGeom, brightBrassMat);
  side_dial_knob.rotation.z = Math.PI / 2;
  side_dial_knob.position.set(0.825, -0.55, -0.01);
  root.add(side_dial_knob);

  const side_dial_knob_capGeom = new THREE.SphereGeometry(0.09, 24, 14);
  const side_dial_knob_cap = new THREE.Mesh(
    side_dial_knob_capGeom,
    brightBrassMat
  );
  side_dial_knob_cap.position.set(0.91, -0.55, -0.01);
  side_dial_knob_cap.scale.set(0.65, 1, 1);
  root.add(side_dial_knob_cap);

  const side_dial_glassGeom = new THREE.CircleGeometry(0.425, 64);
  const side_dial_glass = new THREE.Mesh(side_dial_glassGeom, glassMat);
  side_dial_glass.rotation.y = Math.PI / 2;
  side_dial_glass.position.set(0.714, -0.55, -0.01);
  root.add(side_dial_glass);

  const side_dial_crownGeom = new THREE.TorusGeometry(0.48, 0.055, 12, 64);
  const side_dial_crown = new THREE.Mesh(side_dial_crownGeom, agedBrassMat);
  side_dial_crown.rotation.y = Math.PI / 2;
  side_dial_crown.position.set(0.718, -0.55, -0.01);
  root.add(side_dial_crown);

  const side_dial_ridgeGeom = new THREE.BoxGeometry(0.11, 0.026, 0.046);
  const side_dial_ridges = new THREE.InstancedMesh(
    side_dial_ridgeGeom,
    brightBrassMat,
    56
  );
  const ridgeDummy = new THREE.Object3D();
  for (let i = 0; i < 56; i++) {
    const angle = (i / 56) * Math.PI * 2;
    const radius = 0.535;
    ridgeDummy.position.set(
      0.718,
      -0.55 + Math.cos(angle) * radius,
      -0.01 + Math.sin(angle) * radius
    );
    ridgeDummy.rotation.set(angle, 0, 0);
    ridgeDummy.scale.set(1, 1, 1);
    ridgeDummy.updateMatrix();
    side_dial_ridges.setMatrixAt(i, ridgeDummy.matrix);
  }
  side_dial_ridges.instanceMatrix.needsUpdate = true;
  root.add(side_dial_ridges);

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