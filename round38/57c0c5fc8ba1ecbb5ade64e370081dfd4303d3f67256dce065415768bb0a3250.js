export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "joker_arcade_cabinet";

  const cabinetW = 1.0;
  const cabinetH = 2.06;
  const lowerFrontZ = 0.27;
  const controlFrontZ = 0.57;

  const cabinetMat = new THREE.MeshStandardMaterial({
    color: 0x151619,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const insetMat = new THREE.MeshStandardMaterial({
    color: 0x090a0d,
    metalness: 0.0,
    roughness: 0.8
  });
  const glossyBlackMat = new THREE.MeshStandardMaterial({
    color: 0x111216,
    metalness: 0.0,
    roughness: 0.3
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const ventMat = new THREE.MeshStandardMaterial({
    color: 0x020304,
    metalness: 0.0,
    roughness: 0.8
  });
  const purplePanelMat = new THREE.MeshStandardMaterial({
    color: 0x7a3db8,
    metalness: 0.0,
    roughness: 0.3
  });
  const redNeonMat = new THREE.MeshStandardMaterial({
    color: 0xff3b32,
    emissive: 0xff3b32,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const pinkNeonMat = new THREE.MeshStandardMaterial({
    color: 0xff168d,
    emissive: 0xff168d,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const cyanNeonMat = new THREE.MeshStandardMaterial({
    color: 0x20e8ff,
    emissive: 0x20e8ff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const greenNeonMat = new THREE.MeshStandardMaterial({
    color: 0x42ff75,
    emissive: 0x42ff75,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const violetNeonMat = new THREE.MeshStandardMaterial({
    color: 0x9c4dff,
    emissive: 0x9c4dff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const whiteGraphicMat = new THREE.MeshStandardMaterial({
    color: 0xfff4d6,
    metalness: 0.0,
    roughness: 0.7
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x101722,
    emissive: 0x102438,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.2
  });
  const screenBlueMat = new THREE.MeshStandardMaterial({
    color: 0x174d78,
    emissive: 0x174d78,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3
  });
  const redButtonMat = new THREE.MeshStandardMaterial({
    color: 0xf02b45,
    metalness: 0.0,
    roughness: 0.3
  });
  const greenButtonMat = new THREE.MeshStandardMaterial({
    color: 0x43c85a,
    metalness: 0.0,
    roughness: 0.3
  });
  const blueButtonMat = new THREE.MeshStandardMaterial({
    color: 0x168ed0,
    metalness: 0.0,
    roughness: 0.3
  });
  const orangeGraphicMat = new THREE.MeshStandardMaterial({
    color: 0xff7a22,
    metalness: 0.0,
    roughness: 0.7
  });

  const lower_cabinet_bodyGeom = new THREE.BoxGeometry(0.94, 1.03, 0.56);
  const lower_cabinet_body = new THREE.Mesh(lower_cabinet_bodyGeom, cabinetMat);
  lower_cabinet_body.position.set(0, 0.565, -0.01);
  root.add(lower_cabinet_body);

  const upper_cabinet_bodyGeom = new THREE.BoxGeometry(0.94, 0.70, 0.50);
  const upper_cabinet_body = new THREE.Mesh(upper_cabinet_bodyGeom, cabinetMat);
  upper_cabinet_body.position.set(0, 1.66, -0.04);
  root.add(upper_cabinet_body);

  const sidePanelShape = new THREE.Shape();
  sidePanelShape.moveTo(0.28, 0.05);
  sidePanelShape.lineTo(0.28, 2.02);
  sidePanelShape.lineTo(-0.10, cabinetH);
  sidePanelShape.lineTo(-0.22, 1.43);
  sidePanelShape.lineTo(-0.42, 1.25);
  sidePanelShape.lineTo(-0.58, 1.03);
  sidePanelShape.lineTo(-0.58, 0.88);
  sidePanelShape.lineTo(-0.31, 0.05);
  sidePanelShape.closePath();

  const side_panelGeom = new THREE.ExtrudeGeometry(sidePanelShape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: false
  });

  const left_side_panel = new THREE.Mesh(side_panelGeom, cabinetMat);
  left_side_panel.rotation.y = Math.PI / 2;
  left_side_panel.position.x = -cabinetW / 2;
  root.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, cabinetMat);
  right_side_panel.rotation.y = Math.PI / 2;
  right_side_panel.position.x = cabinetW / 2 - 0.05;
  root.add(right_side_panel);

  const top_capGeom = new THREE.BoxGeometry(0.98, 0.07, 0.36);
  const top_cap = new THREE.Mesh(top_capGeom, cabinetMat);
  top_cap.position.set(0, 2.035, -0.08);
  root.add(top_cap);

  const base_plinthGeom = new THREE.BoxGeometry(0.98, 0.18, 0.62);
  const base_plinth = new THREE.Mesh(base_plinthGeom, glossyBlackMat);
  base_plinth.position.set(0, 0.09, -0.01);
  root.add(base_plinth);

  const feetGeom = new THREE.BoxGeometry(0.13, 0.08, 0.14);
  const feet = new THREE.InstancedMesh(feetGeom, insetMat, 4);
  const dummy = new THREE.Object3D();
  const footPositions = [
    [-0.40, 0.00, 0.18],
    [0.40, 0.00, 0.18],
    [-0.40, 0.00, -0.18],
    [0.40, 0.00, -0.18]
  ];
  for (let i = 0; i < footPositions.length; i++) {
    dummy.position.set(footPositions[i][0], footPositions[i][1], footPositions[i][2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    feet.setMatrixAt(i, dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const lower_front_doorGeom = new THREE.BoxGeometry(0.84, 0.84, 0.035);
  const lower_front_door = new THREE.Mesh(lower_front_doorGeom, insetMat);
  lower_front_door.position.set(0, 0.58, lowerFrontZ);
  root.add(lower_front_door);

  const lower_side_frameGeom = new THREE.BoxGeometry(0.055, 1.00, 0.065);
  const lower_left_frame = new THREE.Mesh(lower_side_frameGeom, silverMat);
  lower_left_frame.position.set(-0.465, 0.57, 0.285);
  root.add(lower_left_frame);

  const lower_right_frame = new THREE.Mesh(lower_side_frameGeom, silverMat);
  lower_right_frame.position.set(0.465, 0.57, 0.285);
  root.add(lower_right_frame);

  const lower_bottom_trimGeom = new THREE.BoxGeometry(0.91, 0.065, 0.07);
  const lower_bottom_trim = new THREE.Mesh(lower_bottom_trimGeom, silverMat);
  lower_bottom_trim.position.set(0, 0.145, 0.30);
  root.add(lower_bottom_trim);

  const lower_top_trimGeom = new THREE.BoxGeometry(0.91, 0.055, 0.07);
  const lower_top_trim = new THREE.Mesh(lower_top_trimGeom, silverMat);
  lower_top_trim.position.set(0, 1.015, 0.30);
  root.add(lower_top_trim);

  const neonBorderPoints = [
    new THREE.Vector3(-0.31, 0.24, 0.309),
    new THREE.Vector3(-0.36, 0.28, 0.309),
    new THREE.Vector3(-0.36, 0.82, 0.309),
    new THREE.Vector3(-0.32, 0.88, 0.309),
    new THREE.Vector3(0.32, 0.88, 0.309),
    new THREE.Vector3(0.36, 0.84, 0.309),
    new THREE.Vector3(0.36, 0.28, 0.309),
    new THREE.Vector3(0.32, 0.24, 0.309)
  ];
  const neonBorderCurve = new THREE.CatmullRomCurve3(
    neonBorderPoints,
    true,
    "centripetal"
  );
  const neon_borderGeom = new THREE.TubeGeometry(
    neonBorderCurve,
    64,
    0.011,
    8,
    true
  );
  const neon_border = new THREE.Mesh(neon_borderGeom, redNeonMat);
  root.add(neon_border);

  const ventPositions = [0.88, 0.70, 0.31];
  const ventScaleX = [1.0, 1.23, 1.12];
  const ventScaleY = [0.52, 0.70, 0.70];
  const ventilation_grillesGeom = new THREE.CircleGeometry(0.10, 28);
  const ventilation_grilles = new THREE.InstancedMesh(
    ventilation_grillesGeom,
    ventMat,
    ventPositions.length
  );
  for (let i = 0; i < ventPositions.length; i++) {
    dummy.position.set(0, ventPositions[i], 0.292);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(ventScaleX[i], ventScaleY[i], 1);
    dummy.updateMatrix();
    ventilation_grilles.setMatrixAt(i, dummy.matrix);
  }
  ventilation_grilles.instanceMatrix.needsUpdate = true;
  root.add(ventilation_grilles);

  const vent_holesGeom = new THREE.CircleGeometry(0.008, 8);
  const vent_holes = new THREE.InstancedMesh(vent_holesGeom, ventMat, 45);
  let ventIndex = 0;
  for (let v = 0; v < ventPositions.length; v++) {
    for (let row = -2; row <= 2; row++) {
      for (let col = -4; col <= 4; col++) {
        const offset = Math.abs(row) % 2 === 0 ? 0 : 0.009;
        dummy.position.set(
          col * 0.018 + offset,
          ventPositions[v] + row * 0.018,
          0.294
        );
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 0.72, 1);
        dummy.updateMatrix();
        vent_holes.setMatrixAt(ventIndex++, dummy.matrix);
      }
    }
  }
  vent_holes.instanceMatrix.needsUpdate = true;
  root.add(vent_holes);

  const service_display_bezelGeom = new THREE.BoxGeometry(0.52, 0.27, 0.045);
  const service_display_bezel = new THREE.Mesh(service_display_bezelGeom, silverMat);
  service_display_bezel.position.set(0, 0.50, 0.326);
  root.add(service_display_bezel);

  const service_display_screenGeom = new THREE.BoxGeometry(0.43, 0.18, 0.014);
  const service_display_screen = new THREE.Mesh(service_display_screenGeom, screenMat);
  service_display_screen.position.set(-0.015, 0.50, 0.354);
  root.add(service_display_screen);

  const service_scanlineGeom = new THREE.BoxGeometry(0.24, 0.006, 0.004);
  const service_scanlines = new THREE.InstancedMesh(service_scanlineGeom, cyanNeonMat, 4);
  for (let i = 0; i < 4; i++) {
    dummy.position.set(-0.10, 0.45 + i * 0.035, 0.363);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1 - i * 0.12, 1, 1);
    dummy.updateMatrix();
    service_scanlines.setMatrixAt(i, dummy.matrix);
  }
  service_scanlines.instanceMatrix.needsUpdate = true;
  root.add(service_scanlines);

  const service_signal_curveGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.20, 0.45, 0.366),
      new THREE.Vector3(-0.13, 0.53, 0.366),
      new THREE.Vector3(-0.06, 0.47, 0.366),
      new THREE.Vector3(0.01, 0.55, 0.366),
      new THREE.Vector3(0.06, 0.49, 0.366)
    ]),
    20,
    0.003,
    6,
    false
  );
  const service_signal_curve = new THREE.Mesh(service_signal_curveGeom, greenNeonMat);
  root.add(service_signal_curve);

  const service_switchGeom = new THREE.BoxGeometry(0.035, 0.065, 0.025);
  const service_switches = new THREE.InstancedMesh(service_switchGeom, silverMat, 2);
  for (let i = 0; i < 2; i++) {
    dummy.position.set(0.14 + i * 0.045, 0.49, 0.366);
    dummy.rotation.set(0, 0, i === 0 ? -0.18 : 0.12);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    service_switches.setMatrixAt(i, dummy.matrix);
  }
  service_switches.instanceMatrix.needsUpdate = true;
  root.add(service_switches);

  const service_status_lightsGeom = new THREE.CircleGeometry(0.009, 12);
  const service_status_lights = new THREE.InstancedMesh(
    service_status_lightsGeom,
    redNeonMat,
    3
  );
  for (let i = 0; i < 3; i++) {
    dummy.position.set(0.105 + i * 0.035, 0.555, 0.368);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    service_status_lights.setMatrixAt(i, dummy.matrix);
  }
  service_status_lights.instanceMatrix.needsUpdate = true;
  root.add(service_status_lights);

  const cabinet_screwsGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 12);
  const cabinet_screws = new THREE.InstancedMesh(cabinet_screwsGeom, silverMat, 6);
  const screwPositions = [
    [-0.485, 0.30, 0.326],
    [-0.485, 0.88, 0.326],
    [0.485, 0.30, 0.326],
    [0.485, 0.88, 0.326],
    [-0.505, 1.72, 0.015],
    [0.505, 1.72, 0.015]
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    dummy.position.set(screwPositions[i][0], screwPositions[i][1], screwPositions[i][2]);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    cabinet_screws.setMatrixAt(i, dummy.matrix);
  }
  cabinet_screws.instanceMatrix.needsUpdate = true;
  root.add(cabinet_screws);

  const control_console = new THREE.Group();
  control_console.position.set(0, 1.10, 0.43);
  control_console.rotation.x = 0.36;
  root.add(control_console);

  const control_panel_baseGeom = new THREE.BoxGeometry(0.98, 0.075, 0.42);
  const control_panel_base = new THREE.Mesh(control_panel_baseGeom, glossyBlackMat);
  control_console.add(control_panel_base);

  const control_panel_surfaceGeom = new THREE.BoxGeometry(0.89, 0.014, 0.34);
  const control_panel_surface = new THREE.Mesh(control_panel_surfaceGeom, purplePanelMat);
  control_panel_surface.position.y = 0.045;
  control_console.add(control_panel_surface);

  const control_front_trimGeom = new THREE.BoxGeometry(0.99, 0.055, 0.045);
  const control_front_trim = new THREE.Mesh(control_front_trimGeom, chromeMat);
  control_front_trim.position.set(0, -0.005, 0.205);
  control_console.add(control_front_trim);

  const control_side_trimGeom = new THREE.BoxGeometry(0.035, 0.045, 0.39);
  const control_left_trim = new THREE.Mesh(control_side_trimGeom, chromeMat);
  control_left_trim.position.set(-0.475, 0.005, 0);
  control_console.add(control_left_trim);

  const control_right_trim = new THREE.Mesh(control_side_trimGeom, chromeMat);
  control_right_trim.position.set(0.475, 0.005, 0);
  control_console.add(control_right_trim);

  const control_accent_leftGeom = new THREE.BoxGeometry(0.22, 0.006, 0.012);
  const control_accent_left = new THREE.Mesh(control_accent_leftGeom, pinkNeonMat);
  control_accent_left.position.set(-0.29, 0.055, 0.145);
  control_console.add(control_accent_left);

  const control_accent_rightGeom = new THREE.BoxGeometry(0.18, 0.006, 0.012);
  const control_accent_right = new THREE.Mesh(control_accent_rightGeom, cyanNeonMat);
  control_accent_right.position.set(0.30, 0.055, 0.145);
  control_console.add(control_accent_right);

  const joystickBaseGeom = new THREE.CylinderGeometry(0.075, 0.085, 0.035, 24);
  const joystickCollarGeom = new THREE.CylinderGeometry(0.052, 0.065, 0.035, 24);
  const joystickStemGeom = new THREE.CylinderGeometry(0.012, 0.014, 0.075, 12);
  const joystickBallGeom = new THREE.SphereGeometry(0.052, 20, 12);

  const left_joystick_base = new THREE.Mesh(joystickBaseGeom, chromeMat);
  left_joystick_base.position.set(-0.32, 0.073, 0.025);
  control_console.add(left_joystick_base);

  const left_joystick_collar = new THREE.Mesh(joystickCollarGeom, silverMat);
  left_joystick_collar.position.set(-0.32, 0.108, 0.025);
  control_console.add(left_joystick_collar);

  const left_joystick_stem = new THREE.Mesh(joystickStemGeom, chromeMat);
  left_joystick_stem.position.set(-0.32, 0.157, 0.025);
  control_console.add(left_joystick_stem);

  const left_joystick_ball = new THREE.Mesh(joystickBallGeom, pinkNeonMat);
  left_joystick_ball.position.set(-0.32, 0.205, 0.025);
  control_console.add(left_joystick_ball);

  const right_joystick_base = new THREE.Mesh(joystickBaseGeom, chromeMat);
  right_joystick_base.position.set(0.32, 0.073, 0.025);
  control_console.add(right_joystick_base);

  const right_joystick_collar = new THREE.Mesh(joystickCollarGeom, silverMat);
  right_joystick_collar.position.set(0.32, 0.108, 0.025);
  control_console.add(right_joystick_collar);

  const right_joystick_stem = new THREE.Mesh(joystickStemGeom, chromeMat);
  right_joystick_stem.position.set(0.32, 0.157, 0.025);
  control_console.add(right_joystick_stem);

  const right_joystick_ball = new THREE.Mesh(joystickBallGeom, silverMat);
  right_joystick_ball.position.set(0.32, 0.205, 0.025);
  control_console.add(right_joystick_ball);

  const buttonGeom = new THREE.CylinderGeometry(0.034, 0.038, 0.026, 18);

  const green_button = new THREE.Mesh(buttonGeom, greenButtonMat);
  green_button.position.set(-0.18, 0.073, 0.105);
  control_console.add(green_button);

  const red_button = new THREE.Mesh(buttonGeom, redButtonMat);
  red_button.position.set(-0.075, 0.073, 0.105);
  control_console.add(red_button);

  const blue_button = new THREE.Mesh(buttonGeom, blueButtonMat);
  blue_button.position.set(0.035, 0.073, 0.105);
  control_console.add(blue_button);

  const small_buttonGeom = new THREE.CylinderGeometry(0.024, 0.027, 0.022, 16);
  const black_action_button = new THREE.Mesh(small_buttonGeom, glossyBlackMat);
  black_action_button.position.set(0.145, 0.069, 0.105);
  control_console.add(black_action_button);

  const control_labelGeom = new THREE.BoxGeometry(0.11, 0.008, 0.035);
  const control_label = new THREE.Mesh(control_labelGeom, whiteGraphicMat);
  control_label.position.set(0.02, 0.058, -0.035);
  control_console.add(control_label);

  const start_slotGeom = new THREE.BoxGeometry(0.13, 0.012, 0.035);
  const start_slot = new THREE.Mesh(start_slotGeom, insetMat);
  start_slot.position.set(0.02, 0.059, -0.12);
  control_console.add(start_slot);

  const start_slot_insertGeom = new THREE.BoxGeometry(0.085, 0.008, 0.020);
  const start_slot_insert = new THREE.Mesh(start_slot_insertGeom, redNeonMat);
  start_slot_insert.position.set(0.02, 0.068, -0.12);
  control_console.add(start_slot_insert);

  const upper_screen_group = new THREE.Group();
  upper_screen_group.position.set(0, 1.52, 0.245);
  upper_screen_group.rotation.x = -0.18;
  root.add(upper_screen_group);

  const upper_screen_frameGeom = new THREE.BoxGeometry(0.82, 0.56, 0.065);
  const upper_screen_frame = new THREE.Mesh(upper_screen_frameGeom, glossyBlackMat);
  upper_screen_group.add(upper_screen_frame);

  const upper_screen_displayGeom = new THREE.BoxGeometry(0.70, 0.45, 0.014);
  const upper_screen_display = new THREE.Mesh(upper_screen_displayGeom, screenMat);
  upper_screen_display.position.z = 0.039;
  upper_screen_group.add(upper_screen_display);

  const screen_headerGeom = new THREE.BoxGeometry(0.68, 0.058, 0.006);
  const screen_header = new THREE.Mesh(screen_headerGeom, screenBlueMat);
  screen_header.position.set(0, 0.185, 0.050);
  upper_screen_group.add(screen_header);

  const screen_column_headerGeom = new THREE.BoxGeometry(0.094, 0.040, 0.006);
  const screen_column_headers = new THREE.InstancedMesh(
    screen_column_headerGeom,
    orangeGraphicMat,
    5
  );
  for (let i = 0; i < 5; i++) {
    dummy.position.set(-0.265 + i * 0.1325, 0.115, 0.051);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    screen_column_headers.setMatrixAt(i, dummy.matrix);
  }
  screen_column_headers.instanceMatrix.needsUpdate = true;
  upper_screen_group.add(screen_column_headers);

  const screen_tileGeom = new THREE.BoxGeometry(0.092, 0.095, 0.006);
  const screen_tiles = new THREE.InstancedMesh(screen_tileGeom, whiteGraphicMat, 15);
  const tileColors = [
    0xe84a3f,
    0xf3a329,
    0x4bc858,
    0x36a9e4,
    0xa64ed8
  ];
  for (let i = 0; i < 15; i++) {
    const row = Math.floor(i / 5);
    const col = i % 5;
    dummy.position.set(-0.265 + col * 0.1325, 0.045 - row * 0.112, 0.052);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    screen_tiles.setMatrixAt(i, dummy.matrix);
    screen_tiles.setColorAt(i, new THREE.Color(tileColors[i % tileColors.length]));
  }
  screen_tiles.instanceMatrix.needsUpdate = true;
  if (screen_tiles.instanceColor) {
    screen_tiles.instanceColor.needsUpdate = true;
  }
  upper_screen_group.add(screen_tiles);

  const screen_symbolGeom = new THREE.CircleGeometry(0.018, 12);
  const screen_symbols = new THREE.InstancedMesh(
    screen_symbolGeom,
    orangeGraphicMat,
    15
  );
  for (let i = 0; i < 15; i++) {
    const row = Math.floor(i / 5);
    const col = i % 5;
    dummy.position.set(-0.265 + col * 0.1325, 0.045 - row * 0.112, 0.057);
    dummy.rotation.set(0, 0, (i % 3 - 1) * 0.22);
    dummy.scale.set(1.25, 0.75, 1);
    dummy.updateMatrix();
    screen_symbols.setMatrixAt(i, dummy.matrix);
  }
  screen_symbols.instanceMatrix.needsUpdate = true;
  upper_screen_group.add(screen_symbols);

  const screen_footerGeom = new THREE.BoxGeometry(0.68, 0.045, 0.006);
  const screen_footer = new THREE.Mesh(screen_footerGeom, violetNeonMat);
  screen_footer.position.set(0, -0.195, 0.051);
  upper_screen_group.add(screen_footer);

  const screen_footer_markGeom = new THREE.BoxGeometry(0.085, 0.012, 0.005);
  const screen_footer_marks = new THREE.InstancedMesh(
    screen_footer_markGeom,
    cyanNeonMat,
    7
  );
  for (let i = 0; i < 7; i++) {
    dummy.position.set(-0.285 + i * 0.095, -0.195, 0.057);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    screen_footer_marks.setMatrixAt(i, dummy.matrix);
  }
  screen_footer_marks.instanceMatrix.needsUpdate = true;
  upper_screen_group.add(screen_footer_marks);

  const left_rail_points = [
    new THREE.Vector3(-0.49, 0.14, 0.30),
    new THREE.Vector3(-0.49, 0.93, 0.30),
    new THREE.Vector3(-0.50, 1.04, 0.57),
    new THREE.Vector3(-0.49, 1.25, 0.40),
    new THREE.Vector3(-0.48, 1.48, 0.23),
    new THREE.Vector3(-0.48, 1.98, 0.18)
  ];
  const right_rail_points = [
    new THREE.Vector3(0.49, 0.14, 0.30),
    new THREE.Vector3(0.49, 0.93, 0.30),
    new THREE.Vector3(0.50, 1.04, 0.57),
    new THREE.Vector3(0.49, 1.25, 0.40),
    new THREE.Vector3(0.48, 1.48, 0.23),
    new THREE.Vector3(0.48, 1.98, 0.18)
  ];

  const left_cabinet_railGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(left_rail_points, false, "centripetal"),
    48,
    0.025,
    10,
    false
  );
  const left_cabinet_rail = new THREE.Mesh(left_cabinet_railGeom, chromeMat);
  root.add(left_cabinet_rail);

  const right_cabinet_railGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(right_rail_points, false, "centripetal"),
    48,
    0.025,
    10,
    false
  );
  const right_cabinet_rail = new THREE.Mesh(right_cabinet_railGeom, chromeMat);
  root.add(right_cabinet_rail);

  const left_accent_points = [
    new THREE.Vector3(-0.455, 1.04, 0.595),
    new THREE.Vector3(-0.455, 1.24, 0.425),
    new THREE.Vector3(-0.455, 1.47, 0.255)
  ];
  const left_control_accentGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(left_accent_points, false, "centripetal"),
    20,
    0.008,
    8,
    false
  );
  const left_control_accent = new THREE.Mesh(left_control_accentGeom, pinkNeonMat);
  root.add(left_control_accent);

  const right_accent_points = [
    new THREE.Vector3(0.455, 1.04, 0.595),
    new THREE.Vector3(0.455, 1.24, 0.425),
    new THREE.Vector3(0.455, 1.47, 0.255)
  ];
  const right_control_accentGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(right_accent_points, false, "centripetal"),
    20,
    0.008,
    8,
    false
  );
  const right_control_accent = new THREE.Mesh(right_control_accentGeom, cyanNeonMat);
  root.add(right_control_accent);

  const marquee_group = new THREE.Group();
  marquee_group.position.set(0, 1.84, 0.205);
  root.add(marquee_group);

  const marquee_housingGeom = new THREE.BoxGeometry(0.96, 0.31, 0.18);
  const marquee_housing = new THREE.Mesh(marquee_housingGeom, glossyBlackMat);
  marquee_group.add(marquee_housing);

  const marquee_panelGeom = new THREE.BoxGeometry(0.84, 0.215, 0.014);
  const marquee_panel = new THREE.Mesh(marquee_panelGeom, violetNeonMat);
  marquee_panel.position.z = 0.100;
  marquee_group.add(marquee_panel);

  const marquee_top_frameGeom = new THREE.BoxGeometry(0.98, 0.035, 0.045);
  const marquee_top_frame = new THREE.Mesh(marquee_top_frameGeom, chromeMat);
  marquee_top_frame.position.set(0, 0.155, 0.095);
  marquee_group.add(marquee_top_frame);

  const marquee_bottom_frame = new THREE.Mesh(marquee_top_frameGeom, chromeMat);
  marquee_bottom_frame.position.set(0, -0.155, 0.095);
  marquee_group.add(marquee_bottom_frame);

  const marquee_side_frameGeom = new THREE.BoxGeometry(0.035, 0.29, 0.045);
  const marquee_left_frame = new THREE.Mesh(marquee_side_frameGeom, chromeMat);
  marquee_left_frame.position.set(-0.472, 0, 0.095);
  marquee_group.add(marquee_left_frame);

  const marquee_right_frame = new THREE.Mesh(marquee_side_frameGeom, chromeMat);
  marquee_right_frame.position.set(0.472, 0, 0.095);
  marquee_group.add(marquee_right_frame);

  const marquee_lightGeom = new THREE.BoxGeometry(0.13, 0.025, 0.008);
  const marquee_lights = new THREE.InstancedMesh(marquee_lightGeom, whiteGraphicMat, 5);
  for (let i = 0; i < 5; i++) {
    dummy.position.set(-0.34 + i * 0.17, 0.087, 0.112);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    marquee_lights.setMatrixAt(i, dummy.matrix);
  }
  marquee_lights.instanceMatrix.needsUpdate = true;
  marquee_group.add(marquee_lights);

  const marquee_left_characterGeom = new THREE.CircleGeometry(0.045, 18);
  const marquee_left_character = new THREE.Mesh(
    marquee_left_characterGeom,
    greenGraphicMat()
  );
  marquee_left_character.position.set(-0.32, -0.005, 0.112);
  marquee_group.add(marquee_left_character);

  const marquee_right_character = new THREE.Mesh(
    marquee_left_characterGeom,
    orangeGraphicMat
  );
  marquee_right_character.position.set(0.32, -0.005, 0.112);
  marquee_group.add(marquee_right_character);

  const title_plaqueGeom = new THREE.BoxGeometry(0.56, 0.18, 0.014);
  const title_plaque = new THREE.Mesh(title_plaqueGeom, insetMat);
  title_plaque.position.set(0, 0, 0.113);
  marquee_group.add(title_plaque);

  const title_border_topGeom = new THREE.BoxGeometry(0.58, 0.012, 0.008);
  const title_border_top = new THREE.Mesh(title_border_topGeom, pinkNeonMat);
  title_border_top.position.set(0, 0.096, 0.123);
  marquee_group.add(title_border_top);

  const title_border_bottom = new THREE.Mesh(title_border_topGeom, cyanNeonMat);
  title_border_bottom.position.set(0, -0.096, 0.123);
  marquee_group.add(title_border_bottom);

  const title_border_sideGeom = new THREE.BoxGeometry(0.012, 0.18, 0.008);
  const title_border_left = new THREE.Mesh(title_border_sideGeom, pinkNeonMat);
  title_border_left.position.set(-0.29, 0, 0.123);
  marquee_group.add(title_border_left);

  const title_border_right = new THREE.Mesh(title_border_sideGeom, cyanNeonMat);
  title_border_right.position.set(0.29, 0, 0.123);
  marquee_group.add(title_border_right);

  const titleStrokeData = [];
  addTitleLetter("J", -0.20, 0);
  addTitleLetter("O", -0.10, 0);
  addTitleLetter("K", 0.00, 0);
  addTitleLetter("E", 0.10, 0);
  addTitleLetter("R", 0.20, 0);

  const title_strokesGeom = new THREE.BoxGeometry(1, 1, 0.008);
  const title_strokes = new THREE.InstancedMesh(
    title_strokesGeom,
    orangeGraphicMat,
    titleStrokeData.length
  );
  for (let i = 0; i < titleStrokeData.length; i++) {
    const stroke = titleStrokeData[i];
    dummy.position.set(stroke[0], stroke[1], 0.134);
    dummy.rotation.set(0, 0, stroke[4]);
    dummy.scale.set(stroke[2], stroke[3], 1);
    dummy.updateMatrix();
    title_strokes.setMatrixAt(i, dummy.matrix);
  }
  title_strokes.instanceMatrix.needsUpdate = true;
  marquee_group.add(title_strokes);

  function addTitleLetter(letter, x, y) {
    const add = (sx, sy, w, h, rotation) => {
      titleStrokeData.push([x + sx, y + sy, w, h, rotation]);
    };
    if (letter === "J") {
      add(0, 0.052, 0.060, 0.012, 0);
      add(0.024, 0.004, 0.012, 0.090, 0);
      add(-0.006, -0.045, 0.050, 0.012, 0);
      add(-0.028, -0.032, 0.012, 0.035, 0);
    } else if (letter === "O") {
      add(0, 0.052, 0.060, 0.012, 0);
      add(0, -0.052, 0.060, 0.012, 0);
      add(-0.027, 0, 0.012, 0.090, 0);
      add(0.027, 0, 0.012, 0.090, 0);
    } else if (letter === "K") {
      add(-0.027, 0, 0.012, 0.110, 0);
      add(0.006, 0.028, 0.060, 0.012, 0.78);
      add(0.006, -0.028, 0.060, 0.012, -0.78);
    } else if (letter === "E") {
      add(-0.027, 0, 0.012, 0.110, 0);
      add(0, 0.052, 0.060, 0.012, 0);
      add(-0.002, 0, 0.052, 0.012, 0);
      add(0, -0.052, 0.060, 0.012, 0);
    } else if (letter === "R") {
      add(-0.027, 0, 0.012, 0.110, 0);
      add(0, 0.052, 0.060, 0.012, 0);
      add(0, 0.003, 0.060, 0.012, 0);
      add(0.027, 0.029, 0.012, 0.050, 0);
      add(0.008, -0.029, 0.060, 0.012, -0.78);
    }
  }

  function greenGraphicMat() {
    return new THREE.MeshStandardMaterial({
      color: 0x55d64c,
      metalness: 0.0,
      roughness: 0.7
    });
  }

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