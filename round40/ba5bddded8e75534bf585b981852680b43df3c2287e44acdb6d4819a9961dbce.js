export default function generate(THREE) {
  const root = new THREE.Group();

  const length = 5.0;
  const width = 6.4;
  const height = 2.25;
  const bodyCenterY = 0.70;
  const wingY = 0.50;
  const wheelR = 0.29;
  const frontZ = 2.45;
  const rearZ = -2.45;

  const fuselageMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ef,
    metalness: 0.0,
    roughness: 0.3
  });
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0x263238,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });
  const propellerMat = new THREE.MeshStandardMaterial({
    color: 0x25292b,
    metalness: 0.0,
    roughness: 0.8
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x777b7c,
    metalness: 0.0,
    roughness: 0.7
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xc51f24,
    metalness: 0.0,
    roughness: 0.3
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xe27924,
    metalness: 0.0,
    roughness: 0.3
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0x86c6c8,
    metalness: 0.0,
    roughness: 0.3
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x242323,
    metalness: 0.0,
    roughness: 0.7
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x65483b,
    metalness: 0.0,
    roughness: 0.7
  });
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0x30363a,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const redLightMat = new THREE.MeshStandardMaterial({
    color: 0xff3030,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff3030,
    emissiveIntensity: 1.0
  });
  const greenLightMat = new THREE.MeshStandardMaterial({
    color: 0x36e080,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x36e080,
    emissiveIntensity: 1.0
  });

  function addTube(parent, p1, p2, radius, material, radialSegments = 8) {
    const tubeGeom = new THREE.TubeGeometry(
      new THREE.LineCurve3(p1, p2),
      1,
      radius,
      radialSegments,
      false
    );
    const tube = new THREE.Mesh(tubeGeom, material);
    parent.add(tube);
    return tube;
  }

  const fuselageProfile = [
    new THREE.Vector2(0.00, -2.45),
    new THREE.Vector2(0.11, -2.34),
    new THREE.Vector2(0.23, -2.12),
    new THREE.Vector2(0.34, -1.82),
    new THREE.Vector2(0.43, -1.45),
    new THREE.Vector2(0.49, -1.05),
    new THREE.Vector2(0.52, -0.55),
    new THREE.Vector2(0.53, 0.00),
    new THREE.Vector2(0.53, 0.55),
    new THREE.Vector2(0.52, 1.05),
    new THREE.Vector2(0.50, 1.40),
    new THREE.Vector2(0.47, 1.68),
    new THREE.Vector2(0.43, 1.90),
    new THREE.Vector2(0.39, 2.10),
    new THREE.Vector2(0.34, 2.30),
    new THREE.Vector2(0.28, 2.45)
  ];
  const fuselageGeom = new THREE.LatheGeometry(fuselageProfile, 48);
  const fuselage = new THREE.Mesh(fuselageGeom, fuselageMat);
  fuselage.rotation.x = Math.PI / 2;
  fuselage.position.y = bodyCenterY;
  root.add(fuselage);

  const main_wingShape = new THREE.Shape();
  main_wingShape.moveTo(-0.18, 0.78);
  main_wingShape.lineTo(-3.08, 0.20);
  main_wingShape.bezierCurveTo(-3.18, 0.12, -3.16, -0.08, -3.03, -0.18);
  main_wingShape.lineTo(-0.30, -0.68);
  main_wingShape.lineTo(0.30, -0.68);
  main_wingShape.lineTo(3.03, -0.18);
  main_wingShape.bezierCurveTo(3.16, -0.08, 3.18, 0.12, 3.08, 0.20);
  main_wingShape.lineTo(0.18, 0.78);
  main_wingShape.closePath();

  const main_wingGeom = new THREE.ExtrudeGeometry(main_wingShape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelSegments: 2
  });
  const main_wing = new THREE.Mesh(main_wingGeom, fuselageMat);
  main_wing.rotation.x = Math.PI / 2;
  main_wing.position.y = wingY + 0.05;
  root.add(main_wing);

  const wing_root_fairingGeom = new THREE.SphereGeometry(1, 32, 16);
  const wing_root_fairing = new THREE.Mesh(wing_root_fairingGeom, fuselageMat);
  wing_root_fairing.scale.set(0.72, 0.18, 0.78);
  wing_root_fairing.position.set(0, wingY, 0.02);
  root.add(wing_root_fairing);

  const left_wing_leading_edge = addTube(
    root,
    new THREE.Vector3(-0.28, wingY + 0.07, 0.70),
    new THREE.Vector3(-3.04, wingY + 0.07, 0.18),
    0.035,
    fuselageMat,
    10
  );
  const right_wing_leading_edge = addTube(
    root,
    new THREE.Vector3(0.28, wingY + 0.07, 0.70),
    new THREE.Vector3(3.04, wingY + 0.07, 0.18),
    0.035,
    fuselageMat,
    10
  );

  const wing_flap_seams = new THREE.Group();
  for (const side of [-1, 1]) {
    addTube(
      wing_flap_seams,
      new THREE.Vector3(side * 0.72, wingY + 0.075, -0.52),
      new THREE.Vector3(side * 2.78, wingY + 0.075, -0.10),
      0.009,
      seamMat,
      6
    );
  }
  root.add(wing_flap_seams);

  const wing_registration_markGeom = new THREE.RingGeometry(0.11, 0.18, 24);
  const wing_registration_mark = new THREE.Mesh(wing_registration_markGeom, logoMat);
  wing_registration_mark.rotation.x = -Math.PI / 2;
  wing_registration_mark.scale.set(1.7, 0.8, 1);
  wing_registration_mark.position.set(2.28, wingY + 0.082, -0.02);
  root.add(wing_registration_mark);

  const wing_registration_barGeom = new THREE.BoxGeometry(0.38, 0.012, 0.055);
  const wing_registration_bar = new THREE.Mesh(wing_registration_barGeom, logoMat);
  wing_registration_bar.position.set(2.28, wingY + 0.084, -0.02);
  root.add(wing_registration_bar);

  const horizontal_stabilizerShape = new THREE.Shape();
  horizontal_stabilizerShape.moveTo(-0.12, 0.36);
  horizontal_stabilizerShape.lineTo(-1.28, 0.12);
  horizontal_stabilizerShape.bezierCurveTo(-1.36, 0.04, -1.31, -0.14, -1.18, -0.20);
  horizontal_stabilizerShape.lineTo(-0.15, -0.34);
  horizontal_stabilizerShape.lineTo(0.15, -0.34);
  horizontal_stabilizerShape.lineTo(1.18, -0.20);
  horizontal_stabilizerShape.bezierCurveTo(1.31, -0.14, 1.36, 0.04, 1.28, 0.12);
  horizontal_stabilizerShape.lineTo(0.12, 0.36);
  horizontal_stabilizerShape.closePath();

  const horizontal_stabilizerGeom = new THREE.ExtrudeGeometry(horizontal_stabilizerShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  const horizontal_stabilizer = new THREE.Mesh(horizontal_stabilizerGeom, fuselageMat);
  horizontal_stabilizer.rotation.x = Math.PI / 2;
  horizontal_stabilizer.position.set(0, 0.82, -2.00);
  root.add(horizontal_stabilizer);

  const left_tail_leading_edge = addTube(
    root,
    new THREE.Vector3(-0.12, 0.84, -1.68),
    new THREE.Vector3(-1.24, 0.84, -1.88),
    0.024,
    fuselageMat,
    8
  );
  const right_tail_leading_edge = addTube(
    root,
    new THREE.Vector3(0.12, 0.84, -1.68),
    new THREE.Vector3(1.24, 0.84, -1.88),
    0.024,
    fuselageMat,
    8
  );

  const vertical_stabilizerShape = new THREE.Shape();
  vertical_stabilizerShape.moveTo(-0.62, 0.00);
  vertical_stabilizerShape.lineTo(0.62, 0.00);
  vertical_stabilizerShape.bezierCurveTo(0.42, 0.28, 0.18, 0.90, -0.08, 1.18);
  vertical_stabilizerShape.bezierCurveTo(-0.25, 1.37, -0.52, 1.34, -0.62, 1.12);
  vertical_stabilizerShape.closePath();

  const vertical_stabilizerGeom = new THREE.ExtrudeGeometry(vertical_stabilizerShape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  const vertical_stabilizer = new THREE.Mesh(vertical_stabilizerGeom, fuselageMat);
  vertical_stabilizer.rotation.y = -Math.PI / 2;
  vertical_stabilizer.position.set(0.05, 0.82, -2.00);
  root.add(vertical_stabilizer);

  const rudder_seams = new THREE.Group();
  for (const side of [-1, 1]) {
    addTube(
      rudder_seams,
      new THREE.Vector3(side * 0.058, 0.91, -2.57),
      new THREE.Vector3(side * 0.058, 1.93, -2.49),
      0.008,
      seamMat,
      6
    );
  }
  root.add(rudder_seams);

  const cabin_interiorGeom = new THREE.BoxGeometry(0.72, 0.10, 1.82);
  const cabin_interior = new THREE.Mesh(cabin_interiorGeom, interiorMat);
  cabin_interior.position.set(0, 1.12, 0.18);
  root.add(cabin_interior);

  const seatGeom = new THREE.SphereGeometry(0.18, 16, 10);
  const cabin_seats = new THREE.InstancedMesh(seatGeom, leatherMat, 4);
  const seatDummy = new THREE.Object3D();
  const seatPositions = [
    [-0.19, 1.17, -0.30],
    [0.19, 1.17, -0.30],
    [-0.19, 1.17, 0.34],
    [0.19, 1.17, 0.34]
  ];
  for (let i = 0; i < seatPositions.length; i++) {
    seatDummy.position.set(
      seatPositions[i][0],
      seatPositions[i][1],
      seatPositions[i][2]
    );
    seatDummy.scale.set(0.78, 1.0, 0.72);
    seatDummy.updateMatrix();
    cabin_seats.setMatrixAt(i, seatDummy.matrix);
  }
  cabin_seats.instanceMatrix.needsUpdate = true;
  root.add(cabin_seats);

  const instrument_panelGeom = new THREE.BoxGeometry(0.68, 0.20, 0.08);
  const instrument_panel = new THREE.Mesh(instrument_panelGeom, interiorMat);
  instrument_panel.position.set(0, 1.05, 1.05);
  instrument_panel.rotation.x = -0.18;
  root.add(instrument_panel);

  const side_window_frameGeom = new THREE.BoxGeometry(0.020, 0.56, 0.47);
  const side_window_frames = new THREE.InstancedMesh(side_window_frameGeom, fuselageMat, 8);
  const side_windowGeom = new THREE.BoxGeometry(0.014, 0.44, 0.37);
  const side_windows = new THREE.InstancedMesh(side_windowGeom, windowMat, 8);
  const windowDummy = new THREE.Object3D();
  const windowStations = [-0.72, -0.18, 0.36, 0.90];
  let windowIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of windowStations) {
      windowDummy.position.set(side * 0.514, 1.12, z);
      windowDummy.scale.set(1, 1, 1);
      windowDummy.updateMatrix();
      side_window_frames.setMatrixAt(windowIndex, windowDummy.matrix);

      windowDummy.position.set(side * 0.527, 1.12, z);
      windowDummy.updateMatrix();
      side_windows.setMatrixAt(windowIndex, windowDummy.matrix);
      windowIndex++;
    }
  }
  side_window_frames.instanceMatrix.needsUpdate = true;
  side_windows.instanceMatrix.needsUpdate = true;
  root.add(side_window_frames);
  root.add(side_windows);

  const front_windshield_frameGeom = new THREE.BoxGeometry(0.78, 0.56, 0.025);
  const front_windshield_frame = new THREE.Mesh(front_windshield_frameGeom, fuselageMat);
  front_windshield_frame.position.set(0, 1.12, 1.43);
  front_windshield_frame.rotation.x = -0.35;
  root.add(front_windshield_frame);

  const front_windshieldGeom = new THREE.BoxGeometry(0.66, 0.44, 0.014);
  const front_windshield = new THREE.Mesh(front_windshieldGeom, windowMat);
  front_windshield.position.set(0, 1.126, 1.448);
  front_windshield.rotation.x = -0.35;
  root.add(front_windshield);

  const windshield_center_postGeom = new THREE.BoxGeometry(0.035, 0.50, 0.035);
  const windshield_center_post = new THREE.Mesh(windshield_center_postGeom, fuselageMat);
  windshield_center_post.position.set(0, 1.13, 1.46);
  windshield_center_post.rotation.x = -0.35;
  root.add(windshield_center_post);

  const engine_cowlingGeom = new THREE.CylinderGeometry(0.34, 0.46, 1.00, 32);
  const engine_cowling = new THREE.Mesh(engine_cowlingGeom, fuselageMat);
  engine_cowling.rotation.x = Math.PI / 2;
  engine_cowling.position.set(0, bodyCenterY, 1.96);
  root.add(engine_cowling);

  const cowling_seamGeom = new THREE.TorusGeometry(0.445, 0.009, 6, 32);
  const cowling_seam = new THREE.Mesh(cowling_seamGeom, seamMat);
  cowling_seam.position.set(0, bodyCenterY, 1.63);
  root.add(cowling_seam);

  const engine_exhaust_stacksGeom = new THREE.CylinderGeometry(0.045, 0.052, 0.12, 10);
  const engine_exhaust_stacks = new THREE.InstancedMesh(engine_exhaust_stacksGeom, brushedMat, 10);
  const exhaustDummy = new THREE.Object3D();
  let exhaustIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      exhaustDummy.position.set(side * 0.47, 0.79, 1.68 + i * 0.13);
      exhaustDummy.rotation.set(0, 0, Math.PI / 2);
      exhaustDummy.scale.set(1, 1, 1);
      exhaustDummy.updateMatrix();
      engine_exhaust_stacks.setMatrixAt(exhaustIndex++, exhaustDummy.matrix);
    }
  }
  engine_exhaust_stacks.instanceMatrix.needsUpdate = true;
  root.add(engine_exhaust_stacks);

  const engine_air_intakesGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.10, 16);
  const engine_air_intakes = new THREE.InstancedMesh(engine_air_intakesGeom, rubberMat, 2);
  const intakeDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    intakeDummy.position.set(side * 0.47, 0.54, 1.72);
    intakeDummy.rotation.set(0, 0, Math.PI / 2);
    intakeDummy.updateMatrix();
    engine_air_intakes.setMatrixAt(i, intakeDummy.matrix);
  }
  engine_air_intakes.instanceMatrix.needsUpdate = true;
  root.add(engine_air_intakes);

  const propeller_bladeShape = new THREE.Shape();
  propeller_bladeShape.moveTo(-0.075, 0.16);
  propeller_bladeShape.lineTo(-0.105, 0.38);
  propeller_bladeShape.lineTo(-0.165, 0.76);
  propeller_bladeShape.lineTo(-0.125, 1.02);
  propeller_bladeShape.lineTo(-0.045, 1.15);
  propeller_bladeShape.lineTo(0.045, 1.12);
  propeller_bladeShape.lineTo(0.105, 0.88);
  propeller_bladeShape.lineTo(0.090, 0.45);
  propeller_bladeShape.lineTo(0.070, 0.16);
  propeller_bladeShape.closePath();

  const propeller_bladesGeom = new THREE.ExtrudeGeometry(propeller_bladeShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 1
  });
  const propeller_blades = new THREE.InstancedMesh(propeller_bladesGeom, propellerMat, 3);
  const propellerDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    propellerDummy.position.set(0, bodyCenterY, 2.50);
    propellerDummy.rotation.set(0, 0, i * Math.PI * 2 / 3);
    propellerDummy.scale.set(1, 1, 1);
    propellerDummy.updateMatrix();
    propeller_blades.setMatrixAt(i, propellerDummy.matrix);
  }
  propeller_blades.instanceMatrix.needsUpdate = true;
  root.add(propeller_blades);

  const propeller_tipShape = new THREE.Shape();
  propeller_tipShape.moveTo(-0.125, 0.98);
  propeller_tipShape.lineTo(-0.045, 1.15);
  propeller_tipShape.lineTo(0.045, 1.12);
  propeller_tipShape.lineTo(0.105, 0.98);
  propeller_tipShape.closePath();

  const propeller_tipsGeom = new THREE.ExtrudeGeometry(propeller_tipShape, {
    depth: 0.048,
    steps: 1,
    bevelEnabled: false
  });
  const propeller_tips = new THREE.InstancedMesh(propeller_tipsGeom, orangeMat, 3);
  for (let i = 0; i < 3; i++) {
    propellerDummy.position.set(0, bodyCenterY, 2.505);
    propellerDummy.rotation.set(0, 0, i * Math.PI * 2 / 3);
    propellerDummy.updateMatrix();
    propeller_tips.setMatrixAt(i, propellerDummy.matrix);
  }
  propeller_tips.instanceMatrix.needsUpdate = true;
  root.add(propeller_tips);

  const spinnerGeom = new THREE.ConeGeometry(0.35, 0.48, 32);
  const spinner = new THREE.Mesh(spinnerGeom, fuselageMat);
  spinner.rotation.x = Math.PI / 2;
  spinner.position.set(0, bodyCenterY, 2.70);
  root.add(spinner);

  const main_landing_gear = new THREE.Group();
  for (const side of [-1, 1]) {
    addTube(
      main_landing_gear,
      new THREE.Vector3(side * 0.50, 0.43, 0.18),
      new THREE.Vector3(side * 1.10, -0.25, 0.48),
      0.035,
      silverMat,
      10
    );
    addTube(
      main_landing_gear,
      new THREE.Vector3(side * 0.72, 0.43, -0.02),
      new THREE.Vector3(side * 1.10, -0.25, 0.48),
      0.025,
      silverMat,
      8
    );
    addTube(
      main_landing_gear,
      new THREE.Vector3(side * 0.94, 0.02, 0.42),
      new THREE.Vector3(side * 1.17, 0.02, 0.42),
      0.024,
      silverMat,
      8
    );
  }
  root.add(main_landing_gear);

  const main_tireGeom = new THREE.TorusGeometry(0.20, 0.09, 12, 28);
  const main_wheels = new THREE.InstancedMesh(main_tireGeom, rubberMat, 2);
  const main_hubGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 20);
  const main_wheel_hubs = new THREE.InstancedMesh(main_hubGeom, hubMat, 2);
  const wheelDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    wheelDummy.position.set(side * 1.10, -0.25, 0.48);
    wheelDummy.rotation.set(0, Math.PI / 2, 0);
    wheelDummy.scale.set(1, 1, 1);
    wheelDummy.updateMatrix();
    main_wheels.setMatrixAt(i, wheelDummy.matrix);

    wheelDummy.rotation.set(0, 0, Math.PI / 2);
    wheelDummy.updateMatrix();
    main_wheel_hubs.setMatrixAt(i, wheelDummy.matrix);
  }
  main_wheels.instanceMatrix.needsUpdate = true;
  main_wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(main_wheels);
  root.add(main_wheel_hubs);

  const tail_landing_gear = new THREE.Group();
  addTube(
    tail_landing_gear,
    new THREE.Vector3(0, 0.43, -1.72),
    new THREE.Vector3(0, -0.22, -1.91),
    0.028,
    silverMat,
    9
  );
  addTube(
    tail_landing_gear,
    new THREE.Vector3(-0.08, 0.38, -1.60),
    new THREE.Vector3(0, -0.18, -1.91),
    0.020,
    silverMat,
    8
  );
  addTube(
    tail_landing_gear,
    new THREE.Vector3(0.08, 0.38, -1.60),
    new THREE.Vector3(0, -0.18, -1.91),
    0.020,
    silverMat,
    8
  );
  root.add(tail_landing_gear);

  const tail_tireGeom = new THREE.TorusGeometry(0.145, 0.065, 10, 24);
  const tail_wheel = new THREE.Mesh(tail_tireGeom, rubberMat);
  tail_wheel.rotation.y = Math.PI / 2;
  tail_wheel.position.set(0, -0.22, -1.91);
  root.add(tail_wheel);

  const tail_hubGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.14, 16);
  const tail_wheel_hub = new THREE.Mesh(tail_hubGeom, silverMat);
  tail_wheel_hub.rotation.z = Math.PI / 2;
  tail_wheel_hub.position.set(0, -0.22, -1.91);
  root.add(tail_wheel_hub);

  const fuselage_markings = new THREE.Group();
  for (const side of [-1, 1]) {
    const rear_red_mark = new THREE.Mesh(
      new THREE.BoxGeometry(0.014, 0.13, 0.22),
      redMat
    );
    rear_red_mark.position.set(side * 0.445, 0.83, -1.42);
    fuselage_markings.add(rear_red_mark);

    const middle_red_mark = new THREE.Mesh(
      new THREE.BoxGeometry(0.014, 0.075, 0.30),
      redMat
    );
    middle_red_mark.position.set(side * 0.505, 0.91, -0.88);
    fuselage_markings.add(middle_red_mark);
  }
  root.add(fuselage_markings);

  const panel_seams = new THREE.Group();
  const panelSeamGeom = new THREE.TorusGeometry(0.515, 0.004, 5, 36);
  const panelStations = [-1.10, -0.55, 0.00, 0.55, 1.05];
  for (const z of panelStations) {
    const panel_seam = new THREE.Mesh(panelSeamGeom, seamMat);
    panel_seam.position.set(0, bodyCenterY, z);
    panel_seams.add(panel_seam);
  }
  root.add(panel_seams);

  const dorsal_antennaGeom = new THREE.ConeGeometry(0.035, 0.25, 12);
  const dorsal_antenna = new THREE.Mesh(dorsal_antennaGeom, fuselageMat);
  dorsal_antenna.position.set(0, 1.36, 0.42);
  dorsal_antenna.rotation.z = -0.12;
  root.add(dorsal_antenna);

  const left_navigation_lightGeom = new THREE.SphereGeometry(0.045, 12, 8);
  const left_navigation_light = new THREE.Mesh(left_navigation_lightGeom, redLightMat);
  left_navigation_light.position.set(-3.08, wingY + 0.04, 0.10);
  root.add(left_navigation_light);

  const right_navigation_lightGeom = new THREE.SphereGeometry(0.045, 12, 8);
  const right_navigation_light = new THREE.Mesh(right_navigation_lightGeom, greenLightMat);
  right_navigation_light.position.set(3.08, wingY + 0.04, 0.10);
  root.add(right_navigation_light);

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