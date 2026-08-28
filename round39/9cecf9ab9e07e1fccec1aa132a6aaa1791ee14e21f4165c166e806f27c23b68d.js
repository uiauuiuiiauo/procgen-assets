export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_synthesizer";

  const chassis_group = new THREE.Group();
  chassis_group.name = "chassis_group";
  root.add(chassis_group);

  const keyboard_group = new THREE.Group();
  keyboard_group.name = "keyboard_group";
  root.add(keyboard_group);

  const control_panel_group = new THREE.Group();
  control_panel_group.name = "control_panel_group";
  control_panel_group.position.set(0, 0.68, -0.34);
  control_panel_group.rotation.x = 0.22;
  root.add(control_panel_group);

  const side_details_group = new THREE.Group();
  side_details_group.name = "side_details_group";
  root.add(side_details_group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x242629,
    metalness: 0.0,
    roughness: 0.8
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.8
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x151619,
    metalness: 0.0,
    roughness: 0.8
  });
  const white_keysMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1e9,
    metalness: 0.0,
    roughness: 0.3
  });
  const black_keysMat = new THREE.MeshStandardMaterial({
    color: 0x090a0b,
    metalness: 0.0,
    roughness: 0.3
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x0b0c0d,
    metalness: 0.0,
    roughness: 0.8
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d4,
    metalness: 0.0,
    roughness: 0.7
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x061021,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x061021,
    emissiveIntensity: 1.0
  });
  const red_ledMat = new THREE.MeshStandardMaterial({
    color: 0xd82f39,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xd82f39,
    emissiveIntensity: 1.0
  });
  const green_ledMat = new THREE.MeshStandardMaterial({
    color: 0xb8d979,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xb8d979,
    emissiveIntensity: 1.0
  });
  const screen_orangeMat = new THREE.MeshBasicMaterial({ color: 0xff8a20 } );
  const screen_goldMat = new THREE.MeshBasicMaterial({ color: 0xffcf3d } );
  const screen_blueMat = new THREE.MeshBasicMaterial({ color: 0x235cff } );
  const screen_purpleMat = new THREE.MeshBasicMaterial({ color: 0x9b28dd } );
  const screen_magentaMat = new THREE.MeshBasicMaterial({ color: 0xf02f87 } );
  const screen_greenMat = new THREE.MeshBasicMaterial({ color: 0x74e27c } );
  const screen_cyanMat = new THREE.MeshBasicMaterial({ color: 0x37d9e8 } );
  const screen_whiteMat = new THREE.MeshBasicMaterial({ color: 0xfff1c7 } );

  function createChamferedPrism(width, depth, height, corner, bevel) {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2 + corner, -depth / 2);
    shape.lineTo(width / 2 - corner, -depth / 2);
    shape.lineTo(width / 2, -depth / 2 + corner);
    shape.lineTo(width / 2, depth / 2 - corner);
    shape.lineTo(width / 2 - corner, depth / 2);
    shape.lineTo(-width / 2 + corner, depth / 2);
    shape.lineTo(-width / 2, depth / 2 - corner);
    shape.lineTo(-width / 2, -depth / 2 + corner);
    shape.lineTo(-width / 2 + corner, -depth / 2);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geom.rotateX(-Math.PI / 2);
    return geom;
  }

  function createSideExtrusion(shape, width, bevel) {
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: width,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geom.rotateY(Math.PI / 2);
    return geom;
  }

  const main_chassisGeom = createChamferedPrism(3.58, 1.78, 0.34, 0.13, 0.025);
  const main_chassis = new THREE.Mesh(main_chassisGeom, bodyMat);
  main_chassis.name = "main_chassis";
  main_chassis.position.y = 0.08;
  chassis_group.add(main_chassis);

  const rear_housingGeom = createChamferedPrism(3.34, 1.18, 0.18, 0.12, 0.025);
  const rear_housing = new THREE.Mesh(rear_housingGeom, bodyMat);
  rear_housing.name = "rear_housing";
  rear_housing.position.set(0, 0.36, -0.31);
  chassis_group.add(rear_housing);

  const rear_top_panelGeom = new THREE.BoxGeometry(2.92, 0.025, 0.72);
  const rear_top_panel = new THREE.Mesh(rear_top_panelGeom, panelMat);
  rear_top_panel.name = "rear_top_panel";
  rear_top_panel.position.set(0, 0.548, -0.37);
  chassis_group.add(rear_top_panel);

  const front_fasciaGeom = new THREE.BoxGeometry(3.34, 0.22, 0.12);
  const front_fascia = new THREE.Mesh(front_fasciaGeom, edgeMat);
  front_fascia.name = "front_fascia";
  front_fascia.position.set(0, 0.22, 0.85);
  chassis_group.add(front_fascia);

  const front_key_railGeom = new THREE.CylinderGeometry(0.105, 0.105, 3.35, 24);
  const front_key_rail = new THREE.Mesh(front_key_railGeom, edgeMat);
  front_key_rail.name = "front_key_rail";
  front_key_rail.rotation.z = Math.PI / 2;
  front_key_rail.position.set(0, 0.31, 0.84);
  chassis_group.add(front_key_rail);

  const side_cheekShape = new THREE.Shape();
  side_cheekShape.moveTo(-0.91, 0.11);
  side_cheekShape.lineTo(0.91, 0.11);
  side_cheekShape.lineTo(0.91, 0.48);
  side_cheekShape.lineTo(0.77, 0.56);
  side_cheekShape.lineTo(0.38, 0.59);
  side_cheekShape.lineTo(0.17, 0.66);
  side_cheekShape.lineTo(-0.20, 0.84);
  side_cheekShape.lineTo(-0.68, 0.73);
  side_cheekShape.lineTo(-0.91, 0.63);
  side_cheekShape.lineTo(-0.91, 0.11);

  const side_cheeksGeom = createSideExtrusion(side_cheekShape, 0.20, 0.018);
  const side_cheeks = new THREE.InstancedMesh(side_cheeksGeom, bodyMat, 2);
  side_cheeks.name = "side_cheeks";
  const side_cheek_matrix = new THREE.Matrix4();
  side_cheek_matrix.makeTranslation(-1.83, 0, 0);
  side_cheeks.setMatrixAt(0, side_cheek_matrix);
  side_cheek_matrix.makeTranslation(1.63, 0, 0);
  side_cheeks.setMatrixAt(1, side_cheek_matrix);
  side_cheeks.instanceMatrix.needsUpdate = true;
  chassis_group.add(side_cheeks);

  const keyboard_bedGeom = new THREE.BoxGeometry(3.17, 0.10, 0.91);
  const keyboard_bed = new THREE.Mesh(keyboard_bedGeom, edgeMat);
  keyboard_bed.name = "keyboard_bed";
  keyboard_bed.position.set(0, 0.39, 0.47);
  keyboard_group.add(keyboard_bed);

  const rear_key_railGeom = new THREE.BoxGeometry(3.12, 0.09, 0.09);
  const rear_key_rail = new THREE.Mesh(rear_key_railGeom, edgeMat);
  rear_key_rail.name = "rear_key_rail";
  rear_key_rail.position.set(0, 0.47, 0.055);
  keyboard_group.add(rear_key_rail);

  const white_key_count = 15;
  const white_key_pitch = 0.198;
  const white_keysGeom = createChamferedPrism(0.184, 0.76, 0.075, 0.012, 0.005);
  const white_keys = new THREE.InstancedMesh(white_keysGeom, white_keysMat, white_key_count);
  white_keys.name = "white_keys";
  const white_key_matrix = new THREE.Matrix4();
  for (let i = 0; i < white_key_count; i++) {
    const x = (i - (white_key_count - 1) / 2) * white_key_pitch;
    white_key_matrix.makeTranslation(x, 0.425, 0.49);
    white_keys.setMatrixAt(i, white_key_matrix);
  }
  white_keys.instanceMatrix.needsUpdate = true;
  keyboard_group.add(white_keys);

  const black_key_boundaries = [];
  for (let i = 0; i < white_key_count - 1; i++) {
    const note = i % 7;
    if (note === 0 || note === 1 || note === 3 || note === 4 || note === 5) {
      black_key_boundaries.push(i);
    }
  }

  const black_keysGeom = createChamferedPrism(0.112, 0.43, 0.11, 0.012, 0.006);
  const black_keys = new THREE.InstancedMesh(black_keysGeom, black_keysMat, black_key_boundaries.length);
  black_keys.name = "black_keys";
  const black_key_matrix = new THREE.Matrix4();
  for (let i = 0; i < black_key_boundaries.length; i++) {
    const boundary = black_key_boundaries[i];
    const x = (boundary - (white_key_count - 1) / 2 + 0.5) * white_key_pitch;
    black_key_matrix.makeTranslation(x, 0.49, 0.255);
    black_keys.setMatrixAt(i, black_key_matrix);
  }
  black_keys.instanceMatrix.needsUpdate = true;
  keyboard_group.add(black_keys);

  const control_panelGeom = createChamferedPrism(3.25, 0.96, 0.075, 0.08, 0.012);
  const control_panel = new THREE.Mesh(control_panelGeom, panelMat);
  control_panel.name = "control_panel";
  control_panel_group.add(control_panel);

  const panel_front_lipGeom = new THREE.BoxGeometry(3.08, 0.075, 0.055);
  const panel_front_lip = new THREE.Mesh(panel_front_lipGeom, edgeMat);
  panel_front_lip.name = "panel_front_lip";
  panel_front_lip.position.set(0, 0.055, 0.455);
  control_panel_group.add(panel_front_lip);

  const display_bezelGeom = new THREE.BoxGeometry(1.43, 0.032, 0.56);
  const display_bezel = new THREE.Mesh(display_bezelGeom, edgeMat);
  display_bezel.name = "display_bezel";
  display_bezel.position.set(0.10, 0.096, -0.08);
  control_panel_group.add(display_bezel);

  const display_screenGeom = new THREE.BoxGeometry(1.32, 0.010, 0.47);
  const display_screen = new THREE.Mesh(display_screenGeom, screenMat);
  display_screen.name = "display_screen";
  display_screen.position.set(0.10, 0.116, -0.08);
  control_panel_group.add(display_screen);

  const screen_blue_fieldGeom = new THREE.BoxGeometry(0.42, 0.004, 0.17);
  const screen_blue_field = new THREE.Mesh(screen_blue_fieldGeom, screen_blueMat);
  screen_blue_field.name = "screen_blue_field";
  screen_blue_field.position.set(-0.25, 0.123, -0.205);
  control_panel_group.add(screen_blue_field);

  const screen_purple_fieldGeom = new THREE.BoxGeometry(0.40, 0.004, 0.17);
  const screen_purple_field = new THREE.Mesh(screen_purple_fieldGeom, screen_purpleMat);
  screen_purple_field.name = "screen_purple_field";
  screen_purple_field.position.set(0.18, 0.123, -0.205);
  control_panel_group.add(screen_purple_field);

  const screen_magenta_fieldGeom = new THREE.BoxGeometry(0.38, 0.004, 0.17);
  const screen_magenta_field = new THREE.Mesh(screen_magenta_fieldGeom, screen_magentaMat);
  screen_magenta_field.name = "screen_magenta_field";
  screen_magenta_field.position.set(0.51, 0.123, -0.205);
  control_panel_group.add(screen_magenta_field);

  const screen_orange_fieldGeom = new THREE.BoxGeometry(0.42, 0.004, 0.17);
  const screen_orange_field = new THREE.Mesh(screen_orange_fieldGeom, screen_orangeMat);
  screen_orange_field.name = "screen_orange_field";
  screen_orange_field.position.set(-0.25, 0.123, -0.025);
  control_panel_group.add(screen_orange_field);

  const screen_dark_fieldGeom = new THREE.BoxGeometry(0.40, 0.004, 0.17);
  const screen_dark_field = new THREE.Mesh(screen_dark_fieldGeom, screenMat);
  screen_dark_field.name = "screen_dark_field";
  screen_dark_field.position.set(0.18, 0.123, -0.025);
  control_panel_group.add(screen_dark_field);

  const screen_gold_fieldGeom = new THREE.BoxGeometry(0.38, 0.004, 0.17);
  const screen_gold_field = new THREE.Mesh(screen_gold_fieldGeom, screen_goldMat);
  screen_gold_field.name = "screen_gold_field";
  screen_gold_field.position.set(0.51, 0.123, -0.025);
  control_panel_group.add(screen_gold_field);

  const screen_footerGeom = new THREE.BoxGeometry(1.25, 0.004, 0.025);
  const screen_footer = new THREE.Mesh(screen_footerGeom, screen_cyanMat);
  screen_footer.name = "screen_footer";
  screen_footer.position.set(0.10, 0.124, 0.132);
  control_panel_group.add(screen_footer);

  const screen_grid_linesGeom = new THREE.BoxGeometry(1, 0.003, 0.006);
  const screen_grid_lines = new THREE.InstancedMesh(screen_grid_linesGeom, screen_cyanMat, 8);
  screen_grid_lines.name = "screen_grid_lines";
  const screen_line_matrix = new THREE.Matrix4();
  const screen_line_quaternion = new THREE.Quaternion();
  const screen_line_position = new THREE.Vector3();
  const screen_line_scale = new THREE.Vector3();
  for (let i = 0; i < 5; i++) {
    screen_line_position.set(-0.51 + i * 0.29, 0.126, -0.08);
    screen_line_quaternion.identity();
    screen_line_scale.set(0.006, 1, 0.42);
    screen_line_matrix.compose(screen_line_position, screen_line_quaternion, screen_line_scale);
    screen_grid_lines.setMatrixAt(i, screen_line_matrix);
  }
  for (let i = 0; i < 3; i++) {
    screen_line_position.set(0.10, 0.126, -0.21 + i * 0.135);
    screen_line_quaternion.identity();
    screen_line_scale.set(1.24, 1, 0.006);
    screen_line_matrix.compose(screen_line_position, screen_line_quaternion, screen_line_scale);
    screen_grid_lines.setMatrixAt(i + 5, screen_line_matrix);
  }
  screen_grid_lines.instanceMatrix.needsUpdate = true;
  control_panel_group.add(screen_grid_lines);

  const screen_waveform_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.53, 0.129, -0.01),
    new THREE.Vector3(-0.35, 0.129, 0.01),
    new THREE.Vector3(-0.18, 0.129, -0.035),
    new THREE.Vector3(0.02, 0.129, 0.035),
    new THREE.Vector3(0.22, 0.129, -0.015),
    new THREE.Vector3(0.42, 0.129, 0.025),
    new THREE.Vector3(0.64, 0.129, -0.005)
  ]);
  const screen_waveformGeom = new THREE.TubeGeometry(screen_waveform_path, 32, 0.005, 6, false);
  const screen_waveform = new THREE.Mesh(screen_waveformGeom, screen_whiteMat);
  screen_waveform.name = "screen_waveform";
  control_panel_group.add(screen_waveform);

  const screen_pixelsGeom = new THREE.BoxGeometry(0.022, 0.004, 0.012);
  const screen_pixels = new THREE.InstancedMesh(screen_pixelsGeom, screen_goldMat, 18);
  screen_pixels.name = "screen_pixels";
  const screen_pixel_matrix = new THREE.Matrix4();
  for (let i = 0; i < 18; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const x = -0.45 + col * 0.135;
    const z = 0.055 + row * 0.035 + ((i * 3) % 4) * 0.004;
    screen_pixel_matrix.makeTranslation(x, 0.128, z);
    screen_pixels.setMatrixAt(i, screen_pixel_matrix);
  }
  screen_pixels.instanceMatrix.needsUpdate = true;
  control_panel_group.add(screen_pixels);

  const left_control_buttonsGeom = new THREE.BoxGeometry(0.10, 0.035, 0.065);
  const left_control_buttons = new THREE.InstancedMesh(left_control_buttonsGeom, black_keysMat, 4);
  left_control_buttons.name = "left_control_buttons";
  const left_button_matrix = new THREE.Matrix4();
  for (let i = 0; i < 4; i++) {
    left_button_matrix.makeTranslation(-1.31 + (i % 2) * 0.13, 0.108, -0.22 + Math.floor(i / 2) * 0.14);
    left_control_buttons.setMatrixAt(i, left_button_matrix);
  }
  left_control_buttons.instanceMatrix.needsUpdate = true;
  control_panel_group.add(left_control_buttons);

  const right_control_buttonsGeom = new THREE.BoxGeometry(0.12, 0.04, 0.07);
  const right_control_buttons = new THREE.InstancedMesh(right_control_buttonsGeom, black_keysMat, 6);
  right_control_buttons.name = "right_control_buttons";
  const right_button_matrix = new THREE.Matrix4();
  for (let i = 0; i < 6; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    right_button_matrix.makeTranslation(1.18 + col * 0.16, 0.11, -0.25 + row * 0.13);
    right_control_buttons.setMatrixAt(i, right_button_matrix);
  }
  right_control_buttons.instanceMatrix.needsUpdate = true;
  control_panel_group.add(right_control_buttons);

  const master_knobGeom = new THREE.CylinderGeometry(0.068, 0.074, 0.08, 20);
  const master_knob = new THREE.Mesh(master_knobGeom, black_keysMat);
  master_knob.name = "master_knob";
  master_knob.position.set(-1.10, 0.145, 0.23);
  control_panel_group.add(master_knob);

  const master_knob_capGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.008, 20);
  const master_knob_cap = new THREE.Mesh(master_knob_capGeom, bodyMat);
  master_knob_cap.name = "master_knob_cap";
  master_knob_cap.position.set(-1.10, 0.189, 0.23);
  control_panel_group.add(master_knob_cap);

  const master_knob_markerGeom = new THREE.BoxGeometry(0.012, 0.008, 0.045);
  const master_knob_marker = new THREE.Mesh(master_knob_markerGeom, labelMat);
  master_knob_marker.name = "master_knob_marker";
  master_knob_marker.position.set(-1.10, 0.196, 0.205);
  control_panel_group.add(master_knob_marker);

  const red_status_barGeom = new THREE.BoxGeometry(0.18, 0.012, 0.018);
  const red_status_bar = new THREE.Mesh(red_status_barGeom, red_ledMat);
  red_status_bar.name = "red_status_bar";
  red_status_bar.position.set(1.03, 0.105, -0.38);
  control_panel_group.add(red_status_bar);

  const green_status_ledGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.018, 16);
  const green_status_led = new THREE.Mesh(green_status_ledGeom, green_ledMat);
  green_status_led.name = "green_status_led";
  green_status_led.position.set(1.36, 0.112, 0.31);
  control_panel_group.add(green_status_led);

  const red_status_ledGeom = new THREE.BoxGeometry(0.10, 0.028, 0.06);
  const red_status_led = new THREE.Mesh(red_status_ledGeom, red_ledMat);
  red_status_led.name = "red_status_led";
  red_status_led.position.set(1.47, 0.112, 0.31);
  control_panel_group.add(red_status_led);

  const panel_labelsGeom = new THREE.BoxGeometry(1, 0.005, 0.009);
  const panel_labels = new THREE.InstancedMesh(panel_labelsGeom, labelMat, 28);
  panel_labels.name = "panel_labels";
  const panel_label_matrix = new THREE.Matrix4();
  const panel_label_position = new THREE.Vector3();
  const panel_label_scale = new THREE.Vector3();
  const panel_label_quaternion = new THREE.Quaternion();
  for (let i = 0; i < 8; i++) {
    panel_label_position.set(-1.00 + (i % 4) * 0.14, 0.104, -0.35 + Math.floor(i / 4) * 0.15);
    panel_label_scale.set(0.05 + (i % 3) * 0.018, 1, 1);
    panel_label_matrix.compose(panel_label_position, panel_label_quaternion, panel_label_scale);
    panel_labels.setMatrixAt(i, panel_label_matrix);
  }
  for (let i = 0; i < 10; i++) {
    panel_label_position.set(0.91 + (i % 5) * 0.10, 0.104, -0.36 + Math.floor(i / 5) * 0.18);
    panel_label_scale.set(0.045 + (i % 2) * 0.025, 1, 1);
    panel_label_matrix.compose(panel_label_position, panel_label_quaternion, panel_label_scale);
    panel_labels.setMatrixAt(i + 8, panel_label_matrix);
  }
  for (let i = 0; i < 10; i++) {
    panel_label_position.set(-1.30 + i * 0.085, 0.104, 0.37);
    panel_label_scale.set(i % 3 === 0 ? 0.055 : 0.035, 1, 1);
    panel_label_matrix.compose(panel_label_position, panel_label_quaternion, panel_label_scale);
    panel_labels.setMatrixAt(i + 18, panel_label_matrix);
  }
  panel_labels.instanceMatrix.needsUpdate = true;
  control_panel_group.add(panel_labels);

  const panel_screwsGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.014, 16);
  const panel_screws = new THREE.InstancedMesh(panel_screwsGeom, rubberMat, 4);
  panel_screws.name = "panel_screws";
  const panel_screw_positions = [
    [-1.50, 0.105, -0.40],
    [1.50, 0.105, -0.40],
    [-1.50, 0.105, 0.40],
    [1.50, 0.105, 0.40]
  ];
  const panel_screw_matrix = new THREE.Matrix4();
  for (let i = 0; i < panel_screw_positions.length; i++) {
    const p = panel_screw_positions[i];
    panel_screw_matrix.makeTranslation(p[0], p[1], p[2]);
    panel_screws.setMatrixAt(i, panel_screw_matrix);
  }
  panel_screws.instanceMatrix.needsUpdate = true;
  control_panel_group.add(panel_screws);

  const rear_antenna_postGeom = new THREE.CylinderGeometry(0.018, 0.022, 0.10, 12);
  const rear_antenna_post = new THREE.Mesh(rear_antenna_postGeom, black_keysMat);
  rear_antenna_post.name = "rear_antenna_post";
  rear_antenna_post.position.set(0.70, 0.60, -0.67);
  root.add(rear_antenna_post);

  const rear_antenna_capGeom = new THREE.SphereGeometry(0.025, 12, 8);
  const rear_antenna_cap = new THREE.Mesh(rear_antenna_capGeom, black_keysMat);
  rear_antenna_cap.name = "rear_antenna_cap";
  rear_antenna_cap.position.set(0.70, 0.655, -0.67);
  root.add(rear_antenna_cap);

  const side_vent_slotsGeom = new THREE.BoxGeometry(0.018, 0.025, 0.48);
  const side_vent_slots = new THREE.InstancedMesh(side_vent_slotsGeom, rubberMat, 16);
  side_vent_slots.name = "side_vent_slots";
  const vent_matrix = new THREE.Matrix4();
  let vent_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 8; i++) {
      vent_matrix.makeTranslation(side * 1.808, 0.19 + i * 0.045, -0.10);
      side_vent_slots.setMatrixAt(vent_index, vent_matrix);
      vent_index++;
    }
  }
  side_vent_slots.instanceMatrix.needsUpdate = true;
  side_details_group.add(side_vent_slots);

  const side_vent_dividersGeom = new THREE.BoxGeometry(0.020, 0.34, 0.018);
  const side_vent_dividers = new THREE.InstancedMesh(side_vent_dividersGeom, edgeMat, 4);
  side_vent_dividers.name = "side_vent_dividers";
  const vent_divider_matrix = new THREE.Matrix4();
  let vent_divider_index = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.27, 0.07]) {
      vent_divider_matrix.makeTranslation(side * 1.812, 0.32, z);
      side_vent_dividers.setMatrixAt(vent_divider_index, vent_divider_matrix);
      vent_divider_index++;
    }
  }
  side_vent_dividers.instanceMatrix.needsUpdate = true;
  side_details_group.add(side_vent_dividers);

  const headphone_jack_rimGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.025, 20);
  const headphone_jack_rim = new THREE.Mesh(headphone_jack_rimGeom, edgeMat);
  headphone_jack_rim.name = "headphone_jack_rim";
  headphone_jack_rim.rotation.z = Math.PI / 2;
  headphone_jack_rim.position.set(1.817, 0.29, 0.43);
  side_details_group.add(headphone_jack_rim);

  const headphone_jack_socketGeom = new THREE.CylinderGeometry(0.042, 0.042, 0.030, 20);
  const headphone_jack_socket = new THREE.Mesh(headphone_jack_socketGeom, rubberMat);
  headphone_jack_socket.name = "headphone_jack_socket";
  headphone_jack_socket.rotation.z = Math.PI / 2;
  headphone_jack_socket.position.set(1.833, 0.29, 0.43);
  side_details_group.add(headphone_jack_socket);

  const rubber_feetGeom = new THREE.CylinderGeometry(0.085, 0.095, 0.08, 16);
  const rubber_feet = new THREE.InstancedMesh(rubber_feetGeom, rubberMat, 4);
  rubber_feet.name = "rubber_feet";
  const foot_positions = [
    [-1.53, 0.055, -0.70],
    [1.53, 0.055, -0.70],
    [-1.53, 0.055, 0.70],
    [1.53, 0.055, 0.70]
  ];
  const foot_matrix = new THREE.Matrix4();
  for (let i = 0; i < foot_positions.length; i++) {
    const p = foot_positions[i];
    foot_matrix.makeTranslation(p[0], p[1], p[2]);
    rubber_feet.setMatrixAt(i, foot_matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  side_details_group.add(rubber_feet);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(root);
  return root;
}