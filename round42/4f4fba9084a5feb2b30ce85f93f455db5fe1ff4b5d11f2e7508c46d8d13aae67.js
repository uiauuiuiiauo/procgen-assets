export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "stainless_storage_cabinet";

  const cabinet_shell = new THREE.Group();
  cabinet_shell.name = "cabinet_shell";
  root.add(cabinet_shell);

  const interior = new THREE.Group();
  interior.name = "interior";
  root.add(interior);

  const controls = new THREE.Group();
  controls.name = "controls";
  root.add(controls);

  const base = new THREE.Group();
  base.name = "base";
  root.add(base);

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x292d2f,
    metalness: 0.0,
    roughness: 0.7
  });
  const interior_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x171a1c,
    metalness: 0.0,
    roughness: 0.8
  });
  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x17344d,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x17344d,
    emissiveIntensity: 1.0
  });
  const screen_detailMat = new THREE.MeshStandardMaterial({
    color: 0xaed9ff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xaed9ff,
    emissiveIntensity: 1.0
  });
  const green_indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x6de086,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x6de086,
    emissiveIntensity: 1.0
  });

  const cabinetW = 1.18;
  const cabinetD = 0.88;
  const cabinetH = 2.08;
  const bodyBottom = 0.12;
  const bodyTop = bodyBottom + cabinetH;
  const frontZ = cabinetD / 2;

  const left_side_panelGeom = new THREE.BoxGeometry(0.055, cabinetH, cabinetD);
  const left_side_panel = new THREE.Mesh(left_side_panelGeom, brushed_metalMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(
    -cabinetW / 2 + 0.0275,
    bodyBottom + cabinetH / 2,
    0
  );
  cabinet_shell.add(left_side_panel);

  const right_side_panelGeom = left_side_panelGeom;
  const right_side_panel = new THREE.Mesh(right_side_panelGeom, brushed_metalMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(
    cabinetW / 2 - 0.0275,
    bodyBottom + cabinetH / 2,
    0
  );
  cabinet_shell.add(right_side_panel);

  const back_panelGeom = new THREE.BoxGeometry(
    cabinetW - 0.11,
    cabinetH - 0.08,
    0.045
  );
  const back_panel = new THREE.Mesh(back_panelGeom, brushed_metalMat);
  back_panel.name = "back_panel";
  back_panel.position.set(
    0,
    bodyBottom + cabinetH / 2,
    -cabinetD / 2 + 0.0225
  );
  cabinet_shell.add(back_panel);

  const top_panelGeom = new THREE.BoxGeometry(cabinetW, 0.055, cabinetD);
  const top_panel = new THREE.Mesh(top_panelGeom, brushed_metalMat);
  top_panel.name = "top_panel";
  top_panel.position.set(0, bodyTop - 0.0275, 0);
  cabinet_shell.add(top_panel);

  const bottom_panelGeom = new THREE.BoxGeometry(cabinetW, 0.06, cabinetD);
  const bottom_panel = new THREE.Mesh(bottom_panelGeom, brushed_metalMat);
  bottom_panel.name = "bottom_panel";
  bottom_panel.position.set(0, bodyBottom + 0.03, 0);
  cabinet_shell.add(bottom_panel);

  const front_headerGeom = new THREE.BoxGeometry(1.09, 0.33, 0.055);
  const front_header = new THREE.Mesh(front_headerGeom, brushed_metalMat);
  front_header.name = "front_header";
  front_header.position.set(0, 2.055, frontZ + 0.0075);
  cabinet_shell.add(front_header);

  const front_sillGeom = new THREE.BoxGeometry(1.09, 0.23, 0.055);
  const front_sill = new THREE.Mesh(front_sillGeom, brushed_metalMat);
  front_sill.name = "front_sill";
  front_sill.position.set(0, 0.235, frontZ + 0.0075);
  cabinet_shell.add(front_sill);

  const front_jambGeom = new THREE.BoxGeometry(0.09, 1.60, 0.055);
  const front_left_jamb = new THREE.Mesh(front_jambGeom, brushed_metalMat);
  front_left_jamb.name = "front_left_jamb";
  front_left_jamb.position.set(-0.545, 1.15, frontZ + 0.0075);
  cabinet_shell.add(front_left_jamb);

  const front_right_jamb = new THREE.Mesh(front_jambGeom, brushed_metalMat);
  front_right_jamb.name = "front_right_jamb";
  front_right_jamb.position.set(0.545, 1.15, frontZ + 0.0075);
  cabinet_shell.add(front_right_jamb);

  const interior_back_linerGeom = new THREE.BoxGeometry(0.99, 1.55, 0.018);
  const interior_back_liner = new THREE.Mesh(interior_back_linerGeom, interiorMat);
  interior_back_liner.name = "interior_back_liner";
  interior_back_liner.position.set(0, 1.15, -0.397);
  interior.add(interior_back_liner);

  const interior_side_linerGeom = new THREE.BoxGeometry(0.018, 1.55, 0.76);
  const interior_left_liner = new THREE.Mesh(interior_side_linerGeom, interiorMat);
  interior_left_liner.name = "interior_left_liner";
  interior_left_liner.position.set(-0.518, 1.15, 0.005);
  interior.add(interior_left_liner);

  const interior_right_liner = new THREE.Mesh(interior_side_linerGeom, interiorMat);
  interior_right_liner.name = "interior_right_liner";
  interior_right_liner.position.set(0.518, 1.15, 0.005);
  interior.add(interior_right_liner);

  const interior_ceilingGeom = new THREE.BoxGeometry(1.02, 0.025, 0.78);
  const interior_ceiling = new THREE.Mesh(interior_ceilingGeom, interiorMat);
  interior_ceiling.name = "interior_ceiling";
  interior_ceiling.position.set(0, 1.91, 0.005);
  interior.add(interior_ceiling);

  const interior_floorGeom = new THREE.BoxGeometry(1.02, 0.035, 0.78);
  const interior_floor = new THREE.Mesh(interior_floorGeom, interior_edgeMat);
  interior_floor.name = "interior_floor";
  interior_floor.position.set(0, 0.365, 0.005);
  interior.add(interior_floor);

  const left_opening_trimGeom = new THREE.BoxGeometry(0.025, 1.57, 0.025);
  const left_opening_trim = new THREE.Mesh(
    left_opening_trimGeom,
    black_plasticMat
  );
  left_opening_trim.name = "left_opening_trim";
  left_opening_trim.position.set(-0.505, 1.15, frontZ + 0.045);
  cabinet_shell.add(left_opening_trim);

  const right_opening_trim = new THREE.Mesh(
    left_opening_trimGeom,
    black_plasticMat
  );
  right_opening_trim.name = "right_opening_trim";
  right_opening_trim.position.set(0.505, 1.15, frontZ + 0.045);
  cabinet_shell.add(right_opening_trim);

  const horizontal_opening_trimGeom = new THREE.BoxGeometry(1.01, 0.025, 0.025);
  const top_opening_trim = new THREE.Mesh(
    horizontal_opening_trimGeom,
    black_plasticMat
  );
  top_opening_trim.name = "top_opening_trim";
  top_opening_trim.position.set(0, 1.93, frontZ + 0.045);
  cabinet_shell.add(top_opening_trim);

  const bottom_opening_trim = new THREE.Mesh(
    horizontal_opening_trimGeom,
    black_plasticMat
  );
  bottom_opening_trim.name = "bottom_opening_trim";
  bottom_opening_trim.position.set(0, 0.37, frontZ + 0.045);
  cabinet_shell.add(bottom_opening_trim);

  const left_front_corner_trimGeom = new THREE.BoxGeometry(0.025, 2.0, 0.035);
  const left_front_corner_trim = new THREE.Mesh(
    left_front_corner_trimGeom,
    polished_metalMat
  );
  left_front_corner_trim.name = "left_front_corner_trim";
  left_front_corner_trim.position.set(-0.585, 1.16, frontZ + 0.025);
  cabinet_shell.add(left_front_corner_trim);

  const right_front_corner_trim = new THREE.Mesh(
    left_front_corner_trimGeom,
    polished_metalMat
  );
  right_front_corner_trim.name = "right_front_corner_trim";
  right_front_corner_trim.position.set(0.585, 1.16, frontZ + 0.025);
  cabinet_shell.add(right_front_corner_trim);

  const right_rear_corner_trim = new THREE.Mesh(
    left_front_corner_trimGeom,
    polished_metalMat
  );
  right_rear_corner_trim.name = "right_rear_corner_trim";
  right_rear_corner_trim.position.set(0.585, 1.16, -frontZ + 0.025);
  cabinet_shell.add(right_rear_corner_trim);

  const top_front_edgeGeom = new THREE.BoxGeometry(1.08, 0.022, 0.035);
  const top_front_edge = new THREE.Mesh(top_front_edgeGeom, polished_metalMat);
  top_front_edge.name = "top_front_edge";
  top_front_edge.position.set(0, 2.185, frontZ + 0.025);
  cabinet_shell.add(top_front_edge);

  const bottom_front_edgeGeom = new THREE.BoxGeometry(1.08, 0.025, 0.035);
  const bottom_front_edge = new THREE.Mesh(
    bottom_front_edgeGeom,
    black_plasticMat
  );
  bottom_front_edge.name = "bottom_front_edge";
  bottom_front_edge.position.set(0, 0.125, frontZ + 0.025);
  cabinet_shell.add(bottom_front_edge);

  const shelfHeights = [0.65, 0.97, 1.29, 1.61];
  const dummy = new THREE.Object3D();

  const shelf_deckGeom = new THREE.BoxGeometry(0.91, 0.018, 0.68);
  const shelf_decks = new THREE.InstancedMesh(
    shelf_deckGeom,
    dark_metalMat,
    shelfHeights.length
  );
  shelf_decks.name = "shelf_decks";
  for (let i = 0; i < shelfHeights.length; i++) {
    dummy.position.set(0, shelfHeights[i] - 0.018, 0.015);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    shelf_decks.setMatrixAt(i, dummy.matrix);
  }
  shelf_decks.instanceMatrix.needsUpdate = true;
  interior.add(shelf_decks);

  const shelf_front_railGeom = new THREE.BoxGeometry(0.96, 0.045, 0.055);
  const shelf_front_rails = new THREE.InstancedMesh(
    shelf_front_railGeom,
    polished_metalMat,
    shelfHeights.length
  );
  shelf_front_rails.name = "shelf_front_rails";
  for (let i = 0; i < shelfHeights.length; i++) {
    dummy.position.set(0, shelfHeights[i], 0.392);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    shelf_front_rails.setMatrixAt(i, dummy.matrix);
  }
  shelf_front_rails.instanceMatrix.needsUpdate = true;
  interior.add(shelf_front_rails);

  const shelf_rear_railGeom = new THREE.BoxGeometry(0.91, 0.025, 0.026);
  const shelf_rear_rails = new THREE.InstancedMesh(
    shelf_rear_railGeom,
    polished_metalMat,
    shelfHeights.length
  );
  shelf_rear_rails.name = "shelf_rear_rails";
  for (let i = 0; i < shelfHeights.length; i++) {
    dummy.position.set(0, shelfHeights[i] + 0.002, -0.323);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    shelf_rear_rails.setMatrixAt(i, dummy.matrix);
  }
  shelf_rear_rails.instanceMatrix.needsUpdate = true;
  interior.add(shelf_rear_rails);

  const shelf_side_supportGeom = new THREE.BoxGeometry(0.025, 0.035, 0.71);
  const shelf_side_supports = new THREE.InstancedMesh(
    shelf_side_supportGeom,
    polished_metalMat,
    shelfHeights.length * 2
  );
  shelf_side_supports.name = "shelf_side_supports";
  let supportIndex = 0;
  for (let i = 0; i < shelfHeights.length; i++) {
    for (const side of [-1, 1]) {
      dummy.position.set(side * 0.462, shelfHeights[i], 0.015);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      shelf_side_supports.setMatrixAt(supportIndex, dummy.matrix);
      supportIndex++;
    }
  }
  shelf_side_supports.instanceMatrix.needsUpdate = true;
  interior.add(shelf_side_supports);

  const shelf_front_bracketGeom = new THREE.BoxGeometry(0.035, 0.065, 0.06);
  const shelf_front_brackets = new THREE.InstancedMesh(
    shelf_front_bracketGeom,
    dark_metalMat,
    shelfHeights.length * 2
  );
  shelf_front_brackets.name = "shelf_front_brackets";
  let bracketIndex = 0;
  for (let i = 0; i < shelfHeights.length; i++) {
    for (const side of [-1, 1]) {
      dummy.position.set(side * 0.47, shelfHeights[i] - 0.018, 0.39);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      shelf_front_brackets.setMatrixAt(bracketIndex, dummy.matrix);
      bracketIndex++;
    }
  }
  shelf_front_brackets.instanceMatrix.needsUpdate = true;
  interior.add(shelf_front_brackets);

  const left_support_railGeom = new THREE.BoxGeometry(0.022, 1.43, 0.025);
  const left_support_rail = new THREE.Mesh(
    left_support_railGeom,
    polished_metalMat
  );
  left_support_rail.name = "left_support_rail";
  left_support_rail.position.set(-0.075, 1.14, -0.374);
  interior.add(left_support_rail);

  const right_support_rail = new THREE.Mesh(
    left_support_railGeom,
    polished_metalMat
  );
  right_support_rail.name = "right_support_rail";
  right_support_rail.position.set(0.475, 1.14, -0.374);
  interior.add(right_support_rail);

  const slotCount = 22;
  const support_slotGeom = new THREE.BoxGeometry(0.012, 0.026, 0.007);
  const left_support_slots = new THREE.InstancedMesh(
    support_slotGeom,
    black_plasticMat,
    slotCount
  );
  left_support_slots.name = "left_support_slots";

  const right_support_slots = new THREE.InstancedMesh(
    support_slotGeom,
    black_plasticMat,
    slotCount
  );
  right_support_slots.name = "right_support_slots";

  for (let i = 0; i < slotCount; i++) {
    const y = 0.46 + i * 0.064;

    dummy.position.set(-0.075, y, -0.358);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    left_support_slots.setMatrixAt(i, dummy.matrix);

    dummy.position.set(0.475, y, -0.358);
    dummy.updateMatrix();
    right_support_slots.setMatrixAt(i, dummy.matrix);
  }
  left_support_slots.instanceMatrix.needsUpdate = true;
  right_support_slots.instanceMatrix.needsUpdate = true;
  interior.add(left_support_slots, right_support_slots);

  const drain_holeGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.006, 12);
  const drain_holes = new THREE.InstancedMesh(
    drain_holeGeom,
    black_plasticMat,
    6
  );
  drain_holes.name = "drain_holes";
  for (let i = 0; i < 6; i++) {
    dummy.position.set(-0.35 + i * 0.055, 0.387, 0.24);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    drain_holes.setMatrixAt(i, dummy.matrix);
  }
  drain_holes.instanceMatrix.needsUpdate = true;
  interior.add(drain_holes);

  const ceiling_channelGeom = new THREE.BoxGeometry(0.025, 0.025, 0.72);
  const left_ceiling_channel = new THREE.Mesh(
    ceiling_channelGeom,
    interior_edgeMat
  );
  left_ceiling_channel.name = "left_ceiling_channel";
  left_ceiling_channel.position.set(-0.26, 1.885, 0.0);
  interior.add(left_ceiling_channel);

  const right_ceiling_channel = new THREE.Mesh(
    ceiling_channelGeom,
    interior_edgeMat
  );
  right_ceiling_channel.name = "right_ceiling_channel";
  right_ceiling_channel.position.set(0.26, 1.885, 0.0);
  interior.add(right_ceiling_channel);

  const door_handle_shadowGeom = new THREE.BoxGeometry(0.065, 1.30, 0.025);
  const door_handle_shadow = new THREE.Mesh(
    door_handle_shadowGeom,
    black_plasticMat
  );
  door_handle_shadow.name = "door_handle_shadow";
  door_handle_shadow.position.set(-0.548, 1.15, frontZ + 0.055);
  cabinet_shell.add(door_handle_shadow);

  const door_handleGeom = new THREE.CylinderGeometry(0.026, 0.026, 1.22, 20);
  const door_handle = new THREE.Mesh(door_handleGeom, polished_metalMat);
  door_handle.name = "door_handle";
  door_handle.position.set(-0.548, 1.15, frontZ + 0.115);
  cabinet_shell.add(door_handle);

  const handle_mountGeom = new THREE.CylinderGeometry(0.031, 0.031, 0.105, 16);
  const handle_mounts = new THREE.InstancedMesh(
    handle_mountGeom,
    polished_metalMat,
    2
  );
  handle_mounts.name = "handle_mounts";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(-0.548, i === 0 ? 0.62 : 1.68, frontZ + 0.075);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    handle_mounts.setMatrixAt(i, dummy.matrix);
  }
  handle_mounts.instanceMatrix.needsUpdate = true;
  cabinet_shell.add(handle_mounts);

  const handle_end_capGeom = new THREE.CylinderGeometry(0.029, 0.029, 0.018, 20);
  const handle_end_caps = new THREE.InstancedMesh(
    handle_end_capGeom,
    black_plasticMat,
    2
  );
  handle_end_caps.name = "handle_end_caps";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(-0.548, i === 0 ? 0.535 : 1.765, frontZ + 0.115);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    handle_end_caps.setMatrixAt(i, dummy.matrix);
  }
  handle_end_caps.instanceMatrix.needsUpdate = true;
  cabinet_shell.add(handle_end_caps);

  const door_hingeGeom = new THREE.BoxGeometry(0.035, 0.065, 0.055);
  const door_hinges = new THREE.InstancedMesh(
    door_hingeGeom,
    black_plasticMat,
    2
  );
  door_hinges.name = "door_hinges";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(0.558, i === 0 ? 0.18 : 2.13, frontZ + 0.045);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    door_hinges.setMatrixAt(i, dummy.matrix);
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  cabinet_shell.add(door_hinges);

  const front_display_bezelGeom = new THREE.BoxGeometry(0.23, 0.105, 0.018);
  const front_display_bezel = new THREE.Mesh(
    front_display_bezelGeom,
    black_plasticMat
  );
  front_display_bezel.name = "front_display_bezel";
  front_display_bezel.position.set(0.14, 2.045, frontZ + 0.047);
  controls.add(front_display_bezel);

  const front_display_screenGeom = new THREE.BoxGeometry(0.18, 0.062, 0.007);
  const front_display_screen = new THREE.Mesh(
    front_display_screenGeom,
    screenMat
  );
  front_display_screen.name = "front_display_screen";
  front_display_screen.position.set(0.13, 2.045, frontZ + 0.06);
  controls.add(front_display_screen);

  const front_display_markGeom = new THREE.BoxGeometry(0.018, 0.006, 0.003);
  const front_display_marks = new THREE.InstancedMesh(
    front_display_markGeom,
    screen_detailMat,
    7
  );
  front_display_marks.name = "front_display_marks";
  for (let i = 0; i < 7; i++) {
    dummy.position.set(
      0.075 + i * 0.019,
      2.045 + (i % 2 === 0 ? 0.008 : -0.006),
      frontZ + 0.065
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_display_marks.setMatrixAt(i, dummy.matrix);
  }
  front_display_marks.instanceMatrix.needsUpdate = true;
  controls.add(front_display_marks);

  const front_status_badgeGeom = new THREE.BoxGeometry(0.075, 0.065, 0.015);
  const front_status_badge = new THREE.Mesh(
    front_status_badgeGeom,
    black_plasticMat
  );
  front_status_badge.name = "front_status_badge";
  front_status_badge.position.set(0.46, 2.045, frontZ + 0.048);
  controls.add(front_status_badge);

  const front_status_lightGeom = new THREE.BoxGeometry(0.04, 0.012, 0.006);
  const front_status_light = new THREE.Mesh(
    front_status_lightGeom,
    green_indicatorMat
  );
  front_status_light.name = "front_status_light";
  front_status_light.position.set(0.46, 2.05, frontZ + 0.06);
  controls.add(front_status_light);

  const brand_badgeGeom = new THREE.BoxGeometry(0.085, 0.035, 0.012);
  const brand_badge = new THREE.Mesh(brand_badgeGeom, polished_metalMat);
  brand_badge.name = "brand_badge";
  brand_badge.position.set(-0.31, 2.07, frontZ + 0.045);
  controls.add(brand_badge);

  const side_control_panelGeom = new THREE.BoxGeometry(0.022, 0.43, 0.21);
  const side_control_panel = new THREE.Mesh(
    side_control_panelGeom,
    black_plasticMat
  );
  side_control_panel.name = "side_control_panel";
  side_control_panel.position.set(-0.603, 1.57, 0.08);
  controls.add(side_control_panel);

  const side_screen_bezelGeom = new THREE.BoxGeometry(0.008, 0.22, 0.15);
  const side_screen_bezel = new THREE.Mesh(
    side_screen_bezelGeom,
    interior_edgeMat
  );
  side_screen_bezel.name = "side_screen_bezel";
  side_screen_bezel.position.set(-0.619, 1.64, 0.08);
  controls.add(side_screen_bezel);

  const side_screenGeom = new THREE.BoxGeometry(0.007, 0.18, 0.12);
  const side_screen = new THREE.Mesh(side_screenGeom, screenMat);
  side_screen.name = "side_screen";
  side_screen.position.set(-0.625, 1.64, 0.08);
  controls.add(side_screen);

  const side_screen_markGeom = new THREE.BoxGeometry(0.003, 0.006, 0.045);
  const side_screen_marks = new THREE.InstancedMesh(
    side_screen_markGeom,
    screen_detailMat,
    6
  );
  side_screen_marks.name = "side_screen_marks";
  for (let i = 0; i < 6; i++) {
    dummy.position.set(
      -0.63,
      1.70 - i * 0.022,
      0.08 + (i % 2 === 0 ? -0.018 : 0.012)
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_screen_marks.setMatrixAt(i, dummy.matrix);
  }
  side_screen_marks.instanceMatrix.needsUpdate = true;
  controls.add(side_screen_marks);

  const side_buttonGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 12);
  const side_control_buttons = new THREE.InstancedMesh(
    side_buttonGeom,
    screen_detailMat,
    6
  );
  side_control_buttons.name = "side_control_buttons";
  let sideButtonIndex = 0;
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 2; column++) {
      dummy.position.set(
        -0.626,
        1.45 - row * 0.045,
        0.045 + column * 0.07
      );
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_control_buttons.setMatrixAt(sideButtonIndex, dummy.matrix);
      sideButtonIndex++;
    }
  }
  side_control_buttons.instanceMatrix.needsUpdate = true;
  controls.add(side_control_buttons);

  const foot_stemGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.10, 16);
  const foot_stems = new THREE.InstancedMesh(
    foot_stemGeom,
    black_plasticMat,
    4
  );
  foot_stems.name = "foot_stems";

  const foot_padGeom = new THREE.CylinderGeometry(0.065, 0.055, 0.035, 20);
  const foot_pads = new THREE.InstancedMesh(
    foot_padGeom,
    black_plasticMat,
    4
  );
  foot_pads.name = "foot_pads";

  const footPositions = [
    [-0.49, 0.35],
    [0.49, 0.35],
    [-0.49, -0.35],
    [0.49, -0.35]
  ];
  for (let i = 0; i < footPositions.length; i++) {
    const x = footPositions[i][0];
    const z = footPositions[i][1];

    dummy.position.set(x, 0.095, z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    foot_stems.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, 0.025, z);
    dummy.updateMatrix();
    foot_pads.setMatrixAt(i, dummy.matrix);
  }
  foot_stems.instanceMatrix.needsUpdate = true;
  foot_pads.instanceMatrix.needsUpdate = true;
  base.add(foot_stems, foot_pads);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
    object.updateMatrixWorld(true);
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