export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "joker_arcade_cabinet";

  const cabinetW = 1.02;
  const cabinetD = 0.72;
  const lowerH = 0.82;
  const playfieldW = 0.84;

  const cabinetMat = new THREE.MeshStandardMaterial({
    color: 0x17191d,
    metalness: 0.0,
    roughness: 0.8
  });
  const frontPanelMat = new THREE.MeshStandardMaterial({
    color: 0x090a0c,
    metalness: 0.0,
    roughness: 0.8
  });
  const insetMat = new THREE.MeshStandardMaterial({
    color: 0x020304,
    metalness: 0.0,
    roughness: 0.8
  });
  const glossyBlackMat = new THREE.MeshStandardMaterial({
    color: 0x111216,
    metalness: 0.0,
    roughness: 0.3
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x101113,
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
  const purplePanelMat = new THREE.MeshStandardMaterial({
    color: 0x7b2aa8,
    metalness: 0.0,
    roughness: 0.3
  });
  const redLedMat = new THREE.MeshStandardMaterial({
    color: 0xff3655,
    emissive: 0xff3655,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const pinkLedMat = new THREE.MeshStandardMaterial({
    color: 0xff2e93,
    emissive: 0xff2e93,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const cyanLedMat = new THREE.MeshStandardMaterial({
    color: 0x19d9ff,
    emissive: 0x19d9ff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const greenLedMat = new THREE.MeshStandardMaterial({
    color: 0x36e46d,
    emissive: 0x36e46d,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const orangeLedMat = new THREE.MeshStandardMaterial({
    color: 0xff8a22,
    emissive: 0xff8a22,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const purpleLedMat = new THREE.MeshStandardMaterial({
    color: 0xa64dff,
    emissive: 0xa64dff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xffe0a0,
    metalness: 0.0,
    roughness: 0.7
  });
  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ed,
    metalness: 0.0,
    roughness: 0.7
  });
  const darkRedMat = new THREE.MeshStandardMaterial({
    color: 0x8f1833,
    metalness: 0.0,
    roughness: 0.7
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x16405a,
    emissive: 0x16405a,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3
  });
  const screenGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8eef5,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true
  });
  const monitorScreenMat = new THREE.MeshStandardMaterial({
    color: 0x182426,
    emissive: 0x182426,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3
  });

  const redButtonMat = new THREE.MeshStandardMaterial({
    color: 0xe82345,
    metalness: 0.0,
    roughness: 0.3
  });
  const greenButtonMat = new THREE.MeshStandardMaterial({
    color: 0x35b95c,
    metalness: 0.0,
    roughness: 0.3
  });
  const blueButtonMat = new THREE.MeshStandardMaterial({
    color: 0x087fc4,
    metalness: 0.0,
    roughness: 0.3
  });
  const cyanButtonMat = new THREE.MeshStandardMaterial({
    color: 0x20d5ca,
    metalness: 0.0,
    roughness: 0.3
  });
  const orangeButtonMat = new THREE.MeshStandardMaterial({
    color: 0xf07b20,
    metalness: 0.0,
    roughness: 0.3
  });

  function roundedRectGeometry(w, h, r, depth, bevelEnabled) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    const options = {
      depth,
      steps: 1,
      bevelEnabled,
      bevelThickness: bevelEnabled ? 0.006 : 0,
      bevelSize: bevelEnabled ? 0.006 : 0,
      bevelSegments: bevelEnabled ? 2 : 1
    };
    return new THREE.ExtrudeGeometry(shape, options);
  }

  function addBox(parent, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addRod(parent, p1, p2, radius, mat, segments) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length, segments || 10),
      mat
    );
    mesh.position.copy(p1).add(p2).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    parent.add(mesh);
    return mesh;
  }

  const cabinet_sideShape = new THREE.Shape();
  cabinet_sideShape.moveTo(-0.38, 0.0);
  cabinet_sideShape.lineTo(0.38, 0.0);
  cabinet_sideShape.lineTo(0.43, 0.18);
  cabinet_sideShape.lineTo(0.43, 1.56);
  cabinet_sideShape.lineTo(0.36, 1.84);
  cabinet_sideShape.lineTo(0.22, 1.98);
  cabinet_sideShape.lineTo(-0.34, 1.98);
  cabinet_sideShape.lineTo(-0.38, 1.88);
  cabinet_sideShape.closePath();

  const cabinet_sideGeom = new THREE.ExtrudeGeometry(cabinet_sideShape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: false
  });

  const left_side_panel = new THREE.Mesh(cabinet_sideGeom, cabinetMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.rotation.y = Math.PI / 2;
  left_side_panel.position.x = -cabinetW / 2;
  root.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(cabinet_sideGeom, cabinetMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.rotation.y = Math.PI / 2;
  right_side_panel.position.x = cabinetW / 2 - 0.05;
  root.add(right_side_panel);

  const lower_cabinetGeom = new THREE.BoxGeometry(0.94, lowerH, cabinetD);
  const lower_cabinet = new THREE.Mesh(lower_cabinetGeom, cabinetMat);
  lower_cabinet.name = "lower_cabinet";
  lower_cabinet.position.set(0, 0.42, 0);
  root.add(lower_cabinet);

  const upper_cabinetGeom = new THREE.BoxGeometry(0.94, 1.16, 0.64);
  const upper_cabinet = new THREE.Mesh(upper_cabinetGeom, cabinetMat);
  upper_cabinet.name = "upper_cabinet";
  upper_cabinet.position.set(0, 1.43, -0.025);
  root.add(upper_cabinet);

  const top_capGeom = new THREE.BoxGeometry(0.96, 0.055, 0.61);
  const top_cap = new THREE.Mesh(top_capGeom, glossyBlackMat);
  top_cap.name = "top_cap";
  top_cap.position.set(0, 2.015, -0.055);
  root.add(top_cap);

  const base_plinthGeom = new THREE.BoxGeometry(0.96, 0.13, 0.68);
  const base_plinth = new THREE.Mesh(base_plinthGeom, frontPanelMat);
  base_plinth.name = "base_plinth";
  base_plinth.position.set(0, 0.065, 0);
  root.add(base_plinth);

  const feetGeom = new THREE.CylinderGeometry(0.043, 0.048, 0.06, 16);
  const feet = new THREE.InstancedMesh(feetGeom, rubberMat, 4);
  feet.name = "feet";
  const feetDummy = new THREE.Object3D();
  const feetPositions = [
    [-0.41, -0.025, 0.27],
    [0.41, -0.025, 0.27],
    [-0.41, -0.025, -0.27],
    [0.41, -0.025, -0.27]
  ];
  for (let i = 0; i < feetPositions.length; i++) {
    feetDummy.position.set(
      feetPositions[i][0],
      feetPositions[i][1],
      feetPositions[i][2]
    );
    feetDummy.updateMatrix();
    feet.setMatrixAt(i, feetDummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const front_lower_panelGeom = roundedRectGeometry(0.86, 0.70, 0.025, 0.018, true);
  const front_lower_panel = new THREE.Mesh(front_lower_panelGeom, frontPanelMat);
  front_lower_panel.name = "front_lower_panel";
  front_lower_panel.position.set(0, 0.46, 0.365);
  root.add(front_lower_panel);

  const left_lower_rail = addBox(
    root, 0.055, 0.80, 0.055, silverMat,
    -0.465, 0.45, 0.397
  );
  left_lower_rail.name = "left_lower_rail";

  const right_lower_rail = addBox(
    root, 0.055, 0.80, 0.055, silverMat,
    0.465, 0.45, 0.397
  );
  right_lower_rail.name = "right_lower_rail";

  const lower_bottom_trim = addBox(
    root, 0.91, 0.055, 0.055, silverMat,
    0, 0.095, 0.397
  );
  lower_bottom_trim.name = "lower_bottom_trim";

  const lower_purple_led = addBox(
    root, 0.82, 0.012, 0.012, purpleLedMat,
    0, 0.128, 0.426
  );
  lower_purple_led.name = "lower_purple_led";

  const neon_frame = new THREE.Group();
  neon_frame.name = "neon_frame";
  root.add(neon_frame);

  addBox(neon_frame, 0.68, 0.018, 0.014, redLedMat, 0, 0.775, 0.414);
  addBox(neon_frame, 0.68, 0.018, 0.014, redLedMat, 0, 0.205, 0.414);
  addBox(neon_frame, 0.018, 0.585, 0.014, redLedMat, -0.34, 0.49, 0.414);
  addBox(neon_frame, 0.018, 0.585, 0.014, redLedMat, 0.34, 0.49, 0.414);

  const neonCornerGeom = new THREE.TorusGeometry(0.028, 0.007, 8, 18, Math.PI / 2);
  const neon_corners = new THREE.InstancedMesh(neonCornerGeom, redLedMat, 4);
  neon_corners.name = "neon_corners";
  const neonDummy = new THREE.Object3D();
  const neonCorners = [
    [-0.323, 0.757, 0],
    [0.323, 0.757, Math.PI / 2],
    [0.323, 0.223, Math.PI],
    [-0.323, 0.223, -Math.PI / 2]
  ];
  for (let i = 0; i < neonCorners.length; i++) {
    neonDummy.position.set(neonCorners[i][0], neonCorners[i][1], 0.414);
    neonDummy.rotation.set(0, 0, neonCorners[i][2]);
    neonDummy.updateMatrix();
    neon_corners.setMatrixAt(i, neonDummy.matrix);
  }
  neon_corners.instanceMatrix.needsUpdate = true;
  neon_frame.add(neon_corners);

  const speakerGrilleGeom = roundedRectGeometry(0.29, 0.115, 0.055, 0.009, false);
  const speaker_grilles = new THREE.InstancedMesh(speakerGrilleGeom, rubberMat, 3);
  speaker_grilles.name = "speaker_grilles";
  const grilleDummy = new THREE.Object3D();
  const grilleRows = [0.705, 0.605, 0.275];
  for (let i = 0; i < grilleRows.length; i++) {
    grilleDummy.position.set(0, grilleRows[i], 0.407);
    grilleDummy.rotation.set(0, 0, 0);
    grilleDummy.updateMatrix();
    speaker_grilles.setMatrixAt(i, grilleDummy.matrix);
  }
  speaker_grilles.instanceMatrix.needsUpdate = true;
  root.add(speaker_grilles);

  const ventSlotGeom = new THREE.BoxGeometry(0.034, 0.006, 0.007);
  const vent_slots = new THREE.InstancedMesh(ventSlotGeom, insetMat, 45);
  vent_slots.name = "vent_slots";
  const ventDummy = new THREE.Object3D();
  let ventIndex = 0;
  for (let row = 0; row < 3; row++) {
    for (let rowInner = 0; rowInner < 3; rowInner++) {
      for (let col = 0; col < 5; col++) {
        ventDummy.position.set(
          -0.096 + col * 0.048,
          grilleRows[row] - 0.03 + rowInner * 0.03,
          0.421
        );
        ventDummy.rotation.set(0, 0, 0);
        ventDummy.updateMatrix();
        vent_slots.setMatrixAt(ventIndex++, ventDummy.matrix);
      }
    }
  }
  vent_slots.instanceMatrix.needsUpdate = true;
  root.add(vent_slots);

  const service_monitor_frameGeom = roundedRectGeometry(0.47, 0.235, 0.018, 0.024, true);
  const service_monitor_frame = new THREE.Mesh(service_monitor_frameGeom, silverMat);
  service_monitor_frame.name = "service_monitor_frame";
  service_monitor_frame.position.set(0, 0.455, 0.411);
  root.add(service_monitor_frame);

  const service_monitor_bezel = addBox(
    root, 0.425, 0.19, 0.018, glossyBlackMat,
    0, 0.455, 0.442
  );
  service_monitor_bezel.name = "service_monitor_bezel";

  const service_monitor_screen = addBox(
    root, 0.285, 0.145, 0.012, monitorScreenMat,
    -0.065, 0.455, 0.455
  );
  service_monitor_screen.name = "service_monitor_screen";

  const monitor_scanlineGeom = new THREE.BoxGeometry(0.23, 0.003, 0.004);
  const monitor_scanlines = new THREE.InstancedMesh(monitor_scanlineGeom, cyanLedMat, 5);
  monitor_scanlines.name = "monitor_scanlines";
  const scanDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    scanDummy.position.set(-0.07, 0.405 + i * 0.025, 0.463);
    scanDummy.updateMatrix();
    monitor_scanlines.setMatrixAt(i, scanDummy.matrix);
  }
  monitor_scanlines.instanceMatrix.needsUpdate = true;
  root.add(monitor_scanlines);

  const monitor_signal = addBox(
    root, 0.006, 0.105, 0.005, creamMat,
    -0.02, 0.455, 0.465
  );
  monitor_signal.name = "monitor_signal";
  monitor_signal.rotation.z = -0.55;

  const monitor_button_left = addBox(
    root, 0.045, 0.052, 0.018, brushedMat,
    0.135, 0.43, 0.464
  );
  monitor_button_left.name = "monitor_button_left";

  const monitor_button_right = addBox(
    root, 0.045, 0.052, 0.018, darkRedMat,
    0.19, 0.43, 0.464
  );
  monitor_button_right.name = "monitor_button_right";

  const monitor_status_light = new THREE.Mesh(
    new THREE.SphereGeometry(0.012, 12, 8),
    redLedMat
  );
  monitor_status_light.name = "monitor_status_light";
  monitor_status_light.position.set(0.163, 0.49, 0.47);
  root.add(monitor_status_light);

  const control_console = new THREE.Group();
  control_console.name = "control_console";
  control_console.position.set(0, 0.96, 0.315);
  control_console.rotation.x = 0.28;
  root.add(control_console);

  const console_trayGeom = roundedRectGeometry(0.96, 0.285, 0.035, 0.045, true);
  const console_tray = new THREE.Mesh(console_trayGeom, glossyBlackMat);
  console_tray.name = "console_tray";
  console_tray.rotation.x = -Math.PI / 2;
  control_console.add(console_tray);

  const console_panelGeom = roundedRectGeometry(0.86, 0.225, 0.025, 0.014, true);
  const console_panel = new THREE.Mesh(console_panelGeom, purplePanelMat);
  console_panel.name = "console_panel";
  console_panel.rotation.x = -Math.PI / 2;
  console_panel.position.y = 0.047;
  control_console.add(console_panel);

  const console_front_trim = addBox(
    control_console, 0.94, 0.055, 0.045, silverMat,
    0, -0.005, 0.15
  );
  console_front_trim.name = "console_front_trim";

  const console_purple_led = addBox(
    control_console, 0.79, 0.009, 0.012, purpleLedMat,
    0, 0.064, 0.115
  );
  console_purple_led.name = "console_purple_led";

  const joystickBaseGeom = new THREE.CylinderGeometry(0.068, 0.075, 0.025, 24);
  const joystickCollarGeom = new THREE.CylinderGeometry(0.046, 0.062, 0.035, 24);
  const joystickStemGeom = new THREE.CylinderGeometry(0.011, 0.014, 0.075, 12);
  const joystickBallGeom = new THREE.SphereGeometry(0.047, 20, 12);

  const left_joystick_base = new THREE.Mesh(joystickBaseGeom, silverMat);
  left_joystick_base.name = "left_joystick_base";
  left_joystick_base.position.set(-0.29, 0.074, -0.012);
  control_console.add(left_joystick_base);

  const left_joystick_collar = new THREE.Mesh(joystickCollarGeom, brushedMat);
  left_joystick_collar.name = "left_joystick_collar";
  left_joystick_collar.position.set(-0.29, 0.098, -0.012);
  control_console.add(left_joystick_collar);

  const left_joystick_stem = new THREE.Mesh(joystickStemGeom, silverMat);
  left_joystick_stem.name = "left_joystick_stem";
  left_joystick_stem.position.set(-0.29, 0.142, -0.012);
  control_console.add(left_joystick_stem);

  const left_joystick_ball = new THREE.Mesh(joystickBallGeom, pinkLedMat);
  left_joystick_ball.name = "left_joystick_ball";
  left_joystick_ball.position.set(-0.29, 0.198, -0.012);
  control_console.add(left_joystick_ball);

  const right_joystick_base = new THREE.Mesh(joystickBaseGeom, silverMat);
  right_joystick_base.name = "right_joystick_base";
  right_joystick_base.position.set(0.31, 0.074, 0.005);
  control_console.add(right_joystick_base);

  const right_joystick_collar = new THREE.Mesh(joystickCollarGeom, brushedMat);
  right_joystick_collar.name = "right_joystick_collar";
  right_joystick_collar.position.set(0.31, 0.098, 0.005);
  control_console.add(right_joystick_collar);

  const right_joystick_stem = new THREE.Mesh(joystickStemGeom, silverMat);
  right_joystick_stem.name = "right_joystick_stem";
  right_joystick_stem.position.set(0.31, 0.142, 0.005);
  control_console.add(right_joystick_stem);

  const right_joystick_ball = new THREE.Mesh(joystickBallGeom, silverMat);
  right_joystick_ball.name = "right_joystick_ball";
  right_joystick_ball.position.set(0.31, 0.198, 0.005);
  control_console.add(right_joystick_ball);

  const buttonBaseGeom = new THREE.CylinderGeometry(0.038, 0.042, 0.018, 18);
  const buttonCapGeom = new THREE.CylinderGeometry(0.031, 0.034, 0.022, 18);

  function makeButton(mat, x, z, name) {
    const group = new THREE.Group();
    group.name = name;
    group.position.set(x, 0.066, z);

    const base = new THREE.Mesh(buttonBaseGeom, glossyBlackMat);
    base.position.y = 0.009;
    group.add(base);

    const cap = new THREE.Mesh(buttonCapGeom, mat);
    cap.position.y = 0.025;
    group.add(cap);

    control_console.add(group);
    return group;
  }

  const green_button = makeButton(greenButtonMat, -0.405, 0.065, "green_button");
  const red_button = makeButton(redButtonMat, -0.145, 0.07, "red_button");
  const blue_button = makeButton(blueButtonMat, -0.035, 0.07, "blue_button");
  const cyan_button = makeButton(cyanButtonMat, 0.075, 0.07, "cyan_button");
  const orange_button = makeButton(orangeButtonMat, 0.19, 0.07, "orange_button");

  const center_action_button = new THREE.Group();
  center_action_button.name = "center_action_button";
  center_action_button.position.set(0.015, 0.068, 0.105);
  const center_action_button_base = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 0.025, 0.06),
    glossyBlackMat
  );
  center_action_button.add(center_action_button_base);
  const center_action_button_cap = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.025, 0.045),
    brushedMat
  );
  center_action_button_cap.position.y = 0.022;
  center_action_button.add(center_action_button_cap);
  control_console.add(center_action_button);

  const dialBaseGeom = new THREE.CylinderGeometry(0.038, 0.043, 0.018, 18);
  const dialCapGeom = new THREE.CylinderGeometry(0.027, 0.032, 0.035, 18);
  const small_dial = new THREE.Group();
  small_dial.name = "small_dial";
  small_dial.position.set(0.205, 0.069, 0.095);
  const small_dial_base = new THREE.Mesh(dialBaseGeom, silverMat);
  small_dial.add(small_dial_base);
  const small_dial_cap = new THREE.Mesh(dialCapGeom, glossyBlackMat);
  small_dial_cap.position.y = 0.029;
  small_dial.add(small_dial_cap);
  control_console.add(small_dial);

  const consoleLabelGeom = new THREE.BoxGeometry(0.045, 0.004, 0.008);
  const console_labels = new THREE.InstancedMesh(consoleLabelGeom, whiteMat, 8);
  console_labels.name = "console_labels";
  const labelDummy = new THREE.Object3D();
  const labelPositions = [
    [-0.405, 0.115], [-0.29, 0.085], [-0.145, 0.12], [-0.035, 0.12],
    [0.075, 0.12], [0.19, 0.12], [0.31, 0.085], [0.39, 0.11]
  ];
  for (let i = 0; i < labelPositions.length; i++) {
    labelDummy.position.set(labelPositions[i][0], 0.067, labelPositions[i][1]);
    labelDummy.updateMatrix();
    console_labels.setMatrixAt(i, labelDummy.matrix);
  }
  console_labels.instanceMatrix.needsUpdate = true;
  control_console.add(console_labels);

  const console_screwGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.008, 12);
  const console_screws = new THREE.InstancedMesh(console_screwGeom, silverMat, 4);
  console_screws.name = "console_screws";
  const screwDummy = new THREE.Object3D();
  const consoleScrewPositions = [
    [-0.41, -0.105], [0.41, -0.105], [-0.41, 0.105], [0.41, 0.105]
  ];
  for (let i = 0; i < consoleScrewPositions.length; i++) {
    screwDummy.position.set(consoleScrewPositions[i][0], 0.066, consoleScrewPositions[i][1]);
    screwDummy.updateMatrix();
    console_screws.setMatrixAt(i, screwDummy.matrix);
  }
  console_screws.instanceMatrix.needsUpdate = true;
  control_console.add(console_screws);

  const screen_assembly = new THREE.Group();
  screen_assembly.name = "screen_assembly";
  screen_assembly.position.set(0, 1.385, 0.325);
  screen_assembly.rotation.x = -0.17;
  root.add(screen_assembly);

  const screen_bezelGeom = roundedRectGeometry(playfieldW, 0.47, 0.035, 0.035, true);
  const screen_bezel = new THREE.Mesh(screen_bezelGeom, glossyBlackMat);
  screen_bezel.name = "screen_bezel";
  screen_bezel.position.z = -0.015;
  screen_assembly.add(screen_bezel);

  const screen_displayGeom = roundedRectGeometry(0.75, 0.39, 0.018, 0.012, false);
  const screen_display = new THREE.Mesh(screen_displayGeom, screenMat);
  screen_display.name = "screen_display";
  screen_display.position.z = 0.025;
  screen_assembly.add(screen_display);

  const reelPanelGeom = new THREE.BoxGeometry(0.088, 0.29, 0.006);
  const screen_reel_panels = new THREE.InstancedMesh(reelPanelGeom, whiteMat, 5);
  screen_reel_panels.name = "screen_reel_panels";
  const reelDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    reelDummy.position.set(-0.245 + i * 0.098, -0.005, 0.042);
    reelDummy.updateMatrix();
    screen_reel_panels.setMatrixAt(i, reelDummy.matrix);
  }
  screen_reel_panels.instanceMatrix.needsUpdate = true;
  screen_assembly.add(screen_reel_panels);

  const screen_header = addBox(
    screen_assembly, 0.69, 0.042, 0.008, darkRedMat,
    0, 0.166, 0.044
  );
  screen_header.name = "screen_header";

  const screen_left_banner = addBox(
    screen_assembly, 0.105, 0.275, 0.008, darkRedMat,
    -0.335, -0.005, 0.044
  );
  screen_left_banner.name = "screen_left_banner";

  const screen_right_banner = addBox(
    screen_assembly, 0.105, 0.275, 0.008, purplePanelMat,
    0.335, -0.005, 0.044
  );
  screen_right_banner.name = "screen_right_banner";

  const screen_footer = addBox(
    screen_assembly, 0.69, 0.045, 0.008, purpleLedMat,
    0, -0.17, 0.044
  );
  screen_footer.name = "screen_footer";

  const screen_dividerGeom = new THREE.BoxGeometry(0.006, 0.31, 0.007);
  const screen_dividers = new THREE.InstancedMesh(screen_dividerGeom, creamMat, 6);
  screen_dividers.name = "screen_dividers";
  const dividerDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    dividerDummy.position.set(-0.294 + i * 0.098, -0.005, 0.051);
    dividerDummy.updateMatrix();
    screen_dividers.setMatrixAt(i, dividerDummy.matrix);
  }
  screen_dividers.instanceMatrix.needsUpdate = true;
  screen_assembly.add(screen_dividers);

  const symbolGeom = new THREE.CircleGeometry(0.022, 14);
  const cherrySymbolMat = new THREE.MeshStandardMaterial({
    color: 0xe73735,
    metalness: 0.0,
    roughness: 0.7
  });
  const lemonSymbolMat = new THREE.MeshStandardMaterial({
    color: 0xf1cf3e,
    metalness: 0.0,
    roughness: 0.7
  });
  const plumSymbolMat = new THREE.MeshStandardMaterial({
    color: 0x8f45b6,
    metalness: 0.0,
    roughness: 0.7
  });
  const orangeSymbolMat = new THREE.MeshStandardMaterial({
    color: 0xef7b27,
    metalness: 0.0,
    roughness: 0.7
  });
  const diamondSymbolMat = new THREE.MeshStandardMaterial({
    color: 0x2bcde2,
    metalness: 0.0,
    roughness: 0.7
  });

  function makeSymbolInstances(mat, positions, name) {
    const symbols = new THREE.InstancedMesh(symbolGeom, mat, positions.length);
    symbols.name = name;
    const symbolDummy = new THREE.Object3D();
    for (let i = 0; i < positions.length; i++) {
      symbolDummy.position.set(positions[i][0], positions[i][1], 0.057);
      symbolDummy.scale.set(
        positions[i][2] || 1,
        positions[i][3] || 1,
        1
      );
      symbolDummy.rotation.set(0, 0, positions[i][4] || 0);
      symbolDummy.updateMatrix();
      symbols.setMatrixAt(i, symbolDummy.matrix);
    }
    symbols.instanceMatrix.needsUpdate = true;
    screen_assembly.add(symbols);
    return symbols;
  }

  const cherry_symbols = makeSymbolInstances(
    cherrySymbolMat,
    [
      [-0.245, 0.075, 1.0, 1.0, 0],
      [-0.245, -0.045, 1.0, 1.0, 0],
      [0.052, -0.095, 0.9, 0.9, 0]
    ],
    "cherry_symbols"
  );

  const lemon_symbols = makeSymbolInstances(
    lemonSymbolMat,
    [
      [-0.147, -0.095, 1.3, 0.75, 0.2],
      [0.15, 0.075, 1.25, 0.75, -0.2],
      [0.248, -0.095, 1.2, 0.75, 0.2]
    ],
    "lemon_symbols"
  );

  const plum_symbols = makeSymbolInstances(
    plumSymbolMat,
    [
      [-0.049, 0.075, 0.9, 1.2, 0],
      [0.15, -0.045, 0.9, 1.2, 0],
      [0.248, 0.075, 0.9, 1.2, 0]
    ],
    "plum_symbols"
  );

  const orange_symbols = makeSymbolInstances(
    orangeSymbolMat,
    [
      [-0.147, 0.075, 1.0, 1.0, 0],
      [-0.049, -0.095, 1.0, 1.0, 0],
      [0.248, -0.045, 1.0, 1.0, 0]
    ],
    "orange_symbols"
  );

  const diamond_symbols = makeSymbolInstances(
    diamondSymbolMat,
    [
      [-0.049, -0.015, 0.8, 0.8, Math.PI / 4],
      [0.15, -0.015, 0.8, 0.8, Math.PI / 4],
      [0.052, 0.075, 0.8, 0.8, Math.PI / 4]
    ],
    "diamond_symbols"
  );

  const screen_barGeom = new THREE.BoxGeometry(0.042, 0.008, 0.006);
  const screen_text_bars = new THREE.InstancedMesh(screen_barGeom, creamMat, 20);
  screen_text_bars.name = "screen_text_bars";
  const screenBarDummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    if (i < 8) {
      screenBarDummy.position.set(-0.245 + i * 0.07, 0.166, 0.052);
    } else if (i < 14) {
      const j = i - 8;
      screenBarDummy.position.set(-0.335, 0.085 - j * 0.045, 0.052);
    } else {
      const j = i - 14;
      screenBarDummy.position.set(0.335, 0.085 - j * 0.055, 0.052);
    }
    screenBarDummy.scale.set(i % 3 === 0 ? 1.25 : 1, 1, 1);
    screenBarDummy.updateMatrix();
    screen_text_bars.setMatrixAt(i, screenBarDummy.matrix);
  }
  screen_text_bars.instanceMatrix.needsUpdate = true;
  screen_assembly.add(screen_text_bars);

  const screen_glassGeom = roundedRectGeometry(0.75, 0.39, 0.018, 0.003, false);
  const screen_glass = new THREE.Mesh(screen_glassGeom, screenGlassMat);
  screen_glass.name = "screen_glass";
  screen_glass.position.z = 0.064;
  screen_assembly.add(screen_glass);

  const left_screen_trim = addBox(
    screen_assembly, 0.025, 0.48, 0.035, silverMat,
    -0.43, 0, -0.005
  );
  left_screen_trim.name = "left_screen_trim";

  const right_screen_trim = addBox(
    screen_assembly, 0.025, 0.48, 0.035, silverMat,
    0.43, 0, -0.005
  );
  right_screen_trim.name = "right_screen_trim";

  const screen_top_trim = addBox(
    screen_assembly, 0.86, 0.026, 0.035, silverMat,
    0, 0.242, -0.005
  );
  screen_top_trim.name = "screen_top_trim";

  const screen_bottom_trim = addBox(
    screen_assembly, 0.86, 0.026, 0.035, silverMat,
    0, -0.242, -0.005
  );
  screen_bottom_trim.name = "screen_bottom_trim";

  const marquee_assembly = new THREE.Group();
  marquee_assembly.name = "marquee_assembly";
  marquee_assembly.position.set(0, 1.805, 0.325);
  root.add(marquee_assembly);

  const marquee_backGeom = roundedRectGeometry(0.91, 0.255, 0.025, 0.035, true);
  const marquee_back = new THREE.Mesh(marquee_backGeom, glossyBlackMat);
  marquee_back.name = "marquee_back";
  marquee_back.position.z = -0.018;
  marquee_assembly.add(marquee_back);

  const marquee_displayGeom = roundedRectGeometry(0.84, 0.19, 0.015, 0.012, false);
  const marquee_display = new THREE.Mesh(marquee_displayGeom, purplePanelMat);
  marquee_display.name = "marquee_display";
  marquee_display.position.z = 0.02;
  marquee_assembly.add(marquee_display);

  const marquee_light_left = addBox(
    marquee_assembly, 0.22, 0.15, 0.008, pinkLedMat,
    -0.29, 0, 0.037
  );
  marquee_light_left.name = "marquee_light_left";

  const marquee_light_right = addBox(
    marquee_assembly, 0.22, 0.15, 0.008, cyanLedMat,
    0.29, 0, 0.037
  );
  marquee_light_right.name = "marquee_light_right";

  const marquee_title_border = addBox(
    marquee_assembly, 0.49, 0.165, 0.014, creamMat,
    0, 0, 0.043
  );
  marquee_title_border.name = "marquee_title_border";

  const marquee_title_panel = addBox(
    marquee_assembly, 0.465, 0.142, 0.014, insetMat,
    0, 0, 0.052
  );
  marquee_title_panel.name = "marquee_title_panel";

  const marquee_glyphs = new THREE.Group();
  marquee_glyphs.name = "marquee_glyphs";
  marquee_assembly.add(marquee_glyphs);

  const titlePatterns = {
    J: ["111", "001", "001", "001", "110"],
    O: ["111", "101", "101", "101", "111"],
    K: ["101", "110", "100", "110", "101"],
    E: ["111", "100", "110", "100", "111"],
    R: ["110", "101", "110", "101", "101"]
  };
  const titleWord = "JOKER";
  const titleCell = 0.018;
  const titleStartX = -(titleWord.length * 4 - 1) * titleCell / 2;

  for (let letter = 0; letter < titleWord.length; letter++) {
    const pattern = titlePatterns[titleWord[letter]];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        if (pattern[row][col] === "1") {
          const title_pixel = addBox(
            marquee_glyphs,
            0.014,
            0.014,
            0.008,
            letter === 4 ? orangeLedMat : creamMat,
            titleStartX + (letter * 4 + col) * titleCell,
            (2 - row) * titleCell,
            0.064
          );
          title_pixel.name = "marquee_title_pixel";
        }
      }
    }
  }

  const marquee_character = new THREE.Group();
  marquee_character.name = "marquee_character";
  marquee_assembly.add(marquee_character);

  const marquee_head = new THREE.Mesh(
    new THREE.CircleGeometry(0.018, 14),
    creamMat
  );
  marquee_head.name = "marquee_head";
  marquee_head.position.set(0.315, 0.045, 0.061);
  marquee_character.add(marquee_head);

  const marquee_torso = addBox(
    marquee_character, 0.022, 0.065, 0.008, orangeLedMat,
    0.315, 0.005, 0.061
  );
  marquee_torso.name = "marquee_torso";

  const marquee_left_arm = addRod(
    marquee_character,
    new THREE.Vector3(0.302, 0.02, 0.061),
    new THREE.Vector3(0.265, 0.055, 0.061),
    0.006,
    creamMat,
    8
  );
  marquee_left_arm.name = "marquee_left_arm";

  const marquee_right_arm = addRod(
    marquee_character,
    new THREE.Vector3(0.328, 0.02, 0.061),
    new THREE.Vector3(0.365, -0.005, 0.061),
    0.006,
    creamMat,
    8
  );
  marquee_right_arm.name = "marquee_right_arm";

  const marquee_left_leg = addRod(
    marquee_character,
    new THREE.Vector3(0.307, -0.02, 0.061),
    new THREE.Vector3(0.278, -0.06, 0.061),
    0.006,
    creamMat,
    8
  );
  marquee_left_leg.name = "marquee_left_leg";

  const marquee_right_leg = addRod(
    marquee_character,
    new THREE.Vector3(0.323, -0.02, 0.061),
    new THREE.Vector3(0.35, -0.06, 0.061),
    0.006,
    creamMat,
    8
  );
  marquee_right_leg.name = "marquee_right_leg";

  const marquee_top_trim = addBox(
    marquee_assembly, 0.91, 0.035, 0.045, silverMat,
    0, 0.135, 0.01
  );
  marquee_top_trim.name = "marquee_top_trim";

  const marquee_bottom_trim = addBox(
    marquee_assembly, 0.91, 0.035, 0.045, silverMat,
    0, -0.135, 0.01
  );
  marquee_bottom_trim.name = "marquee_bottom_trim";

  const marquee_left_trim = addBox(
    marquee_assembly, 0.032, 0.245, 0.045, silverMat,
    -0.455, 0, 0.01
  );
  marquee_left_trim.name = "marquee_left_trim";

  const marquee_right_trim = addBox(
    marquee_assembly, 0.032, 0.245, 0.045, silverMat,
    0.455, 0, 0.01
  );
  marquee_right_trim.name = "marquee_right_trim";

  const left_upper_rail = addRod(
    root,
    new THREE.Vector3(-0.49, 0.89, 0.445),
    new THREE.Vector3(-0.49, 1.94, 0.285),
    0.018,
    silverMat,
    12
  );
  left_upper_rail.name = "left_upper_rail";

  const right_upper_rail = addRod(
    root,
    new THREE.Vector3(0.49, 0.89, 0.445),
    new THREE.Vector3(0.49, 1.94, 0.285),
    0.018,
    silverMat,
    12
  );
  right_upper_rail.name = "right_upper_rail";

  const left_upper_rail_inset = addRod(
    root,
    new THREE.Vector3(-0.462, 0.9, 0.452),
    new THREE.Vector3(-0.462, 1.93, 0.295),
    0.006,
    glossyBlackMat,
    8
  );
  left_upper_rail_inset.name = "left_upper_rail_inset";

  const right_upper_rail_inset = addRod(
    root,
    new THREE.Vector3(0.462, 0.9, 0.452),
    new THREE.Vector3(0.462, 1.93, 0.295),
    0.006,
    glossyBlackMat,
    8
  );
  right_upper_rail_inset.name = "right_upper_rail_inset";

  const sideScrewGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.009, 12);
  const side_screws = new THREE.InstancedMesh(sideScrewGeom, silverMat, 6);
  side_screws.name = "side_screws";
  const sideScrewDummy = new THREE.Object3D();
  const sideScrewPositions = [
    [1.82, -0.12],
    [1.02, 0.16],
    [0.34, 0.22]
  ];
  let sideScrewIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < sideScrewPositions.length; i++) {
      sideScrewDummy.position.set(
        side * 0.526,
        sideScrewPositions[i][0],
        sideScrewPositions[i][1]
      );
      sideScrewDummy.rotation.set(0, 0, Math.PI / 2);
      sideScrewDummy.updateMatrix();
      side_screws.setMatrixAt(sideScrewIndex++, sideScrewDummy.matrix);
    }
  }
  side_screws.instanceMatrix.needsUpdate = true;
  root.add(side_screws);

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