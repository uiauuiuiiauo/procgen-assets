export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "desktop_label_printer";

  const bodyW = 1.42;
  const bodyD = 1.10;
  const bodyH = 0.54;
  const deckY = 0.60;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa8aaa0,
    metalness: 0.0,
    roughness: 0.8,
  });
  const bodySideMat = new THREE.MeshStandardMaterial({
    color: 0x999c92,
    metalness: 0.0,
    roughness: 0.8,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xe3c62d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yellowDarkMat = new THREE.MeshStandardMaterial({
    color: 0xc9a916,
    metalness: 0.0,
    roughness: 0.3,
  });
  const creamPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xc9cba8,
    metalness: 0.0,
    roughness: 0.8,
  });
  const palePlasticMat = new THREE.MeshStandardMaterial({
    color: 0xd9dac7,
    metalness: 0.0,
    roughness: 0.8,
  });
  const darkPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x292c29,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x555953,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lightButtonMat = new THREE.MeshStandardMaterial({
    color: 0xb8bbb0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const grayButtonMat = new THREE.MeshStandardMaterial({
    color: 0x777d7c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const orangeButtonMat = new THREE.MeshStandardMaterial({
    color: 0xd97845,
    metalness: 0.0,
    roughness: 0.3,
  });
  const redButtonMat = new THREE.MeshStandardMaterial({
    color: 0xd94842,
    metalness: 0.0,
    roughness: 0.3,
  });
  const purpleButtonMat = new THREE.MeshStandardMaterial({
    color: 0x9b667c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf1f2ef,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const printMat = new THREE.MeshStandardMaterial({
    color: 0x34383a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blueLabelMat = new THREE.MeshStandardMaterial({
    color: 0x66747c,
    metalness: 0.0,
    roughness: 0.7,
  });

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);
    const shape = new THREE.Shape();
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
      curveSegments: 6,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const lower_bodyGeom = roundedBoxGeometry(bodyW, bodyH, bodyD, 0.075, 0.018);
  const lower_body = new THREE.Mesh(lower_bodyGeom, bodyMat);
  lower_body.name = "lower_body";
  lower_body.position.set(0, 0.30, 0);
  root.add(lower_body);

  const bottom_shadowGeom = roundedBoxGeometry(1.27, 0.045, 0.96, 0.035, 0.008);
  const bottom_shadow = new THREE.Mesh(bottom_shadowGeom, darkPlasticMat);
  bottom_shadow.name = "bottom_shadow";
  bottom_shadow.position.set(0, 0.045, -0.01);
  root.add(bottom_shadow);

  const feetGeom = roundedBoxGeometry(0.17, 0.09, 0.16, 0.025, 0.006);
  const feet = new THREE.InstancedMesh(feetGeom, rubberMat, 4);
  feet.name = "feet";
  const feetPositions = [
    [-0.56, 0.005, 0.40],
    [0.56, 0.005, 0.40],
    [-0.56, 0.005, -0.40],
    [0.56, 0.005, -0.40],
  ];
  const feetMatrix = new THREE.Matrix4();
  for (let i = 0; i < feetPositions.length; i++) {
    feetMatrix.makeTranslation(
      feetPositions[i][0],
      feetPositions[i][1],
      feetPositions[i][2]
    );
    feet.setMatrixAt(i, feetMatrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const front_access_panelGeom = roundedBoxGeometry(1.20, 0.40, 0.018, 0.025, 0.004);
  const front_access_panel = new THREE.Mesh(front_access_panelGeom, bodySideMat);
  front_access_panel.name = "front_access_panel";
  front_access_panel.position.set(-0.03, 0.29, 0.568);
  root.add(front_access_panel);

  const front_panel_horizontal_seamGeom = new THREE.BoxGeometry(1.16, 0.008, 0.009);
  const front_panel_horizontal_seam = new THREE.Mesh(front_panel_horizontal_seamGeom, darkPlasticMat);
  front_panel_horizontal_seam.name = "front_panel_horizontal_seam";
  front_panel_horizontal_seam.position.set(-0.03, 0.12, 0.582);
  root.add(front_panel_horizontal_seam);

  const front_panel_left_seamGeom = new THREE.BoxGeometry(0.008, 0.35, 0.009);
  const front_panel_left_seam = new THREE.Mesh(front_panel_left_seamGeom, darkPlasticMat);
  front_panel_left_seam.name = "front_panel_left_seam";
  front_panel_left_seam.position.set(-0.62, 0.29, 0.582);
  root.add(front_panel_left_seam);

  const front_panel_right_seamGeom = new THREE.BoxGeometry(0.008, 0.35, 0.009);
  const front_panel_right_seam = new THREE.Mesh(front_panel_right_seamGeom, darkPlasticMat);
  front_panel_right_seam.name = "front_panel_right_seam";
  front_panel_right_seam.position.set(0.56, 0.29, 0.582);
  root.add(front_panel_right_seam);

  const front_brand_badgeGeom = new THREE.BoxGeometry(0.19, 0.055, 0.009);
  const front_brand_badge = new THREE.Mesh(front_brand_badgeGeom, paperMat);
  front_brand_badge.name = "front_brand_badge";
  front_brand_badge.position.set(-0.51, 0.15, 0.588);
  root.add(front_brand_badge);

  const front_brand_marksGeom = new THREE.BoxGeometry(0.018, 0.026, 0.005);
  const front_brand_marks = new THREE.InstancedMesh(front_brand_marksGeom, blueLabelMat, 6);
  front_brand_marks.name = "front_brand_marks";
  const brandMatrix = new THREE.Matrix4();
  for (let i = 0; i < 6; i++) {
    brandMatrix.makeTranslation(-0.555 + i * 0.018, 0.15, 0.595);
    front_brand_marks.setMatrixAt(i, brandMatrix);
  }
  front_brand_marks.instanceMatrix.needsUpdate = true;
  root.add(front_brand_marks);

  const front_lower_ventGeom = new THREE.BoxGeometry(0.25, 0.014, 0.012);
  const front_lower_vent = new THREE.InstancedMesh(front_lower_ventGeom, darkPlasticMat, 12);
  front_lower_vent.name = "front_lower_vent";
  const frontVentMatrix = new THREE.Matrix4();
  let frontVentIndex = 0;
  for (let row = 0; row < 6; row++) {
    for (let bank = 0; bank < 2; bank++) {
      frontVentMatrix.makeTranslation(
        bank === 0 ? -0.31 : 0.31,
        0.105 + row * 0.027,
        0.590
      );
      front_lower_vent.setMatrixAt(frontVentIndex++, frontVentMatrix);
    }
  }
  front_lower_vent.instanceMatrix.needsUpdate = true;
  root.add(front_lower_vent);

  const right_side_panelGeom = new THREE.BoxGeometry(0.018, 0.43, 0.88);
  const right_side_panel = new THREE.Mesh(right_side_panelGeom, bodySideMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.729, 0.30, -0.02);
  root.add(right_side_panel);

  const right_side_ventGeom = new THREE.BoxGeometry(0.012, 0.014, 0.25);
  const right_side_vent = new THREE.InstancedMesh(right_side_ventGeom, darkPlasticMat, 10);
  right_side_vent.name = "right_side_vent";
  const sideVentMatrix = new THREE.Matrix4();
  for (let i = 0; i < 10; i++) {
    sideVentMatrix.makeTranslation(0.742, 0.145 + i * 0.028, 0.25);
    right_side_vent.setMatrixAt(i, sideVentMatrix);
  }
  right_side_vent.instanceMatrix.needsUpdate = true;
  root.add(right_side_vent);

  const right_side_badgeGeom = new THREE.BoxGeometry(0.012, 0.09, 0.16);
  const right_side_badge = new THREE.Mesh(right_side_badgeGeom, grayButtonMat);
  right_side_badge.name = "right_side_badge";
  right_side_badge.position.set(0.744, 0.46, 0.25);
  root.add(right_side_badge);

  const right_side_badge_markGeom = new THREE.BoxGeometry(0.006, 0.035, 0.09);
  const right_side_badge_mark = new THREE.Mesh(right_side_badge_markGeom, paperMat);
  right_side_badge_mark.name = "right_side_badge_mark";
  right_side_badge_mark.position.set(0.752, 0.46, 0.25);
  root.add(right_side_badge_mark);

  const top_deckGeom = roundedBoxGeometry(1.48, 0.17, 1.12, 0.065, 0.016);
  const top_deck = new THREE.Mesh(top_deckGeom, yellowMat);
  top_deck.name = "top_deck";
  top_deck.position.set(0, deckY, 0);
  root.add(top_deck);

  const deck_front_lipGeom = roundedBoxGeometry(1.37, 0.055, 0.055, 0.022, 0.007);
  const deck_front_lip = new THREE.Mesh(deck_front_lipGeom, yellowDarkMat);
  deck_front_lip.name = "deck_front_lip";
  deck_front_lip.position.set(0, 0.615, 0.565);
  root.add(deck_front_lip);

  const paper_output_recessGeom = roundedBoxGeometry(0.84, 0.022, 0.51, 0.025, 0.004);
  const paper_output_recess = new THREE.Mesh(paper_output_recessGeom, darkPlasticMat);
  paper_output_recess.name = "paper_output_recess";
  paper_output_recess.position.set(-0.18, 0.696, 0.10);
  root.add(paper_output_recess);

  const output_tray_insertGeom = roundedBoxGeometry(0.75, 0.018, 0.43, 0.018, 0.003);
  const output_tray_insert = new THREE.Mesh(output_tray_insertGeom, creamPlasticMat);
  output_tray_insert.name = "output_tray_insert";
  output_tray_insert.position.set(-0.18, 0.711, 0.10);
  root.add(output_tray_insert);

  const tray_front_plateGeom = roundedBoxGeometry(0.72, 0.018, 0.105, 0.012, 0.003);
  const tray_front_plate = new THREE.Mesh(tray_front_plateGeom, palePlasticMat);
  tray_front_plate.name = "tray_front_plate";
  tray_front_plate.position.set(-0.18, 0.724, 0.345);
  root.add(tray_front_plate);

  const tray_vent_slotsGeom = new THREE.BoxGeometry(0.012, 0.007, 0.13);
  const tray_vent_slots = new THREE.InstancedMesh(tray_vent_slotsGeom, darkPlasticMat, 16);
  tray_vent_slots.name = "tray_vent_slots";
  const trayVentMatrix = new THREE.Matrix4();
  for (let i = 0; i < 16; i++) {
    trayVentMatrix.makeTranslation(-0.49 + i * 0.019, 0.725, 0.205);
    tray_vent_slots.setMatrixAt(i, trayVentMatrix);
  }
  tray_vent_slots.instanceMatrix.needsUpdate = true;
  root.add(tray_vent_slots);

  const tray_sensor_windowGeom = roundedBoxGeometry(0.105, 0.010, 0.065, 0.008, 0.002);
  const tray_sensor_window = new THREE.Mesh(tray_sensor_windowGeom, purpleButtonMat);
  tray_sensor_window.name = "tray_sensor_window";
  tray_sensor_window.position.set(0.105, 0.733, 0.347);
  root.add(tray_sensor_window);

  const paper_guideGeom = roundedBoxGeometry(0.045, 0.16, 0.34, 0.012, 0.004);
  const left_paper_guide = new THREE.Mesh(paper_guideGeom, darkPlasticMat);
  left_paper_guide.name = "left_paper_guide";
  left_paper_guide.position.set(-0.53, 0.765, 0.08);
  left_paper_guide.rotation.z = -0.10;
  root.add(left_paper_guide);

  const right_paper_guide = new THREE.Mesh(paper_guideGeom, darkPlasticMat);
  right_paper_guide.name = "right_paper_guide";
  right_paper_guide.position.set(0.17, 0.765, 0.08);
  right_paper_guide.rotation.z = 0.10;
  root.add(right_paper_guide);

  const paper_stackGeom = new THREE.BoxGeometry(0.59, 0.37, 0.012);
  const paper_stack = new THREE.InstancedMesh(paper_stackGeom, paperMat, 4);
  paper_stack.name = "paper_stack";
  const paperDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    paperDummy.position.set(-0.18, 0.83 + i * 0.002, 0.045 + i * 0.008);
    paperDummy.rotation.set(-0.20, 0, 0);
    paperDummy.scale.set(1, 1, 1);
    paperDummy.updateMatrix();
    paper_stack.setMatrixAt(i, paperDummy.matrix);
  }
  paper_stack.instanceMatrix.needsUpdate = true;
  root.add(paper_stack);

  const top_coverGeom = roundedBoxGeometry(1.17, 0.17, 0.55, 0.055, 0.014);
  const top_cover = new THREE.Mesh(top_coverGeom, creamPlasticMat);
  top_cover.name = "top_cover";
  top_cover.position.set(-0.04, 0.79, -0.285);
  root.add(top_cover);

  const cover_front_fasciaGeom = roundedBoxGeometry(1.13, 0.13, 0.055, 0.035, 0.009);
  const cover_front_fascia = new THREE.Mesh(cover_front_fasciaGeom, palePlasticMat);
  cover_front_fascia.name = "cover_front_fascia";
  cover_front_fascia.position.set(-0.04, 0.785, 0.005);
  root.add(cover_front_fascia);

  const cover_hingeGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.91, 14);
  const cover_hinge = new THREE.Mesh(cover_hingeGeom, darkPlasticMat);
  cover_hinge.name = "cover_hinge";
  cover_hinge.rotation.z = Math.PI / 2;
  cover_hinge.position.set(-0.04, 0.735, 0.025);
  root.add(cover_hinge);

  const cover_vent_slotsGeom = new THREE.BoxGeometry(0.012, 0.007, 0.13);
  const cover_vent_slots = new THREE.InstancedMesh(cover_vent_slotsGeom, darkPlasticMat, 8);
  cover_vent_slots.name = "cover_vent_slots";
  const coverVentMatrix = new THREE.Matrix4();
  for (let i = 0; i < 8; i++) {
    coverVentMatrix.makeTranslation(-0.51 + i * 0.019, 0.884, -0.18);
    cover_vent_slots.setMatrixAt(i, coverVentMatrix);
  }
  cover_vent_slots.instanceMatrix.needsUpdate = true;
  root.add(cover_vent_slots);

  const feed_assembly_baseGeom = roundedBoxGeometry(0.73, 0.055, 0.22, 0.025, 0.007);
  const feed_assembly_base = new THREE.Mesh(feed_assembly_baseGeom, darkPlasticMat);
  feed_assembly_base.name = "feed_assembly_base";
  feed_assembly_base.position.set(-0.03, 0.905, -0.13);
  root.add(feed_assembly_base);

  const feed_rollerGeom = new THREE.CylinderGeometry(0.031, 0.031, 0.58, 18);
  const feed_roller = new THREE.Mesh(feed_rollerGeom, rubberMat);
  feed_roller.name = "feed_roller";
  feed_roller.rotation.z = Math.PI / 2;
  feed_roller.position.set(-0.03, 0.925, -0.085);
  root.add(feed_roller);

  const feed_roller_teethGeom = new THREE.BoxGeometry(0.027, 0.038, 0.045);
  const feed_roller_teeth = new THREE.InstancedMesh(feed_roller_teethGeom, darkPlasticMat, 15);
  feed_roller_teeth.name = "feed_roller_teeth";
  const toothMatrix = new THREE.Matrix4();
  for (let i = 0; i < 15; i++) {
    toothMatrix.makeTranslation(-0.29 + i * 0.038, 0.925, -0.058);
    feed_roller_teeth.setMatrixAt(i, toothMatrix);
  }
  feed_roller_teeth.instanceMatrix.needsUpdate = true;
  root.add(feed_roller_teeth);

  const feed_leverGeom = roundedBoxGeometry(0.22, 0.035, 0.055, 0.012, 0.004);
  const feed_lever = new THREE.Mesh(feed_leverGeom, grayButtonMat);
  feed_lever.name = "feed_lever";
  feed_lever.position.set(0.25, 0.935, -0.13);
  root.add(feed_lever);

  const label_sheetGeom = new THREE.BoxGeometry(0.48, 0.008, 0.29);
  const label_sheet = new THREE.Mesh(label_sheetGeom, paperMat);
  label_sheet.name = "label_sheet";
  label_sheet.position.set(0.22, 0.902, -0.34);
  root.add(label_sheet);

  const label_print_marksGeom = new THREE.BoxGeometry(0.10, 0.003, 0.008);
  const label_print_marks = new THREE.InstancedMesh(label_print_marksGeom, printMat, 12);
  label_print_marks.name = "label_print_marks";
  const labelMarkMatrix = new THREE.Matrix4();
  for (let i = 0; i < 12; i++) {
    const column = i % 3;
    const row = Math.floor(i / 3);
    labelMarkMatrix.makeTranslation(
      0.105 + column * 0.115,
      0.908,
      -0.405 + row * 0.045
    );
    label_print_marks.setMatrixAt(i, labelMarkMatrix);
  }
  label_print_marks.instanceMatrix.needsUpdate = true;
  root.add(label_print_marks);

  const rear_connector_baseGeom = roundedBoxGeometry(0.46, 0.11, 0.18, 0.03, 0.009);
  const rear_connector_base = new THREE.Mesh(rear_connector_baseGeom, creamPlasticMat);
  rear_connector_base.name = "rear_connector_base";
  rear_connector_base.position.set(0.34, 0.735, -0.56);
  root.add(rear_connector_base);

  const rear_connector_ribsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.18, 10);
  const rear_connector_ribs = new THREE.InstancedMesh(rear_connector_ribsGeom, rubberMat, 6);
  rear_connector_ribs.name = "rear_connector_ribs";
  const ribMatrix = new THREE.Matrix4();
  for (let i = 0; i < 6; i++) {
    ribMatrix.makeTranslation(0.17 + i * 0.043, 0.805, -0.57);
    rear_connector_ribs.setMatrixAt(i, ribMatrix);
  }
  rear_connector_ribs.instanceMatrix.needsUpdate = true;
  root.add(rear_connector_ribs);

  const cablePoints = [
    new THREE.Vector3(0.52, 0.75, -0.30),
    new THREE.Vector3(0.65, 0.84, -0.36),
    new THREE.Vector3(0.79, 0.82, -0.46),
    new THREE.Vector3(0.82, 0.70, -0.57),
    new THREE.Vector3(0.73, 0.61, -0.59),
    new THREE.Vector3(0.64, 0.66, -0.48),
  ];
  const cableLoopCurve = new THREE.CatmullRomCurve3(cablePoints);
  const cable_loopGeom = new THREE.TubeGeometry(cableLoopCurve, 48, 0.035, 10, false);
  const cable_loop = new THREE.Mesh(cable_loopGeom, rubberMat);
  cable_loop.name = "cable_loop";
  root.add(cable_loop);

  const cable_ribsGeom = new THREE.TorusGeometry(0.037, 0.006, 6, 14);
  const cable_ribs = new THREE.InstancedMesh(cable_ribsGeom, darkPlasticMat, 15);
  cable_ribs.name = "cable_ribs";
  const cableRibDummy = new THREE.Object3D();
  for (let i = 0; i < 15; i++) {
    const t = (i + 0.5) / 15;
    const point = cableLoopCurve.getPoint(t);
    const tangent = cableLoopCurve.getTangent(t).normalize();
    cableRibDummy.position.copy(point);
    cableRibDummy.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      tangent
    );
    cableRibDummy.scale.set(1, 1, 1);
    cableRibDummy.updateMatrix();
    cable_ribs.setMatrixAt(i, cableRibDummy.matrix);
  }
  cable_ribs.instanceMatrix.needsUpdate = true;
  root.add(cable_ribs);

  const control_console = new THREE.Group();
  control_console.name = "control_console";
  control_console.position.set(0.36, 0.735, 0.32);
  control_console.rotation.x = 0.14;
  root.add(control_console);

  const control_console_baseGeom = roundedBoxGeometry(0.68, 0.35, 0.055, 0.055, 0.010);
  const control_console_base = new THREE.Mesh(control_console_baseGeom, yellowMat);
  control_console_base.name = "control_console_base";
  control_console_base.rotation.x = Math.PI / 2;
  control_console.add(control_console_base);

  const control_panel_surfaceGeom = roundedBoxGeometry(0.62, 0.29, 0.014, 0.035, 0.004);
  const control_panel_surface = new THREE.Mesh(control_panel_surfaceGeom, yellowDarkMat);
  control_panel_surface.name = "control_panel_surface";
  control_panel_surface.rotation.x = Math.PI / 2;
  control_panel_surface.position.y = 0.037;
  control_console.add(control_panel_surface);

  const console_switch_recessGeom = roundedBoxGeometry(0.19, 0.075, 0.018, 0.012, 0.003);
  const console_switch_recess = new THREE.Mesh(console_switch_recessGeom, darkPlasticMat);
  console_switch_recess.name = "console_switch_recess";
  console_switch_recess.rotation.x = Math.PI / 2;
  console_switch_recess.position.set(-0.18, 0.052, -0.115);
  control_console.add(console_switch_recess);

  const console_switchGeom = roundedBoxGeometry(0.145, 0.047, 0.025, 0.008, 0.003);
  const console_switch = new THREE.Mesh(console_switchGeom, lightButtonMat);
  console_switch.name = "console_switch";
  console_switch.rotation.x = Math.PI / 2;
  console_switch.position.set(-0.18, 0.069, -0.115);
  control_console.add(console_switch);

  const keypad_buttonsGeom = roundedBoxGeometry(0.068, 0.045, 0.024, 0.007, 0.003);
  const keypad_buttons = new THREE.InstancedMesh(keypad_buttonsGeom, lightButtonMat, 12);
  keypad_buttons.name = "keypad_buttons";
  const keypadMatrix = new THREE.Matrix4();
  const buttonRotation = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  let keypadIndex = 0;
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 3; column++) {
      const position = new THREE.Vector3(
        0.035 + column * 0.087,
        0.064,
        -0.075 + row * 0.060
      );
      keypadMatrix.compose(position, buttonRotation, new THREE.Vector3(1, 1, 1));
      keypad_buttons.setMatrixAt(keypadIndex++, keypadMatrix);
    }
  }
  keypad_buttons.instanceMatrix.needsUpdate = true;
  control_console.add(keypad_buttons);

  const function_buttonsGeom = roundedBoxGeometry(0.062, 0.043, 0.024, 0.007, 0.003);
  const function_buttons = new THREE.InstancedMesh(function_buttonsGeom, grayButtonMat, 4);
  function_buttons.name = "function_buttons";
  const functionMatrix = new THREE.Matrix4();
  for (let i = 0; i < 4; i++) {
    functionMatrix.compose(
      new THREE.Vector3(-0.225 + i * 0.080, 0.064, -0.074),
      buttonRotation,
      new THREE.Vector3(1, 1, 1)
    );
    function_buttons.setMatrixAt(i, functionMatrix);
  }
  function_buttons.instanceMatrix.needsUpdate = true;
  control_console.add(function_buttons);

  const orange_stop_buttonGeom = roundedBoxGeometry(0.075, 0.048, 0.026, 0.008, 0.003);
  const orange_stop_button = new THREE.Mesh(orange_stop_buttonGeom, orangeButtonMat);
  orange_stop_button.name = "orange_stop_button";
  orange_stop_button.rotation.x = Math.PI / 2;
  orange_stop_button.position.set(-0.225, 0.065, 0.052);
  control_console.add(orange_stop_button);

  const red_power_buttonGeom = roundedBoxGeometry(0.075, 0.048, 0.026, 0.008, 0.003);
  const red_power_button = new THREE.Mesh(red_power_buttonGeom, redButtonMat);
  red_power_button.name = "red_power_button";
  red_power_button.rotation.x = Math.PI / 2;
  red_power_button.position.set(0.255, 0.065, 0.074);
  control_console.add(red_power_button);

  const purple_clear_buttonGeom = roundedBoxGeometry(0.075, 0.048, 0.026, 0.008, 0.003);
  const purple_clear_button = new THREE.Mesh(purple_clear_buttonGeom, purpleButtonMat);
  purple_clear_button.name = "purple_clear_button";
  purple_clear_button.rotation.x = Math.PI / 2;
  purple_clear_button.position.set(-0.105, 0.065, 0.105);
  control_console.add(purple_clear_button);

  const gray_menu_buttonGeom = roundedBoxGeometry(0.075, 0.048, 0.026, 0.008, 0.003);
  const gray_menu_button = new THREE.Mesh(gray_menu_buttonGeom, grayButtonMat);
  gray_menu_button.name = "gray_menu_button";
  gray_menu_button.rotation.x = Math.PI / 2;
  gray_menu_button.position.set(-0.215, 0.065, 0.105);
  control_console.add(gray_menu_button);

  const keypad_labelsGeom = new THREE.BoxGeometry(0.018, 0.003, 0.005);
  const keypad_labels = new THREE.InstancedMesh(keypad_labelsGeom, printMat, 12);
  keypad_labels.name = "keypad_labels";
  const keypadLabelMatrix = new THREE.Matrix4();
  let keypadLabelIndex = 0;
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 3; column++) {
      keypadLabelMatrix.makeTranslation(
        0.035 + column * 0.087,
        0.079,
        -0.075 + row * 0.060
      );
      keypad_labels.setMatrixAt(keypadLabelIndex++, keypadLabelMatrix);
    }
  }
  keypad_labels.instanceMatrix.needsUpdate = true;
  control_console.add(keypad_labels);

  const console_indicatorGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 12);
  const console_indicator = new THREE.Mesh(console_indicatorGeom, darkPlasticMat);
  console_indicator.name = "console_indicator";
  console_indicator.position.set(-0.275, 0.062, -0.125);
  control_console.add(console_indicator);

  const front_service_slotGeom = roundedBoxGeometry(0.055, 0.075, 0.014, 0.008, 0.002);
  const front_service_slot = new THREE.Mesh(front_service_slotGeom, darkPlasticMat);
  front_service_slot.name = "front_service_slot";
  front_service_slot.position.set(0.59, 0.43, 0.591);
  root.add(front_service_slot);

  const front_panel_screwGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 12);
  const front_panel_screw = new THREE.Mesh(front_panel_screwGeom, grayButtonMat);
  front_panel_screw.name = "front_panel_screw";
  front_panel_screw.rotation.x = Math.PI / 2;
  front_panel_screw.position.set(0.48, 0.50, 0.594);
  root.add(front_panel_screw);

  fitToUnitCube(root);
  return root;

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
}