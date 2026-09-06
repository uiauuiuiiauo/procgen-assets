export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyW = 1.72;
  const wheelR = 0.41;
  const wheelY = 0.43;
  const frontAxleZ = 1.30;
  const rearAxleZ = -1.30;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe51f25,
    metalness: 0.0,
    roughness: 0.3,
  });
  const white_stripeMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ed,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const black_trimMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const grilleMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.8,
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x111212,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x718087,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const clear_lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xe9f0f2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const headlight_bulbMat = new THREE.MeshStandardMaterial({
    color: 0xffffe5,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffffe5,
    emissiveIntensity: 1.0,
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xffa20d,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffa20d,
    emissiveIntensity: 1.0,
  });
  const taillightMat = new THREE.MeshStandardMaterial({
    color: 0xb90d18,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xb90d18,
    emissiveIntensity: 1.0,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x25282a,
    metalness: 0.0,
    roughness: 0.95,
  });

  function makeShape(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return shape;
  }

  function makeSidePanel(points, side, material, offset) {
    const localPoints = [];
    for (let i = 0; i < points.length; i++) {
      const z = points[i][0];
      const y = points[i][1];
      const u = side > 0 ? -z : z;
      localPoints.push([u, y]);
    }
    if (side < 0) localPoints.reverse();

    const panelGeom = new THREE.ShapeGeometry(makeShape(localPoints));
    const panel = new THREE.Mesh(panelGeom, material);
    panel.rotation.y = side * Math.PI / 2;
    panel.position.x = side * offset;
    root.add(panel);
    return panel;
  }

  function addTube(points, radius, material, segments) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");
    const tubeGeom = new THREE.TubeGeometry(
      curve,
      segments || Math.max(1, points.length * 3),
      radius,
      7,
      false
    );
    const tube = new THREE.Mesh(tubeGeom, material);
    root.add(tube);
    return tube;
  }

  const lower_bodyShape = makeShape([
    [-2.10, 0.28],
    [1.98, 0.28],
    [2.12, 0.48],
    [2.05, 0.76],
    [1.82, 0.94],
    [0.72, 1.16],
    [-1.52, 1.12],
    [-2.04, 0.92],
    [-2.15, 0.62],
  ]);
  const lower_bodyGeom = new THREE.ExtrudeGeometry(lower_bodyShape, {
    depth: bodyW,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 2,
  });
  const lower_body = new THREE.Mesh(lower_bodyGeom, bodyMat);
  lower_body.rotation.y = -Math.PI / 2;
  lower_body.position.x = bodyW / 2;
  root.add(lower_body);

  const cabin_shellShape = makeShape([
    [-1.82, 1.08],
    [0.72, 1.12],
    [0.18, 1.76],
    [-1.10, 1.82],
    [-1.58, 1.55],
  ]);
  const cabin_shellGeom = new THREE.ExtrudeGeometry(cabin_shellShape, {
    depth: 1.48,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 2,
  });
  const cabin_shell = new THREE.Mesh(cabin_shellGeom, bodyMat);
  cabin_shell.rotation.y = -Math.PI / 2;
  cabin_shell.position.x = 0.74;
  root.add(cabin_shell);

  const roof_panelGeom = new THREE.SphereGeometry(1, 32, 12);
  const roof_panel = new THREE.Mesh(roof_panelGeom, bodyMat);
  roof_panel.scale.set(0.77, 0.09, 1.05);
  roof_panel.position.set(0, 1.78, -0.55);
  root.add(roof_panel);

  const hood_panelGeom = new THREE.BoxGeometry(1.58, 0.07, 1.36);
  const hood_panel = new THREE.Mesh(hood_panelGeom, bodyMat);
  hood_panel.position.set(0, 1.055, 1.31);
  hood_panel.rotation.x = 0.14;
  root.add(hood_panel);

  const white_hood_stripeGeom = new THREE.BoxGeometry(0.29, 0.014, 1.34);
  const white_hood_stripe = new THREE.Mesh(white_hood_stripeGeom, white_stripeMat);
  white_hood_stripe.position.set(0, 1.095, 1.31);
  white_hood_stripe.rotation.x = 0.14;
  root.add(white_hood_stripe);

  const white_upper_stripe = addTube([
    new THREE.Vector3(0, 1.185, 0.65),
    new THREE.Vector3(0, 1.765, 0.17),
  ], 0.145, white_stripeMat, 8);

  const front_bumperGeom = new THREE.BoxGeometry(1.82, 0.18, 0.16);
  const front_bumper = new THREE.Mesh(front_bumperGeom, black_trimMat);
  front_bumper.position.set(0, 0.61, 2.13);
  root.add(front_bumper);

  const rear_bumperGeom = new THREE.BoxGeometry(1.78, 0.17, 0.15);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, black_trimMat);
  rear_bumper.position.set(0, 0.61, -2.14);
  root.add(rear_bumper);

  const front_lower_lipGeom = new THREE.BoxGeometry(1.72, 0.10, 0.13);
  const front_lower_lip = new THREE.Mesh(front_lower_lipGeom, bodyMat);
  front_lower_lip.position.set(0, 0.30, 2.12);
  root.add(front_lower_lip);

  const upper_grilleGeom = new THREE.BoxGeometry(1.15, 0.22, 0.045);
  const upper_grille = new THREE.Mesh(upper_grilleGeom, grilleMat);
  upper_grille.position.set(0, 0.86, 2.095);
  root.add(upper_grille);

  const upper_grille_slatsGeom = new THREE.BoxGeometry(1.08, 0.025, 0.035);
  const upper_grille_slats = new THREE.InstancedMesh(
    upper_grille_slatsGeom,
    bodyMat,
    3
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    dummy.position.set(0, 0.79 + i * 0.07, 2.125);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    upper_grille_slats.setMatrixAt(i, dummy.matrix);
  }
  upper_grille_slats.instanceMatrix.needsUpdate = true;
  root.add(upper_grille_slats);

  const lower_grilleGeom = new THREE.BoxGeometry(1.18, 0.24, 0.045);
  const lower_grille = new THREE.Mesh(lower_grilleGeom, grilleMat);
  lower_grille.position.set(0, 0.405, 2.19);
  root.add(lower_grille);

  const lower_grille_slatsGeom = new THREE.BoxGeometry(1.08, 0.025, 0.035);
  const lower_grille_slats = new THREE.InstancedMesh(
    lower_grille_slatsGeom,
    bodyMat,
    3
  );
  for (let i = 0; i < 3; i++) {
    dummy.position.set(0, 0.335 + i * 0.07, 2.218);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    lower_grille_slats.setMatrixAt(i, dummy.matrix);
  }
  lower_grille_slats.instanceMatrix.needsUpdate = true;
  root.add(lower_grille_slats);

  const lower_grille_dividersGeom = new THREE.BoxGeometry(0.025, 0.20, 0.035);
  const lower_grille_dividers = new THREE.InstancedMesh(
    lower_grille_dividersGeom,
    bodyMat,
    5
  );
  for (let i = 0; i < 5; i++) {
    dummy.position.set(-0.43 + i * 0.215, 0.405, 2.22);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    lower_grille_dividers.setMatrixAt(i, dummy.matrix);
  }
  lower_grille_dividers.instanceMatrix.needsUpdate = true;
  root.add(lower_grille_dividers);

  const headlightShape = makeShape([
    [-0.28, -0.13],
    [0.25, -0.12],
    [0.29, 0.08],
    [0.17, 0.15],
    [-0.22, 0.14],
    [-0.30, 0.02],
  ]);
  const headlightGeom = new THREE.ExtrudeGeometry(headlightShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });

  const left_headlight = new THREE.Mesh(headlightGeom, clear_lensMat);
  left_headlight.position.set(-0.61, 0.87, 2.09);
  left_headlight.scale.x = -1;
  root.add(left_headlight);

  const right_headlight = new THREE.Mesh(headlightGeom, clear_lensMat);
  right_headlight.position.set(0.61, 0.87, 2.09);
  root.add(right_headlight);

  const headlight_reflectorGeom = new THREE.SphereGeometry(0.105, 18, 10);
  const headlight_reflectors = new THREE.InstancedMesh(
    headlight_reflectorGeom,
    silverMat,
    4
  );
  const reflectorPositions = [
    [-0.50, 0.87],
    [-0.70, 0.87],
    [0.50, 0.87],
    [0.70, 0.87],
  ];
  for (let i = 0; i < reflectorPositions.length; i++) {
    dummy.position.set(reflectorPositions[i][0], reflectorPositions[i][1], 2.145);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 0.72, 0.30);
    dummy.updateMatrix();
    headlight_reflectors.setMatrixAt(i, dummy.matrix);
  }
  headlight_reflectors.instanceMatrix.needsUpdate = true;
  root.add(headlight_reflectors);

  const headlight_bulbGeom = new THREE.SphereGeometry(0.035, 12, 8);
  const headlight_bulbs = new THREE.InstancedMesh(
    headlight_bulbGeom,
    headlight_bulbMat,
    4
  );
  for (let i = 0; i < reflectorPositions.length; i++) {
    dummy.position.set(reflectorPositions[i][0], reflectorPositions[i][1], 2.18);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 0.45);
    dummy.updateMatrix();
    headlight_bulbs.setMatrixAt(i, dummy.matrix);
  }
  headlight_bulbs.instanceMatrix.needsUpdate = true;
  root.add(headlight_bulbs);

  const front_emblemGeom = new THREE.BoxGeometry(0.22, 0.22, 0.045);
  const front_emblem = new THREE.Mesh(front_emblemGeom, silverMat);
  front_emblem.position.set(0, 0.86, 2.17);
  root.add(front_emblem);

  const emblem_insetGeom = new THREE.BoxGeometry(0.16, 0.16, 0.052);
  const emblem_inset = new THREE.Mesh(emblem_insetGeom, grilleMat);
  emblem_inset.position.set(0, 0.86, 2.198);
  root.add(emblem_inset);

  const emblem_mark_leftGeom = new THREE.BoxGeometry(0.025, 0.13, 0.018);
  const emblem_mark_left = new THREE.Mesh(emblem_mark_leftGeom, silverMat);
  emblem_mark_left.position.set(-0.035, 0.86, 2.23);
  emblem_mark_left.rotation.z = -0.55;
  root.add(emblem_mark_left);

  const emblem_mark_rightGeom = new THREE.BoxGeometry(0.025, 0.13, 0.018);
  const emblem_mark_right = new THREE.Mesh(emblem_mark_rightGeom, silverMat);
  emblem_mark_right.position.set(0.035, 0.86, 2.23);
  emblem_mark_right.rotation.z = 0.55;
  root.add(emblem_mark_right);

  const fog_lightGeom = new THREE.BoxGeometry(0.28, 0.13, 0.045);
  const left_fog_light = new THREE.Mesh(fog_lightGeom, clear_lensMat);
  left_fog_light.position.set(-0.66, 0.36, 2.205);
  root.add(left_fog_light);

  const right_fog_light = new THREE.Mesh(fog_lightGeom, clear_lensMat);
  right_fog_light.position.set(0.66, 0.36, 2.205);
  root.add(right_fog_light);

  const windshieldGeom = new THREE.PlaneGeometry(1.43, 0.74);
  const windshield = new THREE.Mesh(windshieldGeom, glassMat);
  windshield.position.set(0, 1.46, 0.48);
  windshield.rotation.x = -0.68;
  root.add(windshield);

  const rear_windowGeom = new THREE.PlaneGeometry(1.30, 0.62);
  const rear_window = new THREE.Mesh(rear_windowGeom, glassMat);
  rear_window.position.set(0, 1.46, -1.56);
  rear_window.rotation.x = 0.75;
  root.add(rear_window);

  const frontWindowPoints = [
    [0.62, 1.15],
    [0.15, 1.72],
    [-0.53, 1.72],
    [-0.60, 1.15],
  ];
  const rearWindowPoints = [
    [-0.67, 1.15],
    [-0.61, 1.71],
    [-1.08, 1.70],
    [-1.52, 1.38],
    [-1.62, 1.15],
  ];

  const right_front_window = makeSidePanel(
    frontWindowPoints,
    1,
    glassMat,
    0.782
  );
  const left_front_window = makeSidePanel(
    frontWindowPoints,
    -1,
    glassMat,
    0.782
  );
  const right_rear_window = makeSidePanel(
    rearWindowPoints,
    1,
    glassMat,
    0.782
  );
  const left_rear_window = makeSidePanel(
    rearWindowPoints,
    -1,
    glassMat,
    0.782
  );

  const right_window_trim = addTube([
    new THREE.Vector3(0.795, 1.14, 0.63),
    new THREE.Vector3(0.795, 1.73, 0.15),
    new THREE.Vector3(0.795, 1.79, -1.08),
    new THREE.Vector3(0.795, 1.39, -1.54),
    new THREE.Vector3(0.795, 1.14, -1.64),
  ], 0.025, black_trimMat, 24);

  const left_window_trim = addTube([
    new THREE.Vector3(-0.795, 1.14, 0.63),
    new THREE.Vector3(-0.795, 1.73, 0.15),
    new THREE.Vector3(-0.795, 1.79, -1.08),
    new THREE.Vector3(-0.795, 1.39, -1.54),
    new THREE.Vector3(-0.795, 1.14, -1.64),
  ], 0.025, black_trimMat, 24);

  const right_window_sill = addTube([
    new THREE.Vector3(0.798, 1.13, 0.63),
    new THREE.Vector3(0.798, 1.13, -1.64),
  ], 0.025, black_trimMat, 4);

  const left_window_sill = addTube([
    new THREE.Vector3(-0.798, 1.13, 0.63),
    new THREE.Vector3(-0.798, 1.13, -1.64),
  ], 0.025, black_trimMat, 4);

  const b_pillarGeom = new THREE.BoxGeometry(0.035, 0.59, 0.075);
  const right_b_pillar = new THREE.Mesh(b_pillarGeom, black_trimMat);
  right_b_pillar.position.set(0.80, 1.43, -0.61);
  root.add(right_b_pillar);

  const left_b_pillar = new THREE.Mesh(b_pillarGeom, black_trimMat);
  left_b_pillar.position.set(-0.80, 1.43, -0.61);
  root.add(left_b_pillar);

  const windshield_cowlGeom = new THREE.BoxGeometry(1.48, 0.055, 0.12);
  const windshield_cowl = new THREE.Mesh(windshield_cowlGeom, black_trimMat);
  windshield_cowl.position.set(0, 1.145, 0.76);
  windshield_cowl.rotation.x = 0.10;
  root.add(windshield_cowl);

  const left_wiperGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.62, 1.185, 0.735),
      new THREE.Vector3(-0.08, 1.30, 0.62)
    ),
    1,
    0.018,
    7,
    false
  );
  const left_wiper = new THREE.Mesh(left_wiperGeom, black_trimMat);
  root.add(left_wiper);

  const right_wiperGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.05, 1.19, 0.73),
      new THREE.Vector3(0.55, 1.31, 0.61)
    ),
    1,
    0.018,
    7,
    false
  );
  const right_wiper = new THREE.Mesh(right_wiperGeom, black_trimMat);
  root.add(right_wiper);

  const dashboardGeom = new THREE.BoxGeometry(1.34, 0.16, 0.42);
  const dashboard = new THREE.Mesh(dashboardGeom, interiorMat);
  dashboard.position.set(0, 1.10, 0.43);
  dashboard.rotation.x = -0.08;
  root.add(dashboard);

  const front_seat_backGeom = new THREE.BoxGeometry(0.42, 0.56, 0.18);
  const front_seat_backs = new THREE.InstancedMesh(
    front_seat_backGeom,
    interiorMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.38 : 0.38, 1.30, -0.25);
    dummy.rotation.set(-0.10, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_seat_backs.setMatrixAt(i, dummy.matrix);
  }
  front_seat_backs.instanceMatrix.needsUpdate = true;
  root.add(front_seat_backs);

  const headrestGeom = new THREE.SphereGeometry(0.17, 16, 10);
  const front_headrests = new THREE.InstancedMesh(headrestGeom, interiorMat, 2);
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.38 : 0.38, 1.62, -0.29);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.85, 1.0, 0.65);
    dummy.updateMatrix();
    front_headrests.setMatrixAt(i, dummy.matrix);
  }
  front_headrests.instanceMatrix.needsUpdate = true;
  root.add(front_headrests);

  const steering_wheelGeom = new THREE.TorusGeometry(0.16, 0.025, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, black_trimMat);
  steering_wheel.position.set(-0.38, 1.35, 0.35);
  steering_wheel.rotation.x = -0.22;
  root.add(steering_wheel);

  const steering_hubGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.06, 12);
  const steering_hub = new THREE.Mesh(steering_hubGeom, black_trimMat);
  steering_hub.position.set(-0.38, 1.35, 0.35);
  steering_hub.rotation.x = Math.PI / 2;
  root.add(steering_hub);

  const rearview_mirrorGeom = new THREE.BoxGeometry(0.28, 0.09, 0.045);
  const rearview_mirror = new THREE.Mesh(rearview_mirrorGeom, black_trimMat);
  rearview_mirror.position.set(0, 1.58, 0.25);
  rearview_mirror.rotation.x = -0.30;
  root.add(rearview_mirror);

  const side_mirrorsGeom = new THREE.SphereGeometry(1, 20, 12);
  const side_mirrors = new THREE.InstancedMesh(
    side_mirrorsGeom,
    black_trimMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.94, 1.24, 0.54);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.20, 0.12, 0.15);
    dummy.updateMatrix();
    side_mirrors.setMatrixAt(i, dummy.matrix);
  }
  side_mirrors.instanceMatrix.needsUpdate = true;
  root.add(side_mirrors);

  const right_mirror_stem = addTube([
    new THREE.Vector3(0.76, 1.18, 0.50),
    new THREE.Vector3(0.91, 1.22, 0.53),
  ], 0.035, black_trimMat, 3);

  const left_mirror_stem = addTube([
    new THREE.Vector3(-0.76, 1.18, 0.50),
    new THREE.Vector3(-0.91, 1.22, 0.53),
  ], 0.035, black_trimMat, 3);

  const right_hood_seam = addTube([
    new THREE.Vector3(0.77, 0.99, 1.92),
    new THREE.Vector3(0.77, 1.17, 0.70),
  ], 0.012, black_trimMat, 4);

  const left_hood_seam = addTube([
    new THREE.Vector3(-0.77, 0.99, 1.92),
    new THREE.Vector3(-0.77, 1.17, 0.70),
  ], 0.012, black_trimMat, 4);

  const side_moldingGeom = new THREE.BoxGeometry(0.045, 0.11, 2.35);
  const right_side_molding = new THREE.Mesh(side_moldingGeom, black_trimMat);
  right_side_molding.position.set(0.905, 0.72, -0.40);
  root.add(right_side_molding);

  const left_side_molding = new THREE.Mesh(side_moldingGeom, black_trimMat);
  left_side_molding.position.set(-0.905, 0.72, -0.40);
  root.add(left_side_molding);

  const rocker_panelGeom = new THREE.BoxGeometry(0.055, 0.10, 1.95);
  const right_rocker_panel = new THREE.Mesh(rocker_panelGeom, bodyMat);
  right_rocker_panel.position.set(0.89, 0.34, -0.30);
  root.add(right_rocker_panel);

  const left_rocker_panel = new THREE.Mesh(rocker_panelGeom, bodyMat);
  left_rocker_panel.position.set(-0.89, 0.34, -0.30);
  root.add(left_rocker_panel);

  const door_seamsGeom = new THREE.BoxGeometry(0.018, 0.72, 0.018);
  const door_seams = new THREE.InstancedMesh(door_seamsGeom, black_trimMat, 4);
  const seamPositions = [
    [-0.902, -0.61],
    [-0.902, -1.57],
    [0.902, -0.61],
    [0.902, -1.57],
  ];
  for (let i = 0; i < seamPositions.length; i++) {
    dummy.position.set(seamPositions[i][0], 0.82, seamPositions[i][1]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    door_seams.setMatrixAt(i, dummy.matrix);
  }
  door_seams.instanceMatrix.needsUpdate = true;
  root.add(door_seams);

  const door_handlesGeom = new THREE.BoxGeometry(0.045, 0.075, 0.22);
  const door_handles = new THREE.InstancedMesh(
    door_handlesGeom,
    black_trimMat,
    4
  );
  const handlePositions = [
    [-0.925, 0.34],
    [-0.925, -1.05],
    [0.925, 0.34],
    [0.925, -1.05],
  ];
  for (let i = 0; i < handlePositions.length; i++) {
    dummy.position.set(handlePositions[i][0], 1.06, handlePositions[i][1]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    door_handles.setMatrixAt(i, dummy.matrix);
  }
  door_handles.instanceMatrix.needsUpdate = true;
  root.add(door_handles);

  const side_indicatorsGeom = new THREE.BoxGeometry(0.045, 0.085, 0.15);
  const side_indicators = new THREE.InstancedMesh(
    side_indicatorsGeom,
    amberMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.925, 0.96, 0.83);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_indicators.setMatrixAt(i, dummy.matrix);
  }
  side_indicators.instanceMatrix.needsUpdate = true;
  root.add(side_indicators);

  const taillightGeom = new THREE.BoxGeometry(0.34, 0.25, 0.045);
  const left_taillight = new THREE.Mesh(taillightGeom, taillightMat);
  left_taillight.position.set(-0.66, 0.91, -2.095);
  root.add(left_taillight);

  const right_taillight = new THREE.Mesh(taillightGeom, taillightMat);
  right_taillight.position.set(0.66, 0.91, -2.095);
  root.add(right_taillight);

  const wheelPositions = [
    [-0.88, frontAxleZ],
    [0.88, frontAxleZ],
    [-0.88, rearAxleZ],
    [0.88, rearAxleZ],
  ];

  const tiresGeom = new THREE.TorusGeometry(
    wheelR - 0.105,
    0.105,
    12,
    32
  );
  const tires = new THREE.InstancedMesh(tiresGeom, tireMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    dummy.position.set(wheelPositions[i][0], wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tires.setMatrixAt(i, dummy.matrix);
  }
  tires.instanceMatrix.needsUpdate = true;
  root.add(tires);

  const wheel_archesGeom = new THREE.TorusGeometry(
    wheelR + 0.025,
    0.035,
    8,
    28,
    Math.PI
  );
  const wheel_arches = new THREE.InstancedMesh(wheel_archesGeom, bodyMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0] < 0 ? -1 : 1;
    dummy.position.set(side * 0.915, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_arches.setMatrixAt(i, dummy.matrix);
  }
  wheel_arches.instanceMatrix.needsUpdate = true;
  root.add(wheel_arches);

  const wheel_backplatesGeom = new THREE.CylinderGeometry(0.27, 0.27, 0.045, 24);
  const wheel_backplates = new THREE.InstancedMesh(
    wheel_backplatesGeom,
    grilleMat,
    4
  );
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0] < 0 ? -1 : 1;
    dummy.position.set(side * 0.955, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_backplates.setMatrixAt(i, dummy.matrix);
  }
  wheel_backplates.instanceMatrix.needsUpdate = true;
  root.add(wheel_backplates);

  const wheel_rimsGeom = new THREE.TorusGeometry(0.235, 0.035, 8, 28);
  const wheel_rims = new THREE.InstancedMesh(wheel_rimsGeom, silverMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0] < 0 ? -1 : 1;
    dummy.position.set(side * 0.985, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_rims.setMatrixAt(i, dummy.matrix);
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  root.add(wheel_rims);

  const wheel_spokesGeom = new THREE.BoxGeometry(0.045, 0.25, 0.055);
  const wheel_spokes = new THREE.InstancedMesh(
    wheel_spokesGeom,
    silverMat,
    24
  );
  let spokeIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const side = wheelPositions[w][0] < 0 ? -1 : 1;
    for (let i = 0; i < 6; i++) {
      const angle = i / 6 * Math.PI * 2;
      dummy.position.set(
        side * 0.995,
        wheelY + Math.cos(angle) * 0.12,
        wheelPositions[w][1] + Math.sin(angle) * 0.12
      );
      dummy.rotation.set(angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_spokes.setMatrixAt(spokeIndex, dummy.matrix);
      spokeIndex++;
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  root.add(wheel_spokes);

  const wheel_hubsGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.055, 16);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubsGeom, silverMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0] < 0 ? -1 : 1;
    dummy.position.set(side * 1.01, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_hubs.setMatrixAt(i, dummy.matrix);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_hubs);

  const tire_treadsGeom = new THREE.BoxGeometry(0.20, 0.032, 0.075);
  const tire_treads = new THREE.InstancedMesh(tire_treadsGeom, tireMat, 56);
  let treadIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    for (let i = 0; i < 14; i++) {
      const angle = i / 14 * Math.PI * 2;
      dummy.position.set(
        wheelPositions[w][0],
        wheelY + Math.cos(angle) * 0.405,
        wheelPositions[w][1] + Math.sin(angle) * 0.405
      );
      dummy.rotation.set(angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      tire_treads.setMatrixAt(treadIndex, dummy.matrix);
      treadIndex++;
    }
  }
  tire_treads.instanceMatrix.needsUpdate = true;
  root.add(tire_treads);

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